<template>
	<v-card>
		<v-card-text class="pb-0">
			<v-stepper non-linear>
				<v-stepper-header>
					<v-divider></v-divider>
					<v-stepper-step step="1" editable>Upload Photos</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="2" editable>Add Metadata</v-stepper-step>
					<v-divider></v-divider>
				</v-stepper-header>
				<v-stepper-content step="1">
					<v-layout row pb-1 v-for="(file, i) in files" :key="i">
						<v-flex xs12>
							<img class="wog-img-upload" :src="file.url">
							<v-chip label style="margin-top: 35px;">
								{{file.name}}
								<v-icon style="padding-left: .2em;" @click="removeFile(i)">remove_circle</v-icon>
							</v-chip>
						</v-flex>
					</v-layout>
					<wog-upload class="mt-2" multiple @input="filesChanged"></wog-upload>
				</v-stepper-content>
				<v-stepper-content step="2">
					<v-layout v-if="fileIndex > -1">
						<v-flex md10 offset-md2><img class="wog-img-header" :src="fileUrl"></v-flex>
					</v-layout>
					<v-layout>
						<v-flex md2><p class="title text-xs-right pt-4 pb-0">Slide: </p></v-flex>
						<v-flex md10><v-select :items="slides" label="Select a Slide" v-model="fileIndex"></v-select></v-flex>
					</v-layout>
					<v-layout v-if="fileIndex > -1">
						<v-flex md2><p class="title text-xs-right pt-4 pb-0">Name: </p></v-flex>
						<v-flex md10><v-text-field class="mb-0" label="required" v-model="fileName" single-line></v-text-field></v-flex>
					</v-layout>
					<v-layout v-if="fileName != ''">
						<v-flex md2><p class="title text-xs-right pt-4 pb-0">Link To: </p></v-flex>
						<v-flex md10><v-select :items="tabs" label="Select Tab" v-model="fileLink"></v-select></v-flex>
					</v-layout>
					<v-layout v-if="fileLink == 'departments'">
						<v-flex md2><p class="title text-xs-right pt-4 pb-0">Sub Link: </p></v-flex>
						<v-flex md10><v-select :items="subTabs" label="Select Tab" v-model="fileSub"></v-select></v-flex>
					</v-layout>
				</v-stepper-content>
			</v-stepper>
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
			<v-btn class="blue--text darken-1" :disabled="actionDisabled" flat @click.native="actionClicked">Add Slides</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import * as FB from 'firebase'

	export default {
		computed: {
			actionDisabled: function() {
				return this.files.length == 0;
			},
			increment: function() {
				return 1/(this.files.length*2)*100;
			},
			slides: function() {
				var ret = [];
				for (var i=0, j=this.files.length; i<j; i++) {
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
				fileUrl: '',
				files: [],
				fileSub: '',
				progress: 0,
				progressing: false,
				return: [],
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
				this.uploadImage(0);
			},
			clearDialog: function() {
				this.files = [];
				this.fileIndex = -1;
				this.fileLink = '';
				this.fileName = '';
				this.fileSub = '';
				this.fileUrl = '';
				this.return = [];
			},
			close: function(emitChanges) {
				if (emitChanges == true) {this.$emit('close', 'add', this.return);}
				else {this.$emit('close')}
				this.clearDialog();
			},
			filesChanged: function(newFiles) {
				this.files.push(newFiles);
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
			removeFile: function(index) {
				this.files.splice(index, 1);
			},
			uploadImage: function(index) {
				var storageRef = FB.storage().ref();
				this.files[index].upload = storageRef.child(this.imgPath+this.files[index].name).put(this.files[index].storage);
				this.files[index].upload.on('state_changed', snapshot => {
					this.progress += (snapshot.bytesTransferred/snapshot.totalBytes)*this.increment;
				}, error => {}, success => {
					this.uploadStorage(index);
				});
			},
			uploadStorage: function(index) {
				var databaseRef = FB.database().ref();
				var file = {
					img: this.imgPath+this.files[index].name,
					selected: false,
					tabIndex: this.files[index].link || null,
					subIndex: this.files[index].sub || null,
					url: this.files[index].upload.snapshot.downloadURL
				};
				this.filterFile(file);
				databaseRef.child(this.location+'/'+(this.srcs.length+index)).set(file).then(success => {
					this.return.push(file);
					this.progress += this.increment;
					if (index+1 < this.files.length) {this.uploadImage(index+1);}
				}).catch(error => {});
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
					this.fileUrl = this.files[val].url;
					this.fileName = this.files[val].name;
					this.fileLink = this.files[val].link;
					this.fileSub = this.files[val].sub;
				}
			},
			fileLink: function(val) {
				if (this.fileIndex > -1) {this.files[this.fileIndex].link = val;}
			},
			fileName: function(val) {
				if (this.fileIndex > -1) {this.files[this.fileIndex].name = val;}
			},
			fileSub: function(val) {
				if (this.fileIndex > -1) {this.files[this.fileIndex].sub = val;}
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
</style>