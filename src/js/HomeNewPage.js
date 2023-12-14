import SideNav from '../components/layouts/sideNav.vue';
import axios from 'axios';
import router from "../router/index.ts";
import LoadingComp from '../components/layouts/LoadingComp.vue';

export default {
  components: {
    SideNav,LoadingComp
  },
  data() {
    return {
      loading: true,
      loadingStatus: true,
      movies_obj: [],
      page: 1,
      movie_id: null,
    };
  },
  methods: {
      getMovies() {
      axios.get(`${this.$store.state.url}discover/movie?api_key=${this.$store.state.api_key}&page=${this.page}`)
        .then(res => res.data)
        .then(data => {
            this.movies_obj = [...this.movies_obj, ...data.results];
            this.loading = false;
          // // in case of unique movie start 
          //   const newMovies = data.results;
        
          //   // Create a Set to store unique movie IDs
          //   const uniqueMovieIds = new Set(this.movies_obj.map(movie => movie.id));
        
          //   // Filter out duplicates from the new movies
          //   const filteredNewMovies = newMovies.filter(movie => !uniqueMovieIds.has(movie.id));
        
          //   // Concatenate the unique new movies to the existing array
          //   this.movies_obj = [...this.movies_obj, ...filteredNewMovies];
          // // in case of unique movie end 
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleScroll() {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      const isLoadingMore = this.loadingStatus;
      if (bottomOfWindow && isLoadingMore) {
        this.loadingStatus = true;
        this.page++;
        this.getMovies();
      }
      },
      toDetail(id) {
        this.movie_id = id;
        router.push({ path: '/DetailPage', query: { movie_id: this.movie_id } })
    },
     showTooltip() {
      // Assuming 'movie.overview' contains the description of the movie
      this.$refs.tooltip.$refs.content.innerHTML = this.movie.overview;
      this.$refs.tooltip.isActive = true;
    },
    hideTooltip() {
      this.$refs.tooltip.isActive = false;
    }
  },
  mounted() {
    this.getMovies();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};