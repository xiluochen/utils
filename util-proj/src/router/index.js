import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
    {
        name:'',
        path:'/',
        component:()=>(import('@views/HelloPage/index.vue')),
    },
    {
        name:'TodoList',
        path:'/todolist',
        component:()=>(import('@views/TodoList/index.vue')),
    },
    {
        name:'Calculator',
        path:'/cal',
        component:()=>(import('@views/Calculator/index.vue')),
    },
    {
        name:'PaysRecorder',
        path:'/pays',
        component:()=>(import('@views/PaysRecorder/index.vue')),
        children:[
            {
                path:'/pays',
                component:()=>(import('@views/PaysRecorder/subpages/Calendar/index.vue'))
            },
            {
                path:'detail',
                component:()=>(import('@views/PaysRecorder/subpages/Detail/index.vue'))
            }
        ],
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})