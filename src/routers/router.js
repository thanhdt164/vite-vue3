import { createRouter, createWebHistory } from 'vue-router'

// 1. Define route components.
// These can be imported from other files
import Menu from '../views/Menu.vue'
import Notification from '../views/Notification.vue'
import Profiles from '../views/Profiles.vue'
import Exams from '../views/Exam/Exams.vue'
import ExamsUser from '../views/Exam/ExamsUser.vue'
import ExamsDetail from '../views/Exam/ExamDetail.vue'
import Students from '../views/Students.vue'
import InputDataAndAnalysis from '../views/InputDataAndAnalysis.vue'
import Evaluate from '../views/Evaluate.vue'
import QuizMaker2 from '../views/QuizMaker2.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreateExam from '../views/CreateExam.vue'
import AddUserBLock from '../views/AddUserBLock.vue'
import Template from '@/components/Template/Template.vue'
import DoTest from "@/views/DoTest.vue"
import Tab from '@/components/Template/Tab.vue'
import TextFields from '@/components/Template/TextFields.vue'
import AnalysisDetail from '../views/AnaLysisDetail.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/login', name: "login", component: Login },
    { path: '/register', name: "register", component: Register },
    { path: '/menu', name: "menu", component: Menu },
    { path: '/notification', name: "notification", component: Notification },
    { path: '/profiles', name: "profiles", component: Profiles },
    // { 
    //     path: '/exams', 
    //     name: "exams",
    //     title: "Bài kiểm tra", 
    //     component: Exams,
    //     children: [
    //         { path: '/exam-detail', name: "exam-detail", title: "Chi tiết bài kiếm tra", component: ExamsDetail },
    //     ]
    // },
    { path: '/exams', name: "exams", title: "Danh sách đề thi", component: Exams },
    { path: '/exams-user', name: "exams-user", title: "Bài kiểm tra", component: ExamsUser },
    { path: '/exam-detail', name: "exam-detail", title: "Chi tiết bài kiếm tra", component: ExamsDetail },
    { path: '/students', name: "students", component: Students },
    { path: '/input-data-and-analysis', name: "input-data-and-analysis", component: InputDataAndAnalysis },
    { path: '/evaluate', name: "evaluate", component: Evaluate },
    { path: '/quiz-maker', name: "quiz-maker", component: QuizMaker2 },
    { path: '/create-exam', name: "create-exam", component: CreateExam },
    { path: '/user-block', name: "user-block", component: AddUserBLock },
    { path: '/do-test', name: "do-test", component: DoTest },
    { path: '/analysis-detail', name: "analysis-detail", component: AnalysisDetail },
    // Template
    { 
        path: '/template', 
        name: "template", 
        // component: Template,
        children: [
            { path: '/template/grid', name: 'grid', component: Template },
            { path: '/template/tab', name: 'tab', component: Tab },
            { path: '/template/textfields', name: 'textfields', component: TextFields },
            { path: '/template/steper', name: 'steper', component: Template },
        ],
    },
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
    if(((!token || token.exp < currentTime/1000) && (to.path !== '/login' && to.path !== '/register'))){
        next('/login');
        return;
    }
    next()
})
export {router};