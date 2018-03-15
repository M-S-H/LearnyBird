import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GeneticGame from '@/components/GeneticGame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: GeneticGame
    }
  ]
})
