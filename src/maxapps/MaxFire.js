import * as FB from 'firebase'

const	DEFAULT_DELAY = 3000;

const _delayTypes = ['get', 'push', 'set', 'update'];

let _delays;													// Stores delay values to use when simulating firebase
let _firebase;												// Stores instance of Firebase
let _loginAs;													// When simulating firebase, stores an ID for who to login as
let _simData;													// Stores simulated data
let _useDelays;												// Simulate delays if true


// _assertInited()
function _assertInited() {
	if (!_firebase) {
		throw new Error('MaxFire not initialized!');
	}
}


// _delay(sOp, oOptions)
function _delay(sOp, oOptions) {
	return new Promise((fResolve, fReject) => {
		let fDone = oOptions.reject ? fReject : fResolve;

		if (_useDelays) {
			window.setTimeout(fDone, oOptions.delay || _delays[sOp]);
		} else {
			fDone();
		}
	});
}


// _initDelays(vDelays)
function _initDelays(vDelays) {
	if (vDelays) {
		let oDefs = {};
		let sType = typeof vDelays;
		let iDef = sType === 'number' ? vDelays : DEFAULT_DELAY;

		_useDelays = true;
		_delayTypes.forEach(sType => oDefs[sType] = iDef);
		_delays = sType === 'object'? vDelays : {};

		Object.assign(_delays, oDefs);
	}
}


// _initLoginInfo(oInit)
function _initLoginInfo(oInit) {
	// !!! put user code back in !!!
}


export default {

	// asArray(vSrc[, sKey])
	// Checks if the source value is an array and converts it into one if not. Objects are converted into array where the 
	// value of each key is an element of the array. All other types are returned as the only element in a new array.
	// 		vSrc	- The source value to convert/return as an array.
	// 		sKey	- [null] If a string is provided and vSrc is an object, each element of the returned array will have a 
	// 						key with this name added to it. The value will be the key of the source object.
	// Returns an array.
	// Example:
	// 	let oSrc = {first:{a:1, b:'One'}, second:{a:2, b:'Two'}};
	// 	let aData = MaxFire.asArray(oSrc, 'c');	// [{a:1, b:'One', c:'first'}, {a:2, b:'Two', c:'second'}]
	asArray(vSrc, sKey) {
		let aRet;

		if (Array.isArray(vSrc)) {
			aRet = vSrc;
		} else if (typeof vSrc === 'object') {
			if (sKey) {
				aRet = Object.keys(vSrc).map(sKey => {
					vSrc[sKey] = sKey;
					return vSrc[sKey];
				});
			} else {
				aRet = Object.keys(vSrc).map(sKey => vSrc[sKey]);
			}
		} else {
			aRet = [vSrc];
		}

		return aRet;
	},


	// get(sPath, oOptions)
	// Gets data from the specified path.
	// 		sPath			- Firebase path for the data to retrieve.
	// 		oOptions	- [null] Object with additional options when simulating firebase:
	// 									delay		- [null] The delay to use when simiulating this specific call.
	// 									reject	- [null] If provided, an error is simulated and this value is passed in rejection.
	// Returns a promise which is resolved when the data is available. NOTE: Value of the resolve function is the the 
	// actual data NOT the firebase snapshot object (i.e. data.val()).
	get(sPath, oOptions = {}) {
		let vVal;

		_assertInited();

		return new Promise((fResolve, fReject) => {
			if (_simData) {
				if (sPath.charAt(0) === '/') {
					sPath = sPath.substr(1);
				}

				vVal = sPath.split('/').reduce((oPrev, sKey) => {
					return oPrev && oPrev.hasOwnProperty(sKey) ? oPrev[sKey] : null;
				}, _simData);

				_delay('get', oOptions).then(() => {
					fResolve(vVal);
				}).catch(() => {
					fReject(oOptions.reject);
				});
			} else {
				FB.database().ref(sPath).once('value').then((oSnap) => fResolve(oSnap.val())).catch(oErr => fReject(oErr));
			}
		});
	},


	// init(oInit)
	// Initialize the MaxFire component. Must be called before using any other method.
	// 		oInit	- Object with properties needed to either simulate or connect to firebase. For a live connection to 
	// 						firebase this must provide values needed by firebase (apiKey, authDomain, databaseURL, storageBucket).
	// 						For simulated access, the object must provide at least the delay value and simulated data:
	// 							data		- This property is required to simulate a connection to firebase. ???
	// 							delays	- [null] (Boolean|Number|Object) Pass an integer value to set the simulated delay value for 
	// 												all operations to the same number of milliseconds. Pass an object to set the delays for 
	// 												specific operations to different values. Any operations not specified wil be set to the 
	// 												default specified by DEFAULT_DELAY.
	// 							loginAs	- ???
	init(oInit) {
		if (!_firebase) {
			if (oInit.hasOwnProperty('data')) {
				_simData = oInit.data;
				_initLoginInfo(oInit);
				_initDelays(oInit.delays);
				_firebase = {};
			} else {
				_firebase = FB.initializeApp(oInit);
			}
		}
	},


}