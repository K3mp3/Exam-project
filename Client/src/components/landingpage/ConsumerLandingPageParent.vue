<script setup lang="ts">
    import ConsumerHeader from "./ConsumerHeader.vue";
    import ConsumerNav from "../nav/ConsumerNav.vue";
    import ConsumerMain from "./ConsumerMain.vue";
    import ConsumerFooter from "../footer/ConsumerFooter.vue";

</script>

<template>
    <header>
        <nav>
            <ConsumerNav></ConsumerNav>
        </nav>
        <ConsumerHeader></ConsumerHeader>
    </header>
    <main>
        <ConsumerMain></ConsumerMain>
    </main>
    <footer>
        <ConsumerFooter></ConsumerFooter>
    </footer>
</template>