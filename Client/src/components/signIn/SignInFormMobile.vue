<script setup lang="ts">
    import { computed, ref } from 'vue';

    const name = ref("");
    const email = ref("");
    const confirmEmail = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);
    const isNotBothNames = ref(false);

    const newUser = computed(() => {
        return {
            name: name.value,
            email: email.value,
            password: password.value
        }
    })

    function checkInputData() {
        if (!email.value === !confirmEmail.value) {
            isEmailWrong.value = true;
        } 

        if (!password.value === !confirmPassword.value) {
            isPasswordWrong.value = true;
            console.log(isPasswordWrong.value)
        } 

        const nameRegex = /^[\p{L}]+ [\p{L}]+$/u;
        if (!nameRegex.test(name.value)) {
            isNotBothNames.value = true;
            return false;
        }

        return true;
    }

    async function handleRegistration() {
        checkInputData()

        if (checkInputData()) {
            const response = await registerUser(newUser.value)
        } else {
            
        }
    }
</script>   

<template>
    <div class="mobile-form-background">
        <div class="mobile-form-nav">
            <RouterLink to="/" class="router-link"><fontAwesome :icon="['fas', 'chevron-left']" /></RouterLink>
            <h2>Logga in</h2>
        </div>
        <form @submit.prevent="handleRegistration" class="mobile-register-form">
            <label for="email">Email adress</label>
            <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>

            <label for="password">Lösenord</label>
            <input type="password" name="password" placeholder="Lösenord" v-model="password" :class="isPasswordWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!</p>

            <button type="submit" class="register-mobile-button">Registrera</button>
        </form>

        <div class="blue-line"></div>
    </div>
</template>