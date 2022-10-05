<script>
    import { mapActions } from "vuex";
    import Loading from '../components/Loading.vue'
    export default {
        name:"MovieSinglePage",
        components: {
            Loading,
        },
        data() {
            return {
                isLoading: true,
                movie: {},
                movie_credits: [],
                movie_similar: [],
                movie_reviews: [],
                favouriButtonText: "Add Favourite"
            }
        },
        methods: {
            ...mapActions("tmdb", ["MOVIE_ID", "MOVIE_CREDITS", "MOVIE_SIMILAR", "MOVIE_REVIEWS"]),
            ...mapActions("user", ["addFavourite", "checkFavourite", "removeFavourite"]),
    
            async handleFavourite(data){
                const check = await this.checkFavourite(data)
                if (!check) {
                    this.addFavourite(data)
                    this.favouriButtonText = "Remove Favourite"
                }else {
                    this.removeFavourite(data)
                    this.favouriButtonText = "Add Favourite"
                }
            },
            async checkButton () {
                const check = await this.checkFavourite(this.movie)
                return !check ? "Add Favourite" : "Remove Favourite"
            },
            async getMovieData() {
                this.movie = await this.MOVIE_ID(this.$route.params.id)
                this.movie_credits = await this.MOVIE_CREDITS(this.$route.params.id)
                this.movie_similar = await this.MOVIE_SIMILAR(this.$route.params.id)
                this.movie_reviews = await this.MOVIE_REVIEWS(this.$route.params.id)
            }
        },
        async mounted() {
            await this.getMovieData()
            this.favouriButtonText = await this.checkButton()
            this.isLoading = false
        },
    
        watch: { 
         '$route.params.id': function() {
            this.getMovieData()
          }
    }
    }
    </script>
    
    <template>
        <div>
            <div v-if="isLoading">
                <Loading />
            </div>
            <div v-else>
                <div class="absolute bg-black bg">
                    <img class="h-screen w-screen opacity-30 object-cover bg-gray-200"
                        :src="`https://image.tmdb.org/t/p/w500` + movie.backdrop_path" alt="backdrop_path">
                </div>
                <div class="absolute h-screen flex flex-row pt-20 pl-40 w-screen text-white">
                    <div class="flex w-1/2">
                        <div>
                            <div class="font-bold flex text-5xl mb-4">{{movie.original_title}}</div>
                            <div class="mb-2 ">{{movie.overview}}</div>
                            <div class="flex justify-between mb-8">
                                <a class="flex underline underline-offset-1 " :href="movie.homepage">WebSite</a>
                                <button
                                class="border rounded p-2 bg-slate-500"
                                @click="handleFavourite(movie)"
                                >{{favouriButtonText}}</button>
                            </div>
                            <div class="mt-4 flex" v-for="genre in movie.genres" :key="genre.id">
                                <div class="border-2 border-slate-700 bg-slate-500 rounded px-2">{{genre.name}}</div>
                            </div>
    
                            <div class="flex flex-wrap h-12 mb-16">
                                <div class="mt-12 opacity-90" v-for="credit in movie_credits" :key="credit.id">
                                    <img class="w-10 h-10 rounded-full"
                                        :src="`https://image.tmdb.org/t/p/w500` + credit.profile_path" alt="">
                                    <div class="absolute opacity-0 hover:opacity-100">{{credit.original_name}}</div>
                                </div>
                            </div>
                            <h2 class="mt-12">Production Companies</h2>
                            <div class=" flex" v-for="production in movie.production_companies.slice(0,3)"
                                :key="production.id">
                                <div class="border-2 border-slate-700 bg-slate-500 rounded px-2">{{production.name}}
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="flex flex-row w-1/3 pl-20">
                        <div>
                            <h1 class="flex mb-8 font-bold text-2xl">Similar </h1>
                            <div class="flex flex-row" v-for="similar in movie_similar" :key="similar.id">
                                <router-link 
                                :to="`/movie/${similar.id}`"
                                class="mb-4 text-slate-200">
                                    <img class="w-16 h-16 mb-4 rounded-full"
                                        :src="`https://image.tmdb.org/t/p/w500` + similar.poster_path" alt="">
                                    <div class="flex w-32">{{similar.original_title.substring(0, 15)}}</div>
                                </router-link>
                            </div>
                        </div>
                        <div class="ml-16">
                            <h1 class="flex mb-8 font-bold text-2xl"> Review</h1>
                            <div v-if="movie_reviews.length === 0">
                                No Review...
                            </div>
                            <div v-else v-for="review in movie_reviews" :key="review.id">
    
                                <div>
                                    <div class="flex font-bold text-l">{{review.author}}</div>
                                    <div class="border-2 rounded border-slate-700  overflow-y-scroll h-32 w-80 mb-6">
                                        {{review.content}}</div>
                                </div>
                            </div>
    
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    
    
    <style>
    
    </style>