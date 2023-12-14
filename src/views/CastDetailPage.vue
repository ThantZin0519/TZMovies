<template>
    <side-nav>
        <div v-show="loading" class="loading-class">            
            <loading-comp></loading-comp>
        </div>
        <div v-show="!loading">
            <!-- overview start  -->
            <div class="row mt-2 mb-2" style="color: white;">
                <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div class="person-image">
                        <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${cast_obj.profile_path}`" class="person-img" alt="">
                    </div>
                    <div class="social d-flex justify-content-evenly">
                        <span>
                            <a :href="links.fb_link" target="_blank"><span class="facebook"><i class="fa-brands fa-facebook" style="font-size: 2.5em;"></i></span></a>
                        </span>
                        <span>
                            <a :href="links.twit_link" target="_blank"><span class="twitter"><i class="fa-brands fa-square-twitter" style="font-size: 2.5em;"></i></span></a>
                        </span>
                        <span>
                            <a :href="links.insta_link" target="_blank"><span class="instagram"><i class="fa-brands fa-instagram" style="font-size: 2.5em;"></i></span></a>
                        </span>
                    </div>
                    <div class="personal-info">
                    <h1>Personal Info</h1>
                        <div class="known-for ">
                            <strong class="white">Known For</strong>
                            <ul>
                                <li >{{ cast_obj.known_for_department }}</li>
                            </ul>
                        </div>
                        <div class="known-credit ">
                            <strong class="white">Known Credits</strong>
                            <ul>
                                <li >{{ cast_obj.popularity }}</li>
                            </ul>
                        </div>
                        <div class="gender">
                            <strong class="white">Gender</strong>
                            <ul>
                                <li v-if="cast_obj.gender == 1 ">Female</li>
                                <li v-if="cast_obj.gender == 2">Male</li>
                            </ul>
                        </div>
                        <div class="birthday">
                            <strong class="white">Birthday</strong>
                            <ul>
                                <li >{{ cast_obj.birthday }}</li>
                            </ul>
                        </div>
                        <div class="place-birth">
                            <strong class="white">Place Of Birth</strong>
                            <ul>
                                <li >{{ cast_obj.place_of_birth }}</li>
                            </ul>
                        </div>
                        <div class="also-know-as">
                            <strong class="white">Also Known As</strong>
                            <ul>
                                <li v-for="aks in cast_obj.also_known_as" :key="aks">{{ aks }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 mt-3">
                    <h1>{{ cast_obj.name }}</h1>
                    <div class="biography">
                        <h2>Biography</h2>  
                        <div class="biography-text">
                            <p v-if="!expanded" >{{ truncatedBiography }}</p>
                            <p v-else >{{ fullBiography }}</p>
                            <button v-if="showButton" @click="toggleExpanded">{{ expanded ? 'Show Less' : 'Show More' }}</button>
                        </div>                  
                    </div>
                </div>
            </div>
            <!-- overview end  -->
            <div class="row">
                <div v-for="(movie, index) in movies_obj" :key="index" class="col-6 col-sm-6 col-md-4 col-lg-2">
                    <!-- movie start -->
                    <div class="card"  @click="toDetail(movie.id)">
                        <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" class="card-img-top"
                            alt="Movie Poster">
                        <div class="card-body">
                        <!-- circular progress start  -->
                            <div class="circular-progress">
                            <v-progress-circular
                            interminate
                                :size="35"
                                :width="5"
                                :model-value="movie.vote_average * 10"
                                :color='movie.vote_average >= 7 ? "green" : "yellow"'
                                >
                                <span style="color:white">{{ movie.vote_average.toFixed(1) }}</span>
                            </v-progress-circular>
                            </div>                                  
                            <!-- circular progress end  -->
                                <h5 v-if="movie.title.length < 45" class="card-title mt-3">{{ movie.title }}</h5>
                                <h5 v-else class="card-title mt-3">{{ movie.title.slice(0, 44) }}...</h5>
                                <p class="card-text" >{{ movie.release_date }}</p>
                            </div>
                    </div>
                    <!-- movie end -->
                </div>
            </div>
        </div>
    </side-nav>
</template>
<script  src="../js/CastDetailPage.js"></script>

<style scoped>
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
        height: 110px;
        background-color: black;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .loading-class{
        height: 100vh;
    }
    .circular-progress{
        position: absolute;
        margin-top: -4.5vh;
    }
    .person-img{
        width: 100%;
        height: 450px;
        padding: 5%;
        border-radius: 8%;
    }
    .known-for ul,.known-credit ul,.gender ul,.birthday ul,.place-birth ul {
        list-style-type: none;
        padding: 0;
        margin-bottom: 10px;
    }
    .known-for li,.known-credit li,.gender li,.birthday li,.place-birth li {
        margin-left: 1vw;
    }
    .biography-text{
        text-indent: 30px;
    }
    @media (max-width: 475px) {
        .card-img-top {
            height: 180px;
        }
    }
</style>
