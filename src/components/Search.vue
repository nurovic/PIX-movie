<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { mapActions } from 'vuex';
export default {
    components: {
    },
    data() {
        return {
            searched: [],
            showSearchResult: true,
        }
    },
    methods: {
        ...mapActions("tmdb", ["MOVIE_SEARCH"]),


        routerLink(id) {
            this.isLoading = true
            this.$router.push(`/movie/${id}`)
            this.isLoading = false
        },
        debounceSearch(event) {
            this.showSearchResult = true
            this.fetchSearch(event.target.value)
            if (event.target.value.length === 0) {
                return this.showSearchResult = false
            }
        },

        async fetchSearch(term) {
            try {
                this.searched = await this.MOVIE_SEARCH(term)
            } catch (error) {
                console.log(error)
            }
        }

    },
}
</script>


<template>
    <div>
        <input class="border-4 w-56 h-8 rounded-full" @input="debounceSearch" type="text" placeholder="Search Movie...">
        <div>
            <Loading />
        </div>
        <div>
            <ul class="absolute z-20 mt-2" v-if="showSearchResult">
                <li v-for="movie in searched" :key="movie.id">
                    <router-link class="flex flex-row mb-4 border rounded w-56 bg-slate-400" :to="`/movie/${movie.id}`">
                        <img class="h-12" :src="`https://image.tmdb.org/t/p/w500` + movie.poster_path" alt="">
                        <div class="font-bold text-white ml-4 w-40">{{movie.original_title}}</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>



<style>

</style>