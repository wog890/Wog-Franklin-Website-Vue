<template>
	<div>
		<v-tabs v-model="active" dark centered>
			<v-tabs-bar slot="activators" class="grey darken-2">
				<v-tabs-item v-for="tab in tabs" :key="tab.id" :href="'#' + tab.id" ripple>
					{{tab.name}}
				</v-tabs-item>
				<v-tabs-slider class="red lighten-2"></v-tabs-slider>
			</v-tabs-bar>
			<v-tabs-content id="depArchery"><wog-tab-archery></wog-tab-archery></v-tabs-content>
			<v-tabs-content id="depClothing"><wog-tab-clothing></wog-tab-clothing></v-tabs-content>
			<v-tabs-content id="depFirearms"><wog-tab-firearms></wog-tab-firearms></v-tabs-content>
			<v-tabs-content id="depFishing"><wog-tab-fishing></wog-tab-fishing></v-tabs-content>
			<v-tabs-content id="depOnlineSales"><wog-tab-online-sales></wog-tab-online-sales></v-tabs-content>
			<v-tabs-content id="depRepair"><wog-tab-repair></wog-tab-repair></v-tabs-content>
		</v-tabs>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				active: null,
				tabs: [
					{id: "depArchery", name: "Archery"},
					{id: "depClothing", name: "Clothing"},
					{id: "depFirearms", name: "Firearms"},
					{id: "depFishing", name: "Fishing"},
					{id: "depOnlineSales", name: "Online Sales"},
					{id: "depRepair", name: "Repair"}
				]
			}
		},
		props: {
			firstClick: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			firstClick: function() {
				this.active = 'depFirearms';
			}
		}
	}
</script>

<style scoped>
	
</style>