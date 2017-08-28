<template>
	<div>
		<div v-if="editType=='carousel'">
			<v-layout row>
				<v-dialog width="60%" v-if="showBtn('remove')" v-model="dialogRemoveCarousel" persistent>
					<v-btn slot="activator" fab dark small error><v-icon dark>remove</v-icon></v-btn>
					<wog-dialog-remove-images :location="location" :srcs="srcs" @close="closedDialog"></wog-dialog-remove-images>
				</v-dialog>
				<v-dialog width="60%" v-if="showBtn('edit')" v-model="dialogEditCarousel" persistent>
					<v-btn slot="activator" fab dark small primary><v-icon dark>edit</v-icon></v-btn>
					<wog-dialog-edit-images :imgPath="imgPath" :location="location" :srcs="srcs" @close="closedDialog"></wog-dialog-edit-images>
				</v-dialog>
				<v-dialog width="60%" v-if="showBtn('add')" v-model="dialogAddCarousel" persistent>
					<v-btn class="teal" slot="activator" fab dark small><v-icon dark>add</v-icon></v-btn>
					<wog-dialog-add-images :imgPath="imgPath" :location="location" :srcs="srcs" @close="closedDialog"></wog-dialog-add-images>
				</v-dialog>
			</v-layout>
		</div>
		<div v-else-if="editType=='image'">
			<v-layout row>
				<v-dialog width="60%" v-if="showBtn('remove')" v-model="dialogRemoveImage" persistent>
					<v-btn slot="activator" fab dark small error><v-icon dark>remove</v-icon></v-btn>
					<wog-dialog-remove-image :location="location" :src="srcs" @close="closedDialog"></wog-dialog-remove-image>
				</v-dialog>
				<v-dialog width="60%" v-if="showBtn('edit')" v-model="dialogEditImage" persistent>
					<v-btn slot="activator" fab dark small primary><v-icon dark>edit</v-icon></v-btn>
					<wog-dialog-edit-image :location="location" :src="srcs" @close="closedDialog"></wog-dialog-edit-image>
				</v-dialog>
				<v-dialog width="40%" v-if="showBtn('add')" v-model="dialogAddImage" persistent>
					<v-btn class="teal" slot="activator" fab dark small><v-icon dark>add</v-icon></v-btn>
					<wog-dialog-add-image :imgPath="imgPath" :location="location" @close="closedDialog"></wog-dialog-add-image>
				</v-dialog>
			</v-layout>
		</div>
		<div v-else-if="editType=='products'">
			<v-layout row>
				<v-dialog width="60%" v-if="showBtn('remove')" v-model="dialogRemoveProducts" persistent>
					<v-btn slot="activator" fab dark small error><v-icon dark>remove</v-icon></v-btn>
				</v-dialog>
				<v-dialog width="60%" v-if="showBtn('edit')" v-model="dialogEditProducts" persistent>
					<v-btn slot="activator" fab dark small primary><v-icon dark>edit</v-icon></v-btn>
				</v-dialog>
				<v-dialog width="60%" v-if="showBtn('add')" v-model="dialogAddProducts" persistent>
					<v-btn class="teal" slot="activator" fab dark small><v-icon dark>add</v-icon></v-btn>
					<!-- <wog-dialog-add-products :location="location" :src="srcs" @close="closedDialog"></wog-dialog-add-products> -->
				</v-dialog>
			</v-layout>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogAddCarousel: false,
				dialogAddImage: false,
				dialogAddProducts: false,
				dialogEditCarousel: false,
				dialogEditImage: false,
				dialogEditProducts: false,
				dialogRemoveCarousel: false,
				dialogRemoveImage: false,
				dialogRemoveProducts: false,
				multipleEdit: false
			}
		},
		methods: {
			add: function() {this.$emit('add');},
			closedDialog: function(action, val) {
				if (typeof val == 'object' || typeof val == 'array') {this.$emit('input', action, val)}
				this.dialogAddCarousel = false;
				this.dialogAddImage = false;
				this.dialogAddProducts = false;
				this.dialogEditCarousel = false;
				this.dialogEditImage = false;
				this.dialogEditProducts = false;
				this.dialogRemoveCarousel = false;
				this.dialogRemoveImage = false;
				this.dialogRemoveProducts = false;
			},
			edit: function() {this.$emit('edit');},
			remove: function() {this.$emit('remove');},
			showBtn: function(btn) {return this.btns.split(',').indexOf(btn) != -1;}
		},
		props: {
			btns: {type: String, default: 'add,edit,remove'},
			editType: String,
			imgPath: String,
			location: String,
			srcs: [String, Array, Object]
		}
	}
</script>