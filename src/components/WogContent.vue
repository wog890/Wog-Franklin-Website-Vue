<template>
	<div>
		<v-tabs v-model="active" dark centered @input="tabInput">
			<v-tabs-bar slot="activators" class="secondary">
				<v-tabs-item v-for="tab in tabs" :key="tab.id" :href="'#' + tab.id" ripple>{{tab.name}}</v-tabs-item>
				<v-tabs-slider class="red"></v-tabs-slider>
			</v-tabs-bar>
			<v-tabs-content id="home"><wog-tab-home :editable="editable" @tabChange="changeTab"></wog-tab-home></v-tabs-content>
			<v-tabs-content id="departments"><wog-tab-departments :active="tabsDepartmentActive" :editable="editable"></wog-tab-departments></v-tabs-content>
			<v-tabs-content id="newProducts"><wog-tab-new-products :editable="editable"></wog-tab-new-products></v-tabs-content>
			<v-tabs-content id="currentSalesAds"><wog-tab-sales-ads :editable="editable"></wog-tab-sales-ads></v-tabs-content>
			<v-tabs-content id="about"><wog-tab-about :editable="editable"></wog-tab-about></v-tabs-content>
			<v-tabs-content id="contact"><wog-tab-contact :editable="editable"></wog-tab-contact></v-tabs-content>
			<v-tabs-content id="admin"><wog-tab-admin :editable="editable"></wog-tab-admin></v-tabs-content>
		</v-tabs>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				active: null,
				tabs: [
					{id: "home", name: "Home"},
					{id: "departments", name: "Departments"},
					{id: "newProducts", name: "New Products"},
					{id: "currentSalesAds", name: "Current Sales Ads"},
					{id: "about", name: "About"},
					{id: "contact", name: "Contact"},
					{id: "admin", name: "Admin"}
				],
				tabsDepartmentActive: null,
				tabsDepartmentFirstClick: false
			}
		},
		methods: {
			changeTab: function(tabIndex, subIndex) {
				this.active = tabIndex;
				this.tabsDepartmentFirstClick = true;
				if (tabIndex == 'departments') {
					this.tabsDepartmentActive = subIndex;
				}
			},
			tabInput: function(event) {
				if (event == "departments") {
					if (!this.tabsDepartmentFirstClick) {
						this.tabsDepartmentFirstClick = true;
						this.tabsDepartmentActive = 'depFirearms';
					}
				}
			}
		},
		props: {
			editable: {type: Boolean, default: false}
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