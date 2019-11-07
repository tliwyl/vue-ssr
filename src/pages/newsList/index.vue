<template>
    <div class="news-list">
        <p class="title">我是新闻列表页</p>
        <ul>
            <li v-for="item in list">{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
    import {NEWS_FETCH_DATA} from './store/constTypes'

    export default {
        name: "news",
        computed: {
            list: function () {
                return this.$store.state.news.list
            }
        },
        fetchData({store, router}) {
            console.log('news fetchData');
            return store.dispatch(NEWS_FETCH_DATA);
        },
        mounted() {
            const router = this.$router;
            const store = this.$store;
            const {state} = window.context;
            const {fetchData} = this.$options;
            !state.news.loaded && fetchData({store, router});
        }
    }
</script>

<style scoped lang="css">
</style>
