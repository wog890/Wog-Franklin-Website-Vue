<template>
	<div>
		<wog-page :imgSrc="srcs"></wog-page>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<h3 class="text-xs-center secondary header">Disclaimer</h3>
				<p>We purchase used and new products every day. Check here to see what used inventory has come in recently. Inventory is not guaranteed after posting, please call us at <b>(706) 543-7803</b> to check availability.</p>
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
									<td><img class="responsive" :src="props.item.img"></td>
									<td class="text-xs-right">{{props.item.date}}</td>
									<td class="text-xs-right">{{props.item.name}}</td>
									<td class="text-xs-right">{{props.item.caliber}}</td>
									<td class="text-xs-right">{{props.item.type}}</td>
									<td class="text-xs-right">${{props.item.price}}</td>
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
					{text: "", value: "image", sortable: false},
					{text: "Date Added", value: "date"},
					{text: "Product Name", value: "name", sortable: false},
					{text: "Caliber/Gauge", value: "caliber"},
					{text: "Type", value: "type"},
					{text: "Price", value: "price"}
				],
				items: [
					{date: "07/20/17", name: "ATA Venza", caliber: "20ga", type: "Shotgun", price: "399.99", img: "/src/imgs/firearms/ata_venza.jpg"},
					{date: "07/20/17", name: "Glock 22", caliber: "40cal", type: "Pistol", price: "349.99", img: "/src/imgs/firearms/glock_22.jpg"},
					{date: "07/20/17", name: "Taurus TCP", caliber: "380acp", type: 'Pistol', price: "149.99", img: "/src/imgs/firearms/taurus_tcp.jpg"}
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