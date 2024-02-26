import { createRouter, createWebHistory } from 'vue-router'

// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
// import TNav from '@/layouts/t-nav.vue'
import Menu from '../views/Menu.vue'
import Notification from '../views/Notification.vue'
import Profiles from '../views/Profiles.vue'
import Exams from '../views/Exams.vue'
import Students from '../views/Students.vue'
import InputDataAndAnalysis from '../views/InputDataAndAnalysis.vue'
import Evaluate from '../views/Evaluate.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/menu', name: "menu", component: Menu },
    { path: '/notification', name: "notification", component: Notification },
    { path: '/profiles', name: "profiles", component: Profiles },
    { path: '/exams', name: "exams", component: Exams },
    { path: '/students', name: "students", component: Students },
    { path: '/input-data-and-analysis', name: "input-data-and-analysis", component: InputDataAndAnalysis },
    { path: '/evaluate', name: "evaluate", component: Evaluate },
    // { path: '/nav', component: TNav },
    // { path: '/footer', component: TFooter },
    // {
    //     path: '/user/:id',
    //     component: User,
    //     children: [
    //         {
    //             // UserProfile will be rendered inside User's <router-view>
    //             // when /user/:id/profile is matched
    //             path: 'profile',
    //             component: UserProfile,
    //         },
    //         {
    //             // UserPosts will be rendered inside User's <router-view>
    //             // when /user/:id/posts is matched
    //             path: 'posts',
    //             component: UserPosts,
    //         },
    //     ],
    // },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;