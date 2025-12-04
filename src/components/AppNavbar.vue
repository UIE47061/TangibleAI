<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const currentRole = ref('company') // 預設企業端

// 監聽路由變化，記住當前角色
watch(() => route.path, (newPath) => {
  if (newPath.startsWith('/company')) {
    currentRole.value = 'company'
  } else if (newPath.startsWith('/bank')) {
    currentRole.value = 'bank'
  } else if (newPath.startsWith('/system-admin')) {
    currentRole.value = 'system-admin'
  }
  // /admin 不改變 currentRole，保持之前的角色
}, { immediate: true })

// Font Awesome 圖標 (使用 HTML 字串)
const Icons = {
  Company: `<i class="fa-solid fa-building w-5 h-5"></i>`, // 企業建築圖標
  Bank: `<i class="fa-solid fa-landmark w-5 h-5"></i>`, // 銀行建築圖標
  Admin: `<i class="fa-solid fa-gear w-5 h-5"></i>`, // 系統設定齒輪圖標
};

// 回到主頁
const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <!-- 頂部導航：角色切換器 -->
  <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo 區域 - 可點擊回首頁 -->
        <button 
          @click="goToHome"
          class="flex items-center gap-2 font-bold text-xl text-emerald-600 tracking-tight hover:text-emerald-700 transition cursor-pointer">
          <img src="../assets/icon.png" width="35" alt="TangibleAI"> 
          TangibleAI
        </button>
        
        <!-- 企業端 Tab -->
        <div v-if="currentRole === 'company'" class="flex bg-slate-100 p-1 rounded-lg">
          <router-link to="/company" 
            :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', $route.path === '/company' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
            <span v-html="Icons.Company"></span> 企業儀表板
          </router-link>
          <router-link to="/admin"
            :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', $route.path === '/admin' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
            <span v-html="Icons.Admin"></span> 後台管理
          </router-link>
        </div>

        <!-- 銀行端 Tab -->
        <div v-else-if="currentRole === 'bank'" class="flex bg-slate-100 p-1 rounded-lg">
          <router-link to="/bank" 
            :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', $route.path === '/bank' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
            <span v-html="Icons.Bank"></span> 銀行儀表板
          </router-link>
          <router-link to="/admin"
            :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', $route.path === '/admin' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
            <span v-html="Icons.Admin"></span> 後台管理
          </router-link>
        </div>

        <!-- 系統商 Tab -->
        <div v-else-if="currentRole === 'system-admin'" class="flex bg-slate-100 p-1 rounded-lg">
          <router-link to="/system-admin"
            :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', $route.path === '/system-admin' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
            <span v-html="Icons.Admin"></span> 系統管理
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
