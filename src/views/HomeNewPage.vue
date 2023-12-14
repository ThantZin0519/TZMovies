<template>
    <side-nav>
        <div v-show="loading" class="loading-class">
            <loading-comp></loading-comp>
        </div>
        <div v-show="!loading">
            <div class="row">
                <div v-for="(movie, index) in movies_obj" :key="index" class="col-6 col-sm-6 col-md-4 col-lg-2">
                    <!-- movie start -->
                    <div class="card"  @click="toDetail(movie.id)">
                        <!-- tooltip start  -->
                        
                        <!-- tooltip end  -->
                        <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" class="card-img-top" alt="Movie Poster">
                            
                        <div class="card-body">
                                 <!-- circular progress start  -->
                                 <div class="circular-progress">
                                    <v-progress-circular
                                    interminate
                                        :size="35"
                                        :width="5"
                                        :model-value="movie.vote_average * 10"
                                        :color='movie.vote_average >= 7 ? "#21D07A" : "yellow"'
                                       >
                                        <span style="color:white">{{ movie.vote_average }}</span>
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
            <!-- Start loading indicator -->
            <div class="d-flex justify-content-center" v-if="loadingStatus">
                <div class="spinner-border white" role="status">
                    <span class="sr-only ">Loading...</span>
                </div>
            </div>
            <!-- End loading indicator -->
                <!-- test start  -->
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                      <div class="modal-content bg-black" style="color:white;">
                        <!-- <div class="modal-header table-success">
                          <h1 class="modal-title fs-5" id="staticBackdropLabel" style="color:white">Sending Confirmation</h1>
                          <button type="button" id="closeBtn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div> -->
                        <div class="modal-body">
                         <div >
                            <h1>Hello , {{ movie_id }}</h1>
                         </div>
                      </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                      </div>
                    </div>
                <!-- test end  -->
        </div>
    </side-nav>
</template>
<script  src="../js/HomeNewPage.js"></script>

<style scoped>
.white{
    color: white;
}
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
@media (max-width: 475px) {
    .card-img-top {
        height: 180px;
    }
}
.circular-progress{
    position: absolute;
    margin-top: -4.5vh;
}
</style>
