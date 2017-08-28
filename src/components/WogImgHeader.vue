<template>
	<v-layout>
		<v-flex md8 offset-md2 class="pa-3">
			<img class="responsive" v-if="typeof imgSrc === 'string'" :src="imgSrc">
			<wog-button-bar v-if="editable"	:btns="btns" :srcs="src" :location="locationPath" imgPath="imgs/tabs/" editType="image" @input="imageEdited"></wog-button-bar>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		computed: {
			btns: function() {
				if (typeof this.imgSrc == 'string' && this.imgSrc != '') {
					return 'edit,remove';
				}
				return 'add';
			},
			imgSrc: function() {
				return this.src.url;
			},
			locationPath: function() {
				return '/tabs/'+this.page+'/imgSrc';
			}
		},
		methods: {
			imageEdited: function(action, val) {
				this.$emit('input', action, val);
			}
		},
		props: {
			editable: {type: Boolean, default: false},
			page: String,
			src: Object
		}
	}
</script>