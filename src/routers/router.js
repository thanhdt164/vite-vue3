import { createRouter, createWebHistory } from 'vue-router'

// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
// import TNav from '@/layouts/t-nav.vue'
import Menu from '../views/Menu.vue'
import Notification from '../views/Notification.vue'
import Profiles from '../views/Profiles.vue'
import Exams from '../views/Exam/Exams.vue'
import ExamsDetail from '../views/Exam/ExamDetail.vue'
import Students from '../views/Students.vue'
import InputDataAndAnalysis from '../views/InputDataAndAnalysis.vue'
import Evaluate from '../views/Evaluate.vue'
import QuizMaker from '../views/QuizMaker.vue'
import Login from '../views/Login.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/login', name: "login", component: Login },
    { path: '/menu', name: "menu", component: Menu },
    { path: '/notification', name: "notification", component: Notification },
    { path: '/profiles', name: "profiles", component: Profiles },
    { path: '/exams', name: "exams", component: Exams },
    { path: '/exam-detail', name: "examdetail", component: ExamsDetail },
    { path: '/students', name: "students", component: Students },
    { path: '/input-data-and-analysis', name: "input-data-and-analysis", component: InputDataAndAnalysis },
    { path: '/evaluate', name: "evaluate", component: Evaluate },
    { path: '/quiz-maker', name: "quiz-maker", component: QuizMaker },
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
function parseJwt (token) {
    if(!token) return "";
    var base64Url = token?.split('.')[1];
    var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64)?.split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
router.beforeEach((to, from, next) => {
       var token = parseJwt(localStorage.getItem('token'));
       var currentTime = new Date().getTime();
        // if(((!token || token.exp < currentTime/1000) && to.path !== '/login')){
        //     next('/login');
        //     return;
        // }
       next()
  })
export default router;