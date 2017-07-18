<template>
	<div>
		<wog-page :imgSrc="srcs"></wog-page>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3">
				<h3 class="text-xs-center secondary header">Admin Login</h3>
			</v-flex>
		</v-layout>
		<v-layout>
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
								:type="passwordVisible ? 'password' : 'text'">
						</v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md10 offset-md2>
						<v-alert success v-model="alertSuccess" transition="scale-transition">
							Logged In.
						</v-alert>
						<v-alert error dismissible v-model="alertError" transition="scale-transition" @input="clearAlert">
							{{errors}}
						</v-alert>
						<v-btn primary @click.native="logIn">Log In</v-btn>
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
			}
		},
		data: function() {
			return {
				alertSuccess: false,
				clickFlag: false,
				password: '',
				passwordVisible: true,
				srcs: '/src/imgs/store.jpg',
				username: ''
			}
		},
		methods: {
			clearAlert: function() {
				this.alertSuccess = false;
				this.clickFlag = false;
			},
			clearForm: function() {
				this.username = '';
				this.password = '';
			},
			logIn: function() {
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