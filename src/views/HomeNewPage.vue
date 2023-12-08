<template>
    <side-nav>
        <div v-show="loading" class="loading-class">
            <loading-comp></loading-comp>
        </div>
        <div v-show="!loading">
            <div class="row">
                <div v-for="(movie, index) in movies_obj" :key="index" class="col-6 col-sm-6 col-md-4 col-lg-2">
                    <!-- movie start -->
                    <div class="card" @click="toDetail(movie.id)">
                        <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" class="card-img-top" alt="Movie Poster">
                        <div class="card-body">
                            <h5 v-if="movie.title.length < 15" class="card-title">{{ movie.title }}</h5>
                            <h5 v-else class="card-title">{{ movie.title.slice(0, 12) }}...</h5>
                            <p class="card-text">{{ movie.release_date }}</p>
                            <p class="card-text">{{ movie.vote_average }}</p>
                        </div>
                    </div>
                    <!-- movie end -->
                </div>
            </div>
            <!-- Start loading indicator -->
            <div class="d-flex justify-content-center" v-if="loadingStatus">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <!-- End loading indicator -->
        </div>
    </side-nav>
</template>
<script  src="../js/HomeNewPage.js"></script>

<style scoped>
.card {
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: trannsform 0.3s ease;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
}

.card-img-top {
    height: 300px;
    object-fit: cover;
}
.card-title{
    font-size: 1em;
}
.card-body{
    height: 19dvh;
}
/* .rating {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    white-space: nowrap;
    width: 75px;
    height: 15px;
    background: url('https://via.placeholder.com/75x15') no-repeat 0 0;
} */

/* .stars {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: url('https://via.placeholder.com/75x15') no-repeat 0 -15px;
} */
.loading-class{
    height: 100vh;
}
</style>
