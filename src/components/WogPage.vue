<template>
	<div>
		<wog-img-header :src="imgSrc" :page="page" :editable="editable" @input="imageEdited"></wog-img-header>
		<v-layout class="pa-0" v-if="hasText">
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<p v-if="!editable" v-html="pText"></p>
				<v-text-field v-else class="mt-0 mb-0" v-model="inputText" label="Page Text" single-line multi-line @input="textChanged"></v-text-field>
				<v-alert success v-model="alertSuccess" transition="scale-transition">Text Saved!</v-alert>
				<v-alert error dismissible v-model="alertError" transition="scale-transition" @input="clearAlert">{{alertErrorMessage}}</v-alert>
				<wog-spinner v-if="savingText" :type="spinnerType"></wog-spinner>
				<v-btn v-if="editedText !== '' && editedText != text" primary @click.native="saveText">Save Text</v-btn>
			</v-flex>
		</v-layout>
		<v-layout class="pa-0" v-if="hasProducts">
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<v-layout v-for="(product, i) in products" :key="i" row wrap>
					<v-flex xs12>
						<h3 class="text-xs-center secondary header">{{product.name}}</h3>
					</v-flex>
					<v-flex md3 sm4 xs6 v-for="(brand, i) in product.brands" :key="i">
						<div>
							<a class="brand-link" v-if="typeof brand.src === 'string'" :href="brand.src">
								<p class='text-xs-center subheading'>{{brand.name}}</p>
							</a>
							<p class="text-xs-center subheading" v-else>{{brand.name}}</p>
						</div>
					</v-flex>
				</v-layout>
				<wog-button-bar v-if="editable" :btns="btns" :srcs="products" :location="locationPath" editType="products" @input="productsEdited"></wog-button-bar>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import * as FB from 'firebase'

	export default {
		computed: {
			btns: function() {
				if (typeof this.products == 'object' && this.products.length > 0) {
					return 'add,remove,edit';
				}
				return 'add';
			},
			imgSrc: function() {return this.changedImgSrc || this.srcs.imgSrc || {img: null, url: null}},
			inputText: function() {return this.editedText != '' ? this.editedText : (this.changedText != '' ? this.changedText : this.text);},
			locationPath: function() {return 'tabs/'+this.page+'/products'},
			products: function() {return this.srcs.products || {}},
			pText: function() {return this.changedText != '' ? this.changedText : this.text},
			text: function() {return this.srcs.text || ''}
		},
		data() {
			return {
				alertSuccess: false,
				alertError: false,
				alertErrorMessage: '',
				changedImgSrc: undefined,
				changedText: '',
				editedText: '',
				savingText: false,
				spinnerType: 'pacman'
			}
		},
		methods: {
			clearAlert: function() {
				this.alertError = false;
				this.alertSuccess = false;
			},
			getRandomSrc: function() {
				return this.imgSrc[Math.floor(Math.random()*this.imgSrc.length)];
			},
			hasProducts: function() {
				return typeof this.products !== "undefined" && this.products.length > 0
			},
			hasText: function() {
				return typeof this.text !== 'undefined' && this.text != '';
			},
			imageEdited: function(action, val) {
				switch(action) {
					case 'add': this.changedImgSrc = val; break;
					case 'edit': this.changedImgSrc = val; break;
					case 'remove': this.changedImgSrc = undefined; break;
				}
			},
			productsEdited: function(action, val) {},
			saveText: function() {
				if (this.editedText !== '' && this.editedText != this.text) {
					this.fSaveText = false;
					this.savingText = true;
					FB.database().ref('tabs/'+this.page).update({text: this.editedText}).then(success => {
						this.alertSuccess = true;
						this.changedText = this.editedText;
						this.editedText = '';
						setTimeout(this.clearAlert, 3000);
						this.savingText = false;
					}).catch(error => {
						console.log(error);
						this.alertErrorMessage = 'Test';
						this.alertError = true;
						setTimeout(this.clearAlert, 3000);
						this.savingText = false;
					});
				}
			},
			textChanged: function(val) {
				this.editedText = val;
			}
		},
		props: {
			editable: {type: Boolean, default: false},
			page: String,
			srcs: Object
		}
	}
</script>

<style>
	img.responsive {
		height: auto;
		width: 100%;
	}

	.brand-link {
		text-decoration: none;
		color: #004178;
	}

	.header {
		color: white;
	}
</style>