<script setup lang="ts">
     import { onMounted, ref } from 'vue';

    const navTablet = ref(false)

    let width = document.documentElement.clientWidth;

    function updateScreenSize() {
        window.addEventListener("resize", updateScreenSize);
        width = document.documentElement.clientWidth;

        if (width > 699) {
            navTablet.value = true;
        } else {
            navTablet.value = false;
        }
    }

    onMounted(() => {
        updateScreenSize();
    })
</script>

<template>
    <img src="../../assets/img/headerCar.png">

    <div class="header-parent-container">
        <div class="register-tab">
            <h2>Jämför och <span>spara</span></h2>
            <p>Hitta prisvärda verkstäder</p>
            <input type="text" placeholder="namn@domän.com">
            <RouterLink to="register" class="header-register-link">Registrera</RouterLink>
        </div>
        <div class="fade-container">
            
        </div>
    </div>
</template>