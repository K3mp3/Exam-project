<script setup lang="ts"></script>

<template>
  <div class="bottom-nav-parent-container">
    <ul>
      <li>
        <RouterLink
          to="/user-sent"
          class="display-flex flex-dir-col justify-center align-items-center text-main font-text-light O9rem text-deco-none"
        >
          <fontAwesome :icon="['fas', 'paper-plane']" /> Skickat</RouterLink
        >
      </li>
      <li class="activeUrl">
        <RouterLink
          to="/user-home"
          class="display-flex flex-dir-col justify-center align-items-center text-main font-text-light O9rem text-deco-none"
        >
          <fontAwesome :icon="['fas', 'house']" class="text-active-blue" />
          <p class="text-active-blue">Hem</p></RouterLink
        >
      </li>
      <li>
        <RouterLink
          to="/profile"
          class="display-flex flex-dir-col justify-center align-items-center text-main font-text-light O9rem text-deco-none"
        >
          <fontAwesome :icon="['fas', 'user']" /> Profil</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
