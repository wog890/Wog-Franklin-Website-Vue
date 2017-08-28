<template>
	<div>
		<img class="wog-file-upload-image" v-if="visible" :src="getSrc" @dragover.prevent @drop="uploaded" @click="openFileExplorer">
		<button class="wog-file-upload text-xs-center ma-0" v-else @dragover.prevent @drop="uploaded" @click="openFileExplorer">
			<v-icon large>file_upload</v-icon>
		</button>
		<input type="file" style="display: none;" :multiple="multiple">
	</div>
</template>

<script>
	export default {
		computed: {
			getSrc: function() {
				return typeof this.defaultImg == 'string' ? this.defaultImg : '';
			}
		},
		data() {
			return {
				visible: false
			}
		},
		methods: {
			getFiles: function(files) {
				var self = this;
				for (var i=0, j=files.length; i<j; i++) {
					var file = files[i];
					var imageType = /image.*/;
					if (!file.type.match(imageType)) {continue;}
					var img = document.createElement('img');
					var reader = new FileReader();
					var upload = {name: file.name, url: null, storage: file};
					img.classList.add('obj');
					img.file = file;
					reader.onload = (function(aImg, upload) {
						return function(e) {
							upload.url = e.target.result;
							self.$emit('input', upload);
							if (!self.multiple && self.useImage) {self.visible = true}
						}
					})(img, upload);
					reader.readAsDataURL(file);
				}
			},
			openFileExplorer: function() {},
			uploaded: function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (this.multiple) {this.getFiles(e.dataTransfer.files);}
				else {this.getFiles([e.dataTransfer.files[0]]);}
			}
		},
		props: {
			defaultImg: String,
			multiple: {type: Boolean, default: false},
			useImage: Boolean
		},
		watch: {
			defaultImg: function(val) {
				if (val == '') {
					this.visible = false;
				}
			},
			useImage: function(val) {
				if (val) {
					this.visible = this.getSrc != '';
				}
			}
		}
	}
</script>

<style>
	.wog-file-upload {
		border: 2px solid gray;
		height: 150px;
		width: 150px;
	}

	.wog-file-upload-image {
		height: 150px;
	}
</style>