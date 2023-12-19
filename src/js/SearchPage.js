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
      movies_obj: [],
      page: 1,
      query: null,
      totalResults: 0,
      pageSize: 20 // Adjust to api response
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.pageSize);
    },
    displayedPages() {
      const startPage = Math.max(1, this.page - 1);
      const endPage = Math.min(this.totalPages, startPage + 4);
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    getMovies() {
      axios
        .get(`${this.$store.state.url}search/movie?api_key=${this.$store.state.api_key}&page=${this.page}&query=${this.query}`)
        .then((res) => {
          this.totalResults = res.data.total_results;
          this.movies_obj = res.data.results;
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.page = pageNumber;
        // this.getMovies();
        this.gotoSearchPage();
      }
    },

    prevPage() {
      if (this.page > 1) {
        this.page--;
        // this.getMovies();
        this.gotoSearchPage();
      }
    },

    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        // this.getMovies();
        this.gotoSearchPage();
      }
    },
    goToFirstPage() {
      if (this.page !== 1) {
        this.page = 1;
        // this.getMovies();
        this.gotoSearchPage();
      }
    },

    goToLastPage() {
      if (this.page !== this.totalPages) {
        this.page = this.totalPages;
        // this.getMovies();
        this.gotoSearchPage();
      }
    },
    toDetail(id) {
        this.movie_id = id;
        router.push({ path: '/DetailPage', query: { movie_id: this.movie_id } })
    },
    gotoSearchPage(){
      router.push({ path: '/SearchPage', query: { query: this.query , p : this.page } })
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === '/SearchPage') {
        this.loading = true;
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        // alert("old query " + this.query);
        let old_query = this.query;
        this.query = this.$route.query.query;
        // this.page = this.$route.query.p; 
        // alert("new query " + this.query);
        if (old_query != this.query) {
          this.page = 1;
        }
          this.getMovies();
      }
    }
  },
  mounted() {
       window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.query = this.$route.query.query;
      this.page = this.$route.query.p;
      // alert(this.page);
      this.getMovies();
  },

};