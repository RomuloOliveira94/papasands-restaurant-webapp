<template>
  <main id="home">
    <div class="hero">
      <video src="../../public/hero.mp4" class="hero_video" muted loop autoplay></video>
      <div class="hero_text">
        <h1>
          Are you hungry?
        </h1>
        <p>Take a fast food!</p>
        <button @click="router.push('/burgers')">Let's GO!</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
</script>

<style lang="scss" scoped>
.hero{
  position: relative;
  min-height: 84vh;
  display: flex;
  align-items: center;
  justify-content: start;
  
  .hero_video{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  .hero_text{
    min-width: 25em;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 0 auto;
  }

  h1{
    font-size: 4em;
    font-weight: 900;
    color: white;
    text-transform: uppercase;
  }
  p{
    font-size: 2.4em;
    font-weight: 600;
    color: white;
    max-width: 57em;
  }
  button{
    display: block;
    margin-top: 25px;
    height: 50px;
    width: 10em;
    text-transform: uppercase;
    font-weight: 800;
    font-size: 25px;
    letter-spacing: 2px;
    text-align: center;
  }
}
</style>