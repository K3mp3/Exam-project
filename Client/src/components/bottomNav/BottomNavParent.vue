<script setup lang="ts"></script>

<template>
  <div class="bottom-nav-parent-container">
    <ul>
      <li>
        <RouterLink to="/user-sent" class="bottom-nav-router-link">
          <fontAwesome :icon="['fas', 'paper-plane']" /> Skickat</RouterLink
        >
      </li>
      <li class="activeUrl">
        <RouterLink to="/user-home" class="bottom-nav-router-link active-url">
          <fontAwesome :icon="['fas', 'house']" /> Hem</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/profile" class="bottom-nav-router-link">
          <fontAwesome :icon="['fas', 'user']" /> Profil</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
