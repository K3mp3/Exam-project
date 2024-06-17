<script setup lang="ts"></script>

<template>
  <div class="fixed bottom-0 mb-[83px] w-full">
    <div class="max-w-36 p-4 bg-main-40 border-main backdrop-blur-sm m-auto rounded-lg">
      <ul class="text-main flex flex-col gap-4 text-center">
        <li class="flex gap-2 w-full items-center justify-center">
          <fontAwesome :icon="['fas', 'paper-plane']" /> Skickat
        </li>
        <li class="flex gap-2 w-full items-center justify-center">
          <fontAwesome :icon="['fas', 'user']" /> Profil
        </li>
      </ul>
    </div>
  </div>
</template>
