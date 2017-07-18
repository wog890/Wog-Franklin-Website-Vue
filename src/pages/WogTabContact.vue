<template>
	<div>
		<wog-page :imgSrc="srcs"></wog-page>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3">
				<h3 class="text-xs-center secondary header">Contact</h3>
				<p class="subheading">For immediate inquiries, give us a call at <b>(706) 543-7803</b>. If you have a question after normal business hours, please fill out the form below and we will reply as soon as possible.</p>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-4 pb-0">Name:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field id="inpName" v-model="name" name="name" label="required" single-line></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-4 pb-0">Email:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field id="inpEmail" v-model="email" name="email" label="required" single-line></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-4 pb-0">Questions, Comments, Concerns:</p>
					</v-flex>
					<v-flex md10>
						<v-text-field id="inpQuestions" v-model="questions" name="questions" label="required" single-line multi-line></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md2>
						<p class="title text-xs-right pt-4 pb-0">Category:</p>
					</v-flex>
					<v-flex md10>
						<v-select :items="select" v-model="category" label="Select One" segmented></v-select>
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
	export default {
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
				srcs: '/src/imgs/franklin_swag.jpg',
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