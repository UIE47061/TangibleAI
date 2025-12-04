// src/api/mockData.js

/**
 * 企業端 API - 獲取企業碳排效率數據
 */
export const getCompanyData = () => {
  return {
    score: 78,
    kpi: [
      { 
        label: "本月 Token 用量", 
        value: "4.2M", 
        unit: "tokens", 
        trend: "+12%", 
        trendUp: true 
      },
      { 
        label: "預估碳排放", 
        value: "842", 
        unit: "kg CO2e", 
        trend: "-5%", 
        trendUp: false 
      },
      { 
        label: "Prompt 平均效率", 
        value: "8.5", 
        unit: "/10", 
        trend: "+0.3", 
        trendUp: true 
      },
    ],
    suggestions: [
      { 
        title: "縮減 System Prompt 長度", 
        impact: "High", 
        desc: "您的系統提示詞重複度高，優化後可減少 10% 用量。", 
        save: "120 kg CO2e" 
      },
      { 
        title: "更換為 GPT-4.1-mini 模型", 
        impact: "Med", 
        desc: "非推理型任務建議降級模型，效率更高。", 
        save: "45 kg CO2e" 
      },
    ]
  };
};

/**
 * 銀行端 API - 獲取授信戶綠色評估數據
 */
export const getBankData = () => {
  return {
    clients: [
      { 
        name: "TechCorp Inc.", 
        industry: "軟體服務", 
        score: "A", 
        carbonIntensity: "Low", 
        trend: "up", 
        loanStatus: "可優化" 
      },
      { 
        name: "Global Retail Co.", 
        industry: "零售業", 
        score: "B-", 
        carbonIntensity: "High", 
        trend: "down", 
        loanStatus: "高風險" 
      },
      { 
        name: "Smart FinTech", 
        industry: "金融科技", 
        score: "A+", 
        carbonIntensity: "Very Low", 
        trend: "flat", 
        loanStatus: "綠色貸款" 
      },
      { 
        name: "OldSchool Mfg.", 
        industry: "傳統製造", 
        score: "C", 
        carbonIntensity: "High", 
        trend: "down", 
        loanStatus: "觀察中" 
      },
    ]
  };
};

/**
 * 後台 API - 獲取系統管理數據
 */
export const getAdminData = () => {
  return {
    systemStatus: "Healthy",
    apiLatency: "45ms",
    activeCompanies: 128,
    engineConfig: [
      { 
        key: "GPT-4 電力係數 (kWh/1k tokens)", 
        value: "0.03" 
      },
      { 
        key: "台灣電力排放係數 (kg CO2e/kWh)", 
        value: "0.495" 
      },
      { 
        key: "NVIDIA H100 PUE 校準", 
        value: "1.15" 
      },
    ]
  };
};

/**
 * 系統管理後台 API - 獲取完整管理數據
 */
