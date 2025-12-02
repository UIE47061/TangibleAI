<script setup>
import { ref, onMounted } from 'vue';
import { getDashboardData } from './api/mockData';
import EmissionChart from './components/EmissionChart.vue';
import UsagePieChart from './components/UsagePieChart.vue';

const data = ref(null);

onMounted(() => {
  data.value = getDashboardData();
});
</script>

<template>
  <div class="min-h-screen bg-[#F4F7FE] p-6 font-sans text-slate-600 flex justify-center pb-20" v-if="data">
    
    <!-- 限制最大寬度 (1440px) -->
    <div class="w-full max-w-[1440px]"> 

      <!-- Header -->
      <header class="bg-white rounded-2xl px-6 py-4 mb-6 shadow-sm flex justify-between items-center">
        <h1 class="text-xl font-bold text-slate-800 tracking-tight">AI濫用 & 碳排放量儀表板</h1>
        <div class="flex items-center gap-5">
          <button class="hover:bg-gray-50 p-2 rounded-full transition">
            <i class="fas fa-cog text-gray-400 hover:text-gray-600 transition"></i>
          </button>
          <button class="hover:bg-gray-50 p-2 rounded-full transition relative">
            <i class="fas fa-bell text-gray-400 hover:text-gray-600 transition"></i>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div class="w-9 h-9 rounded-full bg-slate-800 overflow-hidden border border-slate-100 shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-100 transition">
            <img src="https://i.pravatar.cc/150?img=12" alt="Admin" />
          </div>
        </div>
      </header>

      <!-- Grid 系統：4 欄設計 -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

        <!-- 1. 頂部四個卡片 -->
        <template v-for="(stat, index) in data.stats" :key="index">
          <div class="bg-white rounded-2xl p-5 shadow-sm relative flex flex-col justify-between min-h-[140px] hover:-translate-y-1 transition duration-300">
            <div class="flex justify-between items-start">
              <h3 class="text-slate-500 font-bold text-xs uppercase tracking-wider">{{ stat.title }}</h3>
              <img v-if="stat.hasProfile" :src="stat.user.avatar" class="w-10 h-10 rounded-full border border-slate-50" />
            </div>

            <div class="mt-2">
              <div v-if="stat.hasProfile">
                 <div class="font-bold text-lg text-slate-800">{{ stat.user.name }}</div>
                 <div class="text-xs text-slate-400">{{ stat.user.emission }}</div>
              </div>
              <div v-else>
                 <div class="text-3xl font-bold text-slate-800 tracking-tight">
                   {{ stat.value }} <span class="text-xs font-normal text-slate-400 ml-1">{{ stat.unit }}</span>
                 </div>
                 <div class="text-xs text-slate-400 mt-1">{{ stat.subText }}</div>
              </div>
            </div>

            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-50/50">
               <span v-if="stat.footerText" class="text-emerald-500 text-xs font-bold">{{stat.footerText}}</span>
               <span v-else></span>
               <div class="flex items-center gap-1 text-sm font-bold" 
                    :class="stat.trend === 'up' ? 'text-red-500' : 'text-emerald-500'">
                    <span v-if="stat.trendValue">{{ stat.trendValue }}</span>
                    <span v-if="stat.subText && stat.hasProfile" class="text-slate-400 text-[10px] font-normal">vs 上個月</span>
                    <i :class="stat.trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
               </div>
            </div>
          </div>
        </template>

        <!-- 2. 左側主要區塊 (佔總寬 75%, 3 欄) -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          
          <!-- (A) 碳排追蹤儀表表 (佔滿左側區塊) -->
          <EmissionChart :chart-data="data" />

          <!-- (B) 列表與圓餅圖 (Grid: 2:1) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
             
             <!-- 1. 濫用使用者 (佔 2 欄 = 總寬 50%) -->
             <div class="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-lg font-bold text-slate-800">濫用使用者</h2>
                  <button class="text-xs text-blue-500 hover:underline">View All</button>
                </div>
                
                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-left">
                    <thead class="text-slate-400 bg-slate-50 rounded-lg">
                      <tr>
                        <th class="py-2 pl-3 font-medium rounded-l">使用者</th>
                        <th class="py-2 font-medium text-center">濫用數</th>
                        <th class="py-2 font-medium text-right">Token</th>
                        <th class="py-2 pr-3 font-medium text-right rounded-r">狀態</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in data.misuseUsers" :key="user.name" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                        <td class="py-3 pl-3 flex items-center gap-3">
                          <img :src="user.avatar" class="w-8 h-8 rounded-full bg-gray-100" />
                          <span class="text-slate-700 font-bold">{{ user.name }}</span>
                        </td>
                        <td class="py-3 text-slate-500 font-mono text-center">{{ user.count }}</td>
                        <td class="py-3 text-slate-500 font-mono text-right">{{ user.usage }}</td>
                        <td class="py-3 pr-3 text-right">
                          <span :class="`${user.statusColor} text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm`">{{ user.status }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>

             <!-- 2. 圓餅圖 (佔 1 欄 = 總寬 25%) -->
             <UsagePieChart :data="data.usageDistribution" />
          </div>
        </div>

        <!-- 3. 右側通知區塊 (佔總寬 25%, 1 欄) -->
        <div class="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold text-slate-800">通知事件</h2>
            <span class="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded cursor-pointer hover:bg-slate-200 transition">已讀</span>
          </div>

          <div class="flex-1 flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-2">
            <div v-for="note in data.notifications" :key="note.id" class="flex gap-3 group">
              <div class="w-9 h-9 min-w-[2.25rem] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm transition-transform group-hover:scale-105"
                   :class="{
                     'bg-red-400': note.type === 'alert',
                     'bg-[#38BDF8]': note.type === 'mail',
                     'bg-[#FBBF24]': note.type === 'warning',
                     'bg-emerald-500': note.type === 'success'
                   }">
                 <i v-if="note.type === 'success'" class="fas fa-check"></i>
                 <i v-else-if="note.type === 'mail'" class="fas fa-envelope"></i>
                 <i v-else class="fas fa-exclamation"></i>
              </div>
              <div class="text-xs text-slate-600 leading-relaxed pt-1">
                {{ note.text }}
              </div>
            </div>
          </div>
          
          <button class="w-full bg-[#38BDF8] hover:bg-sky-500 text-white rounded-xl py-3 mt-4 text-sm font-bold shadow-blue-200 shadow-lg transition">查看所有通知</button>
        </div>

        <!-- 4. 底部事件 (跨欄) -->
        <div class="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="text-lg font-bold text-slate-800 mb-4">最近濫用事件</h2>
          <div class="bg-slate-50 rounded-xl p-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-100 transition duration-300 border border-slate-100">
            <!-- User -->
            <div class="flex items-center gap-4">
              <img :src="data.recentEvent.avatar" class="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
              <div>
                <div class="font-bold text-slate-800 text-lg">{{ data.recentEvent.user }}</div>
                <div class="text-sm text-slate-500 font-medium">Model: {{ data.recentEvent.model }}</div>
              </div>
            </div>
            
            <!-- Data -->
            <div class="flex gap-16 border-l border-slate-200 pl-8 ml-0 md:ml-4">
               <div>
                 <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CO2排放量</div>
                 <div class="font-bold text-xl text-slate-700 font-mono">{{ data.recentEvent.emission }}</div>
               </div>
               <div>
                 <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">時長</div>
                 <div class="font-bold text-xl text-slate-700 font-mono">{{ data.recentEvent.duration }}</div>
               </div>
            </div>
            
            <!-- Actions -->
            <div class="flex gap-3">
               <button class="bg-[#F87171] hover:bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-red-200 shadow-md transition">
                 {{ data.recentEvent.reasonBtn }}
               </button>
               <button class="bg-[#38BDF8] hover:bg-sky-500 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-blue-200 shadow-md transition">
                 查看詳細資訊
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>