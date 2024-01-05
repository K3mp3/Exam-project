<script setup lang="ts">
    import { computed, ref } from 'vue';
    import DialogBox from "../popup/DialogBox.vue";
    import { useShowPopUp } from '@/stores/ShowPopUpStore';
    import { useShowRegisterDialog } from '@/stores/showRegisterDialog';
    import { signInUser } from '@/services/signInUser';

    const email = ref("");
    const password = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);

    const isDialog = computed(() => useShowPopUp().showPopUp)

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
    <div class="tablet-form-background">
        <div class="tablet-form-nav">
            <RouterLink to="/" class="router-link"><fontAwesome :icon="['fas', 'chevron-left']" /></RouterLink>
            <h2>Registrera dig</h2>
        </div>
        <form @submit.prevent="handleSignIn" class="tablet-register-form">
            <div class="tablet-input-container-left">
                <label for="name">För- och efternamn</label>
                <input type="text" name="name" placeholder="För- och efternammn" v-model="name" :class="isNotBothNames ? 'input-error' : ''">
                <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att både för- och efternamn finns med!</p>

                <label for="email">Email adress</label>
                <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
                <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>
        
                <label for="email">Bekräfta email adress</label>
                <input type="email" name="email" placeholder="namn@mail.com" v-model="confirmEmail" :class="isEmailWrong ? 'input-error' : ''">
                <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>
            </div>
            
            <div class="tablet-input-container-right">
                <label for="password">Lösenord</label>
                <input type="password" name="password" placeholder="Lösenord" v-model="password" :class="isPasswordWrong ? 'input-error' : ''">
                <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenordet!</p>

                <label for="password">Bekräfta lösenord</label>
                <input type="password" name="password" placeholder="Lösenord" v-model="confirmPassword" :class="isPasswordWrong ? 'input-error' : ''">
                <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenordet!</p>

                <button type="submit" class="tablet-register-btn">Registrera</button>
            </div>
        </form>
        <div class="blue-line"></div>
        <div class="tablet-text-form-container">
            <p>Har du redan ett konto? <RouterLink to="/" class="router-link-text">Logga in här</RouterLink></p>
            <p>Har du en verkstad och vill registrera dig? <RouterLink to="/" class="router-link-text">Klicka här</RouterLink></p>
        </div>
        
        <DialogBox v-if="isDialog"></DialogBox>
    </div>            
</template>