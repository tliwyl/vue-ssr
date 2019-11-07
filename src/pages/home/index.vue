<template>
    <div class="module-home">
        <p @click="go()">{{title}}</p>
        <div>{{section}}</div>
    </div>
</template>

<script>
    import {HOME_FETCH_DATA} from './store/constTypes'

    export default {
        name: "home",

        computed: {
            title: function () {
                return this.$store.state.home.title;
            },
            section: function () {
                return this.$store.state.home.section;
            },
        },

        methods: {

            go() {
                this.$router.push('/newsList')
            }
        },
        fetchData({store, router}) {
            console.log('home fetchData')
            return store.dispatch(HOME_FETCH_DATA);
        },
        mounted() {
            const store = this.$store;
            const router = this.$router;
            const {fetchData} = this.$options;
            const {state} = window.context;
            !state.home.loaded && fetchData({store, router});
        }
    }
</script>

<style scoped lang="scss">
    .module-home {
        background: #eee;

    }
</style>
