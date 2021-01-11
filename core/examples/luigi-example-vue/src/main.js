import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';


import Keycloak from 'keycloak-js'
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'


Vue.config.productionTip = false;

import LuigiClient from '@luigi-project/client';

Vue.mixin({
  created() {
    this.luigiClient = LuigiClient;
  }
});

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');

console.log('111111');

//****************************8
// _webDriver.SwitchTo().DefaultContent();
let initOptions = {
  url: 'http://192.168.11.191:8180/auth',
  realm: 'mastertest',
  clientId: 'luigi-project',
  onLoad: 'login-required'
};

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad, promiseType: 'native' }).then((auth) => {
  if (!auth) {
    console.log('not auth');
    window.location.reload();
  } else {
    Vue.prototype.$keycloak = keycloak;
    console.log("Authenticated");

    // new Vue({
    //   render: h => h(App, {props: {keycloak: keycloak}}),
    //   // el: '#app',
    //   // render: h => h(App, { props: { keycloak: keycloak } })
    // }).$mount('#app')
  }

  const decoded = VueJwtDecode.decode(keycloak.token);
  const roles = decoded.realm_access.roles;
  store.commit("storeRoles", roles);

//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        Vue.$log.info('Token refreshed' + refreshed);
      } else {
        Vue.$log.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      Vue.$log.error('Failed to refresh token', error);
    });
  }, 6000)

}).catch(() => {
  console.log("Authenticated Failed", error);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
