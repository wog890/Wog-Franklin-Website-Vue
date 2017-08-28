<template>
	<div>
		<wog-img-header :src="src.imgSrc"></wog-img-header>
		<v-layout><v-flex md8 offset-md2 class="pl-3 pr-3 pb-3" v-html="src.text"></v-flex></v-layout>
		<v-layout>
			<v-flex md8 offset-md2 class='pa-3'>
				<v-layout>
					<v-flex md3 sm2 xs4 class="mr-4" v-for="(employee, i) in src.employees" :key="i">
						<img class="responsive" :src="employee.imgSrc.url">
						<p class="mb-0 text-xs-center title">{{employee.name}}</p>
						<p class="mb-0 text-xs-center subheading">{{employee.position}}</p>
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
			MaxFire.get('/tabs/about').then(oProducts => {
				this.src = oProducts
				this.loading = false;
			}).catch(oErr => {
				this.loading = false;
				this.errorMessage = 'Unable to load specials!';
				console.log(oErr.message);
			});
		},
		data() {
			return {
				src: {imgSrc: {img: '', url: ''}, text: ''}
			}
		}
	}
</script>

<style scoped>
	
</style>