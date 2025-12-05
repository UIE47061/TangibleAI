<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 兩端配置陣列
const endpoints = [
  {
    id: 'company',
    name: '企業端',
    route: '/company',
    icon: 'fa-building',
    hoverColor: 'hover:bg-emerald-50',
    selectedBg: 'bg-emerald-50',
    selectedBorder: 'border-emerald-500',
    color: 'text-emerald-600'
  },
  {
    id: 'bank',
    name: '銀行端',
    route: '/bank',
    icon: 'fa-landmark',
    hoverColor: 'hover:bg-blue-50',
    selectedBg: 'bg-blue-50',
    selectedBorder: 'border-blue-500',
    color: 'text-blue-600'
  }
];

const password = ref('');
const error = ref('');
const loading = ref(false);
const selectedEndpoint = ref(endpoints[0]); // 預設選擇企業端

// 選擇端點
const selectEndpoint = (endpoint) => {
  selectedEndpoint.value = endpoint;
  password.value = ''; // 清空密碼
  error.value = ''; // 清空錯誤訊息
};

// 登入處理
const handleLogin = () => {
  error.value = '';
  
  if (!password.value) {
    error.value = '請輸入密碼';
    return;
  }

  loading.value = true;
  
  // 模擬登入延遲
  setTimeout(() => {
    // 只要密碼不為空就可以登入
    router.push(selectedEndpoint.value.route);
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
          <p class="text-slate-500 text-sm mb-6">請選擇您的身份並輸入密碼</p>
          
          <!-- 端點選擇按鈕 -->
          <div class="mb-6 grid grid-cols-2 gap-3">
            <button 
              v-for="endpoint in endpoints" 
              :key="endpoint.id"
              @click="selectEndpoint(endpoint)"
              :class="[
                'px-4 py-3 rounded-lg text-sm font-medium transition shadow-sm hover:shadow-md border-2',
                selectedEndpoint.id === endpoint.id 
                  ? endpoint.selectedBg + ' ' + endpoint.selectedBorder + ' ' + endpoint.color
                  : 'bg-white border-slate-200 text-slate-700 ' + endpoint.hoverColor
              ]">
              <div class="flex flex-col items-center gap-1">
                <!-- Font Awesome 圖標 -->
                <i :class="['fa-solid', endpoint.icon, 'w-5 h-5']"></i>
                <span>{{ endpoint.name }}</span>
              </div>
            </button>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- 密碼輸入 -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                密碼 ({{ selectedEndpoint.name }})
              </label>
              <input v-model="password" type="password" placeholder="輸入密碼..."
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': error }">
              <p v-if="error" class="mt-2 text-sm text-red-600 flex items-center gap-1">
                <!-- Font Awesome: 錯誤警告圖標 (圓圈驚嘆號) -->
                <i class="fa-solid fa-circle-exclamation w-4 h-4"></i>
                {{ error }}
              </p>
            </div>

            <!-- 登入按鈕 -->
            <button type="submit" :disabled="loading"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <!-- Font Awesome: 載入中圖標 (旋轉的圓圈) -->
              <i v-if="loading" class="fa-solid fa-spinner fa-spin h-5 w-5 text-white"></i>
              <span>{{ loading ? '登入中...' : '登入' }}</span>
            </button>
          </form>
        </div>
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
