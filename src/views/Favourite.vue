<!-- eslint-disable vue/multi-word-component-names -->
<script>
  import MovieListItem from '../components/MovieListItem.vue';
  import { mapState } from 'vuex';
  export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"favourite",
  components: {
    MovieListItem
  },
  computed: {
    ...mapState("user", ["favourites"])
  }
  }
</script>

<template>
  <div class="flex flex-wrap h-screen p-20">
    <div v-if="!favourites.length" class="w-screen font-bold text-2xl"> No Favourite</div>
    <div v-else v-for="movie in favourites" :key="movie.id">
      <MovieListItem :movieList={movie} />
    </div>

  </div>
</template>



<style>

</style>