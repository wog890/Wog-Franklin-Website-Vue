<template>
	<div>
		<v-tabs dark centered>
			<v-tabs-bar slot="activators" class="secondary">
				<v-tabs-item v-for="tab in tabs" :key="tab.id" :href="'#' + tab.id" ripple>
					{{tab.name}}
				</v-tabs-item>
				<v-tabs-slider class="red"></v-tabs-slider>
			</v-tabs-bar>
			<v-tabs-content id="home"><wog-tab-home></wog-tab-home></v-tabs-content>
			<v-tabs-content id="departments" transition="slide-y-transition" reverse-transition="slide-y-reverse-transition">
				<wog-tab-departments></wog-tab-departments>
			</v-tabs-content>
		</v-tabs>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				tabs: [
					{id: "home", name: "Home"},
					{id: "departments", name: "Departments"},
					{id: "newProducts", name: "New Products"},
					{id: "currentSalesAds", name: "Current Sales Ads"},
					{id: "about", name: "About"},
					{id: "contact", name: "Contact"},
					{id: "admin", name: "Admin"}
				]
			}
		}
	}
</script>

<style>
	.tabs__items {
		border-bottom: 0px;
		border-left: 0px;
		border-right: 0px;
	}
</style>