<template>
	<v-card>
		<v-card-text class="pb-0">
			<v-layout row>
				<v-flex md12>
					<div class="text-xs-right" v-if="progressing">
						<v-progress-linear v-model="progress"></v-progress-linear>
						<p>{{progress | integer}}/100</p>
					</div>
					<p class="title mb-0 pt-2 text-xs-center" v-else>{{text}}</p>
				</v-flex>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn class="blue--text darken-1" :disabled="progressing" flat @click.native="close">Close</v-btn>
			<v-btn class="blue--text darken-1" flat @click.native="actionClicked">Remove Image</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import * as FB from 'firebase'

	export default {
		computed: {
			increment: function() {
				return 50;
			}
		},
		data() {
			return {
				progress: 0,
				progressing: false,
				return: [],
				text: 'Are you sure you want to remove this image?'
			}
		},
		filters: {
			integer: function(val) {
				return Math.round(val);
			}
		},
		methods: {
			actionClicked: function() {
				var storageRef = FB.storage().ref();
				var databaseRef = FB.database().ref();
				this.progressing = true;
				storageRef.child(this.src.img).delete().then(success => {this.progress += this.increment;});
				databaseRef.child(this.location).remove().then(success => {this.progress += this.increment;});
			},
			close: function(emitChanges) {
				if (emitChanges == true) {this.$emit('close', 'remove', this.return);}
				else {this.$emit('close');}
				this.return = [];
			}
		},
		props: {
			delay: {type: Number, default: 500},
			location: String,
			src: Object
		},
		watch: {
			progress: function(val) {
				if (val >= 100) {
					window.setTimeout(obj => {
						this.close(true);
						this.progress = 0;
						this.progressing = false;
					}, this.delay)
				}
			}
		}
	}
</script>