<script setup lang="ts">
import ConsumerFooter from '../footer/ConsumerFooter.vue'
import ConsumerNav from '../nav/ConsumerNav.vue'
import ConsumerHeader from './ConsumerHeader.vue'
import ConsumerMain from './ConsumerMain.vue'
</script>

<template>
  <header>
    <nav>
      <ConsumerNav></ConsumerNav>
    </nav>
    <header>
      <ConsumerHeader></ConsumerHeader>
    </header>
  </header>
  <main>
    <ConsumerMain></ConsumerMain>
  </main>
  <footer>
    <ConsumerFooter></ConsumerFooter>
  </footer>
</template>