export const getSystemAdminData = () => {
  return {
    // 資料監控頁
    monitoring: {
      totalCompanies: 128,
      dailyRequests: 284500,
      dataIntegrity: 97.8,
      errorRate: 0.12,
      companies: [
        { id: 1, name: 'TechCorp Inc.', sdkVersion: 'v2.1.0', status: 'active', lastUpload: '2分鐘前', dailyRecords: 12500, integrity: 99, errors: 0 },
        { id: 2, name: 'Global Retail Co.', sdkVersion: 'v2.0.5', status: 'warning', lastUpload: '15分鐘前', dailyRecords: 8900, integrity: 85, errors: 2 },
        { id: 3, name: 'Smart FinTech', sdkVersion: 'v2.1.0', status: 'active', lastUpload: '5分鐘前', dailyRecords: 15200, integrity: 98, errors: 0 },
        { id: 4, name: 'OldSchool Mfg.', sdkVersion: 'v1.8.2', status: 'error', lastUpload: '2小時前', dailyRecords: 450, integrity: 62, errors: 5 },
        { id: 5, name: 'DataFlow Systems', sdkVersion: 'v2.1.0', status: 'active', lastUpload: '1分鐘前', dailyRecords: 18700, integrity: 100, errors: 0 },
      ],
      recentErrors: [
        { id: 1, severity: 'high', company: 'OldSchool Mfg.', time: '10分鐘前', message: 'SDK 版本過舊，無法解析新格式資料' },
        { id: 2, severity: 'medium', company: 'Global Retail Co.', time: '25分鐘前', message: '部分 log 欄位缺失 (missing field: model_name)' },
        { id: 3, severity: 'low', company: 'TechCorp Inc.', time: '1小時前', message: 'API 請求超時 (timeout after 30s)' },
      ]
    },
    
    // AI Carbon Engine 管理頁
    engine: {
      currentVersion: 'v2.1',
      lastUpdate: '2025-11-28',
      parameters: [
        { id: 1, name: 'GPT-4 電力係數', value: '0.03', unit: 'kWh/1k tokens', description: '基於 NVIDIA A100 測試數據' },
        { id: 2, name: 'GPT-3.5 電力係數', value: '0.008', unit: 'kWh/1k tokens', description: '輕量模型能耗參數' },
        { id: 3, name: '台灣電力排放係數', value: '0.495', unit: 'kg CO2e/kWh', description: '2024年台電公布數據' },
        { id: 4, name: 'PUE 校準值', value: '1.15', unit: '倍數', description: '資料中心能源使用效率' },
      ],
      gpuModels: [
        { id: 1, name: 'NVIDIA H100', tdp: 700, powerFactor: 1.0, efficiency: 9.5 },
        { id: 2, name: 'NVIDIA A100', tdp: 400, powerFactor: 0.85, efficiency: 8.8 },
        { id: 3, name: 'NVIDIA V100', tdp: 300, powerFactor: 0.65, efficiency: 7.2 },
      ],
      regions: [
        { id: 1, name: '台灣', flag: '🇹🇼', factor: '0.495', year: '2024' },
        { id: 2, name: '美國', flag: '🇺🇸', factor: '0.386', year: '2024' },
        { id: 3, name: '歐盟', flag: '🇪🇺', factor: '0.295', year: '2024' },
      ],
      // 供應商列表
      vendors: [
        { id: 'openai', name: 'OpenAI' },
        { id: 'anthropic', name: 'Anthropic' },
        { id: 'google', name: 'Google' },
      ],
      // 模型列表 (單位: kg CO2e per 1K tokens)
      modelRates: [
        { id: 1, vendor: 'openai', name: 'GPT-4', rate: '0.035' },
        { id: 2, vendor: 'openai', name: 'GPT-3.5', rate: '0.012' },
        { id: 3, vendor: 'openai', name: 'GPT-5', rate: '0.00044' }, // 0.07-0.8g 取中間值 0.44g = 0.00044kg
        { id: 4, vendor: 'openai', name: 'GPT-5-Codex Preview', rate: '0.00055' }, // 0.1-1.0g 取中間值 0.55g = 0.00055kg
        { id: 5, vendor: 'anthropic', name: 'Claude Sonnet 3.5', rate: '0.028' },
        { id: 6, vendor: 'anthropic', name: 'Claude Sonnet 4', rate: '0.000325' }, // 0.05-0.6g 取中間值 0.325g = 0.000325kg
        { id: 7, vendor: 'anthropic', name: 'Claude Sonnet 4.5', rate: '0.00038' }, // 0.06-0.7g 取中間值 0.38g = 0.00038kg
        { id: 8, vendor: 'anthropic', name: 'Claude Haiku 4.5', rate: '0.00011' }, // 0.02-0.2g 取中間值 0.11g = 0.00011kg
        { id: 9, vendor: 'google', name: 'Gemini Pro', rate: '0.022' },
        { id: 10, vendor: 'google', name: 'Gemini 2.5 Pro', rate: '0.00027' }, // 0.04-0.5g 取中間值 0.27g = 0.00027kg
        { id: 11, vendor: 'google', name: 'Gemini 3 Pro Preview', rate: '0.000325' }, // 0.05-0.6g 取中間值 0.325g = 0.000325kg
      ]
    },
    
    // 使用者管理頁
    users: {
      companyAccounts: 128,
      activeCompanies: 115,
      bankAccounts: 12,
      activeBanks: 11,
      totalApiKeys: 245,
      activeApiKeys: 228,
      accounts: [
        { id: 1, name: 'TechCorp Inc.', type: 'company', permission: 'write', status: 'active', apiKeys: 3, monthlyRequests: 458000, createdAt: '2024-03-15' },
        { id: 2, name: '第一商業銀行', type: 'bank', permission: 'read', status: 'active', apiKeys: 2, monthlyRequests: 125000, createdAt: '2024-06-20' },
        { id: 3, name: 'Global Retail Co.', type: 'company', permission: 'write', status: 'active', apiKeys: 2, monthlyRequests: 312000, createdAt: '2024-01-10' },
        { id: 4, name: '台新銀行', type: 'bank', permission: 'admin', status: 'active', apiKeys: 5, monthlyRequests: 580000, createdAt: '2023-11-05' },
        { id: 5, name: 'Smart FinTech', type: 'company', permission: 'write', status: 'active', apiKeys: 4, monthlyRequests: 892000, createdAt: '2024-08-12' },
      ],
      apiKeyDetails: [
        { id: 1, owner: 'TechCorp Inc.', type: 'Production', key: 'tc_prod_xk7j...m2n9', todayRequests: 15280, monthRequests: 458000, errorRate: 0.08, lastUsed: '2分鐘前', usagePercent: 68 },
        { id: 2, owner: '台新銀行', type: 'Production', key: 'ts_prod_9mw2...k5p1', todayRequests: 19350, monthRequests: 580000, errorRate: 0.02, lastUsed: '5秒前', usagePercent: 85 },
        { id: 3, owner: 'Smart FinTech', type: 'Production', key: 'sf_prod_3hj8...r7q4', todayRequests: 29740, monthRequests: 892000, errorRate: 0.15, lastUsed: '10分鐘前', usagePercent: 92 },
      ]
    }
  };
};

/**
 * Dashboard API - 獲取儀表板統計數據（保留原有）
 */
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