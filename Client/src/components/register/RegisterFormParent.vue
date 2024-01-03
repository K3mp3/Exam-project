<script setup lang="ts">
    import { ref } from 'vue';

    const name = ref("");
    const email = ref("");
    const confimEmail = ref("");
    const password = ref("");
    const confirmPassword = ref("");

</script>

<template>
    <nav class="register-nav">
        <RouterLink to="/" class="router-link"><fontAwesome :icon="['fas', 'chevron-left']" /></RouterLink>
        <h1>Registrera dig</h1>
    </nav>
    <form>
        <label for="name">För- och efternamn</label>
        <input type="text" name="name" placeholder="För- och efternammn">

        <label for="email">Email adress</label>
        <input type="emaiil" name="email" placeholder="namn@mail.com">

        <label for="email">Bekräfta email adress</label>
        <input type="email" name="email" placeholder="namn@mail.com">

        <label for="password">Lösenord</label>
        <input type="password" name="password" placeholder="Lösenord">

        <label for="password">Bekräfta lösenord</label>
        <input type="password" name="password" placeholder="Lösenord">

        <button type="submit">Registrera</button>
    </form>
    
    <div class="blue-line"></div>

    <div class="text-form-container">
        <p>Har du redan ett konto? <RouterLink to="/" class="router-link-text">Logga in här</RouterLink></p>
    <p>Har du en verkstad och vill registrera dig? <RouterLink to="/" class="router-link-text">Klicka här</RouterLink></p>
    </div>
</template>