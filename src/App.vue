<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
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
</script>

<template>
  <div v-if="$route.path === '/'" class="min-h-screen">
    <router-view />
  </div>
  <div v-else class="min-h-screen bg-slate-50 font-sans text-slate-600 pb-20">
    
    <!-- 頂部導航：角色切換器 -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-2 font-bold text-xl text-emerald-600 tracking-tight">
            <img src="./assets/icon.png" width="35"> TangibleAI
          </div>
          
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

    <!-- 主內容區 -->
    <main class="max-w-5xl mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* 簡單的淡入動畫 */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>