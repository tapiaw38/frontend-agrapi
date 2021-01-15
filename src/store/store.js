
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://www.agrapi.com.ar/api/v1.0'

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        admin: localStorage.getItem('user_admin') || false, 
        search: [],
        production: [],
        producer: [],
        profile: {},
        pages: 1,
        countProducer: '',
        email: localStorage.getItem('email') || null,
        first_name: localStorage.getItem('first_name') || null,
        last_name: localStorage.getItem('last_name') || null,
        username: localStorage.getItem('username') || null,
        phone_number: localStorage.getItem('phone_number') || null,
        polls: localStorage.getItem('polls') || null,
        picture: localStorage.getItem('picture') || null,
        isBusy: true,
        show: true,
        editProfileAlert: false,
        
    },
    getters: {
        loggedIn: state => state.token,
        admin: state => state.admin,
        email: state => state.email,
        first_name: state => state.first_name,
        last_name: state => state.last_name,
        username: state => state.username,
        phone_number: state => state.phone_number,
        picture: state => 'http://www.agrapi.com.ar'+state.picture,
        polls: state => state.polls,
        production: state => state.production,
        producer: state => state.producer,
        search: state => state.search,
        profile: state => state.profile,
        pages: state => state.pages,
        countProducer: state => state.countProducer,
        isBusy: state => state.isBusy,
        show: state => state.show,
        editProfileAlert: state => state.editProfileAlert
        
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
        retrieveAdmin(state, admin) {
            state.admin = admin
        },
        destroyAdmin(state){
          state.admin = false
        },
        retrieveProduction(state, production) {
          state.production = production
        },
        retrieveProducer(state, producer) {
          state.producer = producer
        },
        retrieveSearch(state, search) {
          state.search = search
        },
        retrieveCountProducer(state, countProducer) {
          state.countProducer = countProducer
        },
        retrieveProfile(state,profile) {
          state.profile = profile
        },
        retrievePages(state, pages) {
          state.pages = pages
        },
        retrieveEmail(state, email) {
          state.email = email
        },
        retrieveLastName(state, last_name) {
          state.last_name = last_name
        },
        retrieveFirstName(state, last_name) {
          state.first_name = last_name
        },
        retrieveUsername(state,username) {
          state.username = username
        },
        retrievePhoneNumber(state, phone_number) {
          state.phone_number = phone_number
        },
        retrievePicture(state, picture) {
          state.picture = picture
        },
        retrievePolls(state, polls) {
          state.pols = polls
        },
        retrieveisBusy(state, isBusy){
          state.isBusy = isBusy
        },
        retrieveShow(state, show){
          state.show = show
        },
        retrieveEditAlert(state, editProfileAlert) {
          state.editProfileAlert = editProfileAlert
        }
    },
    actions: {
        destroyToken(context) {
      
            if (context.getters.loggedIn) {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              //
              localStorage.removeItem('user_admin')
              context.commit('destroyAdmin')
            }
        },
        retrieveToken(context, credentials) {

            return new Promise((resolve, reject) => {
              axios.post('/users/login/', {
                email: credentials.email,
                password: credentials.password,
              })
                .then((response) => {

                  const token = response.data.access_token
                  console.log(response.status)
                  localStorage.setItem('access_token', token)
                  context.commit('retrieveToken', token)
                  
                  const admin = response.data.user.is_admin
                  const picture = response.data.user.profile.picture
                  
                  const email = response.data.user.email
                  const first_name = response.data.user.first_name
                  const last_name = response.data.user.last_name
                  const username = response.data.user.username
                  const phone_number = response.data.user.phone_number
                  const polls = response.data.user.profile.polls
                  
                  localStorage.setItem('user_admin',admin)
                  localStorage.setItem('email', email)
                  localStorage.setItem('first_name', first_name)
                  localStorage.setItem('last_name', last_name)
                  localStorage.setItem('username', username)
                  localStorage.setItem('phone_number', phone_number)
                  localStorage.setItem('picture', picture)
                  localStorage.setItem('polls', polls)

                  context.commit('retrieveAdmin', admin)
                  context.commit('retrieveEmail', email)
                  context.commit('retrieveLastName', last_name)
                  context.commit('retrieveFirstName', first_name)
                  context.commit('retrieveUsername', username)
                  context.commit('retrievePhoneNumber', phone_number)
                  context.commit('retrievePicture', picture)
                  context.commit('retrievePolls', polls)
                  console.log(response)
                  resolve(response)
                  // context.commit('addTodo', response.data)
                })
                .catch(error => {
                  console.log("error",error.response.data.non_field_errors)
                  reject(error)
                })
              })
        },
        retrieveProduction(context,num_page) {
          return new Promise ((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.token
  
            const params = {
              page: num_page,
            }
            const path = '/producers/'
  
            axios.get(path,{params})
              .then(response => {
                context.commit('retrieveProduction', response.data.results)
                context.commit('retrieveCountProducer' ,response.data.count)
                context.commit('retrieveisBusy', false)
                context.commit('retrievePages', response.data.total_pages)

                resolve(response)
              })
              .catch(error => {
                console.log(error)
                context.commit('retrieveisBusy', false)
                reject(error)
              })
          })
        },
        retrieveProducer(context,producerId) {
          return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.token
            const path = `http://www.agrapi.com.ar/api/v1.0/producers/${producerId}/`
            axios.get(path)
              .then(response =>{
                context.commit('retrieveProducer', response.data.producer)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
        },
        retrieveSearch(context,search) {
          return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.token
            console.log(search)
            const path = `http://www.agrapi.com.ar/api/v1.0/producers/?search=${search}/`
            axios.get(path)
              .then(response =>{
                context.commit('retrieveSearch', response.data.producer)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
        },
        retrieveProfile(context, form) {
          return new Promise((resolve, reject) => {
            axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.token
            
            //const config = { headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryvlb7BC9EAvfLB2q5' } };
            //const config = { headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' } };
            const path = `http://www.agrapi.com.ar/api/v1.0/users/${context.state.username}/`
            axios.patch(path, form)
              .then(response => {
                //console.log(response)
        
                const first_name = response.data.first_name
                const last_name = response.data.last_name
                const phone_number = response.data.phone_number
                //const picture = response.data.profile.picture
                
                localStorage.setItem('first_name', first_name)
                localStorage.setItem('last_name', last_name)
                localStorage.setItem('phone_number', phone_number)
                //localStorage.setItem('picture', picture)

                context.commit('retrieveLastName', last_name)
                context.commit('retrieveFirstName', first_name)
                context.commit('retrievePhoneNumber', phone_number)
                //context.commit('retrievePicture', picture)
                context.commit('retrieveEditAlert', true)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
        },
        retrievePicture(context, formData) {
          return new Promise((resolve, reject) => {
            //axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.token
            //const config = { headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryvlb7BC9EAvfLB2q5' } };
            const config = { 
              headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                'Authorization': 'Token ' + context.state.token,
              }
            };
            const path = `http://www.agrapi.com.ar/api/v1.0/users/${context.state.username}/profile/`
            axios.patch(path, formData, config)
              .then(response => {
                //console.log(response)
                const picture = response.data.profile.picture
                console.log(response.data.profile.picture)
      
                localStorage.setItem('picture', picture)

                context.commit('retrievePicture', picture)

                context.commit('retrieveEditAlert', true)
                resolve(response)
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
        },
        retrieveShow(context, response) {
          return new Promise((resolve, reject) => {
            context.commit('retrieveShow', response)
          })
        }
    },  
})