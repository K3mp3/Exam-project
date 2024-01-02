<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import ConsumerNavMobile from "./ConsumerNavMobile.vue";
import type { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    const navMobile = ref(true)
    const navTablet = ref(false)
    const navDesktop = ref(false)

    let width = document.documentElement.clientWidth;

    function updateScreenSize() {
        window.addEventListener("resize", updateScreenSize);
        width = document.documentElement.clientWidth;

        if (width < 700) {
            navMobile.value = true;
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

    function showNav() {
        console.log("hej");
    }

    onMounted(() => {
        updateScreenSize();
    })
</script>

<template>
    <ConsumerNavMobile v-if="navMobile"></ConsumerNavMobile>

    <div class="nav-parent-container" v-if="navTablet">
        <div class="nav-child-container left">
            <RouterLink to="register" class="router-link">Registrera</RouterLink>
        </div>
        <div class="nav-child-container center">
            <h1>Ways</h1>
        </div>
        <div class="nav-child-container right">
            <div class="nav-hamburger-icon">
                <button type="button" @click="showNav">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </div>
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