<script setup>
import { ref, onMounted } from 'vue';
import { getAdminData } from '@/api/mockData';

const adminData = ref(null);

onMounted(() => {
  adminData.value = getAdminData();
});
</script>

<template>
  <div v-if="adminData" class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">TangibleAI 系統中控</h2>
        <p class="text-slate-500">演算法校準與系統狀態監控</p>
      </div>
      <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {{ adminData.systemStatus }}
      </span>
    </div>

    <!-- 系統概況 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-slate-800 text-white p-4 rounded-xl shadow-md">
        <div class="text-slate-400 text-xs uppercase">API Latency</div>
        <div class="text-2xl font-mono font-bold mt-1">{{ adminData.apiLatency }}</div>
      </div>
      <div class="bg-slate-800 text-white p-4 rounded-xl shadow-md">
        <div class="text-slate-400 text-xs uppercase">Active Companies</div>
        <div class="text-2xl font-mono font-bold mt-1">{{ adminData.activeCompanies }}</div>
      </div>
      <div class="bg-slate-800 text-white p-4 rounded-xl shadow-md">
        <div class="text-slate-400 text-xs uppercase">Daily Tokens</div>
        <div class="text-2xl font-mono font-bold mt-1">48.2M</div>
      </div>
      <div class="bg-slate-800 text-white p-4 rounded-xl shadow-md">
        <div class="text-slate-400 text-xs uppercase">Errors (24h)</div>
        <div class="text-2xl font-mono font-bold mt-1 text-emerald-400">0.02%</div>
      </div>
    </div>

    <!-- 碳排引擎設定 (核心) -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200">
      <div class="p-4 border-b border-slate-200 bg-slate-50">
        <h3 class="font-bold text-slate-800 flex items-center gap-2">
          ⚙️ AI Carbon Engine v2.1 參數配置
        </h3>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider">基礎係數設定</h4>
          <div v-for="(conf, idx) in adminData.engineConfig" :key="idx" class="flex justify-between items-center group">
            <label class="text-sm text-slate-700">{{ conf.key }}</label>
            <input type="text" :value="conf.value"
              class="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-sm font-mono text-right w-24 focus:ring-2 focus:ring-slate-500 outline-none group-hover:border-slate-400 transition">
          </div>
          <div class="pt-4">
            <button class="text-blue-600 text-sm font-bold hover:underline">+ 新增係數變數</button>
          </div>
        </div>

        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h4 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">演算法測試區</h4>
          <p class="text-xs text-slate-500 mb-4">輸入測試 Token 量與模型，預覽計算結果。</p>
          <div class="flex gap-2 mb-2">
            <input type="text" placeholder="Tokens (e.g. 1000)" class="border rounded px-2 py-1 text-sm flex-1">
            <select class="border rounded px-2 py-1 text-sm">
              <option>GPT-5</option>
              <option>GPT-4</option>
              <option>Gemini 3 pro</option>
              <option>Claude Sonnet 4.5</option>
            </select>
          </div>
          <div class="bg-slate-800 text-emerald-400 p-3 rounded font-mono text-sm mt-2">
            Output: 0.42 kg CO2e
          </div>
          <button
            class="w-full bg-slate-200 text-slate-600 rounded py-2 text-sm font-bold mt-2 hover:bg-slate-300">執行模擬</button>
        </div>
      </div>
      <div class="p-4 bg-slate-50 border-t border-slate-200 text-right">
        <button
          class="bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-700">儲存設定變更</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
