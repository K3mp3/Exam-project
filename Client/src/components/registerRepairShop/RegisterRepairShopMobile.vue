<script setup lang="ts">
    import { computed, onMounted, ref, toValue } from 'vue';
    import { registerRepairShop } from '../../services/registerUser'; 
    import DialogBox from "../popup/DialogBox.vue";
    // import { useShowPopUp } from '@/stores/ShowPopUpStore';

    const name = ref("");
    const location = ref("");
    const phoneNumber = ref("");
    const email = ref("");
    const confirmEmail = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);
    const isNotBothNames = ref(false);

    // const isDialog = computed(() => useShowPopUp().showPopUp)

    const newUser = computed(() => {
        return {
            name: name.value,
            location: location.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            password: password.value,
            repairShop: true,
        }
    })

    function checkInputData() {
        if (email.value === confirmEmail.value) {
            isEmailWrong.value = false;
        } else {
            return isEmailWrong.value = true;
        }

        if (password.value === confirmPassword.value) {
            isPasswordWrong.value = false;
            console.log(isPasswordWrong.value)
        } else {
            return isPasswordWrong.value = true;
        }

        return true;
    }

    async function handleRegistration() {
        checkInputData()

        if (checkInputData()) {
            const response = await registerRepairShop(newUser.value)
            console.log(response);
        } else {
            console.log("error");
        }
    }
</script>   

<template>
    <div class="mobile-form-background">
        <div class="mobile-form-nav">
            <RouterLink to="/" class="router-link"><fontAwesome :icon="['fas', 'chevron-left']" /></RouterLink>
            <h2>Registrera din verkstad</h2>
        </div>
        <form @submit.prevent="handleRegistration" class="mobile-register-form">
            <label for="name">Namn</label>
            <input type="text" name="name" placeholder="Namn på verkstaden" v-model="name" :class="isNotBothNames ? 'input-error' : ''">
          

            <label for="location">Kommun</label>
            <select name="location" class="mobile-register-form-select" v-model="location" :key="location">
                <option value="Sundsvall">Sundsvall</option>
            </select>


            <label for="phone-number">Telefonnummer</label>
            <input type="tel" name="phone-number" placeholder="Telefonnummer till din verkstad" v-model="phoneNumber" :class="isNotBothNames ? 'input-error' : ''">
           

            <label for="email">Email adress</label>
            <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>

            <label for="email">Bekräfta email adress</label>
            <input type="email" name="email" placeholder="namn@mail.com" v-model="confirmEmail" :class="isEmailWrong ? 'input-error' : ''">
            <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera email adressen!</p>

            <label for="password">Lösenord</label>
            <input type="password" name="password" placeholder="Lösenord" v-model="password" :class="isPasswordWrong ? 'input-error' : ''">
            <p v-if="isPasswordWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!</p>

            <label for="password">Bekräfta lösenord</label>
            <input type="password" name="password" placeholder="Lösenord" v-model="confirmPassword" :class="isPasswordWrong ? 'input-error' : ''">
            <p v-if="isPasswordWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera lösenorder!</p>

            <button type="submit" class="register-mobile-button">Registrera</button>
        </form>

        <div class="blue-line"></div>

        <div class="text-form-container">
            <p>Har du redan ett konto? <RouterLink to="/" class="router-link-text">Logga in här</RouterLink></p>
            <p>Har du en verkstad och vill registrera dig? <RouterLink to="/" class="router-link-text">Klicka här</RouterLink></p>
        </div>
        
        <!-- <DialogBox v-if="isDialog"></DialogBox> -->
    </div>
</template>