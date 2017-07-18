<template>
	<wog-page :imgSrc="srcs" :isImg="true" :products="products"></wog-page>
</template>

<script>
	export default {
		data: function() {
			return {
				products: [
					{name: "Ebay", brands: []},
					{name: "Gun Broker", brands: []}
				],
				srcs: '/src/imgs/ebaygun1.jpg'
			}
		}
	}
</script>

<style scoped>
	
</style>