<template>
	<wog-page :imgSrc="srcs" :products="products"></wog-page>
</template>

<script>
	export default {
		data: function() {
			return {
				products: [
					{name: "Rifles", brands: [
						{name: "Henry", src: "https://www.henryusa.com/henry-rifles-and-shotguns/"},
						{name: "Kimber", src: "http://www.kimberamerica.com/rifles"},
						{name: "Mossberg", src: "http://www.mossberg.com/firearms/rifles/"},
						{name: "PWS", src: "https://primaryweapons.com/store/product-category/firearms/"},
						{name: "Remington", src: "https://www.remington.com/rifles"},
						{name: "Ruger", src: "http://ruger.com/index.html"},
						{name: "Smith & Wesson", src: "https://www.smith-wesson.com/rifles"},
						{name: "Tikka", src: "http://www.tikka.fi/rifles"},
						{name: "Thompson Center", src: "https://www.tcarms.com/firearms/"}
					]},
					{name: "Shotguns", brands: [
						{name: "Benelli", src: "http://www.benelliusa.com/shotguns"},
						{name: "Beretta", src: "http://www.beretta.com/en-us/shotguns/"},
						{name: "Franchi", src: "http://www.franchiusa.com/"},
						{name: "Henry", src: "https://www.henryusa.com/henry-rifles-and-shotguns/"},
						{name: "Mossberg", src: "http://www.mossberg.com/firearms/shotguns/"},
						{name: "Remington", src: "https://www.remington.com/shotguns"}
					]},
					{name: "Handguns", brands: [
						{name: "Beretta", src: "http://www.beretta.com/en-us/pistols/?_ga=2.211910740.1945958181.1500030412-1638422340.1500030412"},
						{name: "Canik", src: "http://www.canikusa.com/"},
						{name: "FMK", src: "http://fmkfirearms.com/firearms/pistols/"},
						{name: "Glock", src: "https://us.glock.com/products/all"},
						{name: "Heckler & Koch", src: "http://hk-usa.com/product/pistols/"},
						{name: "Heizer", src: "https://heizerdefense.com/category/products/guns/"},
						{name: "Iver Johnson", src: "http://iverjohnsonarms.com/3001/index.html"},
						{name: "Kimber", src: "http://www.kimberamerica.com/pistols"},
						{name: "Remington", src: "https://www.remington.com/handguns"},
						{name: "Ruger", src: "http://ruger.com/index.html"},
						{name: "Sig Sauer", src: "https://www.sigsauer.com/products/firearms/pistols/"},
						{name: "Smith & Wesson", src: "https://www.smith-wesson.com/"},
						{name: "Springfield", src: "http://www.springfield-armory.com/"},
						{name: "Taurus", src: "http://www.taurususa.com/"}
					]},
					{name: "Black Powder", brands: [
						{name: "Thompson Center", src: "https://www.tcarms.com/firearms/"}
					]}
				],
				srcs: [
					'/src/imgs/glock_zev_17.jpg',
					'/src/imgs/pws_swag.jpg'
				]
			}
		}
	}
</script>

<style scoped>
	
</style>