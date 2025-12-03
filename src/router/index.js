import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import CompanyView from '@/views/CompanyView.vue'
import BankView from '@/views/BankView.vue'
import AdminView from '@/views/AdminView.vue'
import SystemAdminView from '@/views/SystemAdminView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: { title: '登入' }
  },
  {
    path: '/company',
    name: 'Company',
    component: CompanyView,
    meta: { title: '企業端' }
  },
  {
    path: '/bank',
    name: 'Bank',
    component: BankView,
    meta: { title: '銀行端' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { title: '管理後台' }
  },
  {
    path: '/system-admin',
    name: 'SystemAdmin',
    component: SystemAdminView,
    meta: { title: '系統管理' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
