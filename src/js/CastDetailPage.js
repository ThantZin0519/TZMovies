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
      person_id: null,
      
    };
  },
  methods: {
      getMovies() {
      axios.get(`${this.$store.state.url}person/${this.person_id}/movie_credits?api_key=${this.$store.state.api_key}&page=${this.page}`)
        .then(res => res.data)
        .then(data => {
          this.movies_obj = [...this.movies_obj, ...data.cast];
          this.loading = false;
          this.loadingStatus = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    toDetail(id) {
        this.movie_id = id;
        router.push({ path: '/DetailPage', query: { movie_id: this.movie_id } })
    },
  },
    mounted() {
    this.person_id = this.$route.query.cast_id;
    this.getMovies();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This will create a smooth scroll effect, if supported
    });
  },
};