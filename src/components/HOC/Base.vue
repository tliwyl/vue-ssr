<template>

</template>

<script>
    export default {
        name: "Base",
        methods:{
            pushPage(url){
                this.$router.push(url)
            },
            replacePage(url){
                this.$router.replace(url)
            }
        }
    }
</script>

<style scoped>

</style>
