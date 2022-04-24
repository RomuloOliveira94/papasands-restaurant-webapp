<template>
    <nav>
      <h1 @click="router.push('/')">PapaSand's</h1>
      <div class="links">
          <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/burgers">Burgers</RouterLink>
            <RouterLink to="/sandwiches">Sandwiches</RouterLink>
            <RouterLink to="/drinks">Drinks</RouterLink>
            <RouterLink to="/personal">Customize</RouterLink>
      </div>
      <div v-if="user" class="links">
      <RouterLink to="/cart">Cart</RouterLink>
      <RouterLink to="/orders">Orders</RouterLink>
      <button @click="handleClick">Logout</button>
      </div>

       <!--for logged in users -->
      <div>
        <!--<router-link to="/">Home</router-link>
        <button @click="handleClick">Logout</button>-->
      </div>
      
      <!-- for logged out users -->
     <div v-if="!user" class="links">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </div>
    </nav>

</template>

<script setup lang="ts">
import getUser from '../composables/getUser'
import { RouterLink, useRouter} from "vue-router";
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

const { user } = getUser()
const router = useRouter() 

const handleClick = () => {
    signOut(auth)
} 
</script>

<style lang="scss" scoped>
nav {
display: flex;
align-items: center;
justify-content: space-between;
flex-flow: wrap;
border-bottom:1px solid rgba(0, 0, 0, 0.155);
max-width: 100%;
height: 8vh;
z-index: 1;
min-width: 15em;
p{
    font-size: min(10px);
}
}
nav h1 {
  margin-right: auto;
  margin-bottom: 0;
  cursor: pointer;
}
nav a {
  margin-left: 16px;
  color: #2c3e50;
  padding: 10px;
}
nav button {
  margin-left: 16px;
}
nav a.router-link-exact-active {
  background-color:#E32929;
  color: white;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .links{
    display: none;
  }
}

</style>