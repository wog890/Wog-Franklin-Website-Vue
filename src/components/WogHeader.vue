<template>
	<v-layout>
	    <v-flex md6>
    		<img class="ma-3" src="/src/imgs/franklin-logo.png">
	    </v-flex>
	    <v-flex md6>
			<a href="http://maps.google.com/maps?z=16&q=3941+atlanta+hwy.+athens,+ga.+30606" target="_blank">
				<p class="mt-3 mr-3 mb-0 text-xs-right">
					3941 Atlanta Hwy.<br>Athens, Ga. 30606
				</p>
			</a>
			<p class="mr-3 mb-0 text-xs-right">
				(706) 543-7803<br>Sunday: 12pm-6pm<br>Mon-Sat: 9am-9pm<br>{{specialHours}}
			</p>
			<p class="mr-3 text-xs-right" v-if="editable" style="color: #c90e0e">Editer Mode</p>
	    </v-flex>
	</v-layout>
</template>

<script>
	export default {
		data: function() {
			return {
				specialHours: ""
			}
		},
		props: {
			editable: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	
</style>