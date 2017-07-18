<template>
	<wog-page :imgSrc="srcs" :products="products"></wog-page>
</template>

<script>
	export default {
		data: function() {
			return {
				products: [
					{name: "Boots", brands: []},
					{name: "Jackets", brands: []},
					{name: "Hats", brands: []}
				],
				srcs: '/src/imgs/.jpg'
			}
		}
	}
</script>

<style scoped>
	
</style>