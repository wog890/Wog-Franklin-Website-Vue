<template>
	<wog-page :imgSrc="srcs" :products="products"></wog-page>
</template>

<script>
	export default {
		data: function() {
			return {
				products: [
					{name: "Rifles", brands: [
						{name: "Armalite", src: ""},
						{name: "ATI", src: ""},
						{name: "Browning", src: ""},
						{name: "Colt", src: ""},
						{name: "CVA", src: ""},
						{name: "CZ", src: ""},
						{name: "Delton", src: ""},
						{name: "DPMS", src: ""},
						{name: "Henry", src: "https://www.henryusa.com/henry-rifles-and-shotguns/"},
						{name: "Hi-Point", src: ""},
						{name: "Inland", src: ""},
						{name: "Kel-Tec", src: ""},
						{name: "Keystone Arms", src: ""},
						{name: "Kimber", src: "http://www.kimberamerica.com/rifles"},
						{name: "Marlin", src: ""},
						{name: "Mossberg", src: "http://www.mossberg.com/firearms/rifles/"},
						{name: "LWRC", src: ""},
						{name: "PTR", src: ""},
						{name: "PWS", src: "https://primaryweapons.com/store/product-category/firearms/"},
						{name: "Remington", src: "https://www.remington.com/rifles"},
						{name: "Rossi", src: ""},
						{name: "Ruger", src: "http://ruger.com/index.html"},
						{name: "Savage", src: ""},
						{name: "Smith & Wesson", src: "https://www.smith-wesson.com/rifles"},
						{name: "Tikka", src: "http://www.tikka.fi/rifles"},
						{name: "Thompson Center", src: "https://www.tcarms.com/firearms/"},
						{name: "Winchester", src: ""}
					]},
					{name: "Shotguns", brands: [
						{name: "ATI", src: ""},
						{name: "Benelli", src: "http://www.benelliusa.com/shotguns"},
						{name: "Beretta", src: "http://www.beretta.com/en-us/shotguns/"},
						{name: "Browning", src: ""},
						{name: "Cimarron", src: ""},
						{name: "CZ", src: ""},
						{name: "F&N", src: ""},
						{name: "Franchi", src: "http://www.franchiusa.com/"},
						{name: "H&R", src: ""},
						{name: "Hatsan", src: ""},
						{name: "Henry", src: "https://www.henryusa.com/henry-rifles-and-shotguns/"},
						{name: "Ithica", src: ""},
						{name: "Iver Johnson", src: ""},
						{name: "Kel-Tec", src: ""},
						{name: "Mossberg", src: "http://www.mossberg.com/firearms/shotguns/"},
						{name: "NEF", src: ""},
						{name: "Remington", src: "https://www.remington.com/shotguns"},
						{name: "Stoeger", src: ""},
						{name: "Winchester", src: ""}
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
						{name: "CVA", src: ""},
						{name: "Thompson Center", src: "https://www.tcarms.com/firearms/"}
					]}
				],
				srcs: '/src/imgs/glock_zev_17.jpg'
			}
		}
	}
</script>

<style scoped>
	
</style>