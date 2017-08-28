<template>
	<v-card>
		<v-card-text class="pb-0">
			<v-layout><v-flex md12><p class="title">Image: </p></v-flex></v-layout>
			<v-layout><v-flex md12><wog-upload :useImage="true" :defaultImg="fileUrl" @input="fileUrlChanged"></wog-upload></v-flex></v-layout>
			<v-layout>
				<v-flex sm2><p class="title pt-4 pb-0">Name: </p></v-flex>
				<v-flex sm10><v-text-field class="mb-0" label="required" v-model="src.img" disabled single-line></v-text-field></v-flex>
			</v-layout>
			<v-layout row>
				<v-flex md12>
					<div class="text-xs-right" v-if="progressing">
						<v-progress-linear v-model="progress"></v-progress-linear>
						<p>{{progress | integer}}/100</p>
					</div>
				</v-flex>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn class="blue--text darken-1" :disabled="progressing" flat @click.native="close">Close</v-btn>
			<v-btn class="blue--text darken-1" :disabled="actionDisabled" flat @click.native="actionClicked">Edit Image</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import * as FB from 'firebase'

	export default {
		computed: {
			actionDisabled: function() {
				return this.fileName == '';
			},
			increment: function() {
				return 100;
			}
		},
		data() {
			return {
				fileName: '',
				fileStorage: null,
				fileUpload: null,
				fileUrl: '',
				progress: 0,
				progressing: false,
				return: null
			}
		},
		filters: {
			integer: function(val) {
				return Math.round(val);
			}
		},
		methods: {
			actionClicked: function() {
				this.progressing = true;
				this.uploadImage();
			},
			clearDialog: function() {
				this.fileName = '';
				this.fileUrl = '';
				this.return = [];
			},
			close: function(emitChanges) {
				if (emitChanges == true) {this.$emit('close', 'edit', this.return);}
				else {this.$emit('close')}
				this.clearDialog();
			},
			fileUrlChanged: function(newFile) {
				this.fileStorage = newFile;
				this.fileUrl = newFile.url;
				this.fileName = newFile.name;
			},
			uploadImage: function() {
				var storageRef = FB.storage().ref();
				this.return = {img: this.src.img, url: this.fileUrl};
				this.fileUpload = storageRef.child(this.src.img).put(this.fileStorage.storage);
				this.fileUpload.on('state_changed', snapshot => {
					this.progress = snapshot.bytesTransferred/snapshot.totalBytes*this.increment;
				}, error => {}, success => {});
			}
		},
		props: {
			delay: {type: Number, default: 500},
			imgPath: String,
			location: String,
			src: Object
		},
		watch: {
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