<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useShowSignInDialog } from '@/stores/showSignInDialog';

    const name = ref("");
    const email = ref("");
    const confirmEmail = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);
    const isNotBothNames = ref(false);

    const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)


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

        // if (checkInputData()) {
        //     const response = await registerUser(newUser.value)
        // } else {
            
        // }
    }

    function closeSignInDialog() {
        const showSignInDialog = useShowSignInDialog();
        showSignInDialog.showSignInDialogForm(!isSignIn.value);
    }
</script>   

<template>
    <div class="sign-in-desktop-dialog-background">
        <div class="sign-in-desktop-dialog-container">
            <div class="sign-in-desktop-form-nav">
                <button type="button" class="sign-in-form-back-link" @click="closeSignInDialog"><fontAwesome :icon="['fas', 'chevron-left']" /></button>
                <h2>Logga in</h2>
                </div>
                <form @submit.prevent="handleRegistration" class="sign-in-desktop-form">
                    <div class="sign-in-desktop-form-top-container">
                        <div class="sign-in-dialog-input-container">
                            <label for="email">Email adress</label>
                            <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
                            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>
                        </div>

                        <div class="sign-in-dialog-input-container">
                            <label for="password">Lösenord</label>
                            <input type="password" name="password" placeholder="Lösenord" v-model="password" :class="isPasswordWrong ? 'input-error' : ''">
                            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!</p>
                        </div>
                    </div>
                    
                    <div class="sign-in-desktop-form-bottom-container">
                        <button type="submit" class="sign-in-desktop-btn" @click="closeSignInDialog">Logga in</button>
                    </div>
                </form>
            <div class="blue-line"></div>
        </div>
    </div>
</template>