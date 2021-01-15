<template lang="html">
      <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" id="navbar">
        <b-navbar-brand>
          <img src="/static/img/sec-produ.png" alt="logo" width="52" height="auto" id="icon-produ">
          </b-navbar-brand>
          
        <b-navbar-toggle v-b-toggle.my-sidebar target="nav-collapse"></b-navbar-toggle>
    
        <b-collapse is-nav>
          <b-navbar-nav>
            <b-nav-item class="ml-4" :to="{ name: 'Home' }" v-if="loggedIn != null">
              <b-icon icon="house" aria-label="Help"></b-icon>
              Inicio
            </b-nav-item>
            <b-nav-item class="ml-4" :to="{ name: 'ListProducer'}" v-if="loggedIn != null ">
              <b-icon icon="people" aria-label="Help"></b-icon>
              Productores
            </b-nav-item>
            <b-nav-item class="ml-4" :to="{ name: 'ListPolls'}" v-if="loggedIn != null ">
              <b-icon icon="ui-checks" aria-label="Help"></b-icon>
              Encuestas
            </b-nav-item>
            <b-nav-item 
            class="ml-4" 
            :to="{ name: 'ListUser'}" 
            v-if="$store.state.token != null" 
            >
              <b-icon icon="person" aria-label="Help"></b-icon>
              Encuestadores
            </b-nav-item>
            <!--
            <b-nav-item-dropdown text="Producción" right  v-if="loggedIn != null ">
              <b-dropdown-item href="#">Agricola</b-dropdown-item>
              <b-dropdown-item href="#">Ganadera</b-dropdown-item>
              <b-dropdown-item href="#">Agro Industria</b-dropdown-item>
            </b-nav-item-dropdown>
            -->
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-avatar
            :src=picture
            v-if="loggedIn != null"
            class="d-none d-lg-block"
            badge 
            badge-variant="success"
            ></b-avatar>
            <b-nav-item-dropdown 
            right v-if="loggedIn != null"
            class="d-none d-lg-block"
            > 
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{first_name}} {{last_name}}</em>
              </template>
              <b-dropdown-item href="" :to="{ name : 'Profile' }">
                <b-icon icon="person-circle" aria-label="Help"></b-icon>
                 Mi perfil
              </b-dropdown-item>
              <b-dropdown-item href="" :to="{ name : 'Logout' }">
                <b-icon icon="arrow-right-circle-fill" aria-label="Help"></b-icon>
                 Cerrar sesión
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-button
            v-if="loggedIn == null"
            class="mr-2"
            size="md" 
            variant="success"
            id="show-btn" @click="$bvModal.show('bv-modal-login')"
            >
            Iniciar sesión
            </b-button>
          </b-navbar-nav>
        </b-collapse>
          
        <b-sidebar 
        id="my-sidebar" 
        aria-labelledby="sidebar-no-header-title" 
        no-header 
        bg-variant="dark" 
        text-variant="light" 
        shadow
        >
          <template #default="{ hide }">
            <div class="p-3">
              <div class="d-flex">
                <b-avatar
                :src=picture
                v-if="loggedIn != null"
                badge 
                badge-variant="success"
                >
                </b-avatar>
                <b-link
                id="link-profile"
                class="text-light"
                v-if="loggedIn != null"
                :to="{ name : 'Profile' }"
                >
                  <h4 
                  id="sidebar-no-header-title"
                  class="m-2"
  
                  >
                    {{first_name}} {{last_name}}
                  </h4>
                </b-link>
                <h4 v-else>Bienvenido!</h4>
              </div>
              <hr>

              <nav class="mb-3" v-if="loggedIn != false">
                <b-nav vertical>
                  <b-nav-item active :to="{ name: 'Home' }">
                    <b-icon icon="house" aria-label="Help"></b-icon>
                    Inicio
                  </b-nav-item>
                  <b-nav-item :to="{ name: 'ListProducer' }">
                    <b-icon icon="people" aria-label="Help"></b-icon>  
                    Productores
                  </b-nav-item>
                  <b-nav-item :to="{ name: 'ListPolls' }">
                    <b-icon icon="ui-checks" aria-label="Help"></b-icon>  
                    Encuestas
                  </b-nav-item>
                  <b-nav-item v-if="admin != false" :to="{ name: 'ListUser' }">
                    <b-icon icon="person" aria-label="Help"></b-icon>  
                    Encuestadores
                  </b-nav-item>
                </b-nav>
              </nav>
              <b-button
              v-if="loggedIn == null"
              class="mr-2 btn-block"
              size="md" 
              variant="success"
              id="show-btn" @click="$bvModal.show('bv-modal-login')"
              >
              Iniciar sesión
              </b-button>
              <b-button
              v-if="loggedIn != null" 
              variant="primary" 
              class="btn-block" 
              :to="{ name : 'Logout' }"
              >
              Cerrar sesión
              </b-button>
            </div>
          </template>
        </b-sidebar>

      </b-navbar>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Navbar',
    data() {
        return {
         
        }
    },
    computed: {
      ...mapGetters([
        'admin',
        'token',
        'loggedIn',
        'first_name',
        'last_name',
        'picture',
      ])
    },
    methods: {
      ScrollNav () {
        let ubication = window.pageYOffset;
        window.onscroll = function() {
          let actual = window.pageYOffset;
          if (ubication >= actual) {
            document.getElementById('navbar').style.top='0'
          }else {
            document.getElementById('navbar').style.top='-100px';
          }
          ubication = actual;
        }
      }
    },
    created() {
      this.ScrollNav()
    },
}
</script>

<style>
#icon-produ {
  border-radius: 50%;
}
#navbar {
  -webkit-transition: all 500ms;
  /*box-shadow: 0 2px 2px 2px rgba(156, 154, 154, 0.664);*/
}
#link-profile {
  list-style: none;
}
</style>