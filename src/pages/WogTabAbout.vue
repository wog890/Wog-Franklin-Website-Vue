<template>
	<div>
		<wog-page :imgSrc="srcs"></wog-page>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<h3 class="text-xs-center secondary header">About</h3>
				<p class="subheading"><b>Buy, Sell, Trade, Hunt, Fish, Shoot, its what we do.</b></p>

				<p class="subheading">Established in 1962, we are here for all of your outdoor and firearm needs. Our knowledgeable and friendly staff are here to help whether you are looking to get that trophy buck, record bass, or just need a nice set of sunglasses. We have you covered!</p>
				<p class="subheading">We buy, sell, and trade firearms and related items. There is always someone on hand who can appraise your firearm or collection at all times. Whether you want to trade them, sell them, or are just curious about their value, swing on in and we'll help you out.</p>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex md8 offset-md2 class='pa-3'>
				<v-layout>
					<v-flex md3>
						<img class="responsive" src="/src/imgs/employees/aaron.jpg">
						<p class="mb-0 text-xs-center headline">Barbara Franklin</p>
						<p class="mb-0 text-xs-center title">President</p>
					</v-flex>
					<v-flex md3 offset-md1>
						<img class="responsive" src="/src/imgs/employees/nic.jpg">
						<p class="mb-0 text-xs-center headline">Mark Franklin</p>
						<p class="mb-0 text-xs-center title">Vice-President</p>
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
				srcs: '/src/imgs/outside1.jpg'
			}
		}
	}
</script>

<style scoped>
	
</style>