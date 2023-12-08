<template>
    <div class="fixed-nav">
        <div class="div-desktop main-nav-bar" >
                      <!-- nav start  -->
                    <nav class="main-nav-bar" style="width:100%;">
                        <div class="flex-container" id="navbarNav">
                            <div class="items nav-image">
                                <div class="row">
                                    <div class="col-5"></div>
                                    <div class="col-4 bg-logo-color parallelogram elevation-5">
                                        <a href="#" class="icon-text">
                                                    <div class="text-content">
                                                      <span class="text-ani">
                                                        <span class="letter">T</span>
                                                        <span class="letter">h</span>
                                                        <span class="letter">a</span>
                                                        <span class="letter">n</span>
                                                        <span class="letter">t</span>
                                                        <span class="letter">Z</span>
                                                        <span class="letter">i</span>
                                                        <span class="letter">n</span>
                                                      </span>
                                                    </div>

                                            </a>
                                    </div>
                                    <div class="col-3"></div>
                                </div>
                            </div>

                            <div :class="['items', { 'active': activeTab === 'home' }]"><a href="#home" class="nav-link">HOME</a></div>
                            <div :class="['items', { 'active': activeTab === 'about' }]"><a href="#about" class="nav-link">ABOUT</a></div>
                            <div :class="['items', { 'active': activeTab === 'service' }]"><a href="#service" class="nav-link">SERVICE</a>
                            </div>
                            <div :class="['items', { 'active': activeTab === 'portfolio' }]"><a href="#portfolio"
                                    class="nav-link">PORTFOLIO</a></div>
                            <div :class="['items', { 'active': activeTab === 'blog' }]"><a href="#blog" class="nav-link">BLOG</a></div>
                            <div :class="['items', { 'active': activeTab === 'contact' }]"><a href="#contact" class="nav-link">CONTACT</a>
                            </div>
                        </div>
                    </nav>
                    <!-- nav end  -->
        </div>
        <div class="div-mobile">
            <nav class="mobile-nav">
                <div class="" style="width:100%">
                    <div class="row mb-2">
                        <div class="col-10"> 
                            <div class=" nav-image ">
                                <a href="#" class="a-tab ">
                                    <div class="my-name ">
                                          <span class="text-ani">
                                            <span class="letter">T</span>
                                            <span class="letter">h</span>
                                            <span class="letter">a</span>
                                            <span class="letter">n</span>
                                            <span class="letter">t</span>
                                            <span class="letter">Z</span>
                                            <span class="letter">i</span>
                                            <span class="letter">n</span>
                                          </span>
                                      </div>
                                </a>
                            </div>
                        </div> 
                        <div class="col-2 d-flex justify-content-center drawer-toggle-buttom">
                            <div  v-if="isDrawerOpen == false" class="drawer-toggle" @click="toggleDrawer">
                                <i class="fa-sharp fa-solid fa-bars"></i>
                            </div>
                            <div v-if="isDrawerOpen == true" class="drawer-toggle" @click="toggleDrawer">
                                    <i class="fa-solid fa-xmark"></i>
                            </div>      
                        </div>
                    </div>
                  
                    <!-- drawer contents start  -->
                        <div :class="['drawer-content', { 'open': isDrawerOpen }]" id="drawer-sidebar">
                          <!-- Content for the drawer -->
                                  <div :class="['items', { 'active': activeTab === 'home' }]">
                                    <a href="#home" class=" drawer-items">HOME</a>
                                  </div>
                                  <div :class="['items', { 'active': activeTab === 'about' }]">
                                    <a href="#about" class="drawer-items">ABOUT</a>
                                  </div>
                                  <div :class="['items', { 'active': activeTab === 'service' }]">
                                    <a href="#service" class="drawer-items">SERVICE</a>
                                  </div>
                                  <div :class="['items', { 'active': activeTab === 'portfolio' }]">
                                    <a href="#portfolio" class="drawer-items">PORTFOLIO</a>
                                  </div>
                                  <div :class="['items', { 'active': activeTab === 'blog' }]">
                                    <a href="#blog" class="drawer-items">BLOG</a>
                                  </div>
                                  <div :class="['items', { 'active': activeTab === 'contact' }]">
                                    <a href="#contact" class="drawer-items">CONTACT</a>
                                  </div>
                        </div>
                    <!-- drawer contents end  -->
                </div>
            </nav>
        </div>
        <div class="div-container">
            <img class="div-img" src="../../public/assets/images/mountain.png" alt="">
            <div class="welcome">WELCOME</div>
        </div>
        <div class="clear">

        </div>
    </div>
