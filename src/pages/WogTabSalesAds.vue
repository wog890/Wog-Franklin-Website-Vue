<template>
	<div>
		<v-layout row wrap>
			<v-flex md10 offset-md1 class="pl-3 pt-3 pr-3">
				<h3 class="text-xs-center secondary header">Guns of the Week</h3>
				<img class="responsive" src="/src/imgs/sotw-629.jpg">
			</v-flex>
			<v-flex md10 offset-md1 class="pl-3 pt-3 pr-3">
				<h3 class="text-xs-center secondary header">Guns of the Month</h3>
				<img class="responsive" src="/src/imgs/msa_july.jpg">
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				category: "",
				email: "",
				name: "",
				select: ["Availability of Items", "General Questions", "Questions on Pricing"],
				srcs: '/src/imgs/franklin_swag.jpg',
				questions: ""
			}
		}
	}
</script>

<style>

</style>