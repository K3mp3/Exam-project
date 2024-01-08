<script setup lang="ts">
    import { signInUser } from '@/services/signInUser';
import { computed, ref } from 'vue';

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

    async function handleRegistration() {
        const response = await signInUser(user.value)
        console.log(response);
    }
</script>   

<template>
    <div class="sign-in-tablet-form-background">
        <div class="sign-in-tablet-form-nav">
            <RouterLink to="/" class="sign-in-form-back-link"><fontAwesome :icon="['fas', 'chevron-left']" /></RouterLink>
            <h2>Logga in</h2>
        </div>
        <form @submit.prevent="handleRegistration" class="sign-in-tablet-form">
            <div class="sign-in-tablet-form-top-container">
                <div class="input-container">
                    <label for="email">Email adress</label>
                    <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
                    <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>
                </div>

                <div class="input-container">
                    <label for="password">Lösenord</label>
                    <input type="password" name="password" placeholder="Lösenord" v-model="password" :class="isPasswordWrong ? 'input-error' : ''">
                    <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!</p>
                </div>
            </div>
            
            <div class="sign-in-tablet-form-bottom-container">
                <button type="submit" class="sign-in-tablet-btn">Logga in</button>
            </div>
        </form>

        <div class="blue-line"></div>
    </div>
</template>