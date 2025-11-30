// src/api/mockData.js

export const getDashboardData = () => {
  return {
    // 頂部四個卡片
    stats: [
      { 
        title: "總碳排放量", 
        value: "128.4", 
        unit: "Kg CO2e", 
        subText: "本月", 
        trend: "up", 
        trendValue: "14%",
        iconType: "chart" 
      },
      { 
        title: "濫用數量", 
        value: "342", 
        unit: "事件", 
        subText: "本月", 
        trend: "up", 
        trendValue: "8%",
        iconType: "chart"
      },
      { 
        title: "高風險使用者", 
        hasProfile: true,
        user: { name: "陳小美", avatar: "https://i.pravatar.cc/150?u=chen", emission: "42.3 kgCO2e" },
        trend: "down", 
        trendValue: "36%",
        subText: "vs 上個月"
      },
      { 
        title: "潛在節省量", 
        value: "-52.1", 
        unit: "Kg CO2e", 
        subText: "如果減少碳排量", 
        footerText: "預計節省量",
        trend: "down",
        iconType: "arrow"
      },
    ],
    // 右側通知
    notifications: [
      { id: 1, type: "alert", text: "近期濫用次數過高！" },
      { id: 2, type: "mail", text: "本月AI碳排使用圖表已寄送至主管Mail" },
      { id: 3, type: "warning", text: "本月AI使用碳排量符合即將超標！" },
      { id: 4, type: "success", text: "上月AI使用碳排量符合標準！" },
    ],
    // 左下角：濫用使用者列表
    misuseUsers: [
      { name: "陳小美", count: 85, usage: "1200 M", status: "高風險", statusColor: "bg-red-500", avatar: "https://i.pravatar.cc/150?u=chen" },
      { name: "沙龍巴斯", count: 50, usage: "700 M", status: "中風險", statusColor: "bg-yellow-400", avatar: "https://i.pravatar.cc/150?u=salon" },
      { name: "王大壯", count: 15, usage: "320 M", status: "注意！", statusColor: "bg-green-500", avatar: "https://i.pravatar.cc/150?u=wang" },
    ],
    // 圓餅圖數據
    usageDistribution: [
      { label: "智慧客服", percentage: 20, color: "#8B5CF6" }, // Purple
      { label: "非工作", percentage: 10, color: "#F87171" }, // Red
      { label: "Coding", percentage: 50, color: "#38BDF8" }, // Blue
      { label: "其他", percentage: 20, color: "#FBBF24" }, // Yellow
    ],
    // 最下方：最近濫用事件
    recentEvent: {
      user: "伊利沙白",
      avatar: "https://i.pravatar.cc/150?u=eli",
      model: "Gemini 2.5 Pro",
      duration: "3hr 25min",
      emission: "5.2 kg",
      reasonBtn: "過多的排放量"
    }
  };
};