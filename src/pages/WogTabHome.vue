<template>
	<div>
		<v-layout class="pa-3">
			<v-flex md-12>
				<v-carousel>
					<v-carousel-item src="/src/imgs/sotw-629.jpg" id="sotw"></v-carousel-item>
					<v-carousel-item src="/src/imgs/ebaygun1.jpg" id="ebaygun1"></v-carousel-item>
					<v-carousel-item src="/src/imgs/outside1.jpg" id="outside1"></v-carousel-item>
					<v-carousel-item src="/src/imgs/ammowall.jpg" id="ammowall"></v-carousel-item>
				</v-carousel>
			</v-flex>
		</v-layout>
		<v-layout class="pa-3" row wrap>
			<v-flex md-4>
				<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFranklinGunShop%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=278723485929776" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
			</v-flex>
			<v-flex md-4>
				<iframe class="wog-iframe" scrolling="no" src="https://feed.mikle.com/widget/v2/36473/"></iframe>
			</v-flex>
			<v-flex md-4>
				<iframe class="wog-iframe" scrolling="no" src="https://feed.mikle.com/widget/v2/36472/"></iframe>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {

			}
		}
	}
</script>

<style>
	.wog-iframe {
		border: 0;
		height: 100%;
		width: 100%;
	}
</style>