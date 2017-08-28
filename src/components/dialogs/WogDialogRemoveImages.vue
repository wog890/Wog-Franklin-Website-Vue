<template>
	<v-card>
		<v-card-text class="pb-0">
			<v-card-text class="pb-0">
				<v-layout row wrap>
					<v-flex md4 v-for="(src, i) in srcs" :key="i">
						<wog-img :pos="i" :url="src.url" :disabled="progressing" @selected="selected"></wog-img>
					</v-flex>
				</v-layout>
			</v-card-text>
			<v-layout row>
				<v-flex md12>
					<div class="text-xs-right" v-if="progressing">
						<v-progress-linear v-model="progress"></v-progress-linear>
						<p>{{progress}}/100</p>
					</div>
					<p class="title mb-0 pt-2" v-else>{{text}}</p>
				</v-flex>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn class="blue--text darken-1" :disabled="progressing" flat @click.native="close">Close</v-btn>
			<v-btn class="blue--text darken-1" :disabled="actionDisabled" flat @click.native="actionClicked">{{actionText}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	import * as FB from 'firebase'

	export default {
		computed: {
			actionDisabled: function() {
				return this.numberSelected == 0 && !this.progressing;
			},
			actionText: function() {
				return this.numberSelected > 1 ? 'Remove Slides' : 'Remove Slide';
			},
			increment: function() {
				var total = 0;
				for (var i=0, j=this.srcs.length; i<j; i++) {
					if (this.srcs[i].selected) {total++;}
				}
				return 1/(total*2)*100
			},
			numberSelected: function() {
				var selected = 0;
				for (var i=0, j=this.srcs.length; i<j; i++) {
					if (this.srcs[i].selected) {selected++;}
				}
				return selected;
			}
		},
		data() {
			return {
				progress: 0,
				progressing: false,
				return: [],
				text: 'Select the slides you would like to remove.'
			}
		},
		methods: {
			actionClicked: function() {
				var storageRef = FB.storage().ref();
				var databaseRef = FB.database().ref();
				this.progressing = true;
				for (var i=0, j=this.srcs.length; i<j; i++) {
					if (this.srcs[i].selected) {
						this.return.push(i);
						storageRef.child(this.srcs[i].img).delete().then(success => {this.progress += this.increment;});
						databaseRef.child(this.location+'/'+i).remove().then(success => {this.progress += this.increment;});
					}
				}
			},
			close: function(emitChanges) {
				if (emitChanges == true) {this.$emit('close', 'remove', this.return);}
				else {this.$emit('close');}
				this.return = [];
			},
			selected: function(i, val) {
				this.srcs[i].selected = val;
			}
		},
		props: {
			delay: {type: Number, default: 500},
			imgPath: String,
			location: String,
			srcs: Array
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

<style>
	.wog-img-header {
		height: 100px
	}

	.wog-img-upload {
		float: left;
		height: 100px;
		margin-right: 1em;
	}
</style>