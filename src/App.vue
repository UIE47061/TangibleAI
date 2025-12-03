<script setup>
import { ref } from 'vue';

// 頁面狀態控制
const currentView = ref('company'); // 預設顯示企業端 'company', 'bank', 'admin'

// --- 模擬數據 (Mock Data) ---

// 1. 企業端數據
const companyData = {
  score: 78,
  kpi: [
    { label: "本月 Token 用量", value: "4.2M", unit: "tokens", trend: "+12%", trendUp: true },
    { label: "預估碳排放", value: "842", unit: "kg CO2e", trend: "-5%", trendUp: false }, // 綠色代表好事
    { label: "Prompt 平均效率", value: "8.5", unit: "/10", trend: "+0.3", trendUp: true },
  ],
  suggestions: [
    { title: "縮減 System Prompt 長度", impact: "High", desc: "您的系統提示詞重複度高，優化後可減少 15% 用量。", save: "120 kg CO2e" },
    { title: "更換為 GPT-3.5-Turbo", impact: "Med", desc: "非推理型任務建議降級模型，效率更高。", save: "45 kg CO2e" },
  ]
};

// 2. 銀行端數據
const bankData = {
  clients: [
    { name: "TechCorp Inc.", industry: "軟體服務", score: "A", carbonIntensity: "Low", trend: "up", loanStatus: "可優化" },
    { name: "Global Retail Co.", industry: "零售業", score: "B-", carbonIntensity: "High", trend: "down", loanStatus: "高風險" },
    { name: "Smart FinTech", industry: "金融科技", score: "A+", carbonIntensity: "Very Low", trend: "flat", loanStatus: "綠色貸款" },
    { name: "OldSchool Mfg.", industry: "傳統製造", score: "C", carbonIntensity: "High", trend: "down", loanStatus: "觀察中" },
  ]
};

// 3. 後台數據
const adminData = {
  systemStatus: "Healthy",
  apiLatency: "45ms",
  activeCompanies: 128,
  engineConfig: [
    { key: "GPT-4 電力係數 (kWh/1k tokens)", value: "0.03" },
    { key: "台灣電力排放係數 (kg CO2e/kWh)", value: "0.495" },
    { key: "NVIDIA H100 PUE 校準", value: "1.15" },
  ]
};

// --- 圖示組件 ---
const Icons = {
  Company: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
  Bank: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`,
  Admin: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
  Leaf: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`,
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-600 pb-20">
    
    <!-- 頂部導航：角色切換器 -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-2 font-bold text-xl text-emerald-600 tracking-tight">
            <img src="./assets/icon.png" width="35"></img> TangibleAI
          </div>
          
          <!-- 角色按鈕 -->
          <div class="flex bg-slate-100 p-1 rounded-lg">
            <button @click="currentView = 'company'" 
              :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', currentView === 'company' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
              <span v-html="Icons.Company"></span> 企業端
            </button>
            <button @click="currentView = 'bank'"
              :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', currentView === 'bank' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
              <span v-html="Icons.Bank"></span> 銀行端
            </button>
            <button @click="currentView = 'admin'"
              :class="['flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition', currentView === 'admin' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700']">
              <span v-html="Icons.Admin"></span> 管理後台
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主內容區 -->
    <main class="max-w-5xl mx-auto px-4 py-8">

      <!-- ========================================== -->
      <!-- 1. 企業端視圖 (Company Dashboard) -->
      <!-- ========================================== -->
      <div v-if="currentView === 'company'" class="space-y-6 animate-fade-in">
        <div class="flex justify-between items-end">
          <div>
             <h2 class="text-2xl font-bold text-slate-800">Hello, TechCorp Inc. 👋</h2>
             <p class="text-slate-500">這裡是您的 AI 碳排效率總覽</p>
          </div>
          <button class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition shadow-sm">
            匯出 ESG 報告
          </button>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>

        <!-- 主圖表區 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <!-- 左：碳排與效率圖表 (佔 2/3) -->
           <div class="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <h3 class="font-bold text-slate-800 mb-4">AI 使用量 vs 碳排放趨勢</h3>
              <div class="h-48 bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200">
                 <!-- 模擬圖表 -->
                 <div class="text-slate-400 text-sm flex flex-col items-center">
                    <svg class="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                    <span>[ 折線圖 ] 藍線：Token用量 (上升) / 綠線：碳排放 (持平)</span>
                 </div>
              </div>
           </div>

           <!-- 右：評分 (佔 1/3) -->
           <div class="bg-emerald-50 p-6 rounded-xl border border-emerald-100 flex flex-col items-center justify-center text-center">
              <h3 class="font-bold text-emerald-900 mb-4">AI 綠色效率分數</h3>
              <div class="w-32 h-32 rounded-full border-8 border-white bg-emerald-500 flex items-center justify-center shadow-lg mb-4">
                 <span class="text-4xl font-black text-white">{{ companyData.score }}</span>
              </div>
              <p class="text-xs text-emerald-700">擊敗了同產業 65% 的企業</p>
           </div>
        </div>

        <!-- 優化建議 -->
        <div class="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
           <div class="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 class="font-bold text-slate-800">🚀 效率優化建議 (AI Coach)</h3>
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

      <!-- ========================================== -->
      <!-- 2. 銀行端視圖 (Bank Dashboard) -->
      <!-- ========================================== -->
      <div v-if="currentView === 'bank'" class="space-y-6 animate-fade-in">
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

      <!-- ========================================== -->
      <!-- 3. 管理後台視圖 (Admin Dashboard) -->
      <!-- ========================================== -->
      <div v-if="currentView === 'admin'" class="space-y-6 animate-fade-in">
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
                    <input type="text" :value="conf.value" class="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-sm font-mono text-right w-24 focus:ring-2 focus:ring-slate-500 outline-none group-hover:border-slate-400 transition">
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
                       <option>GPT-4</option>
                       <option>GPT-3.5</option>
                       <option>Claude 2</option>
                    </select>
                 </div>
                 <div class="bg-slate-800 text-emerald-400 p-3 rounded font-mono text-sm mt-2">
                    Output: 0.42 kg CO2e
                 </div>
                 <button class="w-full bg-slate-200 text-slate-600 rounded py-2 text-sm font-bold mt-2 hover:bg-slate-300">執行模擬</button>
              </div>
           </div>
           <div class="p-4 bg-slate-50 border-t border-slate-200 text-right">
              <button class="bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-700">儲存設定變更</button>
           </div>
        </div>
      </div>

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