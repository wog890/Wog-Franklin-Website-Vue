<template>
	<div>
		<wog-img-header :src="src.imgSrc" :editable="editable"></wog-img-header>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3 pb-3">
				<h3 class="text-xs-center secondary header">Disclaimer</h3>
				<p v-html="src.disclaimer"></p>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex md8 offset-md2 class="pl-3 pr-3">
				<h3 class="text-xs-center secondary header">New Products</h3>
				<v-layout>
					<v-flex sm6 offset-sm6>
						<v-text-field append-icon="search" label="Search" v-model="search" single-line hide-details></v-text-field>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex md10 offset-md1>
				<template>
					<v-data-table class="wog-table" :headers="headers" :items="src.products" :search="search" single-line>
						<template slot="items" scope="props">
							<td>
								<v-dialog width="60%" v-model="imageFullsized[props.item.stock]">
									<img class="mt-1" style="height: 5em;" slot="activator" :src="props.item.img">
									<wog-dialog-fullsize-image :src="props.item.img"></wog-dialog-fullsize-image>
								</v-dialog>
							</td>
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
	</div>
</template>

<script>
	import MaxFire from '../maxapps/MaxFire.js'

	export default {
		created() {
			MaxFire.get('/tabs/newProducts').then(oProducts => {
				var aProducts = MaxFire.asArray(oProducts.products);
				this.src = oProducts
				this.loading = false;
				for (var i=0, j=aProducts.length; i<j; i++) {
					this.imageFullsized[aProducts[i].stock] = false;
				}
			}).catch(oErr => {
				this.loading = false;
				this.errorMessage = 'Unable to load specials!';
				console.log(oErr.message);
			});
		},
		data() {
			return {
				errorMessage: '',
				headers: [
					{text: "", value: "image", sortable: false},
					{text: "Date Added", value: "date", sortable: false},
					{text: "Product Name", value: "name", sortable: false},
					{text: "Caliber/Gauge", value: "caliber", sortable: false},
					{text: "Type", value: "type", sortable: false},
					{text: "Price", value: "price", sortable: false}
				],
				imageFullsized: {},
				loading: true,
				pagination: {},
				search: '',
				src: {disclaimer: '', imgSrc: {img: '', url: ''}, products: []}
			}
		},
		methods: {clearSearch: function() {}},
		props: {
			editable: {type: Boolean, default: false}
		}
	}
</script>