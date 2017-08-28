<template>
	<img class="responsive" :src="src">
</template>

<script>
	import * as FB from 'firebase'

	export default {
		props: {src: String},
	}
</script>