import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from './components/LoginPage.vue';
import CrudPanel from './components/CrudPanel.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
    { path: '/', component: LoginPage },
    { path: '/panel', component: CrudPanel }
    ]
});

export default router