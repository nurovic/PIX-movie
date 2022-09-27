<!-- eslint-disable vue/multi-word-component-names -->
<script>
import MovieListItem from '../components/MovieListItem.vue'
import { mapActions, mapState } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    MovieListItem
  },

  methods: {
    ...mapActions("tmdb", ["FETCH_POPULAR_MOVIE"]),
  },
  computed:{
    ...mapState("tmdb", ["movies"])

  },
  async mounted() {
    await this.FETCH_POPULAR_MOVIE();

  },
}
</script>


<template>
  <div class="flex flex-wrap h-screen p-20">
    <div v-for="movie in movies" :key="movie.id">
      <MovieListItem :movieList={movie} />
    </div>
  </div>
</template>

