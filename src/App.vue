<template>
  <div id="app">
    <header class="header">
      <h1>Chat</h1>
      <!-- Show form and logout button if logged in -->
      <div v-if="user.uid" key="login">
        [{{ user.displayName }}]
        <button type="button" @click="doLogout">Logout</button>
      </div>
      <!-- Show login button if not logged in -->
      <div v-else key="logout">
        <button type="button" @click="doLogin">Login</button>
      </div>
    </header>

    <!-- Show list which retrieve from Firebase -->
    <transition-group name="chat" tag="div" class="list content">
      <section v-for="{ key, name, image, message} in chat" :key="key" class="item">
        <div class="item-image"><img :src="image" width="40" height="40"></div>
        <div class="item-detail">
          <div class="item-">{{ name }}</div>
          <div class="item-message">
            <!-- <nl2br tag="div" :v-text="message" /> -->
            <div :v-text="message"></div>
          </div>
        </div>
      </section>
    </transition-group>

    <!-- Input form -->
    <form action="" @submit.prevent="doSend" class="form">
      <textarea
        v-model="input"
        :disabled="!user.uid"
        @keydown.enter.exact.prevent="doSend"></textarea>
      <button type="submit" :disabled="!user.uid" class="send-button">Send</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
// import Nl2br from 'vue-nl2br'

export default {
  components: {
    // Nl2br
  },
  data() {
    return {
      user: {}, // User information
      chat: [], // Array for retreived messages
      input: '' // Message
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      const ref_message = firebase.database().ref('message')
      if (user) {
        this.chat = []
        // Register handler when message changed
        ref_message.limitToLast(10).on('child_added', this.childAdded)
      } else {
        // Unregister handler when message changed
        ref_message.limitToLast(10).off('child_added', this.childAdded)
      }
    })
  },
  methods: {
    // Login process
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    // Logout process
    doLogout() {
      firebase.auth().signOut()
    },
    // Move the scroll position to the bottom
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight)
      })
    },
    // Add recieved messages to Chat
    // Called every time when new item is added to DB 
    childAdded(snap) {
      const message = snap.val()
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      })
      this.scrollBottom()
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        // Add message to firebase
        firebase.database().ref('message').push({
          message: this.input,
          name: this.user.displayName,
          image: this.user.photoURL
        }, () => {
          this.input = '' // Make form empty
        })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
