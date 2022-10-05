<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { mapActions } from 'vuex';
export default {
    name:"search",
    data() {
        return {
            searched: [],
            showSearchResult: true,
            search: ""
        }
    },
    methods: {
        ...mapActions("tmdb", ["movieSearch"]),
        
        getMovie(id){
            this.$router.push(`/movie/${id}`)
            this.showSearchResult = false
            this.search = ""
        },

        getMovieSearch() {
            this.showSearchResult = true
            this.fetchSearch(this.search)
            if (this.search == 0) {
                return this.showSearchResult = false
            }
        },

        async fetchSearch(search) {
            try {
                this.searched = await this.movieSearch(search)
            } catch (error) {
                console.log(error)
            }
        }

    }
}
</script>


<template>
    <div>
        <input class="border-4 w-56 h-8 rounded-full" @input="getMovieSearch" v-model="search" type="text" placeholder="Search Movie...">
        <div>
            <ul class="absolute z-20 mt-2 overflow-y-auto h-96" v-if="showSearchResult">
                <li v-for="movie in searched" :key="movie.id">
                        <div class="flex flex-row mb-4 border rounded w-56 bg-slate-400" @click="getMovie(movie.id)">
                        <img class="h-12" :src="`https://image.tmdb.org/t/p/w500` + movie.poster_path" alt="">
                        <div class="font-bold text-white ml-4 w-40">{{movie.original_title}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>



<style>

</style>