</template>

<script>
export default {
    // Your component options here
    data() {
        return {
            isDrawerOpen: false, // Drawer state
            activeTab: 'home', // Default active tab
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            // Update the active tab based on scroll position
            // Adjust the logic as per your specific requirements
            const homeSection = document.getElementById('home');
            const aboutSection = document.getElementById('about');
            const serviceSection = document.getElementById('service');
            const portfolioSection = document.getElementById('portfolio');
            const blogSection = document.getElementById('blog');
            const contactSection = document.getElementById('contact');

            const scrollPosition = window.scrollY;

            if (scrollPosition >= homeSection.offsetTop - 1 && scrollPosition < aboutSection.offsetTop - 25) {
                this.activeTab = 'home';
            } else if (scrollPosition >= aboutSection.offsetTop - 25 && scrollPosition < serviceSection.offsetTop - 25) {
                this.activeTab = 'about';
            } else if (scrollPosition >= serviceSection.offsetTop - 25 && scrollPosition < portfolioSection.offsetTop - 25) {
                this.activeTab = 'service';
            } else if (scrollPosition >= portfolioSection.offsetTop - 25 && scrollPosition < blogSection.offsetTop - 25) {
                this.activeTab = 'portfolio';
            } else if (scrollPosition >= blogSection.offsetTop - 25 && scrollPosition < contactSection.offsetTop - 25) {
                this.activeTab = 'blog';
            } else if (scrollPosition >= contactSection.offsetTop - 25) {
                this.activeTab = 'contact';
            }
        },
        toggleDrawer() {
            this.isDrawerOpen = !this.isDrawerOpen; // Toggle the drawer state
        },
    },
};
</script>



