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
                              <h5 v-if="movie.title.length < 24" class="card-title mt-3">{{ movie.title }}</h5>
                              <h5 v-else class="card-title mt-3">{{ movie.title.slice(0, 23) }}...</h5>
                            <p class="card-text">{{ movie.release_date }}</p>
                        </div>
                    </div>
                    <!-- movie end -->
                </div>
            </div>
                <!-- Pagination -->
                  <div class="d-flex justify-content-center">
                    <nav aria-label="Page navigation">
                      <ul class="pagination">
                        <li class="page-item" :class="{ disabled: page === 1 }">
                          <a class="page-link" href="#" aria-label="First" @click="goToFirstPage">
                            First
                          </a>
                        </li>

                        <li class="page-item" :class="{ disabled: page === 1 }">
                          <a class="page-link" href="#" aria-label="Previous" @click="prevPage">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>

                        <li v-for="pageNumber in displayedPages" :key="pageNumber" class="page-item" :class="{ active: pageNumber === page }">
                          <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                        </li>

                        <li class="page-item" :class="{ disabled: page === totalPages }">
                          <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>

                        <li class="page-item" :class="{ disabled: page === totalPages }">
                          <a class="page-link" href="#" aria-label="Last" @click="goToLastPage">
                            Last
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <!-- End Pagination -->
        </div>
    </side-nav>
</template>
<script  src="../js/SearchPage.js"></script>

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
</style>
