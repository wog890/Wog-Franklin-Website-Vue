<template>
	<div>
		<v-layout row>
			<v-flex md12>
				<div class="divider secondary"></div>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex md6>
				<p class="ma-3">&copy 2017</p>
			</v-flex>
			<v-flex md6>
				<p class="ma-3 text-xs-right">Footer Placeholder</p>
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

<style scoped>
	.divider {
		height: 2px;
	}
</style>