<template>
	<div>
		<v-layout row wrap>
			<v-flex v-for="(sale, i) in src.sales" :key="i" xs10 offset-xs1 class="pl-3 pt-3 pr-3">
				<h3 class="text-xs-center secondary header">{{sale.name}}</h3>
				<img class="responsive" :src="sale.imgSrc.url">
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import MaxFire from '../maxapps/MaxFire.js'

	export default {
		created() {
			MaxFire.get('/tabs/'+this.page).then(oSrcs => {
				this.src = oSrcs;
				this.loading = false;
			}).catch(oErr => {
				this.loading = false;
				this.errorMessage = 'Unable to load page';
				console.log(oErr);
			});
		},
		data() {
			return {
				errorMessage: '',
				loading: true,
				page: 'salesAds',
				src: {sales: []}
			}
		},
		props: {
			editable: {type: Boolean, default: false}
		}
	}
</script>

<style>

</style>