<template>
	<div>
		<wog-img-header :src="src.imgSrc"></wog-img-header>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3">
				<h3 class="text-xs-center secondary header">Contact</h3>
				<p class="subheading" v-html="src.text"></p>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-4 pb-0">Name:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field class="mb-0" id="inpName" v-model="name" name="name" label="required" single-line></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-2 pb-0">Email:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field class="mt-0 mb-0" id="inpEmail" v-model="email" name="email" label="required" single-line></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-2 pb-0">Questions, Comments, Concerns:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field class="mt-0 mb-0" id="inpQuestions" v-model="questions" name="questions" label="required"
								single-line multi-line></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-2 pb-0">Category:</p>
					</v-flex>
					<v-flex md10>
						<v-select class="mt-0 mb-0" :items="select" v-model="category" label="Select One" segmented></v-select>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md10 offset-md2>
						<v-alert success v-model="alertSuccess" transition="scale-transition">
							Thank you {{name}}! We will get back to you promptly.
						</v-alert>
						<v-alert error dismissible v-model="alertError" transition="scale-transition" @input="clearAlert">
							Please provide a {{errors}}.
						</v-alert>
						<v-btn primary @click.native="sendEmail">Send</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import MaxFire from '../maxapps/MaxFire.js'

	export default {
		created() {
			MaxFire.get('/tabs/contact').then(oProducts => {
				this.src = oProducts
				this.loading = false;
			}).catch(oErr => {
				this.loading = false;
				this.errorMessage = 'Unable to load specials!';
				console.log(oErr.message);
			});
		},
		computed: {
			alertError: function() {
				if (this.errors == '' || !this.clickFlag) {
					return false;
				}
				return true;
			},
			errors: function() {
				var err = '';
				var errs = [];
				if (this.name == '') {
					errs.push('name');
				}
				if (this.email == '') {
					errs.push('email');
				}
				else {
					var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
					if (reg.test(this.email) == false) {
						errs.push('valid email');
					}
				}
				if (this.category == '') {
					errs.push('category');
				}
				if (this.questions == '') {
					errs.push('question');
				}
				if (errs.length > 1) {
					errs[errs.length-1] = 'and ' + errs[errs.length-1];
				}
				for (var i=0, j=errs.length; i<j; i++) {
					err += errs[i] + ', ';
				}
				return err.slice(0, -2);
			}
		},
		data: function() {
			return {
				alertSuccess: false,
				category: "",
				email: "",
				clickFlag: false,
				name: "",
				select: ["Availability of Items", "General Questions", "Questions on Pricing"],
				src: {imgSrc: {img: '', url: ''}, text: ''},
				questions: ""
			}
		},
		methods: {
			clearAlert: function() {
				this.alertSuccess = false;
				this.clickFlag = false;
			},
			clearForm: function() {
				this.name = '';
				this.email = '';
				this.category = '';
				this.questions = '';
			},
			sendEmail: function() {
				var self = this
				if (this.errors == '') {
					this.alertSuccess = true;
					this.clickFlag = false;
					setTimeout(this.clearAlert, 3000);
					this.clearForm();
				}
				else {
					this.clickFlag = true;
				}
			}
		}
	}
</script>

<style>

</style>