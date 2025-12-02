<script setup>
import { ref, computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';

use([
  CanvasRenderer,
  LineChart,
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

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: {
      color: '#475569'
    }
  },
  legend: {
    data: ['正常使用量', '現在使用量'],
    bottom: 0,
    itemWidth: 30,
    itemHeight: 4,
    textStyle: {
      color: '#64748b',
      fontSize: 12
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['01', '08', '16', '24', '31'],
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#e2e8f0'
      }
    },
    axisLabel: {
      color: '#94a3b8',
      fontSize: 10,
      fontFamily: 'monospace'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(248, 113, 113, 0.1)',
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#cbd5e1',
      fontSize: 10,
      fontFamily: 'monospace'
    },
    splitLine: {
      lineStyle: {
        color: '#f1f5f9'
      }
    }
  },
  series: [
    {
      name: '正常使用量',
      type: 'line',
      data: [6000, 6500, 7500, 7000, 6000, 6500, 6800, 7200, 5000, 5500],
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#38BDF8',
        width: 3
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(56, 189, 248, 0.1)' },
            { offset: 1, color: 'rgba(56, 189, 248, 0)' }
          ]
        }
      }
    },
    {
      name: '現在使用量',
      type: 'line',
      data: [8000, 8200, 7000, 6000, 5000, 5800, 5200],
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#F87171',
        width: 3
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(248, 113, 113, 0.1)' },
            { offset: 1, color: 'rgba(248, 113, 113, 0)' }
          ]
        }
      }
    }
  ]
}));
</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-bold text-slate-800">碳排追蹤儀表表</h2>
      <div class="bg-slate-50 p-1 rounded-lg text-xs font-medium flex">
        <button class="px-3 py-1.5 rounded-md bg-white text-slate-800 shadow-sm border border-slate-100">近7天</button>
        <button class="px-3 py-1.5 rounded-md text-slate-400 hover:text-slate-600 transition">30天</button>
        <button class="px-3 py-1.5 rounded-md text-slate-400 hover:text-slate-600 transition">90天</button>
      </div>
    </div>
    
    <v-chart :option="option" style="height: 350px;" autoresize />
  </div>
</template>
