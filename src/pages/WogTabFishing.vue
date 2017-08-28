<template>
	<wog-page :editable="editable" :loading="loading" :page="page" :srcs="srcs" @input="pageEdited"></wog-page>
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
				page: 'fishing',
				srcs: {imgSrc: {img: '', url: ''}, products: []}
			}
		},
		methods: {
			pageEdited: function(type, action, val) {
				switch(type) {
					case 'image':
						switch(action) {
							case 'add': console.log(val); this.srcs.imgSrc = val; break;
						}
					break;
				}
			}
		},
		props: {
			editable: {type: Boolean, default: false},
		}
	}
</script>