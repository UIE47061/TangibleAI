<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = () => {
  error.value = '';
  
  if (!password.value) {
    error.value = '請輸入密碼';
    return;
  }

  loading.value = true;
  
  // 模擬登入延遲
  setTimeout(() => {
    if (password.value.startsWith('1')) {
      // 企業端
      router.push('/company');
    } else if (password.value.startsWith('2')) {
      // 銀行端
      router.push('/bank');
    } else if (password.value.startsWith('3')) {
      // 系統商
      router.push('/system-admin');
    } else {
      error.value = '密碼格式錯誤：請使用 1 (企業)、2 (銀行)、3 (系統商) 開頭的密碼';
      loading.value = false;
    }
  }, 500);
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo 區域 -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-2 mb-4">
          <img src="../assets/icon.png" width="35" alt="TangibleAI">
          <h1 class="text-3xl font-bold text-emerald-600 tracking-tight">TangibleAI</h1>
        </div>
        <p class="text-slate-600">AI Carbon Footprint Management Platform</p>
      </div>

      <!-- 登入卡片 -->
      <div class="bg-white rounded-lg shadow-md border border-slate-200">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-slate-800 mb-2">歡迎回來</h2>
          <p class="text-slate-500 text-sm mb-6">請輸入您的密碼以登入系統</p>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- 密碼輸入 -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">密碼</label>
              <input 
                v-model="password"
                type="password"
                placeholder="輸入密碼..."
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': error }"
              >
              <p v-if="error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ error }}
              </p>
            </div>

            <!-- 登入按鈕 -->
            <button 
              type="submit"
              :disabled="loading"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? '登入中...' : '登入' }}</span>
            </button>
          </form>
        </div>

        <!-- 提示區域 -->
        <div class="bg-slate-50 p-6 border-t border-slate-200">
          <div class="text-xs text-slate-600 space-y-2">
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="font-medium text-slate-700 mb-1">登入提示：</p>
                <ul class="space-y-1 text-slate-600">
                  <li>• 密碼開頭為 <span class="font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">1</span> → 企業端</li>
                  <li>• 密碼開頭為 <span class="font-mono bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">2</span> → 銀行端</li>
                  <li>• 密碼開頭為 <span class="font-mono bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">3</span> → 系統商</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速登入按鈕（開發用） -->
      <div class="mt-6 grid grid-cols-3 gap-3">
        <button 
          @click="password = '123456'; handleLogin()"
          class="bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md"
        >
          <div class="flex flex-col items-center gap-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span>企業端</span>
          </div>
        </button>
        <button 
          @click="password = '223456'; handleLogin()"
          class="bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md"
        >
          <div class="flex flex-col items-center gap-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
            </svg>
            <span>銀行端</span>
          </div>
        </button>
        <button 
          @click="password = '323456'; handleLogin()"
          class="bg-white hover:bg-purple-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md"
        >
          <div class="flex flex-col items-center gap-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>系統商</span>
          </div>
        </button>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-sm text-slate-500">
        <p>© 2025 TangibleAI. All rights reserved.</p>
      </div>
    </div>
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
