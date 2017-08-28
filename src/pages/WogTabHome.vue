<template>
	<div>
		<v-layout class="pa-3">
			<v-flex md12>
				<v-carousel v-if="!loading" style="background: #fff;">
					<v-carousel-item v-for="(slide, i) in slides" src="" :key="i" @click.native="openTab(slide.tabIndex, slide.subIndex)">
						<img class="responsive" :src="slide.url" slot="default">
					</v-carousel-item>
				</v-carousel>
				<wog-button-bar v-if="editable" :btns="btns" :srcs="slides" location="tabs/home" imgPath="imgs/home/" editType="carousel"
						@input="slidesEdited"></wog-button-bar>
			</v-flex>
		</v-layout>
		<v-layout class="pl-3 pr-3">
			<v-flex md12>
				<v-list>
					<v-divider class="ma-1"></v-divider>
					<template v-for="(article, i) in articles">
						<div :class="article.department">
							<p class="headline secondary mb-0 pt-2 pb-2 pl-4 wog-article-header" v-if="article.header">{{article.header}}</p>
							<v-layout class="wog-article-text ma-0">
								<v-flex class="pa-2" md10 offset-md1>
									<img class="responsive" v-if="article.imgSrc" :src="article.imgSrc.url">
									<p class="mb-0 pa-2 subheading" v-if="article.text" v-html="article.text"></p>
								</v-flex>
							</v-layout>
						</div>
						<v-divider class="ma-1"></v-divider>
					</template>
				</v-list>
			</v-flex>
		</v-layout>
		<v-layout class="pa-3" row wrap>
			<v-flex md4>
				<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFranklinGunShop%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=278723485929776" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
			</v-flex>
			<v-flex md4>
				<iframe class="wog-iframe" scrolling="no" src="https://feed.mikle.com/widget/v2/36473/"></iframe>
			</v-flex>
			<v-flex md4>
				<iframe class="wog-iframe" scrolling="no" src="https://feed.mikle.com/widget/v2/36472/"></iframe>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import MaxFire from '../maxapps/MaxFire.js'

	export default {
		computed: {
			articles: function() {return this.src.articles || {}},
			btns: function() {
				if (this.slides.length > 0) {
					return 'add,edit,remove';
				}
				return 'add';
			},
			slides: function() {return this.src.slides || {}}
		},
		created() {
			MaxFire.get('/tabs/'+this.page).then(oSrcs => {
				this.src = oSrcs;
				this.loading = false;
			}).catch(oErr => {
				this.loading = false;
				this.errorMessage = 'Unable to load page';
				console.log(oErr);
			});
		},
		data() {
			return {
				errorMessage: '',
				loading: true,
				page: 'home',
				src: {}
			}
		},
		methods: {
			mergeObjects: function(obj, src) {
				Object.keys(src).forEach(function(key) {obj[key] = src[key];});
				return obj;
			},
			openTab: function(tabIndex, subIndex) {
				if (tabIndex != '') {this.$emit('tabChange', tabIndex, subIndex);}
			},
			slidesEdited: function(action, val) {
				switch (action) {
					case 'add': this.slides = this.slides.concat(val); break;
					case 'edit': this.slides[val.index] = this.mergeObjects(this.slides[val.index], val); break;
					case 'remove': for (var i=0, j=val.length; i<j; i++) {this.slides.splice(val[i]-i, 1);} break;
				}
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

<style>
	.wog-article-header {
		border-top-left-radius: 17px;
		border-top-right-radius: 17px;
		color: white;
	}

	.wog-article-text {
		/*background-color: #7f7f7f;*/
		border: 2px solid #424242;
		border-bottom-left-radius: 17px;
		border-bottom-right-radius: 17px;
	}

	.wog-iframe {
		border: 0;
		height: 100%;
		width: 100%;
	}
</style>