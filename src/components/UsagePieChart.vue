<script setup>
import { computed } from 'vue';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    textStyle: {
      color: '#475569'
    }
  },
  legend: {
    show: false
  },
  series: [
    {
      type: 'pie',
      radius: ['60%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
        formatter: '{d}%',
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold'
      },
      emphasis: {
        scale: true,
        scaleSize: 5
      },
      data: props.data.map(item => ({
        value: item.percentage,
        name: item.label,
        itemStyle: {
          color: item.color
        }
      }))
    }
  ]
}));
</script>

<template>
  <div class="md:col-span-1 bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-between">
    <h2 class="text-lg font-bold text-slate-800 self-start mb-2">今日 AI 使用分類</h2>
    <div class="flex flex-col items-center gap-4 w-full h-full justify-center">
      <!-- ECharts 甜甜圈圖 -->
      <v-chart :option="option" style="width: 160px; height: 160px;" autoresize />
      
      <!-- 圖例 (垂直排列) -->
      <div class="text-[11px] w-full px-2 space-y-2">
        <div v-for="item in data" :key="item.label" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: item.color }"></span>
            <span class="text-slate-500">{{ item.label }}</span>
          </div>
          <span class="text-slate-700 font-bold font-mono">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>
