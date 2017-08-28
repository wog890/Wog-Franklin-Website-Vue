<template>
	<div>
		<v-tabs v-model="activeTab" dark centered>
			<v-tabs-bar slot="activators" class="grey darken-2">
				<v-tabs-item v-for="tab in tabs" :key="tab.id" :href="'#' + tab.id" ripple>{{tab.name}}</v-tabs-item>
				<v-tabs-slider class="red lighten-2"></v-tabs-slider>
			</v-tabs-bar>
			<v-tabs-content id="depArchery"><wog-tab-archery :editable="editable"></wog-tab-archery></v-tabs-content>
			<v-tabs-content id="depClothing"><wog-tab-clothing :editable="editable"></wog-tab-clothing></v-tabs-content>
			<v-tabs-content id="depFirearms"><wog-tab-firearms :editable="editable"></wog-tab-firearms></v-tabs-content>
			<v-tabs-content id="depFishing"><wog-tab-fishing :editable="editable"></wog-tab-fishing></v-tabs-content>
			<v-tabs-content id="depOnlineSales"><wog-tab-online-sales :editable="editable"></wog-tab-online-sales></v-tabs-content>
			<v-tabs-content id="depRepair"><wog-tab-repair :editable="editable"></wog-tab-repair></v-tabs-content>
		</v-tabs>
	</div>
</template>

<script>
	export default {
		computed: {
			activeTab: function() {
				return this.active;
			}
		},
		data() {
			return {
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
			active: {type: String, default: null},
			editable: {type: Boolean, default: false}
		}
	}
</script>

<style scoped>
	
</style>