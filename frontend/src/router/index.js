import { createRouter, createWebHashHistory } from 'vue-router'
import WorkoutView from '../views/WorkoutView.vue'

const routes = [
    {
        path: '/',
        name: 'View of workouts',
        component: WorkoutView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
