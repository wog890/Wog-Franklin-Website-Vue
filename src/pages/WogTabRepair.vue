<template>
	<wog-page :imgSrc="srcs" :products="products"></wog-page>
</template>

<script>
	export default {
		data: function() {
			return {
				products: [
					{name: "Repair", brands: []}
				],
				srcs: '/src/imgs/repair.jpg'
			}
		}
	}
</script>

<style scoped>
	
</style>