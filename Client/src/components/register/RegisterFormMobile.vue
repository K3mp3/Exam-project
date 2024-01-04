<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { registerUser } from '@/services/registerUser'; 
    import DialogBox from "../popup/DialogBox.vue";
    import { useShowPopUp } from '@/stores/ShowPopUpStore';

    const name = ref("");
    const email = ref("");
    const confirmEmail = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);

    const isDialog = computed(() => useShowPopUp().showPopUp)

    const newUser = computed(() => {
        return {
            name: name.value,
            email: email.value,
            password: password.value
        }
    })

    function checkInputData() {
        if (email.value === confirmEmail.value) {
            console.log("hej")
        } else {
            console.log("nej");
            isEmailWrong.value = true;
            return false;
        }

        if (password.value === confirmPassword.value) {
            console.log("hej då")
        } else {
            console.log("nej då");
            isPasswordWrong.value = true;
            return false;
        }

        return true;
    }

    async function handleRegistration() {
        checkInputData()

        if (checkInputData()) {
            const response = await registerUser(newUser.value)
        } else {
            console.log("duiban");
            
        }
    }
</script>   

<template>
    <div class="form-background">
        <div class="mobile-form-nav">
            <RouterLink to="/" class="router-link"><fontAwesome :icon="['fas', 'chevron-left']" /></RouterLink>
            <h2>Registrera dig</h2>
        </div>
        <form @submit.prevent="handleRegistration" class="mobile-register-form">
            <label for="name">För- och efternamn</label>
            <input type="text" name="name" placeholder="För- och efternammn" v-model="name">

            <label for="email">Email adress</label>
            <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att email adressen stämmer överens</p>

            <label for="email">Bekräfta email adress</label>
            <input type="email" name="email" placeholder="namn@mail.com" v-model="confirmEmail" :class="isEmailWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att email adressen stämmer överens</p>

            <label for="password">Lösenord</label>
            <input type="password" name="password" placeholder="Lösenord" v-model="password" :class="isPasswordWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att lösenorden stämmer överens</p>

            <label for="password">Bekräfta lösenord</label>
            <input type="password" name="password" placeholder="Lösenord" v-model="confirmPassword" :class="isPasswordWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att lösenorden stämmer överens</p>

            <button type="submit" class="register-mobile-button">Registrera</button>
        </form>

        <div class="blue-line"></div>

        <div class="text-form-container">
            <p>Har du redan ett konto? <RouterLink to="/" class="router-link-text">Logga in här</RouterLink></p>
            <p>Har du en verkstad och vill registrera dig? <RouterLink to="/" class="router-link-text">Klicka här</RouterLink></p>
        </div>
        
        <DialogBox v-if="isDialog"></DialogBox>
    </div>
</template>