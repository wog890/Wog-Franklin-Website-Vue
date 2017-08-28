<template>
	<v-card>
		<v-card-text class="pb-0">
			<v-layout>
				<v-flex sm3><p class="title text-xs-right pt-4 pb-0">Add Product: </p></v-flex>
				<v-flex sm9><v-text-field class="mb-0" label="Product Name" v-model="addedProduct" single-line @keyup.native.enter="addProduct"></v-text-field></v-flex>
			</v-layout>
			<template>
				<!-- <v-expansion-panel>
					<v-expansion-panel-content v-for="(product, i) in products" :key="i">
						<div slot="header">product.name</div>
					</v-expansion-panel-content>
				</v-expansion-panel> -->
				<!-- <v-layout>
					<v-flex sm12>
						<v-data-table class="elevation-1" :headers="headers(product)" :items="product.brands" hide-actions>
							<template slot="headers" scope="props">
								<tr class="secondary">
									<th>
										<v-checkbox></v-checkbox>
									</th>
									<th class="text-xs-left" style="color: white;">{{props.headers[0].text}}</th>
									<th class="text-xs-left" style="color: white;">{{props.headers[1].text}}</th>
								</tr>
							</template>
							<template slot="items" scope="props">
								<td></td>
								<td><v-text-field class="mb-0" label="Brand Name" v-model="props.item.name" single-line></v-text-field></td>
								<td><v-text-field class="mb-0" label="html link" v-model="props.item.src" single-line></v-text-field></td>
							</template>
						</v-data-table>
					</v-flex>
				</v-layout> -->
			</template>
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
			<v-btn class="blue--text darken-1" :disabled="actionDisabled" flat @click.native="actionClicked">Add Image</v-btn>
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
				return 50;
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
				addedProduct: '',
				items: [
					{brand: 'Test 1'},
					{brand: 'Test 2'}
				],
				productIndex: -1,
				products: {},
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
			addProduct: function(val) {
				var i = this.products.length + 1 || 0;
				this.products.push({name: this.addedProduct})
				this.addedProduct = '';
			},
			clearDialog: function() {
				this.fileName = '';
				this.fileUrl = '';
				this.return = [];
			},
			close: function(emitChanges) {
				if (emitChanges == true) {this.$emit('close', 'add', this.return);}
				else {this.$emit('close')}
				this.clearDialog();
			},
			fileUrlChanged: function(newFile) {
				this.fileStorage = newFile;
				this.fileUrl = newFile.url;
				this.fileName = newFile.name;
			},
			headers: function(i) {
				return [
					{text: i.name, align: 'left', sortable: false},
					{text: 'Brand', align: 'left', value: 'brand', sortable: false},
					{text: 'Link', align: 'left', value: 'link', sortable: false}
				]
			},
			uploadImage: function() {
				var storageRef = FB.storage().ref();
				this.fileUpload = storageRef.child(this.imgPath+this.fileName).put(this.fileStorage.storage);
				this.fileUpload.on('state_changed', snapshot => {
					this.progress = snapshot.bytesTransferred/snapshot.totalBytes*this.increment;
				}, error => {}, success => {
					this.uploadStorage();
				});
			},
			uploadStorage: function() {
				var databaseRef = FB.database().ref();
				var file = {img: this.imgPath+this.fileName, url: this.fileUpload.snapshot.downloadURL};
				databaseRef.child(this.location).set(file).then(success => {
					this.return = file;
					this.progress += this.increment;
				}).catch(error => {});
			}
		},
		props: {
			delay: {type: Number, default: 500},
			location: String,
			src: Array
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
			},
			src: function(val) {
				if (val) {
					this.products = val;
				}
			}
		}
	}
</script>