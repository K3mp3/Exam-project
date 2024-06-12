<script setup lang="ts"></script>

<template>
  <div class="text-main flex flex-col items-center gap-4 sm:gap-8 xl:gap-16">
    <div
      class="text-2xl font-extrabold sm:text-3xl xl:text-5xl flex flex-col gap-1 w-full items-center sm:gap-2 xl:gap-4"
    >
      <h1>Vibe</h1>
      <div class="gray-line w-full"></div>
    </div>
    <div class="text-center flex flex-col gap-1">
      <h2 class="text-xl sm:text-2xl">Kontakta oss</h2>
      <RouterLink to="contact" class="underline decoration-solid">Kontakta oss</RouterLink>
      <p>kontakt@vibe.se</p>
      <p>060 - 146 37 12</p>
    </div>
  </div>
</template>
