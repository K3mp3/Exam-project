<script setup lang="ts">
    import { useShowMobileNavMenu } from '@/stores/showMobileNavMenuStore';
    import { ref } from 'vue';
    import ConsumerNavMobileMenu from "./ConsumerNavMobileMenu.vue";

    const isNavOpen = ref(false)

    function showMobileNav() {
        isNavOpen.value = !isNavOpen.value

        const showMobileNavMenu = useShowMobileNavMenu();
        showMobileNavMenu.showNavMenu(isNavOpen.value)
    }
</script>

<template>
     <div class="nav-parent-container">
        <div class="nav-child-container left">
            <h1>Ways</h1>
        </div>
        <div class="nav-child-container right">
            <div class="nav-hamburger-icon">
                <button type="button" @click="showMobileNav">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </div>

    <ConsumerNavMobileMenu></ConsumerNavMobileMenu>
</template>