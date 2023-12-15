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
      cast_obj: {},
      social_obj: {},
      links: {
        fb_link: null,
        twit_link: null,
        insta_link: null,
      },
      cast_age: null,
      expanded: false,
      showButton: false,
      truncatedBiography: '',
      fullBiography: '',
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
      getCastDetail() {
      axios.get(`${this.$store.state.url}person/${this.person_id}?api_key=${this.$store.state.api_key}`)
        .then(res => res.data)
        .then(data => {
          this.cast_obj = data;
          this.cast_age = this.calculateAge(this.cast_obj.birthday);
          // Check if the biography text exceeds a certain length to determine if the "Show More" button is necessary
          this.showButton = this.cast_obj.biography.length > 500;

          // Set initial content to show
          this.truncatedBiography = this.cast_obj.biography.substring(0, 500); // Initial character limit
          this.fullBiography = this.cast_obj.biography;
        })
        .catch(error => {
          console.error(error);
        });
    },
      getCastSocial() {
      axios.get(`${this.$store.state.url}person/${this.person_id}/external_ids?api_key=${this.$store.state.api_key}`)
        .then(res => res.data)
        .then(data => {
          this.social_obj = data;
          if (this.social_obj.facebook_id != null && this.social_obj.facebook_id != "") {
            this.links.fb_link = "https://www.facebook.com/" + this.social_obj.facebook_id;
          }
          if (this.social_obj.twitter_id != null && this.social_obj.twitter_id != "") {
            this.links.twit_link = "https://www.twitter.com/" + this.social_obj.twitter_id;
          }
          if (this.social_obj.instagram_id != null && this.social_obj.instagram_id != "") {
            this.links.insta_link = "https://www.instagram.com/" + this.social_obj.instagram_id;
          }
          if (this.social_obj.wikidata_id != null && this.social_obj.wikidata_id != "") {
            this.links.wiki_link = "https://www.wikidata.org/wiki/" + this.social_obj.wikidata_id;
          }


       
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
    calculateAge(birthdate) {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    },
    toDetail(id) {
        this.movie_id = id;
        router.push({ path: '/DetailPage', query: { movie_id: this.movie_id } })
    },
  },
    mounted() {
    this.person_id = this.$route.query.cast_id;
      this.getMovies();
      this.getCastDetail();
      this.getCastSocial();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This will create a smooth scroll effect, if supported
    });
  },
};