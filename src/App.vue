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
            <nl2br tag="div" :v-text="message" />
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
import Nl2br from 'vue-nl2br'

export default {
  components: {
    Nl2br
  },
  data() {
    return {
      user: {}, // User information
      chat: [], // Array for retreived messages
      input: '' // Message
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
