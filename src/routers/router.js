import { createRouter, createWebHistory } from 'vue-router'

// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
// import TNav from '@/layouts/t-nav.vue'
import InputDataAndAnalysis from '../components/InputDataAndAnalysis.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/menu', name: "menu", component: InputDataAndAnalysis },
    { path: '/notifycation', name: "notifycation", component: InputDataAndAnalysis },
    { path: '/profiles', name: "profiles", component: InputDataAndAnalysis },
    { path: '/exams', name: "exams", component: InputDataAndAnalysis },
    { path: '/students', name: "students", component: InputDataAndAnalysis },
    { path: '/input-data-and-analysis', name: "input-data-and-analysis", component: InputDataAndAnalysis },
    { path: '/evaluate', name: "evaluate", component: InputDataAndAnalysis },
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