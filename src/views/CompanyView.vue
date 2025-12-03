<script setup>
import { ref, onMounted } from 'vue';
import { getCompanyData } from '@/api/mockData';
import EmissionChart from '@/components/EmissionChart.vue';

const companyData = ref(null);

onMounted(() => {
  companyData.value = getCompanyData();
});

const Icons = {
  Leaf: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`,
};
</script>

<template>
  <div v-if="companyData" class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-2xl font-bold text-slate-800">Hello, TechCorp Inc.</h2>
          <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
          </svg>
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
          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
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
