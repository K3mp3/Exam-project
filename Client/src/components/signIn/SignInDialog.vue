<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useShowSignInDialog } from '@/stores/showSignInDialog';
import { signInUser } from '@/services/signInUser';

    const email = ref("");
    const password = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);

    const isSignIn = computed(() => useShowSignInDialog().isSignInDialog)


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
                        <button type="submit" class="sign-in-desktop-btn">Logga in</button>
                    </div>
                </form>
            <div class="blue-line"></div>
        </div>
    </div>
</template>