<style scoped>
/* Add your component styles here */
/* mobile and tablet */
    @media (max-width: 1023px){
        /* test start  */
         /* animation start  */
        @keyframes swallow-text {
          0% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.1);
          }
          100% {
            transform: scaleY(1);
          }
        }

        .items.active .drawer-items {
          animation: swallow-text 2s linear forwards;
          background-color:white;
          border-radius: 10%;
          width: fit-content;
          padding: 0 10px;
          opacity:0.9;
          color: black;
          font-weight: bold;
          /* margin-left: -45px!important; */
        }
   
        /* animation end */
        #drawer-sidebar{
            text-decoration: none;
        }
        .div-mobile{
            padding: 10px 10px 0px 10px;
        }
        .my-name{
            font-size: 2rem;
            font-weight: bold;
            margin-top:-3px;
        }
        .a-tab{
            text-decoration: none;
        }
        /* drawer start  */
        .drawer-toggle {
              font-size: 2.3rem;
              color: white;
        }
        .drawer-toggle-buttom{
            margin-top: -8px;
        }

        .drawer-content {
            position: fixed;
            top: 18vh;
            right: 0px;
            width: 175px;
            height: 210px;
            background-color: #f8f9fa;
            transition: transform 0.3s ease-in-out;
            transform: translateX(100%);
            z-index: 998;
            overflow-y: auto;
            padding: 20px;
            border-radius: 2vw;
            background-color: black;
            color: white;
        }

        .drawer-content.open {
          transform: translateX(0);
        }
        .drawer-items{
            text-decoration: none;
            color: white;
            margin-left: 6px;
        }
        /* drawer end  */
        /* test end  */
       
           .div-desktop{
            display: none;
            }
           .nav-image {
            text-align: center;
            background-color: black;
            height: 45px;
            border-radius: 10px;
        }
    
        /* Adjust the image width and height */
        .nav-image img {
            width: 90%;
            height: 50px; 
        }
        .image-text{
            width: auto;
            font-size: 1.5rem;
            color: black;
            text-decoration: none;
        }
    
    
    }
    /* laptop desktop  */
    @media (min-width: 1024px){
          .flex-container {
          display: flex;
          /* flex-wrap: wrap; */
        }
        .div-mobile{
            display: none;
        }
        
         .flex-container {
          display: flex;
          flex-wrap: wrap;
        }
       
        .items:nth-child(1){
            flex-basis: 40%;
            box-sizing: border-box;
        }
        .items:nth-child(2),.items:nth-child(3),.items:nth-child(4),.items:nth-child(5),.items:nth-child(6),.items:nth-child(7){
          flex-basis: 10%;
          box-sizing: border-box;
          padding: 10px;
        }
         /* Center align the content of .nav-image */
        .nav-image {
            text-align: center;
            margin-left: -10%;
        }
    
        /* Adjust the image width and height */
        .nav-image img {
            width: 50px;
            height: 50px;
        }
        .image-text{
           padding:10px;
           position:absolute;
        }
     
        .main-nav-bar{
          width:100vw; 
          height:50px;
        }
          /* animation start  */
        @keyframes swallow-text {
          0% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.1);
          }
          100% {
            transform: scaleY(1);
          }
        }

        .items.active .nav-link {
          animation: swallow-text 2s linear forwards;
          background-color:white;
          border-radius: 10%;
          width: fit-content;
          padding: 0 10px;
          opacity:0.9;
          color: black;
          font-weight: bold;
          margin-left:-5px;
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25), 0 4px 5px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.06);
        }
   
        /* animation end */
    }
    /* overall  */
    /* test start  */
   .icon-text{
    text-decoration: none;
    font-size: 2rem;
   }
    .bg-logo-color {
        background-color: #29323D;
        transform: skewX(-30deg);
        display: inline-block;
        padding: 1px;
    }
    .text-content {
        display: inline-block;
        transform: skewX(30deg);
        font-weight: bold;
        margin-top:-2px;
        /* transform-origin: top left; */
        }
 
    /* test end  */
    .div-img {
        width: 100%;
        height: 60px;
    }
  
    .fixed-nav {
      position: fixed;
      top: 0;
      z-index: 999;
    }
    .fixed-nav{
        background-color: #2A9AEB;
        color: white;
        width: 100%;
    }
     .div-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .welcome {
        position: absolute;
        top: 50%;
        left: -100%;
        transform: translate(-50%, -50%);
        color: green;
        font-size: 30px;
        white-space: nowrap;
        animation: slide-in 4s linear forwards;
    }

    @keyframes slide-in {
        0% {
            left: -100%;
        }
        50% {
            left: 50%;
        }
        100% {
            left: 50%;
        }
    }
    /* text ani start  */
    .text-ani .letter {
      position: relative;
      display: inline-block;
      animation: rainbow-color 4s infinite;
    }

    .text-ani .letter:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
      animation: straight-line 4s infinite linear;
      transform: scaleX(0);
      transform-origin: left;
    }

    @keyframes rainbow-color {
      0% {
        color: white;
      }
      14% {
        color: red;
      }
      28% {
        color: blue;
      }
      42% {
        color: yellow;
      }
      57% {
        color: greenyellow;
      }
      71% {
        color: pink;
      }
      85% {
        color: violet;
      }
      100% {
        color: purple;
      }
    }

    @keyframes straight-line {
      0% {
        transform: scaleX(0);
      }
      20% {
        transform: scaleX(1);
      }
      80% {
        transform: scaleX(1);
      }
      100% {
        transform: scaleX(0);
      }
    }

    /* text ani end  */
  
</style>
