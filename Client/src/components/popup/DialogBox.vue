<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { useShowPopUp } from '@/stores/ShowPopUpStore';

    const dialogMessage = computed(() => useShowPopUp().popUpMessage)

    function closeDialog() {
        const closeDialogBox = useShowPopUp();
        closeDialogBox.showPopUpTab(false, "");
    }
</script>

<template>
    <div class="dialog-container">
        <div class="dialog-box">
            <p>{{ dialogMessage }}</p>

            <div class="button-container">
                <RouterLink to="sign-in" class="router-link-register">Logga in</RouterLink>
                <button type="button" class="close-dialog-btn" @click="closeDialog">Tillbaka</button>
            </div>
        </div>
    </div>
</template>