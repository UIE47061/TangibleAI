<script setup>
import { ref, computed, onMounted } from 'vue';
import { getBankData, getSystemAdminData } from '@/api/mockData';
import { exportBankReport, exportSystemReport } from '@/utils/pdfExport';

const bankData = ref(null);
const adminData = ref(null);
const isExporting = ref(false);
const activeTab = ref('bank'); // bank, monitoring, engine, users

// 測試計算器的狀態
const selectedVendor = ref('');
const selectedModel = ref('');
const tokenAmount = ref(10000);

onMounted(() => {
  bankData.value = getBankData();
  adminData.value = getSystemAdminData();
  // 預設選擇第一個供應商
  if (adminData.value && adminData.value.engine.vendors.length > 0) {
    selectedVendor.value = adminData.value.engine.vendors[0].id;
  }
});

// 根據選擇的供應商篩選模型
const filteredModels = computed(() => {
  if (!adminData.value || !selectedVendor.value) return [];
  return adminData.value.engine.modelRates.filter(
    model => model.vendor === selectedVendor.value
  );
});

// 計算碳排放結果
const calculatedResult = computed(() => {
  if (!selectedModel.value || !tokenAmount.value) return '0.00';
  const model = adminData.value.engine.modelRates.find(m => m.id === selectedModel.value);
  if (!model) return '0.00';
  const result = (parseFloat(model.rate) * tokenAmount.value / 1000).toFixed(2);
  return result;
});

// 當供應商改變時,重置模型選擇
const handleVendorChange = () => {
  selectedModel.value = '';
};

// 下載報表
const handleDownloadReport = async () => {
  if (!bankData.value || isExporting.value) return;
  
  isExporting.value = true;
  try {
    await exportBankReport(bankData.value);
  } catch (error) {
    console.error('下載失敗:', error);
    alert('下載 PDF 失敗，請稍後再試');
  } finally {
    isExporting.value = false;
  }
};

// 導出系統報告
const handleExportSystemReport = async () => {
  if (!adminData.value || isExporting.value) return;
  
  isExporting.value = true;
  try {
    await exportSystemReport(adminData.value);
  } catch (error) {
    console.error('導出失敗:', error);
    alert('導出 PDF 失敗，請稍後再試');
  } finally {
    isExporting.value = false;
  }
};
</script>

