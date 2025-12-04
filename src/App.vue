<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div v-if="$route.path === '/'" class="min-h-screen">
    <router-view />
  </div>
  <div v-else class="min-h-screen bg-slate-50 font-sans text-slate-600 pb-20">
    <!-- 頂部導航組件 -->
    <AppNavbar />

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