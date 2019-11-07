<template>
    <ul class="header">
        <li @click="pushPage('/')">首页</li>
        <li  @click="pushPage('/newsList')">新闻列表</li>
    </ul>
</template>

<script>
    import Base from '@components/HOC/Base.vue';

    export default {
        name: "v-header",
        extends: Base,
        methods: {}
    }
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        height: 30px;
        color: #555;
        align-items: center;
        justify-content: space-around;
        background: #ccc;

        li {
            flex: 1;
            text-align: center;
            font-size: 12px;
            cursor: default;
        }
    }

</style>
