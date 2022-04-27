<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white nav_container">
    <div class="container-fluid navs-container">
      <img @click="router.push('/')" src="/logo-ps.png" alt="" width="120" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/burgers" class="nav-link active"
              >Burgers</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/sandwiches" class="nav-link active"
              >Sandwiches</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/drinks" class="nav-link active">Drinks</RouterLink>
          </li>
        </ul>
        <div class="links_container">
          <div v-if="user" class="links">
            <div class="icons_container">
              <RouterLink to="/cart" class="nav-link active"
                ><span class="material-icons icon">
                  shopping_bag
                </span></RouterLink
              >
              <RouterLink to="/orders" class="nav-link active"
                ><span class="material-icons icon"> receipt </span></RouterLink
              >

              <a class="nav-link">
                <span @click="handleLogout" class="material-icons icon">
                  logout
                </span>
              </a>
            </div>
          </div>
          <div v-if="!user" class="links_user">
            <RouterLink to="/login" class="nav-link"
              ><span class="material-icons icon"> login </span></RouterLink
            >
            <RouterLink to="/register" id="register">or Sign up</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import getUser from "../composables/getUser";
import { RouterLink, useRouter } from "vue-router";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const { user } = getUser();
const router = useRouter();

const handleLogout = () => {
  signOut(auth);
};
</script>

<style lang="scss">
@import "../assets/base.scss";
.nav_container {
  border-bottom: 2px solid rgba(0, 0, 0, 0.125);
  height: 10vh;
  z-index: 4;
  background-color: white;
  position: relative;
  img {
    max-width: 100%;
    cursor: pointer;
    margin-bottom: 12px;
    margin-right: 20px;
  }
  .icons_container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.navs-container {
  background-color: white;
  text-align: center;
  font-size: 1.5em;
}

.links_container {
  display: flex;
  align-items: center;
  background-color: white;
}
.links_user {
  display: flex;
  align-items: center;
  margin: 0 auto;
}
.login {
  display: flex;
  align-items: center;
}

.icon {
  font-size: 2em;
  cursor: pointer;
  color: $primary-color;
}

#register {
  font-size: 1.5em;
  text-decoration: none;
  color: #697392;
  margin-bottom: 10px;
}

@media screen and (max-width: 988px) {
  .links_container {
    justify-content: center;
  }
}
</style>
