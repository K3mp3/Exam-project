<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { registerUser } from '@/services/registerUser'; 
    import DialogBox from "../popup/DialogBox.vue";
    import { useShowPopUp } from '@/stores/ShowPopUpStore';
    import { useShowRegisterDialog } from '@/stores/showRegisterDialog';
    import { useShowRepairShopDialog } from '../../stores/useShowRepairShopDialog';

    const name = ref("");
    const email = ref("");
    const confirmEmail = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const isEmailWrong = ref(false);
    const isPasswordWrong = ref(false);
    const isNotBothNames = ref(false);
    const disableRegisterBtn = ref(true);
    const isPasswordWeak = ref(false);
    const isConfirmPasswordWeak = ref(false)

    const isDialog = computed(() => useShowPopUp().showPopUp);

    const isRegister = computed(() => useShowRegisterDialog().isRegisterDialog);
    const isRepairShopDialog = computed(() => useShowRepairShopDialog().isRepairShopDialog)

    const newUser = computed(() => {
        return {
            name: name.value,
            email: email.value,
            password: password.value,
            repairShop: false,
        }
    })

    function checkInputData() {
        checkInputName();
        checkInputEmail();

        if (name.value === "" || email.value === "" || confirmEmail.value === "" || password.value === "" || confirmPassword.value === "") {
            disableRegisterBtn.value = true;
            return false;
        } else {
            disableRegisterBtn.value = false;
            return true;
        }
    }

    function checkInputName() {
        const nameRegex = /^[\p{L}]+ [\p{L}]+$/u;
        if (nameRegex.test(name.value)) {
            return isNotBothNames.value = false;
        } else {
           isNotBothNames.value = true; 
        }
    }

    function checkInputEmail() {
        if (email.value === confirmEmail.value) {
            isEmailWrong.value = false;
        } else {
            isEmailWrong.value = true;
        }
    }

    function checkInputPassword() {
        if (password.value === confirmPassword.value) {
            isPasswordWrong.value = false;
        } else {
           isPasswordWrong.value = true;
        }
    }

    function checkPasswordStrength(type: string) {
        checkInputData();

        if (type === "password") {
            isPasswordWeak.value = password.value.length < 5;
        } else {
            isConfirmPasswordWeak.value = confirmPassword.value.length < 5;
        }
    }

    async function handleRegistration() {
        checkInputData()

        if (checkInputData()) {
            const response = await registerUser(newUser.value)
        } else {
            
        }
    }

    function closeRegisterDialog() {
        const showRegisterDialog = useShowRegisterDialog();
        showRegisterDialog.showRegisterDialogForm(!isRegister.value);
    }

    function showRegisterRepairShopDialog() {
        const showRegisterDialog = useShowRegisterDialog();
        showRegisterDialog.showRegisterDialogForm(!isRegister.value);

        const showRepairShopRegisterDialog = useShowRepairShopDialog();
        showRepairShopRegisterDialog.showRepairShopRegisterDialogForm(!isRepairShopDialog.value);
    }
</script>

<template>
    <div class="desktop-form-background">
        <div class="desktop-dialog-container">
            <div class="desktop-dialog-nav">
                <button type="button" class="btn-back" @click="closeRegisterDialog"><fontAwesome :icon="['fas', 'chevron-left']" /></button>
                <h2>Registrera dig</h2>
            </div>
            <form @submit.prevent="handleRegistration" class="desktop-register-form">
                <div class="input-container-left">
                    <label for="name">För- och efternamn</label>
                    <input type="text" name="name" placeholder="För- och efternammn" v-model="name" @change="checkInputData" :class="isNotBothNames ? 'input-error' : ''">
                    <p v-if="isNotBothNames"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att både för- och efternamn finns med!</p>

                    <label for="email">Email adress</label>
                    <input type="email" name="email" placeholder="namn@mail.com" v-model="email" :class="isEmailWrong ? 'input-error' : ''">
                    <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att email adresserna stämmer överens!</p>
         
                    <label for="email">Bekräfta email adress</label>
                    <input type="email" name="email" placeholder="namn@mail.com" v-model="confirmEmail" @blur="checkInputData" :class="isEmailWrong ? 'input-error' : ''">
                    <p v-if="isEmailWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att email adresserna stämmer överens!</p>
                </div>
               
                <div class="input-container-right">
                    <label for="password">Lösenord</label>
                    <input type="password" name="password" placeholder="Lösenord" v-model="password" @input="checkPasswordStrength('password')" :class="{ 'input-error': isPasswordWrong, 'input-password-weak': isPasswordWeak }">
                    <p class="warning-text" v-if="isPasswordWeak"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att använda ett säkrare</p>
                    <p v-if="isPasswordWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att lösenorden stämmer överens!</p>

                    <label for="password">Bekräfta lösenord</label>
                    <input type="password" name="password" placeholder="Lösenord" v-model="confirmPassword"  @blur="checkInputPassword" @input="checkPasswordStrength('confirmPassword')" :class="{ 'input-error': isPasswordWrong, 'input-password-weak': isConfirmPasswordWeak }">
                    <p class="warning-text" v-if="isConfirmPasswordWeak"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Lösenordet är svagt! Överväg att använda ett säkrare</p>
                    <p v-if="isPasswordWrong"><fontAwesome :icon="['fas', 'triangle-exclamation']" />Vänligen kontrollera så att lösenorden stämmer överens!</p>

                    <button type="submit" :disabled="disableRegisterBtn" :class="disableRegisterBtn ? 'register-desktop-button-disable' : 'desktop-register-btn'">Registrera</button>
                </div>
            </form>
            <div class="dialog-blue-line"></div>

            <div class="dialog-text-form-container">
                <p>Har du redan ett konto? <RouterLink to="/" class="router-link-text">Logga in här</RouterLink></p>
                <p>Har du en verkstad och vill registrera dig? <button type="button" class="router-link-text" @click="showRegisterRepairShopDialog">Klicka här</button></p>
            </div>
            
            <DialogBox v-if="isDialog"></DialogBox>
        </div>
    </div>
</template>@/stores/useShowRepairShopDialog