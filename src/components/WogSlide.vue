<template>
	<div :class="allClasses">
		<img class="responsive" :src="src">
	</div>
</template>

<script>
	export default {
		computed: {
			allClasses: function() {
				return this.classes + ' wog-slide-container';
			}
		},
		data: function() {
			return {
			}
		},
		props: {
			classes: {
				type: String,
				default: ""
			},
			index: Number,
			link: String,
			src: String
		}
	}
</script>

<style>
	div .wog-slide-container {
		display: inline-block;
		display: none;
	}

	div .active {
		display: inline-block;
	}
</style>