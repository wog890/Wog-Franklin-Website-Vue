<template>
	<div>
		<v-layout>
			<v-flex md8 offset-md2 class="pa-3">
				<img class="responsive" v-if="typeof imgSrc === 'string'" :src="imgSrc">
				<!-- <img class="responsive" v-else :src="getRandomSrc()"> -->
				<wog-carousel v-else :slides="imgSrc"></wog-carousel>
			</v-flex>
		</v-layout>
		<v-layout clas="pa-0" v-if="hasProducts">
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<v-layout v-for="(product, i) in products" :key="i" row wrap>
					<v-flex xs12>
						<h3 class="text-xs-center secondary header">{{product.name}}</h3>
					</v-flex>
					<v-flex md3 sm4 xs6 v-for="(brand, i) in product.brands" :key="i">
						<div>
							<a class="brand-link" v-if="typeof brand.src === 'string'" :href="brand.src">
								<p class='text-xs-center subheading'>{{brand.name}}</p>
							</a>
							<p class="text-xs-center subheading" v-else>{{brand.name}}</p>
						</div>
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
			getRandomSrc: function() {
				return this.imgSrc[Math.floor(Math.random()*this.imgSrc.length)];
			},
			hasProducts: function() {
				return typeof this.products !== "undefined" && this.products.length > 0
			}
		},
		props: {
			imgSrc: [String, Array],// Source/s of images in carousel or main image tag.
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
	img.responsive {
		height: auto;
		width: 100%;
	}

	.brand-link {
		text-decoration: none;
		color: #004178;
	}

	.header {
		color: white;
	}
</style>