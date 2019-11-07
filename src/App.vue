<template>
    <div>
        <vHeader></vHeader>
        <router-view></router-view>
    </div>

</template>

<script>
    import vHeader from '@components/header/v-header.vue';

    export default {
        name: "App",
        components: {
            vHeader
        }
    }
</script>

<style  lang="css">
    *{
        padding:0;
        margin:0;
    }
    li{
        list-style-type: none;
    }
</style>
