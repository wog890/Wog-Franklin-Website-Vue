<template>
	<div>
		<wog-img-header :src="src.imgSrc"></wog-img-header>
		<v-layout v-if="editable">
			<v-flex md8 offset-md2 class="pl-3 pr-3">
				<h3 class="text-xs-center secondary header">Admin Logout</h3>
			</v-flex>
		</v-layout>
		<v-layout v-if="editable">
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<wog-spinner v-if="loggingOut" :type="spinnerType"></wog-spinner>
				<v-btn v-if="!loggingOut" primary @click.native="logOut">Log Out</v-btn>
			</v-flex>
		</v-layout>
		<v-layout v-if="!editable">
			<v-flex md8 offset-md2 class="pl-3 pr-3">
				<h3 class="text-xs-center secondary header">Admin Login</h3>
			</v-flex>
		</v-layout>
		<v-layout v-if="!editable">
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-4 pb-0">Username:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field id="inpUser" v-model="username" label="required" single-line></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-4 pb-0">Password:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field id="inpPass" v-model="password" label="required" single-line
								:append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
								:append-icon-cb="() => (passwordVisible = !passwordVisible)"
								:type="passwordVisible ? 'password' : 'text'"
								@keyup.native.enter="logIn">
						</v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md10 offset-md2>
						<v-alert success v-model="alertSuccess" transition="scale-transition">Logged In.</v-alert>
						<v-alert error dismissible v-model="alertError" transition="scale-transition" @input="clearAlert">{{alertErrorMessage}}</v-alert>
						<wog-spinner v-if="loggingIn" :type="spinnerType"></wog-spinner>
						<v-btn v-if="showLoginBtn" primary @click.native="logIn">Log In</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import * as FB from 'firebase'
	import MaxFire from '../maxapps/MaxFire.js'

	export default {
		created() {
			MaxFire.get('/tabs/admin').then(oProducts => {
				this.src = oProducts
				this.loading = false;
			}).catch(oErr => {
				this.loading = false;
				this.errorMessage = 'Unable to load specials!';
				console.log(oErr.message);
			});
		},
		computed: {
			errors: function() {
				var err = '';
				var errs = [];
				if (this.username == '') {
					errs.push('username');
				}
				if (this.password == '') {
					errs.push('password');
				}
				if (errs.length > 1) {
					errs[errs.length-1] = 'and ' + errs[errs.length-1];
				}
				for (var i=0, j=errs.length; i<j; i++) {
					err += errs[i] + ' ';
				}
				if (errs.length > 0) {
					return 'Please provide a ' + err.slice(0, -1) + '.';
				}
				return '';
			},
			showLoginBtn: function() {
				return this.errors == '' && !this.loggingIn;
			}
		},
		data: function() {
			return {
				alertError: false,
				alertErrorMessage: 'Username or password invalid.',
				alertSuccess: false,
				loggingIn: false,
				loggingOut: false,
				password: '',
				passwordVisible: true,
				spinnerType: 'pacman',
				src: {imgSrc: {img: '', url: ''}},
				username: ''
			}
		},
		methods: {
			clearAlert: function() {
				this.alertError = false;
				this.alertSuccess = false;
			},
			clearForm: function() {
				this.username = '';
				this.password = '';
			},
			logIn: function() {
				var self = this;
				if (this.errors == '') {
					this.loggingIn = true;
					FB.auth().signInWithEmailAndPassword(this.username, this.password).then(function(user) {
						self.alertSuccess = true;
						setTimeout(self.clearAlert, 3000);
						self.clearForm();
						self.loggingIn = false;
					}).catch(function(error) {
						self.alertError = true;
						setTimeout(self.clearAlert, 3000);
						self.loggingIn = false;
					});
				}
			},
			logOut: function() {
				var self = this;
				this.loggingOut = true;
				FB.auth().signOut().then(function() {
					self.loggingOut = false;
				});
			}
		},
		props: {
			editable: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style>

</style>