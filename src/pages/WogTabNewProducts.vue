<template>
	<div>
		<wog-page :imgSrc="srcs"></wog-page>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<h3 class="text-xs-center secondary header">Disclaimer</h3>
				<p>We purchase used and new products every day. Check here to see what has come in recently. All used products will be added along with any abnormal new merchandise. Inventory is not guaranteed after posting, please call us at <b>(706) 543-7803</b> to check availability.</p>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<h3 class="text-xs-center secondary header">New Products</h3>
				<v-layout>
					<v-flex md6 offset-md6>
						<v-text-field append-icon="search" label="Search" v-model="search" single-line hide-details></v-text-field>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-flex md12>
						<template>
							<v-data-table :headers="headers" :items="items" :search="search" single-line>
								<template slot="items" scope="props">
									<td>{{props.item.date}}</td>
									<td class="text-xs-right">{{props.item.name}}</td>
									<td class="text-xs-right">{{props.item.type}}</td>
									<td class="text-xs-right">${{props.item.price}}</td>
									<td class="text-xs-right">{{props.item.condition}}</td>
								</template>
							</v-data-table>
						</template>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				headers: [
					{text: "Date Added", value: "date", align: "left"},
					{text: "Product Name", value: "name", sortable: false},
					{text: "Type", value: "type"},
					{text: "Price", value: "price"},
					{text: "New/Used", value: "condition"}
				],
				items: [
					{date: "07/17/17", name: "Mossberg 500", type: "Shotgun", price: "249.99", condition: "Used"},
					{date: "07/15/17", name: "Remington 870 Wingmaster", type: "Shotgun", price: "699.99", condition: "New"},
					{date: "07/14/17", name: "Galco Holsters", type: 'Accessories', price: "29.99-$89.99", condition: "New"}
				],
				pagination: {},
				search: '',
				srcs: '/src/imgs/ars.jpg'
			}
		},
		methods: {
			clearSearch: function() {

			}
		}
	}
</script>

<style scoped>
	
</style>