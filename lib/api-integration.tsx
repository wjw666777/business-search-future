"use client"

// API集成示例 - 实际使用Google Places API

export interface BusinessSearchParams {
  keyword: string
  location?: string
  radius?: number
  type?: string
}

export interface BusinessInfo {
  id: string
  name: string
  address: string
  phone?: string
  rating?: number
  website?: string
  hours?: string[]
  category: string
  priceLevel?: number
  photos?: string[]
}

// 实际的Google Places API调用函数
export async function searchBusinesses(params: BusinessSearchParams): Promise<BusinessInfo[]> {
  try {
    // 在实际应用中，这里会调用您的后端API
    // 后端API再调用Google Places API
    const response = await fetch("/api/search-businesses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("搜索失败")
    }

    const data = await response.json()
    return data.businesses
  } catch (error) {
    console.error("搜索商家时出错:", error)
    throw error
  }
}

// 导出数据为不同格式
export function exportToCSV(businesses: BusinessInfo[]): void {
  const headers = ["商家名称", "地址", "电话", "评分", "网站", "营业时间", "类别", "价格水平"]

  const csvContent = [
    headers.join(","),
    ...businesses.map((business) =>
      [
        `"${business.name}"`,
        `"${business.address}"`,
        `"${business.phone || "N/A"}"`,
        business.rating || "N/A",
        `"${business.website || "N/A"}"`,
        `"${business.hours?.join("; ") || "N/A"}"`,
        `"${business.category}"`,
        business.priceLevel || "N/A",
      ].join(","),
    ),
  ].join("\n")

  downloadFile(csvContent, "businesses.csv", "text/csv")
}

export function exportToJSON(businesses: BusinessInfo[]): void {
  const jsonContent = JSON.stringify(businesses, null, 2)
  downloadFile(jsonContent, "businesses.json", "application/json")
}

function downloadFile(content: string, filename: string, contentType: string): void {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
