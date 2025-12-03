<script setup>
import { ref, onMounted } from 'vue';
import { getBankData } from '@/api/mockData';

const bankData = ref(null);

onMounted(() => {
  bankData.value = getBankData();
});
</script>

<template>
  <div v-if="bankData" class="space-y-6 animate-fade-in">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">綠色授信評估系統</h2>
        <p class="text-slate-500">ESG 風險模型與授信定價參考</p>
      </div>
      <div class="flex gap-2">
        <button class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">下載報表</button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">調整模型權重</button>
      </div>
    </div>

    <!-- 授信戶清單 -->
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="p-4 border-b border-slate-200 flex gap-4">
        <input type="text" placeholder="搜尋企業名稱或統編..." class="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <select class="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600">
          <option>所有產業</option>
          <option>高科技</option>
          <option>傳產</option>
        </select>
      </div>
      
      <table class="w-full text-sm text-left">
        <thead class="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
          <tr>
            <th class="py-3 px-4">企業名稱</th>
            <th class="py-3 px-4">產業類別</th>
            <th class="py-3 px-4">ESG 評級</th>
            <th class="py-3 px-4">AI 碳排強度</th>
            <th class="py-3 px-4">改善趨勢</th>
            <th class="py-3 px-4">授信建議</th>
            <th class="py-3 px-4 text-center">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="(client, idx) in bankData.clients" :key="idx" class="hover:bg-blue-50/30 transition group">
            <td class="py-3 px-4 font-bold text-slate-700">{{ client.name }}</td>
            <td class="py-3 px-4 text-slate-500">{{ client.industry }}</td>
            <td class="py-3 px-4">
              <span class="bg-slate-100 text-slate-700 px-2 py-1 rounded font-bold font-mono">{{ client.score }}</span>
            </td>
            <td class="py-3 px-4">
              <span :class="['px-2 py-1 rounded text-xs font-bold', client.carbonIntensity==='Low' || client.carbonIntensity==='Very Low' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600']">
                {{ client.carbonIntensity }}
              </span>
            </td>
            <td class="py-3 px-4">
              <span v-if="client.trend==='up'" class="text-emerald-500 font-bold flex items-center gap-1">↑ 提升 <span class="text-[10px] text-slate-400 font-normal">過去6個月</span></span>
              <span v-if="client.trend==='down'" class="text-red-500 font-bold flex items-center gap-1">↓ 退步</span>
              <span v-if="client.trend==='flat'" class="text-slate-400 font-bold flex items-center gap-1">→ 持平</span>
            </td>
            <td class="py-3 px-4">
              <span :class="['text-xs border px-2 py-1 rounded', client.loanStatus==='綠色貸款'?'border-emerald-200 bg-emerald-50 text-emerald-700':'border-slate-200 text-slate-500']">
                {{ client.loanStatus }}
              </span>
            </td>
            <td class="py-3 px-4 text-center">
              <button class="text-blue-500 font-bold hover:underline">查看詳情</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 銀行視角的分析摘要 (模擬個案) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 class="font-bold text-slate-800 mb-2">Smart FinTech 授信摘要</h3>
        <p class="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
          🤖 <strong>AI 分析：</strong> 該企業 AI 使用量大，但模型切換策略成熟（在非核心業務大量使用輕量模型），碳排強度遠低於同業平均。
          <br/><br/>
          📈 <strong>結論：</strong> 符合「數位轉型綠色貸款」資格，建議給予利率減碼 0.05%。
        </p>
      </div>
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
        <h3 class="font-bold text-slate-800 mb-2">ESG 授信模型權重預覽</h3>
        <div class="space-y-3">
          <div class="flex items-center text-sm">
            <span class="w-24 text-slate-500">財務指標</span>
            <div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden ml-2"><div class="w-[60%] h-full bg-slate-300"></div></div>
            <span class="ml-2 text-slate-700 font-mono">60%</span>
          </div>
          <div class="flex items-center text-sm">
            <span class="w-24 text-slate-500">傳統 ESG</span>
            <div class="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden ml-2"><div class="w-[30%] h-full bg-slate-400"></div></div>
            <span class="ml-2 text-slate-700 font-mono">30%</span>
          </div>
          <div class="flex items-center text-sm font-bold text-blue-600">
            <span class="w-24">AI 碳排指標</span>
            <div class="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden ml-2"><div class="w-[10%] h-full bg-blue-500"></div></div>
            <span class="ml-2 font-mono">10%</span>
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
