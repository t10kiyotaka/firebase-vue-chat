import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyBhTRJyTi2aMFtI9U8x5fjFVQdijUKa6Ow",
  authDomain: "vue-chat-e481c.firebaseapp.com",
  databaseURL: "https://vue-chat-e481c.firebaseio.com",
  projectId: "vue-chat-e481c",
  storageBucket: "vue-chat-e481c.appspot.com",
  messagingSenderId: "140060465249",
  appId: "1:140060465249:web:54e7203d56f840c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
}).$mount('#app')
