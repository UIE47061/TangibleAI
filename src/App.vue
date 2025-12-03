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

const Icons = {
  Company: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
  Bank: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`,
  Admin: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
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