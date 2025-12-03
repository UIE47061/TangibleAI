<script setup>
import { ref, computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
});

// 部門數據
const departments = [
  { name: '研發部', usage: 12500, efficiency: 9.2, emission: 380, color: '#10b981' },
  { name: '客服部', usage: 8900, efficiency: 7.8, emission: 445, color: '#3b82f6' },
  { name: '行銷部', usage: 6200, efficiency: 8.5, emission: 210, color: '#8b5cf6' },
  { name: '業務部', usage: 4800, efficiency: 6.2, emission: 385, color: '#f59e0b' },
  { name: '人資部', usage: 2100, efficiency: 5.1, emission: 180, color: '#ef4444' }
];

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: {
      color: '#475569'
    },
    formatter: function(params) {
      const dept = departments[params[0].dataIndex];
      return `
        <div style="font-weight: bold; margin-bottom: 4px;">${dept.name}</div>
        <div style="font-size: 12px;">
          Token 用量: ${dept.usage.toLocaleString()}<br/>
          平均效率: ${dept.efficiency}/10<br/>
          碳排放: ${dept.emission} kg CO2e
        </div>
      `;
    }
  },
  legend: {
    data: ['Token 用量', '碳排放量'],
    top: 0,
    textStyle: {
      color: '#64748b',
      fontSize: 12
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '12%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: departments.map(d => d.name),
    axisLine: {
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      color: '#64748b',
      fontSize: 11
    }
  },
  yAxis: [
    {
      type: 'value',
      name: 'Token 用量',
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#3b82f6'
        }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 10,
        formatter: function(value) {
          return (value / 1000).toFixed(1) + 'K';
        }
      },
      splitLine: {
        lineStyle: {
          color: '#f1f5f9',
          type: 'dashed'
        }
      }
    },
    {
      type: 'value',
      name: '碳排放 (kg)',
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ef4444'
        }
      },
      axisLabel: {
        color: '#64748b',
        fontSize: 10
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: 'Token 用量',
      type: 'bar',
      yAxisIndex: 0,
      data: departments.map(d => d.usage),
      itemStyle: {
        color: '#3b82f6',
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '35%'
    },
    {
      name: '碳排放量',
      type: 'bar',
      yAxisIndex: 1,
      data: departments.map(d => d.emission),
      itemStyle: {
        color: '#ef4444',
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '35%'
    }
  ]
}));

// 排序後的部門（按效率）
const sortedByEfficiency = computed(() => {
  return [...departments].sort((a, b) => b.efficiency - a.efficiency);
});

// 排序後的部門（按浪費程度 - 碳排放/效率比）
const sortedByWaste = computed(() => {
  return [...departments].sort((a, b) => {
    const wasteA = a.emission / a.efficiency;
    const wasteB = b.emission / b.efficiency;
    return wasteB - wasteA;
  });
});
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-bold text-slate-800">各部門 AI 使用分析</h2>
      <div class="bg-slate-50 p-1 rounded-lg text-xs font-medium flex">
        <button class="px-3 py-1.5 rounded-md bg-white text-slate-800 shadow-sm border border-slate-100">本月</button>
        <button class="px-3 py-1.5 rounded-md text-slate-400 hover:text-slate-600 transition">上月</button>
        <button class="px-3 py-1.5 rounded-md text-slate-400 hover:text-slate-600 transition">季度</button>
      </div>
    </div>

    <!-- 圖表 -->
    <v-chart :option="option" style="height: 280px;" autoresize />

    <!-- 排行榜 -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 效率排行榜 -->
      <div class="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <!-- Font Awesome: 星星閃爍圖標 -->
            <i class="fa-solid fa-ranking-star w-5 h-5 text-white"></i>
          </div>
          <h3 class="font-bold text-slate-800 text-sm">效率排行榜</h3>
        </div>
        <div class="space-y-2">
          <div v-for="(dept, idx) in sortedByEfficiency" :key="dept.name"
            class="flex items-center justify-between p-2 rounded-lg transition hover:bg-white">
            <div class="flex items-center gap-2">
              <span :class="['text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center', 
                idx === 0 ? 'bg-yellow-400 text-yellow-900' : 
                idx === 1 ? 'bg-slate-300 text-slate-700' : 
                idx === 2 ? 'bg-orange-300 text-orange-900' : 'bg-slate-100 text-slate-500']">
                {{ idx + 1 }}
              </span>
              <span class="text-sm text-slate-700">{{ dept.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-emerald-600">{{ dept.efficiency }}/10</span>
              <div class="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 rounded-full" :style="{ width: (dept.efficiency * 10) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 浪費排行榜 -->
      <div class="bg-gradient-to-br from-red-50 to-white p-4 rounded-xl border border-red-100">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
            <!-- Font Awesome: 三角形警告圖標 -->
            <i class="fa-solid fa-triangle-exclamation w-5 h-5 text-white"></i>
          </div>
          <h3 class="font-bold text-slate-800 text-sm">需改善排行</h3>
        </div>
        <div class="space-y-2">
          <div v-for="(dept, idx) in sortedByWaste" :key="dept.name"
            class="flex items-center justify-between p-2 rounded-lg transition hover:bg-white">
            <div class="flex items-center gap-2">
              <span :class="['text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center', 
                idx === 0 ? 'bg-red-400 text-white' : 
                idx === 1 ? 'bg-orange-300 text-orange-900' : 
                'bg-slate-100 text-slate-500']">
                {{ idx + 1 }}
              </span>
              <span class="text-sm text-slate-700">{{ dept.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-slate-500">{{ (dept.emission / dept.efficiency).toFixed(1) }} kg/效率</span>
              <span class="text-sm font-bold text-red-600">{{ dept.emission }} kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 數據表格 -->
    <div class="mt-4 overflow-x-auto">
      <table class="w-full text-xs">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="py-2 px-3 text-left text-slate-600 font-semibold">部門</th>
            <th class="py-2 px-3 text-right text-slate-600 font-semibold">Token 用量</th>
            <th class="py-2 px-3 text-right text-slate-600 font-semibold">平均效率</th>
            <th class="py-2 px-3 text-right text-slate-600 font-semibold">碳排放</th>
            <th class="py-2 px-3 text-right text-slate-600 font-semibold">效率比</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="dept in departments" :key="dept.name" class="hover:bg-slate-50">
            <td class="py-2 px-3">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: dept.color }"></span>
                <span class="font-medium text-slate-700">{{ dept.name }}</span>
              </div>
            </td>
            <td class="py-2 px-3 text-right font-mono text-slate-600">{{ dept.usage.toLocaleString() }}</td>
            <td class="py-2 px-3 text-right">
              <span class="font-bold"
                :class="dept.efficiency >= 8 ? 'text-emerald-600' : dept.efficiency >= 6 ? 'text-blue-600' : 'text-red-600'">
                {{ dept.efficiency }}/10
              </span>
            </td>
            <td class="py-2 px-3 text-right font-mono text-slate-600">{{ dept.emission }} kg</td>
            <td class="py-2 px-3 text-right font-mono text-slate-500">{{ (dept.emission / dept.usage * 1000).toFixed(2)
              }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
