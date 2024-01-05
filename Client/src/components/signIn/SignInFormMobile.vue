<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { signInUser } from '@/services/signInUser'; 

    const email = ref("");
    const password = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);

    const user = computed(() => {
        return {
            email: email.value,
            password: password.value
        }
    })

    async function handleSignIn() {
        console.log(user.value)
        const response = await signInUser(user.value)
        console.log(response);
    }
</script>   

<template>
    <div class="mobile-form-background">
        <div class="mobile-form-nav">
            <RouterLink to="/" class="router-link"><fontAwesome :icon="['fas', 'chevron-left']" /></RouterLink>
            <h2>Logga in</h2>
        </div>
        <form @submit.prevent="handleSignIn" class="mobile-register-form">
            <label for="email">Email adress</label>
            <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>

            <label for="password">Lösenord</label>
            <input type="password" name="password" placeholder="Lösenord" v-model="password" :class="isPasswordWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!</p>

            <button type="submit" class="register-mobile-button">Logga in</button>
        </form>

        <div class="blue-line"></div>
    </div>
</template>