<script setup>
import { ref, onMounted } from 'vue';
import { getCompanyData } from '@/api/mockData';
import EmissionChart from '@/components/EmissionChart.vue';

const companyData = ref(null);

onMounted(() => {
  companyData.value = getCompanyData();
});
</script>

<template>
  <div v-if="companyData" class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-2xl font-bold text-slate-800">Hello, TechCorp Inc.</h2>
          <!-- Font Awesome: 讚許/竹指向上圖標 -->
          <i class="fa-solid fa-thumbs-up w-6 h-6 text-emerald-500"></i>
        </div>
        <p class="text-slate-500">這裡是您的 AI 碳排效率總覽</p>
      </div>
      <button class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition shadow-sm">
        匯出 ESG 報告
      </button>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div v-for="(item, idx) in companyData.kpi" :key="idx" class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
        <div class="text-xs text-slate-400 font-medium uppercase">{{ item.label }}</div>
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-2xl font-bold text-slate-800">{{ item.value }}</span>
          <span class="text-xs text-slate-500">{{ item.unit }}</span>
        </div>
        <div :class="['text-xs mt-2 font-bold', (item.trendUp && item.label.includes('效率')) || (!item.trendUp && item.label.includes('碳')) ? 'text-emerald-500' : 'text-red-500']">
          {{ item.trend }} 
          <span class="text-slate-400 font-normal ml-1">vs 上月</span>
        </div>
      </div>

      <!-- AI 綠色效率分數卡片 -->
      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border border-emerald-200 shadow-sm flex flex-col items-center justify-center text-center">
        <div class="text-xs text-emerald-700 font-medium uppercase mb-2">AI 綠色效率分數</div>
        <div class="w-20 h-20 rounded-full border-4 border-white bg-emerald-500 flex items-center justify-center shadow-md mb-2">
          <span class="text-3xl font-black text-white">{{ companyData.score }}</span>
        </div>
        <p class="text-[10px] text-emerald-700">擊敗 65% 同業</p>
      </div>
    </div>

    <!-- 主圖表區 -->
    <div>
      <EmissionChart :chart-data="{}" />
    </div>

    <!-- 優化建議 -->
    <div class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div class="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <!-- Font Awesome: 闃電圖標 -->
          <i class="fa-solid fa-bolt w-5 h-5 text-blue-500"></i>
          <h3 class="font-bold text-slate-800">效率優化建議 (AI Coach)</h3>
        </div>
        <span class="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold">2 項急需改善</span>
      </div>
      <div class="divide-y divide-slate-100">
        <div v-for="(sug, idx) in companyData.suggestions" :key="idx" class="p-4 hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-700">{{ sug.title }}</span>
              <span :class="['text-[10px] px-1.5 py-0.5 rounded text-white font-bold', sug.impact==='High'?'bg-red-500':'bg-yellow-500']">{{ sug.impact }} Impact</span>
            </div>
            <div class="text-sm text-slate-500 mt-1">{{ sug.desc }}</div>
          </div>
          <div class="text-right">
            <div class="text-emerald-600 font-bold text-sm">↓ {{ sug.save }}</div>
            <button class="text-xs text-blue-500 hover:underline mt-1">查看詳情</button>
          </div>
        </div>
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
