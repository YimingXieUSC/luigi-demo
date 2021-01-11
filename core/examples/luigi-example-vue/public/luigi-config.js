import {OpenIdConnect} from '@luigi-project/plugin-auth-oidc';
// require('__path_to_vue.js__');
// const OpenIdConnect = require('@luigi-project/plugin-auth-oidc');

function tmpFunction() {
  console.log('Hello World')
}

Luigi.setConfig({
    auth: {
      use: 'keycloak',
      keycloak: {
        ipProvider: OpenIdConnect,
        authority: 'http://192.168.11.191:8180/auth/realms/mastertest/protocol/openid-connect/token',
        logoutUrl: 'http://192.168.11.191:8180/auth/realms/mastertest/protocol/openid-connect/logout',
        client_id: 'luigi-project'
        // scope: 'openid'
      }
    },
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        icon: 'home',
        viewUrl: '/sampleapp.html#/home',
        children: [
          {
            pathSegment: 'sample1',
            label: 'First',
            icon: 'nutrition-activity',
            viewUrl: '/sampleapp.html#/sample1'
          },
          {
            pathSegment: 'sample2',
            label: 'Second',
            icon: 'paper-plane',
            viewUrl: 'http://pro.br.com:2333',
            loadingIndicator: {
              enabled: false
            }
            // viewUrl: '/sampleapp.html#/sample2'
          },
          {
            category: { label: 'Links', icon: 'cloud' },
            label: 'Luigi Project',
            externalLink: {
              url: 'https://luigi-project.io/'
            },
            loadingIndicator: {
              enabled: false
            }
          },
          {
            category: 'Links',
            label: 'Vue.js',
            externalLink: {
              url: 'https://vuejs.org/'
            }
          }
        ]
      }
    ],
    profile: {
      logout: {
        label: 'End session',
        icon: 'sys-cancel',
        customLogoutFn: console.log('LOGOUT!!!')
      },
      items: () => [
        {
          category: 'Links',
          label: 'Vue.js',
          externalLink: {
            url: 'https://vuejs.org/'
          }
        }
      ]
    }
  },

  settings: {
    header: {
      title: 'Luigi Vue App',
      logo: '/logo.png'
    },
    responsiveNavigation: 'simpleMobileOnly'
  }
});

module.exports = tmpFunction;
