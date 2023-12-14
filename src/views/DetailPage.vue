<template>
    <side-nav>
        <div v-show="loading" class="loading-class">
                <loading-comp></loading-comp>
        </div>
        <div v-show="!loading">
            <div class="detail-top-img">
                <img :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path"
                    :alt="movie.title + ' Poster'" class="detail-top-img">
            </div>
            <div class="row detail-contents">
                <div class="col-12 col-sm12 col-md-4 col-lg-4">
                    <!-- poster start  -->
                    <div class="movie-poster">
                        <img :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path"
                            :alt="movie.title + ' Poster'" class="poster-img">
                    </div>
                    <!-- poster end  -->
                </div>
                <div class="col-12 col-sm12 col-md-8 col-lg-8">
                    <!-- detail start  -->
                        <!-- circular progress start  -->
                        <div class="d-flex">
                                 <div class="ml-3 mr-3 mt-1">
                                    <v-progress-circular
                                    interminate
                                        :size="55"
                                        :width="5"
                                        :model-value="movie.vote_average * 10"
                                        :color='movie.vote_average >= 7 ? "green" : "yellow"'
                                       >
                                        <span style="color:white">
                                              {{ typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : '' }}
                                        </span>
                                    </v-progress-circular>
                                 </div>
                                 <div class="" style="color:white">
                                    <h3> User<br>Score</h3>
                                </div>  
                        </div>                         
                        <!-- circular progress end  -->
                    <div class="movie-details">
                        <h2 class="white">{{ movie.title }} ( {{ date_slice }} )</h2>
                        <div class="overview white">
                            <p>{{ movie.overview }}</p>
                        </div>
                        <div class="additional-details">
                            <div class="genres ">
                                <strong class="white">Genres:</strong>
                                <ul>
                                    <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
                                </ul>
                            </div>
                            <div class="productions production-companies white">
                                <strong>Production Companies:</strong>
                                <!-- original start  -->
                                <ul>
                                    <li v-for="company in movie.production_companies" :key="company.id">
                                        <div class="row company-loop">
                                            <div class="col-3">
                                                <img v-if="company.logo_path"
                                                    :src="'https://image.tmdb.org/t/p/w200' + company.logo_path"
                                                    :alt="company.name + ' Logo'" class="company-logo"
                                                    style="width:40px;height:40px;">
                                            </div>
                                            <div class="col-9 ">
                                                {{ company.name }} ({{ company.origin_country }})
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                                original end 
                            </div>
                            <div class="release-details white">
                                <strong>Release Date:</strong> {{ movie.release_date }}
                                <br>
                                <strong>Runtime:</strong> {{ movie.runtime }} minutes
                            </div>
                            <!-- Add other details as needed -->
                        </div>
                    </div>
                    <!-- detail end  -->
                </div>
            </div>
            <div class="detail-others white">
                <h2>Casts</h2>
                    <!-- navigation -->
                <swiper 
                    :modules="modules"
                    
                    :slides-per-view="slide_per_view" :space-between="50" @swiper="onSwiper"
                    @slideChange="onSlideChange" :autoplay="true">
                    <swiper-slide v-for="(cast, index) in casts" :key="index">
                        <div class="cast-details" @click="toCastDetail(cast.id)">
                            <img v-if="cast.profile_path" :src="'https://image.tmdb.org/t/p/w200' + cast.profile_path"
                                :alt="cast.name + ' Profile'" class="profile-image">
                            <div class="cast-info">
                                <h4>{{ cast.name }}</h4>
                                <h5>{{ cast.character }}</h5>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <h2>Recommandations</h2>
                <!-- recommandation start  -->
                <div v-if="recommandations.length === 0"> <h2 class="text-center">NO RECOMMANDATION MOVIES</h2></div>
                <div v-else class="row white">
                    <div v-for="(recommand, index) in recommandations" :key="index"
                        class="col-6 col-sm-6 col-md-4 col-lg-2">
                        <div class="card" @click="toDetail(recommand.id)">
                            <img :src="`https://image.tmdb.org/t/p/w200${recommand.poster_path}`" class="card-img-top"
                                alt="Movie Poster">
                            <div class="card-body">
                            <!-- circular progress start  -->
                            <div class="circular-progress">
                            <v-progress-circular
                                :size="35"
                                :width="5"
                                :model-value="recommand.vote_average * 10"
                                :color='recommand.vote_average >= 7 ? "green" : "yellow"'
                                >
                                <span style="color:white">{{ recommand.vote_average.toFixed(1) }}</span>
                            </v-progress-circular>
                            </div>                                  
                        <!-- circular progress end  -->
                            <h5 v-if="recommand.title.length < 24" class="card-title mt-3">{{ recommand.title }}</h5>
                            <h5 v-else class="card-title mt-3">{{ recommand.title.slice(0, 23) }}...</h5>
                            <p class="card-text">{{ recommand.release_date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- recommandation end  -->
                      <!-- Start loading indicator -->
                    <div class="d-flex justify-content-center" v-if="loadingStatus">
                        <div class="spinner-border white" role="status">
                            <span class="sr-only ">Loading...</span>
                        </div>
                    </div>
                    <!-- End loading indicator -->
            </div>

        </div>
    </side-nav>
</template>
<script  src="../js/DetailPage.js"></script>

<style scoped>
/* Main container styles */
.loading-class {
    height: 100vh;
}
.white{
    color: white;
}
.side-nav {
    display: flex;
}
/* Movie poster styles */
.movie-poster img {
    width: 200px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Movie details styles */
.movie-details {
    margin-left: 20px;
}

.movie-details h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.overview p {
    font-size: 16px;
    line-height: 1.5;
}

.additional-details {
    margin-top: 20px;
}

.genres ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 10px;
}

.genres li {
    display: inline-block;
    margin-right: 10px;
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
}
.productions ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 10px;
}

.productions li {
    display: inline-block;
    margin-right: 10px;
    /* background-color: #f0f0f0; */
    /*padding: 4px 8px; */
    border-radius: 4px;
    font-size: 12px;
    color: white;
}

/* .production-companies ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 10px;
}

.production-companies li {
    margin-bottom: 5px;
} */

.release-details {
    font-size: 14px;
    margin-top: 10px;
}

.loading-message {
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
}

.company-logo {
    width: 100px;
    height: auto;
    margin-right: 10px;
}

.company-loop {
    align-items: center;
}

.movie-poster {
    padding-left: 18px;
}

.detail-top-img {
    width: 100%;
    position: relative;
    z-index: 10;
    opacity: 0.5;
    height: 100vh;
}

.detail-contents {
    width: 85%;
    position: absolute;
    top: 0;
    padding-top: 20vh;
    z-index: 20;
}

movie-poster img {
    width: 100%;
    height: 40vh;
}

/* swiper start */
/* Adjust Swiper container */
.detail-others {
    margin-top: 20px;
}

/* Style the Casts header */
.detail-others h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

/* Style individual cast details container */
.cast-details {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

/* Style cast profile image */
.profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    /* To make the profile image circular */
    margin-right: 15px;
}

/* Style cast information */
.cast-info h4 {
    font-size: 18px;
    margin-bottom: 5px;
}

.cast-info h5 {
    font-size: 16px;
    color: #777;
    margin-bottom: 0;
}

/* swiper end  */
/* recommandation start  */
.card {
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
}

.card-img-top {
    height: 250px;
    object-fit: cover;
}
.card-title{
    font-size: 14px;
}
.card-body{
    height: 130px;
    background-color: black;
    color: white;
}
.loading-class{
    height: 100vh;
}
.circular-progress{
    position: absolute;
    margin-top: -4.5vh;
}
@media (max-width: 475px) {
    .card-img-top {
        height: 180px;
    }
}
/* recommandation end  */
@media (max-width: 768px) {
    .detail-top-img {
        display: none;
    }

    .detail-contents {
        position: relative;
        padding-top: 0vh;
        z-index: 20;
        width: 100%;
    }

    .poster-img {
        width: 100% !important;
        height: 30vh;
    }
}</style>
