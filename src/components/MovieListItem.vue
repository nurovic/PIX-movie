<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div class="w-56 mr-4 mt-6 rounded shadow-md">
        <router-link
        :to="`movie/${movieList.movie.id}`"
        class="h-80">
            <img class="object-fit h-80 w-46 rounded"
                :src="`https://image.tmdb.org/t/p/w500` + movieList.movie.poster_path" alt="">
            <div class="bg-orange-400 relative h-8 w-8 text-gray-100 font-bold rounded-full left-48 bottom-16">{{movieList.movie.vote_average}}</div>
        </router-link>
        <div class="bg mt-2 w-52">
            <div class="font-bold mb-2 text-l" >{{movieList.movie.original_title}}</div>
            <div class="text-slate-400">{{movieList.movie.release_date}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['movieList'],

}

</script>

<style>

</style>