<template>
  <div v-if="bankData && adminData" class="space-y-6 animate-fade-in">
    <!-- Tab 切換 -->
    <div class="flex gap-2 border-b border-slate-200">
      <button 
        @click="activeTab = 'bank'"
        :class="['flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition', 
          activeTab === 'bank' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700']">
        <i class="fa-solid fa-landmark w-4 h-4"></i>
        綠色授信評估
      </button>
      <button 
        @click="activeTab = 'monitoring'"
        :class="['flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition', 
          activeTab === 'monitoring' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700']">
        <i class="fa-solid fa-chart-column w-4 h-4"></i>
        資料監控
      </button>
      <button 
        @click="activeTab = 'engine'"
        :class="['flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition', 
          activeTab === 'engine' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700']">
        <i class="fa-solid fa-gear w-4 h-4"></i>
        AI Carbon Engine
      </button>
      <button 
        @click="activeTab = 'users'"
        :class="['flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition', 
          activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700']">
        <i class="fa-solid fa-users w-4 h-4"></i>
        使用者管理
      </button>
    </div>

    <!-- ========================================== -->
    <!-- 原銀行端內容 -->
    <!-- ========================================== -->
    <div v-if="activeTab === 'bank'" class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">綠色授信評估系統</h2>
          <p class="text-slate-500">ESG 風險模型與授信定價參考</p>
        </div>
        <div class="flex gap-2">
          <button 
            @click="handleDownloadReport" 
            :disabled="isExporting"
            class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isExporting">下載中...</span>
            <span v-else>下載報表</span>
          </button>
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
    <!-- 資料監控頁 (from SystemAdminView) -->
    <!-- ========================================== -->
    <div v-if="activeTab === 'monitoring'" class="space-y-6">
      <!-- 統計卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-400 font-medium uppercase">總企業數</div>
          <div class="mt-2 text-2xl font-bold text-slate-800">{{ adminData.monitoring.totalCompanies }}</div>
          <div class="text-xs mt-2 text-emerald-500 font-bold">+3 本月新增</div>
        </div>
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-400 font-medium uppercase">API 請求數/日</div>
          <div class="mt-2 text-2xl font-bold text-slate-800">{{ adminData.monitoring.dailyRequests.toLocaleString() }}</div>
          <div class="text-xs mt-2 text-blue-500 font-bold">平均 98ms 延遲</div>
        </div>
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-400 font-medium uppercase">資料完整率</div>
          <div class="mt-2 text-2xl font-bold text-emerald-600">{{ adminData.monitoring.dataIntegrity }}%</div>
          <div class="text-xs mt-2 text-slate-400 font-bold">目標 &gt;95%</div>
        </div>
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-400 font-medium uppercase">錯誤率</div>
          <div class="mt-2 text-2xl font-bold text-red-600">{{ adminData.monitoring.errorRate }}%</div>
          <div class="text-xs mt-2 text-red-500 font-bold">3 個異常事件</div>
        </div>
      </div>

      <!-- 企業資料上傳狀態 -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-wifi w-5 h-5 text-slate-700"></i>
            <h3 class="font-bold text-slate-800">企業 SDK/API 資料上傳狀態</h3>
          </div>
          <div class="flex gap-2">
            <button class="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-slate-600 transition">
              刷新狀態
            </button>
            <button 
              @click="handleExportSystemReport" 
              :disabled="isExporting"
              class="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isExporting">導出中...</span>
              <span v-else>導出報告</span>
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="py-3 px-4 text-left text-slate-600 font-semibold">企業名稱</th>
                <th class="py-3 px-4 text-left text-slate-600 font-semibold">SDK 版本</th>
                <th class="py-3 px-4 text-center text-slate-600 font-semibold">上傳狀態</th>
                <th class="py-3 px-4 text-right text-slate-600 font-semibold">最後上傳</th>
                <th class="py-3 px-4 text-right text-slate-600 font-semibold">資料筆數/日</th>
                <th class="py-3 px-4 text-center text-slate-600 font-semibold">完整性</th>
                <th class="py-3 px-4 text-center text-slate-600 font-semibold">異常</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="company in adminData.monitoring.companies" :key="company.id" class="hover:bg-slate-50">
                <td class="py-3 px-4 font-medium text-slate-700">{{ company.name }}</td>
                <td class="py-3 px-4">
                  <span class="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{{ company.sdkVersion }}</span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold',
                    company.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    company.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700']">
                    <span :class="['w-1.5 h-1.5 rounded-full',
                      company.status === 'active' ? 'bg-emerald-500' :
                      company.status === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500']"></span>
                    {{ company.status === 'active' ? '正常' : company.status === 'warning' ? '警告' : '異常' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right text-slate-500 font-mono text-xs">{{ company.lastUpload }}</td>
                <td class="py-3 px-4 text-right font-mono text-slate-700">{{ company.dailyRecords.toLocaleString() }}</td>
                <td class="py-3 px-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div :class="['h-full rounded-full', company.integrity >= 95 ? 'bg-emerald-500' : company.integrity >= 80 ? 'bg-yellow-500' : 'bg-red-500']" 
                        :style="{ width: company.integrity + '%' }"></div>
                    </div>
                    <span class="text-xs font-mono text-slate-600">{{ company.integrity }}%</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-center">
                  <span v-if="company.errors > 0" class="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold">
                    {{ company.errors }}
                  </span>
                  <span v-else class="text-slate-300">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 異常事件列表 -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="p-4 border-b border-slate-200 bg-red-50 flex items-center gap-2">
          <i class="fa-solid fa-triangle-exclamation w-5 h-5 text-red-600"></i>
          <h3 class="font-bold text-red-800">最近異常事件</h3>
        </div>
        <div class="divide-y divide-slate-100">
          <div v-for="event in adminData.monitoring.recentErrors" :key="event.id" class="p-4 hover:bg-slate-50 flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span :class="['px-2 py-0.5 rounded text-xs font-bold',
                  event.severity === 'high' ? 'bg-red-100 text-red-700' :
                  event.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700']">
                  {{ event.severity === 'high' ? '嚴重' : event.severity === 'medium' ? '中等' : '輕微' }}
                </span>
                <span class="font-medium text-slate-700">{{ event.company }}</span>
                <span class="text-xs text-slate-400">{{ event.time }}</span>
              </div>
              <div class="mt-1 text-sm text-slate-600">{{ event.message }}</div>
            </div>
            <button class="text-xs text-blue-500 hover:underline">處理</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- AI Carbon Engine 管理頁 (from SystemAdminView) -->
    <!-- ========================================== -->
    <div v-if="activeTab === 'engine'" class="space-y-6">
      <!-- Engine 版本資訊 -->
      <div class="bg-gradient-to-br from-slate-800 to-slate-700 text-white p-6 rounded-xl shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-sm text-slate-300 mb-1">當前版本</h3>
            <div class="text-3xl font-black">AI Carbon Engine {{ adminData.engine.currentVersion }}</div>
            <p class="text-slate-300 text-sm mt-2">上次更新：{{ adminData.engine.lastUpdate }}</p>
          </div>
          <div class="flex gap-2">
            <button class="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition">
              版本歷史
            </button>
            <button class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
              發布新版本
            </button>
          </div>
        </div>
      </div>

      <!-- 模型參數設定 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 基礎係數設定 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200">
          <div class="p-4 border-b border-slate-200 bg-slate-50">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-sliders w-5 h-5 text-slate-700"></i>
              <h3 class="font-bold text-slate-800">基礎係數配置</h3>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <div v-for="param in adminData.engine.parameters" :key="param.id" class="space-y-2">
              <label class="text-sm font-medium text-slate-700">{{ param.name }}</label>
              <div class="flex gap-2 items-center">
                <input 
                  type="text" 
                  :value="param.value" 
                  class="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                >
                <span class="text-xs text-slate-500 w-24">{{ param.unit }}</span>
              </div>
              <p class="text-xs text-slate-500">{{ param.description }}</p>
            </div>
          </div>
        </div>

        <!-- GPU 模型配置 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200">
          <div class="p-4 border-b border-slate-200 bg-slate-50">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-microchip w-5 h-5 text-slate-700"></i>
              <h3 class="font-bold text-slate-800">GPU 模型設定</h3>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <div v-for="gpu in adminData.engine.gpuModels" :key="gpu.id" class="p-3 border border-slate-200 rounded-lg hover:border-blue-300 transition">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <div class="font-bold text-slate-800">{{ gpu.name }}</div>
                    <div class="text-xs text-slate-500 mt-1">TDP: {{ gpu.tdp }}W</div>
                  </div>
                  <button class="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-600">
                    編輯
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="bg-slate-50 p-2 rounded">
                    <div class="text-slate-500">能耗係數</div>
                    <div class="font-mono font-bold text-slate-700">{{ gpu.powerFactor }}</div>
                  </div>
                  <div class="bg-slate-50 p-2 rounded">
                    <div class="text-slate-500">效率分數</div>
                    <div class="font-mono font-bold text-slate-700">{{ gpu.efficiency }}</div>
                  </div>
                </div>
              </div>
            </div>
            <button class="w-full mt-4 border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600 py-3 rounded-lg text-sm font-medium transition">
              + 新增 GPU 模型
            </button>
          </div>
        </div>
      </div>

      <!-- 區域排放因子 -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-earth-americas w-5 h-5 text-slate-700"></i>
            <h3 class="font-bold text-slate-800">區域電力排放因子</h3>
          </div>
          <button class="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition">
            更新資料來源
          </button>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="region in adminData.engine.regions" :key="region.id" class="p-4 border border-slate-200 rounded-lg">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">{{ region.flag }}</span>
                <div>
                  <div class="font-bold text-slate-800">{{ region.name }}</div>
                  <div class="text-xs text-slate-500">{{ region.year }} 資料</div>
                </div>
              </div>
              <div class="bg-slate-50 p-3 rounded-lg">
                <div class="text-xs text-slate-500 mb-1">排放係數</div>
                <div class="text-xl font-bold text-slate-800 font-mono">{{ region.factor }}</div>
                <div class="text-xs text-slate-500">kg CO2e/kWh</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 指標校準 -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="p-4 border-b border-slate-200 bg-slate-50">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-chart-column w-5 h-5 text-slate-700"></i>
            <h3 class="font-bold text-slate-800">碳排換算率校準</h3>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 模型列表 -->
            <div class="space-y-3 max-h-96 overflow-y-auto">
              <div v-for="model in adminData.engine.modelRates" :key="model.id" class="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-300">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                    {{ model.name.split(' ')[0].substring(0, 3) }}
                  </div>
                  <div>
                    <div class="font-medium text-slate-800">{{ model.name }}</div>
                    <div class="text-xs text-slate-500">每 1K tokens</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-bold text-slate-800 font-mono">{{ model.rate }}</div>
                  <div class="text-xs text-slate-500">kg CO2e</div>
                </div>
              </div>
            </div>
            
            <!-- 測試計算器 -->
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div class="flex items-center gap-2 mb-3">
                <i class="fa-solid fa-calculator w-5 h-5 text-blue-700"></i>
                <h4 class="font-bold text-blue-900">測試計算器</h4>
              </div>
              <div class="space-y-3">
                <!-- 供應商選擇 -->
                <div>
                  <label class="text-xs text-slate-600 block mb-1">選擇供應商</label>
                  <select 
                    v-model="selectedVendor" 
                    @change="handleVendorChange"
                    class="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">請選擇供應商</option>
                    <option v-for="vendor in adminData.engine.vendors" :key="vendor.id" :value="vendor.id">
                      {{ vendor.name }}
                    </option>
                  </select>
                </div>
                
                <!-- 模型選擇 -->
                <div>
                  <label class="text-xs text-slate-600 block mb-1">選擇模型</label>
                  <select 
                    v-model="selectedModel" 
                    :disabled="!selectedVendor"
                    class="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm disabled:bg-slate-100 disabled:cursor-not-allowed">
                    <option value="">請選擇模型</option>
                    <option v-for="model in filteredModels" :key="model.id" :value="model.id">
                      {{ model.name }}
                    </option>
                  </select>
                </div>
                
                <!-- Token 數量 -->
                <div>
                  <label class="text-xs text-slate-600 block mb-1">Token 數量</label>
                  <input 
                    v-model.number="tokenAmount" 
                    type="number" 
                    class="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono">
                </div>
                
                <!-- 計算結果 -->
                <div class="bg-slate-800 text-white p-3 rounded-lg">
                  <div class="text-xs text-slate-300 mb-1">計算結果</div>
                  <div class="text-2xl font-bold font-mono">{{ calculatedResult }} kg CO2e</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 使用者與權限管理 (from SystemAdminView) -->
    <!-- ========================================== -->
    <div v-if="activeTab === 'users'" class="space-y-6">
      <!-- 統計概覽 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-400 font-medium uppercase">企業帳號</div>
          <div class="mt-2 text-2xl font-bold text-slate-800">{{ adminData.users.companyAccounts }}</div>
          <div class="text-xs mt-2 text-blue-500 font-bold">{{ adminData.users.activeCompanies }} 個活躍</div>
        </div>
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-400 font-medium uppercase">銀行帳號</div>
          <div class="mt-2 text-2xl font-bold text-slate-800">{{ adminData.users.bankAccounts }}</div>
          <div class="text-xs mt-2 text-emerald-500 font-bold">{{ adminData.users.activeBanks }} 個活躍</div>
        </div>
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-xs text-slate-400 font-medium uppercase">API 金鑰總數</div>
          <div class="mt-2 text-2xl font-bold text-slate-800">{{ adminData.users.totalApiKeys }}</div>
          <div class="text-xs mt-2 text-slate-400 font-bold">{{ adminData.users.activeApiKeys }} 個使用中</div>
        </div>
      </div>

      <!-- 使用者列表 -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-users w-5 h-5 text-slate-700"></i>
            <h3 class="font-bold text-slate-800">帳號管理</h3>
          </div>
          <div class="flex gap-2">
            <input type="text" placeholder="搜尋帳號..." class="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-48">
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition">
              + 新增帳號
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="py-3 px-4 text-left text-slate-600 font-semibold">組織名稱</th>
                <th class="py-3 px-4 text-left text-slate-600 font-semibold">類型</th>
                <th class="py-3 px-4 text-left text-slate-600 font-semibold">權限等級</th>
                <th class="py-3 px-4 text-center text-slate-600 font-semibold">狀態</th>
                <th class="py-3 px-4 text-right text-slate-600 font-semibold">API 金鑰</th>
                <th class="py-3 px-4 text-right text-slate-600 font-semibold">月流量</th>
                <th class="py-3 px-4 text-right text-slate-600 font-semibold">建立日期</th>
                <th class="py-3 px-4 text-center text-slate-600 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="user in adminData.users.accounts" :key="user.id" class="hover:bg-slate-50">
                <td class="py-3 px-4 font-medium text-slate-700">{{ user.name }}</td>
                <td class="py-3 px-4">
                  <span :class="['px-2 py-1 rounded-full text-xs font-bold',
                    user.type === 'company' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700']">
                    {{ user.type === 'company' ? '企業' : '銀行' }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span :class="['px-2 py-1 rounded text-xs font-bold',
                    user.permission === 'admin' ? 'bg-red-100 text-red-700' :
                    user.permission === 'write' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-700']">
                    {{ user.permission.toUpperCase() }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold',
                    user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500']">
                    <span :class="['w-1.5 h-1.5 rounded-full', user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400']"></span>
                    {{ user.status === 'active' ? '活躍' : '暫停' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right">
                  <button class="text-blue-500 hover:underline text-xs font-mono">{{ user.apiKeys }} 個</button>
                </td>
                <td class="py-3 px-4 text-right font-mono text-slate-600">{{ user.monthlyRequests.toLocaleString() }}</td>
                <td class="py-3 px-4 text-right text-slate-500 text-xs">{{ user.createdAt }}</td>
                <td class="py-3 px-4">
                  <div class="flex justify-center gap-2">
                    <button class="text-blue-500 hover:underline text-xs">編輯</button>
                    <button class="text-slate-400 hover:text-red-500 text-xs">停用</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- API 金鑰管理 -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="p-4 border-b border-slate-200 bg-slate-50">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-key w-5 h-5 text-slate-700"></i>
            <h3 class="font-bold text-slate-800">API 金鑰 & 流量監控</h3>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-3">
            <div v-for="key in adminData.users.apiKeyDetails" :key="key.id" class="p-4 border border-slate-200 rounded-lg hover:border-blue-300">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-bold text-slate-800">{{ key.owner }}</span>
                    <span class="text-xs text-slate-400">{{ key.type }}</span>
                  </div>
                  <div class="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded inline-block">
                    {{ key.key }}
                  </div>
                </div>
                <div class="flex gap-2">
                  <button class="text-xs text-blue-500 hover:underline">重新生成</button>
                  <button class="text-xs text-red-500 hover:underline">撤銷</button>
                </div>
              </div>
              <div class="grid grid-cols-4 gap-4 text-xs">
                <div class="bg-slate-50 p-2 rounded">
                  <div class="text-slate-500 mb-1">今日請求</div>
                  <div class="font-mono font-bold text-slate-800">{{ key.todayRequests.toLocaleString() }}</div>
                </div>
                <div class="bg-slate-50 p-2 rounded">
                  <div class="text-slate-500 mb-1">本月請求</div>
                  <div class="font-mono font-bold text-slate-800">{{ key.monthRequests.toLocaleString() }}</div>
                </div>
                <div class="bg-slate-50 p-2 rounded">
                  <div class="text-slate-500 mb-1">錯誤率</div>
                  <div :class="['font-mono font-bold', key.errorRate > 1 ? 'text-red-600' : 'text-emerald-600']">
                    {{ key.errorRate }}%
                  </div>
                </div>
                <div class="bg-slate-50 p-2 rounded">
                  <div class="text-slate-500 mb-1">最後使用</div>
                  <div class="font-mono font-bold text-slate-800">{{ key.lastUsed }}</div>
                </div>
              </div>
              <div class="mt-3">
                <div class="flex justify-between text-xs text-slate-500 mb-1">
                  <span>流量使用</span>
                  <span>{{ key.usagePercent }}%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div :class="['h-full rounded-full', key.usagePercent >= 90 ? 'bg-red-500' : key.usagePercent >= 70 ? 'bg-yellow-500' : 'bg-blue-500']" 
                    :style="{ width: key.usagePercent + '%' }"></div>
                </div>
              </div>
            </div>
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
