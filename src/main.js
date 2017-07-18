import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueCarousel from 'vue-carousel'

import WogCarousel from './components/WogCarousel.vue'
import WogSlide from './components/WogSlide.vue'

import WogHeader from './pages/WogHeader.vue'
import WogContent from './pages/WogContent.vue'
import WogFooter from './pages/WogFooter.vue'
import WogPage from './pages/WogPage.vue'
import WogTabHome from './pages/WogTabHome.vue'
import WogTabDepartments from './pages/WogTabDepartments.vue'
import WogTabArchery from './pages/WogTabArchery.vue'
import WogTabClothing from './pages/WogTabClothing.vue'
import WogTabFirearms from './pages/WogTabFirearms.vue'
import WogTabFishing from './pages/WogTabFishing.vue'
import WogTabOnlineSales from './pages/WogTabOnlineSales.vue'
import WogTabRepair from './pages/WogTabRepair.vue'
import WogTabNewProducts from './pages/WogTabNewProducts.vue'
import WogTabSalesAds from './pages/WogTabSalesAds.vue'
import WogTabAbout from './pages/WogTabAbout.vue'
import WogTabContact from './pages/WogTabContact.vue'
import WogTabAdmin from './pages/WogTabAdmin.vue'

Vue.use(Vuetify);
Vue.use(VueCarousel);

Vue.component('wog-carousel', WogCarousel);
Vue.component('wog-slide', WogSlide);

Vue.component('wog-header', WogHeader);
Vue.component('wog-content', WogContent);
Vue.component('wog-footer', WogFooter);
Vue.component('wog-page', WogPage);
Vue.component('wog-tab-home', WogTabHome);
Vue.component('wog-tab-departments', WogTabDepartments);
Vue.component('wog-tab-archery', WogTabArchery);
Vue.component('wog-tab-clothing', WogTabClothing);
Vue.component('wog-tab-firearms', WogTabFirearms);
Vue.component('wog-tab-fishing', WogTabFishing);
Vue.component('wog-tab-online-sales', WogTabOnlineSales);
Vue.component('wog-tab-repair', WogTabRepair);
Vue.component('wog-tab-new-products', WogTabNewProducts);
Vue.component('wog-tab-sales-ads', WogTabSalesAds);
Vue.component('wog-tab-about', WogTabAbout);
Vue.component('wog-tab-contact', WogTabContact);
Vue.component('wog-tab-admin', WogTabAdmin);

new Vue({
  el: '#app',
  render: h => h(App)
})
