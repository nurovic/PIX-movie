<!-- eslint-disable vue/multi-word-component-names -->
<script>
import MovieListItem from '../components/MovieListItem.vue'
import { mapActions, mapState } from "vuex";
import Loading from '@/components/Loading.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    MovieListItem,
    Loading
},
  data(){
    return{
      isLoading: true
    }
  },  
  methods: {
    ...mapActions("tmdb", ["FETCH_POPULAR_MOVIE"]),
  },
  computed:{
    ...mapState("tmdb", ["movies"])

  },
  async mounted() {
    await this.FETCH_POPULAR_MOVIE();
    this.isLoading = false

  },
}
</script>


<template>
  <div class="flex flex-wrap h-screen p-20">
    <div v-if="isLoading"> <Loading /> </div>
    <div v-else v-for="movie in movies" :key="movie.id">
      <MovieListItem :movieList={movie} />
    </div>
  </div>
</template>

