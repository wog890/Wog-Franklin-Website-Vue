import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import MaxFire from './maxapps/MaxFire.js'
import SimData from './firebase_data.json'

import WogButtonBar from './components/WogButtonBar.vue'
import WogCarousel from './components/WogCarousel.vue'
import WogDialogAddImage from './components/dialogs/WogDialogAddImage.vue'
import WogDialogAddImages from './components/dialogs/WogDialogAddImages.vue'
/*import WogDialogAddProducts from './components/dialogs/WogDialogAddProducts.vue'*/
import WogDialogEditImage from './components/dialogs/WogDialogEditImage.vue'
import WogDialogEditImages from './components/dialogs/WogDialogEditImages.vue'
import WogDialogFullsizeImage from './components/dialogs/WogDialogFullsizeImage.vue'
import WogDialogRemoveImage from './components/dialogs/WogDialogRemoveImage.vue'
import WogDialogRemoveImages from './components/dialogs/WogDialogRemoveImages.vue'
import WogImg from './components/WogImg.vue'
import WogImgHeader from './components/WogImgHeader.vue'
import WogSlide from './components/WogSlide.vue'
import WogSpinner from './components/WogSpinner.vue'
import WogUpload from './components/WogUpload.vue'

import WogContent from './components/WogContent.vue'
import WogFooter from './components/WogFooter.vue'
import WogHeader from './components/WogHeader.vue'
import WogPage from './components/WogPage.vue'

import WogTabAbout from './pages/WogTabAbout.vue'
import WogTabAdmin from './pages/WogTabAdmin.vue'
import WogTabArchery from './pages/WogTabArchery.vue'
import WogTabClothing from './pages/WogTabClothing.vue'
import WogTabContact from './pages/WogTabContact.vue'
import WogTabDepartments from './pages/WogTabDepartments.vue'
import WogTabFirearms from './pages/WogTabFirearms.vue'
import WogTabFishing from './pages/WogTabFishing.vue'
import WogTabHome from './pages/WogTabHome.vue'
import WogTabNewProducts from './pages/WogTabNewProducts.vue'
import WogTabOnlineSales from './pages/WogTabOnlineSales.vue'
import WogTabRepair from './pages/WogTabRepair.vue'
import WogTabSalesAds from './pages/WogTabSalesAds.vue'

const SIMULATE_FIREBASE = false;

const FIREBASE_KEYS = {
	apiKey: "AIzaSyAUI7-Dr2pxw1khiADQTTSlpwwEpvCnWvE",
    authDomain: "wog-franklin-website.firebaseapp.com",
    databaseURL: "https://wog-franklin-website.firebaseio.com",
    projectId: "wog-franklin-website",
    storageBucket: "wog-franklin-website.appspot.com",
    messagingSenderId: "215362581628"
};

const SIM_DATA = {
	delays: 1000,
	data: SimData
};

MaxFire.init(SIMULATE_FIREBASE ? SIM_DATA : FIREBASE_KEYS);

Vue.use(Vuetify);

Vue.component('wog-button-bar', WogButtonBar);
Vue.component('wog-carousel', WogCarousel);
Vue.component('wog-dialog-add-image', WogDialogAddImage);
Vue.component('wog-dialog-add-images', WogDialogAddImages);
/*Vue.component('wog-dialog-add-products', WogDialogAddProducts);*/
Vue.component('wog-dialog-edit-image', WogDialogEditImage);
Vue.component('wog-dialog-edit-images', WogDialogEditImages);
Vue.component('wog-dialog-fullsize-image', WogDialogFullsizeImage);
Vue.component('wog-dialog-remove-image', WogDialogRemoveImage);
Vue.component('wog-dialog-remove-images', WogDialogRemoveImages);
Vue.component('wog-img', WogImg);
Vue.component('wog-img-header', WogImgHeader);
Vue.component('wog-slide', WogSlide);
Vue.component('wog-spinner', WogSpinner);
Vue.component('wog-upload', WogUpload);

Vue.component('wog-content', WogContent);
Vue.component('wog-footer', WogFooter);
Vue.component('wog-header', WogHeader);
Vue.component('wog-page', WogPage);

Vue.component('wog-tab-about', WogTabAbout);
Vue.component('wog-tab-admin', WogTabAdmin);
Vue.component('wog-tab-archery', WogTabArchery);
Vue.component('wog-tab-clothing', WogTabClothing);
Vue.component('wog-tab-contact', WogTabContact);
Vue.component('wog-tab-departments', WogTabDepartments);
Vue.component('wog-tab-firearms', WogTabFirearms);
Vue.component('wog-tab-fishing', WogTabFishing);
Vue.component('wog-tab-home', WogTabHome);
Vue.component('wog-tab-new-products', WogTabNewProducts);
Vue.component('wog-tab-online-sales', WogTabOnlineSales);
Vue.component('wog-tab-repair', WogTabRepair);
Vue.component('wog-tab-sales-ads', WogTabSalesAds);

new Vue({
  el: '#app',
  render: h => h(App)
})
