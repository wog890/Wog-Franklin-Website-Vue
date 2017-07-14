<template>
	<div>
		<v-layout>
			<v-flex md6 offset-md3 class="pa-3">
				<v-card v-if="isImg" flat>
			        <v-card-media :src="imgSrc" contain height="400px"></v-card-media>
		      	</v-card>
		      	<div v-else>
		      		<p>Make less sucky carousel....or try that other standalone I found. Tired of fucking with image sizes. Until then, enjoy this picture of a glock.</p>
			      	<v-card-media src="/src/imgs/glock_zev_17.jpg" contain height="400px"></v-card-media>
		      	</div>
		      	<!-- <v-carousel v-else>
		      		<v-carousel-item v-for="(src, i) in imgSrc" :src="src" :key="i"></v-carousel-item>
				</v-carousel> -->
			</v-flex>
		</v-layout>
		<v-layout v-if="hasProducts">
			<v-flex md8 offset-md2 class="pa-3">
				<v-layout v-for="(product, i) in products" :key="i" row wrap>
					<v-flex xs12>
						<h3 class="text-xs-center">{{product.name}}</h3>
					</v-flex>
					<v-flex md3 sm4 xs6 v-for="(brand, i) in product.brands" :key="i">
						<a v-if="typeof brand.src === 'string'" :href="brand.src"><p class='text-xs-center subheading'>{{brand.name}}</p></a>
						<p class="text-xs-center subheading" v-else>{{brand.name}}</p>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {

			}
		},
		methods: {
			hasProducts: function() {
				return typeof this.products !== "undefined" && this.products.length > 0
			}
		},
		props: {
			imgSrc: [String, Array],// Source/s of images in carousel or main image tag.
			isImg: Boolean,// True if you want to have a single image as main header, false if you want to include a carousel.
			// Array containing the list of product brands. Include a src if you want to link to the brands website.
			// Format should be:
			//	[
			//		{name: "Crossbow Brands", brands: [
			//			{name: "Awesome Brand 1", src: "https://fakeurl.com"}
			//		]}
			//	]
			products: Array
		}
	}
</script>

<style>

</style>