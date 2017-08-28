<template>
	<wog-page :editable="editable" :loading="loading" :page="page" :srcs="srcs"></wog-page>
</template>

<script>
	import MaxFire from '../maxapps/MaxFire.js'

	export default {
		created() {
			MaxFire.get('/tabs/'+this.page).then(oSrcs => {
				this.srcs = oSrcs;
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
				page: 'firearms',
				srcs: {imgSrc: {img: '', url: ''}, products: []}
			}
		},
		props: {
			editable: {type: Boolean, default: false},
		}
	}
</script>