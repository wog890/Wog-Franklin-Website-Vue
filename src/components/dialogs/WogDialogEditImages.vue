<template>
	<v-card>
		<v-card-text class="pb-0">
			<v-layout v-if="fileIndex > -1">
				<v-flex md10 offset-md2>
					<wog-upload :useImage="true" :defaultImg="fileUrl" @input="fileUrlChanged"></wog-upload>
					<p class="caption" v-if="fileIndex > -1">Drag an image over or click image to change</p>
				</v-flex>
			</v-layout>
			<v-layout>
				<v-flex md2><p class="title text-xs-right pt-4 pb-0">Slide: </p></v-flex>
				<v-flex md10><v-select class="wog-select" :items="slides" label="Select a Slide" v-model="fileIndex"></v-select></v-flex>
			</v-layout>
			<v-layout v-if="fileIndex > -1">
				<v-flex md2><p class="title text-xs-right pt-4 pb-0">Name: </p></v-flex>
				<v-flex md10><v-text-field class="mb-0" label="required" v-model="fileName" single-line disabled></v-text-field></v-flex>
			</v-layout>
			<v-layout v-if="fileName != ''">
				<v-flex md2><p class="title text-xs-right pt-4 pb-0">Link To: </p></v-flex>
				<v-flex md10><v-select class="wog-select" :items="tabs" label="Select Tab" v-model="fileLink"></v-select></v-flex>
			</v-layout>
			<v-layout v-if="fileLink == 'departments'">
				<v-flex md2><p class="title text-xs-right pt-4 pb-0">Sub Link: </p></v-flex>
				<v-flex md10><v-select class="wog-select" :items="subTabs" label="Select Tab" v-model="fileSub"></v-select></v-flex>
			</v-layout>
			<v-layout row>
				<v-flex md12>
					<div class="text-xs-right" v-if="progressing">
						<v-progress-linear v-model="progress"></v-progress-linear>
						<p>{{progress}}/100</p>
					</div>
				</v-flex>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn class="blue--text darken-1" :disabled="progressing" flat @click.native="close">Close</v-btn>
			<v-btn class="blue--text darken-1" :disabled="actionDisabled" flat @click.native="actionClicked">Edit Slide</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import * as FB from 'firebase'

	export default {
		computed: {
			actionDisabled: function() {
				return this.fileIndex == -1;
			},
			increment: function() {
				return this.propertyChanged('url', this.fileIndex) ? 50 : 100;
			},
			slides: function() {
				var ret = [];
				for (var i=0, j=this.srcs.length; i<j; i++) {
					ret.push({text: 'Slide '+(i+1), value: i});
				}
				return ret;
			}
		},
		data() {
			return {
				fileIndex: -1,
				fileLink: '',
				fileName: '',
				fileStorage: null,
				fileUpload: null,
				fileUrl: '',
				fileSub: '',
				progress: 0,
				progressing: false,
				return: null,
				subTabs: [
					{text: 'none', value: ''},
					{text: 'Archery', value: 'depArchery'},
					{text: 'Clothing', value: 'depClothing'},
					{text: 'Firearms', value: 'depFirearms'},
					{text: 'Fishing', value: 'depFishing'},
					{text: 'Online Sales', value: 'depOnlineSales'},
					{text: 'Repair', value: 'depRepair'}
				],
				tabs: [
					{text: 'none', value: ''},
					{text: 'About', value: 'about'},
					{text: 'Contact', value: 'contact'},
					{text: 'Current Sales Ads', value: 'currentSalesAds'},
					{text: 'Departments', value: 'departments'},
					{text: 'Home', value: 'home'},
					{text: 'New Products', value: 'newProducts'}
				]
			}
		},
		methods: {
			actionClicked: function() {
				this.progressing = true;
				if (!this.propertyChanged('any', this.fileIndex)) {this.progressing = false;}
				else if (this.propertyChanged('url', this.fileIndex)) {this.uploadImage(this.fileIndex);}
				else {this.uploadStorage(this.fileIndex);}
			},
			clearDialog: function() {
				this.files = [];
				this.fileIndex = -1;
				this.fileLink = '';
				this.fileName = '';
				this.fileSub = '';
				this.fileUrl = '';
				this.return = null;
			},
			close: function(emitChanges) {
				if (emitChanges == true) {this.$emit('close', 'edit', this.return);}
				else {this.$emit('close')}
				this.clearDialog();
			},
			fileUrlChanged: function(newFile) {
				this.fileStorage = newFile;
				this.fileUrl = newFile.url;
			},
			filterFile: function(file) {
				var propNames = Object.getOwnPropertyNames(file);
				for (var i = 0, j = propNames.length; i<j; i++) {
					var propName = propNames[i];
					if (file[propName] === null) {
						delete file[propName];
					}
				}
				return file;
			},
			getNameFromPath: function(filePath) {
				var aPath = filePath.split('/');
				return aPath[aPath.length-1];
			},
			propertyChanged: function(prop, i) {
				if (i == -1) {return true;}
				else {
					switch(prop) {
						case 'any': return this.propertyChanged('link', i) || this.propertyChanged('name', i) ||
								this.propertyChanged('sub', i) || this.propertyChanged('url', i);
						case 'link': return typeof this.srcs[i].tabIndex == 'undefined' ? false : this.fileLink != this.srcs[i].tabIndex;
						case 'name': return this.fileName != this.getNameFromPath(this.srcs[i].img);
						case 'sub': return typeof this.srcs[i].subIndex == 'undefined' ? false : this.fileSub != this.srcs[i].subIndex;
						case 'url': return this.fileUrl != this.srcs[i].url;
					}
				}
			},
			uploadImage: function(index) {
				var storageRef = FB.storage().ref();
				this.fileUpload = storageRef.child(this.imgPath+this.fileName).put(this.fileStorage.storage);
				this.fileUpload.on('state_changed', snapshot => {
					this.progress += (snapshot.bytesTransferred/snapshot.totalBytes)*this.increment;
				}, error => {}, success => {this.uploadStorage(index);});
			},
			uploadStorage: function(index) {
				var databaseRef = FB.database().ref(), file = {};
				if (this.propertyChanged('link', index)) {file.tabIndex = this.fileLink;}
				if (this.propertyChanged('sub', index)) {file.subIndex = this.fileSub;}
				if (this.propertyChanged('url', index)) {file.url = this.fileUpload.snapshot.downloadURL;}
				databaseRef.child(this.location+'/'+(index)).update(file).then(success => {
					file.index = index;
					this.return = file;
					this.progress += this.increment
				}).then(error => {});
			}
		},
		props: {
			delay: {type: Number, default: 500},
			imgPath: String,
			location: String,
			srcs: Array
		},
		watch: {
			fileIndex: function(val) {
				if (typeof val == 'string') {this.fileIndex = -1;}
				else if (val > -1) {
					this.fileUrl = this.srcs[val].url;
					this.fileName = this.getNameFromPath(this.srcs[val].img);
					this.fileLink = this.srcs[val].tabIndex || null;
					this.fileSub = this.srcs[val].subIndex || null;
				}
			},
			progress: function(val) {
				if (val >= 100) {
					window.setTimeout(obj => {
						this.close(true);
						this.progress = 0;
						this.progressing = false;
					}, this.delay)
				}
			}
		}
	}
</script>

<style>
	.wog-img-header {
		height: 100px
	}

	.wog-img-upload {
		float: left;
		height: 100px;
		margin-right: 1em;
	}

	.wog-select > .input-group__details {
		display: none;
	}
</style>