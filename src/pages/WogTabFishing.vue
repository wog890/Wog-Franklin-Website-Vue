<template>
	<wog-page :imgSrc="srcs" :isImg="true" :products="products"></wog-page>
</template>

<script>
	export default {
		data: function() {
			return {
				products: [
					{name: "Fishing", brands: [
						{name: "Abu Garcia", src: "http://www.abugarcia.com/"},
						{name: "Berkley", src: "http://www.berkley-fishing.com/"},
						{name: "Bomber", src: "http://www.bomberlures.com/"},
						{name: "Booyah"},
						{name: "Buckeye Lures"},
						{name: "Creme", src: "http://www.cremelure.com/"},
						{name: "DBK Custom Lures"},
						{name: "Daiwa", src: "http://www.daiwa.com/"},
						{name: "Driftmaster", src: "http://www.driftmaster.com/"},
						{name: "Duckett"},
						{name: "Eagle Claw", src: "https://www.eagleclaw.com/"},
						{name: "Falcon", src: "http://www.falconrods.com/"},
						{name: "Gamakatsu", src: "http://www.gamakatsu.com/"},
						{name: "Hal Fly"},
						{name: "Hilderbrandt"},
						{name: "Koppers", src: "http://www.livetargetlures.com/"},
						{name: "Lucky Craft", src: "http://www.luckycraft.com/luckycrafthome/default.htm"},
						{name: "Mustad", src: "http://www.mustad.no/"},
						{name: "Net Bait"},
						{name: "P-Line", src: "http://www.p-line.com/"},
						{name: "Penn", src: "http://www.pennfishing.com/"},
						{name: "PFlueger", src: "http://www.pfluegerfishing.com/"},
						{name: "Quantum", src: "http://www.quantumfishing.com/"},
						{name: "Rapala", src: "http://www.rapala.com/"},
						{name: "Rat-L-Trap", src: "http://www.rat-l-trap.com/"},
						{name: "Rebel Lures", src: "http://www.rebellures.com/"},
						{name: "Shakespearre", src: "http://www.shakespeare-fishing.com/"},
						{name: "Shimano", src: "http://fish.shimano.com/"},
						{name: "Smithwick", src: "http://www.smithwicklures.com/"},
						{name: "Snag Proof", src: "https://www.snagproof.com/"},
						{name: "Lews"},
						{name: "Spro", src: "http://www.spro.com/"},
						{name: "Gambler"},
						{name: "Stren", src: "http://www.stren.com/"},
						{name: "River 2 Sea"},
						{name: "Wack-em"},
						{name: "Wright & McGill", src: "http://www.wright-mcgill.com/"},
						{name: "Xcalibur"},
						{name: "Zebco", src: "http://www.zebco.com/"},
						{name: "Zoom"}
					]}
				],
				srcs: '/src/imgs/fishing.jpg'
			}
		}
	}
</script>

<style scoped>
	
</style>