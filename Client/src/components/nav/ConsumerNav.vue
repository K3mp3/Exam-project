<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import ConsumerNavMobile from "./ConsumerNavMobile.vue";
    import ConsumerNavTablet from './ConsumerNavTablet.vue';

    const navMobile = ref(true)
    const navTablet = ref(false)
    const navDesktop = ref(false)

    let width = document.documentElement.clientWidth;

    function updateScreenSize() {
        window.addEventListener("resize", updateScreenSize);
        width = document.documentElement.clientWidth;

        if (width < 700) {
            navMobile.value = true;

            navTablet.value = false;
            navDesktop.value = false;
            return;
        }

        if (width > 1481) {
            navDesktop.value = true;
            navTablet.value = false;
            navMobile.value = false;
            return;
        } else {
            navDesktop.value = false;
        }
        
        if (width > 699) {
            navTablet.value = true;
            navMobile.value = false;
        } else {
            navTablet.value = false;
        }
    }

    onMounted(() => {
        updateScreenSize();
    })
</script>

<template>
    <ConsumerNavMobile v-if="navMobile"></ConsumerNavMobile>
    <ConsumerNavTablet v-if="navTablet"></ConsumerNavTablet>
   
    <div class="nav-parent-container" v-if="navDesktop">
        <div class="nav-child-container left">
            <h1>Ways</h1>
        </div>
        <div class="nav-child-container center">
            <RouterLink to="register" class="router-link"><fontAwesome :icon="['fas', 'house']" /> Registrera</RouterLink>
            <RouterLink to="register" class="router-link"><fontAwesome :icon="['fas', 'address-book']" /> Kontakt</RouterLink>
            <RouterLink to="register" class="router-link"><fontAwesome :icon="['fas', 'address-card']" /> Om oss</RouterLink>
            <RouterLink to="register" class="router-link"><fontAwesome :icon="['fas', 'question']" /> FAQ</RouterLink>
        </div>
        <div class="nav-child-container right">
            <RouterLink to="register" class="router-link-register">Registrera</RouterLink>
            <RouterLink to="register" class="router-link-sign-in">Logga in</RouterLink>
        </div>
    </div>
</template>