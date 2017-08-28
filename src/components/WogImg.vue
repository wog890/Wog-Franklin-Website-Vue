<template>
	<img class="responsive" :class="{selected: selected}" :src="url" @click="clicked">
</template>

<script>
	export default {
		data() {
			return {
				selected: false
			}
		},
		methods: {
			clicked: function() {
				if (!this.disabled) {
					this.selected = !this.selected;
					this.$emit('selected', this.pos, this.selected);
				}
			}
		},
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			pos: [Number],
			url: [String]
		}
	}
</script>

<style>
	img.selected {
		border: 2px solid red;
	}
</style>