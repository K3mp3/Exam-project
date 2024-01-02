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

    function showNav() {
        console.log("hej");
    }

    onMounted(() => {
        updateScreenSize();
    })
</script>

<template>
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
    <div class="nav-parent-container" v-else>
        <div class="nav-child-container left">
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
</template>