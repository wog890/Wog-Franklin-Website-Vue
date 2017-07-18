<template>
	<div class="wog-carousel">
		<v-btn primary @click.native="test()">console.log(currentIndex)</v-btn>
		<div class="wog-container ma-0">
			<div class="wog-carousel-left">
				<button class="ma-0" type="button" @click="prevSlide">
					<div class="wog-btn-content">
						<i class="material-icons icon">chevron_left</i>
					</div>
				</button>
			</div>
			<div class="wog-carousel-right">
				<button class="ma-0" type="button" @click="nextSlide">
					<div class="wog-btn-content">
						<i class="material-icons icon">chevron_right</i>
					</div>
				</button>
			</div>
			<wog-slide v-for="(slide, i) in slides" :key="i" :index="i" :classes="slide.classes" :src="slide.src" :link="slide.link"></wog-slide>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			currentIndex: function() {
				for (var i=0, j=this.length; i<j; i++) {
					if (this.slides[i].classes === "active") {
						return i;
					}
				}
			},
			length: function() {
				return this.slides.length;
			}
		},
		data: function() {
			return {
			}
		},
		methods: {
			nextSlide: function() {
				var index = this.currentIndex;
				var nextIndex = index+1 < this.length ? index+1 : 0;
				this.slides[index].classes = "";
				
				this.slides[nextIndex].classes = "active";
			},
			prevSlide: function() {
				var index = this.currentIndex;
				var nextIndex = index-1 < 0 ? this.length-1 : index-1;
			},
			test: function() {
				console.log(this.currentIndex);
			}
		},
		props: {
			// Array containing the list of image and relative link sources.
			// Add active to whichever slide you wish to start visible.
			// Format should be:
			//[
			//	{src: "/imgs/image.png", link: "www.fakeurl.com", active: "true"}
			//]
			slides: Array
		}
	}
</script>

<style>
	img.responsive {
		height: auto;
		width: 100%;
	}

	.wog-carousel-left {
		left: 5px;
		position: absolute;
		top: 50%;
	}

	.wog-carousel-right {
		right: 5px;
		position: absolute;
		top: 50%;
	}

	.wog-container {
		position: relative;
	}

	/*.wog-carousel-left {
		left: 5px;
		position: absolute;
		transform: translateY(-50%);
		top: 50%;
		z-index: 1;
	}*/
</style>