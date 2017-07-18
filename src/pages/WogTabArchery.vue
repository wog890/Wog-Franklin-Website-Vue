<template>
	<wog-page :imgSrc="srcs" :isImg="true" :products="products"></wog-page>
</template>

<script>
	export default {
		data: function() {
			return {
				products: [
					{name: "Bows", brands: []},
					{name: "Crossbows", brands: []},
					{name: "Misc", brands: []}
				],
				srcs: '/src/imgs/archery.jpg'
			}
		}
	}
</script>

<style scoped>
	
</style>