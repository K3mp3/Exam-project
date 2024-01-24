<script setup lang="ts"></script>

<template>
  <div class="side-nav-parent-container">
    <ul>
      <li>
        <RouterLink to="/user-sent" class="side-nav-router-link">
          <fontAwesome :icon="['fas', 'paper-plane']" /> Skickat</RouterLink
        >
      </li>
      <li class="activeUrl">
        <RouterLink to="/user-home" class="side-nav-router-link active-url">
          <fontAwesome :icon="['fas', 'house']" /> Hem</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/user-profile" class="side-nav-router-link">
          <fontAwesome :icon="['fas', 'user']" /> Profil</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
