<template>
    <div class="wrapper">
        <nav class="main-navbar">
            <div>
                <img src="../../assets/TZ.svg" alt="" @click="toHome">
            </div>
            <div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="query" @keypress.enter="SearchQuery"
                        placeholder="Search Here">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="SearchQuery"><i
                                class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
            </div>
        </nav>

        <div class="for-main-content">
            <div class="for-sidebar">
                <nav class="side-navbar">
                    <ul class="sidebar-padding">
                        <li><a href="#" @click="toHome"> <i class="nav-icon fas fa-th"></i> Home</a></li>
                        <li><a href="#" @click="notAvailable"> <i class="fa-solid fa-star"></i> Favourite</a></li>
                        <li><a href="#" @click="notAvailable"><i class="fa-solid fa-download"></i> Download</a></li>
                        <li><a href="#" @click="notAvailable"><i class="fa-solid fa-clock-rotate-left"></i> History</a></li>
                    </ul>
                    <div style="background-color:lightgray">Recommends</div>
                    <ul class="sidebar-padding">
                        <li><a href="#" @click="notAvailable">Most Popular</a></li>
                        <li><a href="#" @click="notAvailable">Recent Updates</a></li>
                        <li><a href="#" @click="notAvailable">Completed</a></li>
                    </ul>
                </nav>
            </div>
            <div class="content-wrapper">
                <section class="content">
                    <div class="container-fluid">
                        <slot></slot>
                    </div>
                </section>
            </div>
        </div>

        <footer class="main-footer">
        </footer>
    </div>
</template>

<script>
import router from "../../router/index";
export default {
    name: 'sideNav',
    data() {
        return {
            query: null,
        };
    },
    computed: {},
    methods: {
        toHome() {
            this.$router.push({ name: 'Home' });
        },
        notAvailable() {
            alert("not Available this Feature for now");
        },
        SearchQuery() {
            // alert(this.query);
            sessionStorage.setItem('query', this.query);
            // sessionStorage.setItem('page', 1);
            router.push({ path: '/SearchPage', query: { query: this.query } })
        }
    },

    mounted() {
        if (sessionStorage.getItem('query') !== null) {
            this.query = sessionStorage.getItem('query');
        }
    },
};
</script>

<style scoped>
.main-navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px 0px 10px;
    background-color: #ea5a88;
    position: fixed;
    top: 0;
    z-index: 1000;
}

.for-main-content {
    display: flex;
    padding-top: 12vh;
}

.for-sidebar {
    width: 15%;
    height: 100vh;
}

.content-wrapper {
    width: 85%;
}

/* side start  */

.for-sidebar ul {
    list-style: none;
    padding: 10px;
}

.for-sidebar li {
    margin-bottom: 10px;
    /* Adjust as needed */
}

.for-sidebar a {
    text-decoration: none;
    color: #333;
    /* Link color */
    display: block;
    /* Other styles */
}

/* side end  */
.side-navbar {
    position: fixed;
}

@media (max-width: 768px) {
    .for-sidebar {
        display: none;
    }

    .content-wrapper {
        width: 100%;
        /* height: 100%; */
        /* background-color: black; */
    }
}</style>
