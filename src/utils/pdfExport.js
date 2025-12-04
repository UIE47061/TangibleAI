// PDF 產出工具
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * 將 HTML 元素轉換為 PDF
 * @param {HTMLElement} element - 要轉換的 DOM 元素
 * @param {string} filename - PDF 檔案名稱
 * @param {object} options - 選項設定
 */
export const exportToPDF = async (element, filename = 'report.pdf', options = {}) => {
  try {
    const {
      orientation = 'portrait', // 'portrait' 或 'landscape'
      format = 'a4',
      margin = 10
    } = options;

    // 將 HTML 轉換為 canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 提高解析度
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // 創建 PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format
    });

    const imgWidth = orientation === 'portrait' ? 190 : 277;
    const pageHeight = orientation === 'portrait' ? 277 : 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin;

    // 添加第一頁
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 如果內容超過一頁,添加更多頁面
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // 儲存 PDF
    pdf.save(filename);
    
    return { success: true };
  } catch (error) {
    console.error('PDF 產出失敗:', error);
    return { success: false, error };
  }
};

/**
 * 產出企業 ESG 報告 PDF - 直接列印當前頁面
 * @param {object} data - 企業數據 (未使用,保留參數以相容既有呼叫)
 */
export const exportCompanyESGReport = async (data) => {
  // 隱藏導航欄和不需要列印的元素
  const navbar = document.querySelector('nav');
  const originalNavDisplay = navbar ? navbar.style.display : '';
  if (navbar) navbar.style.display = 'none';

  try {
    // 直接使用瀏覽器的列印功能
    window.print();
  } finally {
    // 恢復導航欄顯示
    if (navbar) navbar.style.display = originalNavDisplay;
  }
};

/**
 * 產出系統管理報告 PDF
 */
export const exportSystemReport = async (data) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `System_Report_${timestamp}.pdf`;
  
  const reportContent = document.createElement('div');
  reportContent.style.padding = '40px';
  reportContent.style.backgroundColor = '#ffffff';
  reportContent.style.fontFamily = 'Arial, sans-serif';
  
  reportContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #059669; font-size: 32px; margin-bottom: 10px;">TangibleAI</h1>
      <h2 style="color: #475569; font-size: 24px;">系統監控報告</h2>
      <p style="color: #64748b; font-size: 14px;">報告日期: ${new Date().toLocaleDateString('zh-TW')}</p>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="color: #1e293b; font-size: 20px; border-bottom: 2px solid #059669; padding-bottom: 10px;">系統概況</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 20px;">
        <div style="border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="color: #64748b; font-size: 12px; margin-bottom: 5px;">總企業數</p>
          <p style="color: #1e293b; font-size: 28px; font-weight: bold;">${data.monitoring.totalCompanies}</p>
        </div>
        <div style="border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="color: #64748b; font-size: 12px; margin-bottom: 5px;">API 請求數/日</p>
          <p style="color: #1e293b; font-size: 28px; font-weight: bold;">${data.monitoring.dailyRequests.toLocaleString()}</p>
        </div>
        <div style="border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="color: #64748b; font-size: 12px; margin-bottom: 5px;">資料完整率</p>
          <p style="color: #059669; font-size: 28px; font-weight: bold;">${data.monitoring.dataIntegrity}%</p>
        </div>
        <div style="border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; text-align: center;">
          <p style="color: #64748b; font-size: 12px; margin-bottom: 5px;">錯誤率</p>
          <p style="color: #ef4444; font-size: 28px; font-weight: bold;">${data.monitoring.errorRate}%</p>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="color: #1e293b; font-size: 20px; border-bottom: 2px solid #059669; padding-bottom: 10px;">企業資料上傳狀態</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 10px; text-align: left; border: 1px solid #e2e8f0;">企業名稱</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">SDK 版本</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">狀態</th>
            <th style="padding: 10px; text-align: right; border: 1px solid #e2e8f0;">資料筆數/日</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">完整性</th>
          </tr>
        </thead>
        <tbody>
          ${data.monitoring.companies.map(company => `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${company.name}</td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">${company.sdkVersion}</td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">
                <span style="color: ${company.status === 'active' ? '#059669' : company.status === 'warning' ? '#eab308' : '#ef4444'};">
                  ${company.status === 'active' ? '正常' : company.status === 'warning' ? '警告' : '異常'}
                </span>
              </td>
              <td style="padding: 10px; text-align: right; border: 1px solid #e2e8f0;">${company.dailyRecords.toLocaleString()}</td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">${company.integrity}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
      <p>© 2025 TangibleAI. All rights reserved.</p>
    </div>
  `;
  
  document.body.appendChild(reportContent);
  
  await exportToPDF(reportContent, filename, { 
    orientation: 'landscape',
    format: 'a4'
  });
  
  document.body.removeChild(reportContent);
};

/**
 * 產出銀行授信報告 PDF
 */
export const exportBankReport = async (data) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `Bank_Credit_Report_${timestamp}.pdf`;
  
  const reportContent = document.createElement('div');
  reportContent.style.padding = '40px';
  reportContent.style.backgroundColor = '#ffffff';
  reportContent.style.fontFamily = 'Arial, sans-serif';
  
  reportContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #059669; font-size: 32px; margin-bottom: 10px;">TangibleAI</h1>
      <h2 style="color: #475569; font-size: 24px;">綠色授信評估報告</h2>
      <p style="color: #64748b; font-size: 14px;">報告日期: ${new Date().toLocaleDateString('zh-TW')}</p>
    </div>
    
    <div style="margin-bottom: 30px;">
      <h3 style="color: #1e293b; font-size: 20px; border-bottom: 2px solid #059669; padding-bottom: 10px;">授信戶 ESG 評估</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #f1f5f9;">
            <th style="padding: 10px; text-align: left; border: 1px solid #e2e8f0;">企業名稱</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">產業類別</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">ESG 評級</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">AI 碳排強度</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">改善趨勢</th>
            <th style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">授信建議</th>
          </tr>
        </thead>
        <tbody>
          ${data.clients.map(client => `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">${client.name}</td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">${client.industry}</td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0; font-weight: bold;">${client.score}</td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">
                <span style="color: ${client.carbonIntensity === 'Low' || client.carbonIntensity === 'Very Low' ? '#059669' : '#ef4444'};">
                  ${client.carbonIntensity}
                </span>
              </td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">
                <span style="color: ${client.trend === 'up' ? '#059669' : client.trend === 'down' ? '#ef4444' : '#64748b'};">
                  ${client.trend === 'up' ? '↑ 提升' : client.trend === 'down' ? '↓ 退步' : '→ 持平'}
                </span>
              </td>
              <td style="padding: 10px; text-align: center; border: 1px solid #e2e8f0;">
                <span style="color: ${client.loanStatus === '綠色貸款' ? '#059669' : '#64748b'};">
                  ${client.loanStatus}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
      <p>© 2025 TangibleAI. All rights reserved.</p>
      <p style="margin-top: 5px;">本報告由 TangibleAI ESG 風險模型與授信定價系統產出</p>
    </div>
  `;
  
  document.body.appendChild(reportContent);
  
  await exportToPDF(reportContent, filename, { 
    orientation: 'landscape',
    format: 'a4'
  });
  
  document.body.removeChild(reportContent);
};
