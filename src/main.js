import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'

import WogHeader from './components/WogHeader.vue'
import WogContent from './components/WogContent.vue'
import WogFooter from './components/WogFooter.vue'
import WogPage from './components/WogPage.vue'
import WogTabHome from './components/WogTabHome.vue'
import WogTabDepartments from './components/WogTabDepartments.vue'
import WogTabArchery from './components/WogTabArchery.vue'
import WogTabFirearms from './components/WogTabFirearms.vue'
import WogTabFishing from './components/WogTabFishing.vue'

Vue.use(Vuetify);
Vue.component('wog-header', WogHeader);
Vue.component('wog-content', WogContent);
Vue.component('wog-footer', WogFooter);
Vue.component('wog-page', WogPage);
Vue.component('wog-tab-home', WogTabHome);
Vue.component('wog-tab-departments', WogTabDepartments);
Vue.component('wog-tab-archery', WogTabArchery);
Vue.component('wog-tab-firearms', WogTabFirearms);
Vue.component('wog-tab-fishing', WogTabFishing);

new Vue({
  el: '#app',
  render: h => h(App)
})
