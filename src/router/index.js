import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// Routers Producers & Production 
import ListProducer from '@/components/producer/ListProducer'
import EditProducer from '@/components/producer/EditProducer'
import DeleteProducer from '@/components/producer/DeleteProducer'
import LocationProducer from '@/components/producer/LocationProducer'
import DateProduction from '@/components/producer/DateProduction'
import DatePerson from '@/components/producer/DatePerson'
//Router Polls
import ListPolls from '@/components/polls/ListPolls'
// Routers User
import Login from '@/components/user/Login'
import Logout from '@/components/user/Logout'
import Profile from '@/components/user/Profile'
import ListUser from '@/components/user/ListUser'
import { store } from '../store/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    //User
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/Users',
      name: 'ListUser',
      component: ListUser,
      meta: {
        requiresVisitor: true
      }
    },
    //Producer & Production
    {
      path: '/producers',
      name: 'ListProducer',
      component: ListProducer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/producer/:producerId/edit',
      name: 'EditProducer',
      component: EditProducer,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/producer/:producerId/delete',
      name: 'DeleteProducer',
      component: DeleteProducer,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/location/:productionId',
      name: 'LocationProducer',
      component: LocationProducer
    },
    {
      path: '/dateProduction/:producerId',
      name: 'DateProduction',
      component: DateProduction,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/datePerson/:producerId',
      name: 'DatePerson',
      component: DatePerson,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile/',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/polls/',
      name: 'ListPolls',
      component: ListPolls,
      meta: {
        requiresAuth: true
      }
    }

  ],
  mode: 'history'
})
