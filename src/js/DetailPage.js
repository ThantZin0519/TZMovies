import SideNav from '../components/layouts/sideNav.vue';
import axios from 'axios';
 // Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiper } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import router from "../router/index.ts";
import { Navigation,  Autoplay  } from 'swiper/modules';
import 'swiper/css/navigation';
import LoadingComp from '../components/layouts/LoadingComp.vue';

export default {
  components: {
    SideNav,
    Swiper,
    SwiperSlide,useSwiper,LoadingComp
  },
  data() {
    return {
      slide_per_view: 2,
      loading: true,
      movie: {},
      casts: {},
      recommandations : {},
      page: 1,
      movie_id: null,
      date_slice: null,
      cast_id :null,
    };
  },
  methods: {
    getScreenWidth() {
      var screenWidth = window.innerWidth;
      switch(true) {
        case screenWidth >= 1300:
          this.slide_per_view = 5;
          break;
        case screenWidth >= 1200:
          this.slide_per_view = 4;

          break;
        case screenWidth >= 768:
          this.slide_per_view = 3;
          break;
        case screenWidth >= 600:
          this.slide_per_view = 3;
          break;
        default:
          this.slide_per_view = 2;
          break;
      }
    },
    getMovies() {
      // const screenWidth = window.innerWidth;

      axios.get(`${this.$store.state.url}/movie/${this.movie_id}?api_key=${this.$store.state.api_key}`)
        .then(res => res.data)
        .then(data => {
          this.movie = data;
          this.date_slice = this.movie.release_date.slice(0, 4);
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getCasts() {
      axios.get(`${this.$store.state.url}/movie/${this.movie_id}/credits?api_key=${this.$store.state.api_key}`)
        .then(res => res.data)
        .then(data => {
          this.casts = data.cast;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getRecommandations() {
      axios.get(`${this.$store.state.url}/movie/${this.movie_id}/recommendations?api_key=${this.$store.state.api_key}`)
        .then(res => res.data)
        .then(data => {
          this.recommandations = data.results;
        })
        .catch(error => {
          console.error(error);
        });
    },
     toDetail(id) {
       this.movie_id = id;
      //  alert(this.movie_id);
       router.push({ path: '/DetailPage', query: { movie_id: this.movie_id } });
      // setInterval('window.location.reload()', 50);
    },
    toCastDetail(id) {
      this.cast_id = id;
     //  alert(this.cast_id);
      router.push({ path: '/CastDetailPage', query: { cast_id: this.cast_id } });
     // setInterval('window.location.reload()', 50);
    },
    useSwiper() {
      
    },
  },
    watch: {
      $route(to, from) {
        if (to.path === '/DetailPage') {
          this.loading= true;
          this.movie= {};
          this.casts= {};
          this.recommandations = {};
          this.page= 1;
          this.movie_id= null;
          this.date_slice= null;
          window.scrollTo({
            top: 0,
            behavior: 'smooth' 
          });
          this.movie_id = this.$route.query.movie_id;
          this.getMovies();
          this.getCasts();
          this.getRecommandations();
        }
      }
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
        // alert("swiper");
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      const useswiper = useSwiper();

        
      return {
        onSwiper,
        onSlideChange, useswiper,
        modules: [Navigation, Autoplay ],

      };
    },
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This will create a smooth scroll effect, if supported
    });
    this.movie_id = this.$route.query.movie_id;
    this.getMovies();
    this.getCasts();
    this.getRecommandations();
    this.getScreenWidth();
    window.addEventListener('resize', this.getScreenWidth);

  },
};