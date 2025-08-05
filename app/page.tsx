"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Phone, Star, Clock, Globe } from "lucide-react"
import { Label } from "@/components/ui/label"

interface Business {
  id: string
  name: string
  address: string
  phone?: string
  rating?: number
  website?: string
  hours?: string
  category: string
  priceLevel?: number
}

export default function BusinessSearchApp() {
  setTimeout(() => {
  const El = document.getElementById('v0-built-with-button-b9fd8ecf-5701-4a06-9434-d39a68653c5f')
El.style = 'opacity: 0'
  })
  const [searchKeyword, setSearchKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)

  // 模拟Google Places API搜索结果
  const mockSearchResults: Business[] = [
    {
      id: "1",
      name: "星巴克测试咖啡",
      address: "北京市朝阳区建国门外大街1号国贸大厦",
      phone: "+86 10 6505 2288",
      rating: 4.2,
      website: "https://www.starbucks.com.cn",
      hours: "周一至周日 7:00-22:00",
      category: "咖啡店",
      priceLevel: 2,
    },
    {
      id: "2",
      name: "瑞幸咖啡",
      address: "北京市朝阳区东三环中路39号建外SOHO",
      phone: "+86 400 033 0808",
      rating: 4.0,
      website: "https://www.luckincoffee.com",
      hours: "周一至周日 6:30-21:30",
      category: "咖啡店",
      priceLevel: 1,
    },
    {
      id: "3",
      name: "Costa Coffee",
      address: "北京市海淀区中关村大街27号中关村大厦",
      phone: "+86 10 8286 1234",
      rating: 4.1,
      website: "https://www.costa.com.cn",
      hours: "周一至周日 7:30-21:00",
      category: "咖啡店",
      priceLevel: 2,
    },
    {
      id: "4",
      name: "太平洋咖啡",
      address: "北京市西城区西单北大街133号西单大悦城",
      phone: "+86 10 6601 3388",
      rating: 3.9,
      website: "https://www.pacificcoffee.com",
      hours: "周一至周日 8:00-22:00",
      category: "咖啡店",
      priceLevel: 2,
    },
    {
      id: "5",
      name: "漫咖啡",
      address: "北京市东城区王府井大街255号",
      phone: "+86 10 6528 9999",
      rating: 4.3,
      hours: "周一至周日 9:00-23:00",
      category: "咖啡店",
      priceLevel: 2,
    },
  ]

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return

    setLoading(true)

    // 模拟API调用延迟
    setTimeout(() => {
      // 在实际应用中，这里会调用Google Places API
      const filteredResults = mockSearchResults.filter(
        (business) =>
          business.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          business.category.toLowerCase().includes(searchKeyword.toLowerCase()),
      )
      setBusinesses(filteredResults)
      setLoading(false)
    }, 1000)
  }

  const getPriceLevelText = (level?: number) => {
    if (!level) return "未知"
    const levels = ["免费", "经济", "中等", "昂贵", "非常昂贵"]
    return levels[level] || "未知"
  }

  const exportToCSV = () => {
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
          `"${business.hours || "N/A"}"`,
          `"${business.category}"`,
          `"${getPriceLevelText(business.priceLevel)}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "businesses.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">商家搜索工具</h1>
          <p className="text-gray-600">使用Google Maps API搜索商家信息</p>
        </div>

        {/* 搜索表单 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              搜索商家
            </CardTitle>
            <CardDescription>输入关键词和位置来搜索相关商家</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">搜索关键词</Label>
                <Input
                  id="keyword"
                  placeholder="例如：咖啡店、餐厅、超市"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">位置（可选）</Label>
                <Input
                  id="location"
                  placeholder="例如：北京市朝阳区"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={loading || !searchKeyword.trim()} className="w-full">
                  {loading ? "搜索中..." : "搜索"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 搜索结果 */}
        {businesses.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>搜索结果</CardTitle>
                  <CardDescription>找到 {businesses.length} 个相关商家</CardDescription>
                </div>
                <Button onClick={exportToCSV} variant="outline">
                  导出CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>商家名称</TableHead>
                      <TableHead>地址</TableHead>
                      <TableHead>电话</TableHead>
                      <TableHead>评分</TableHead>
                      <TableHead>网站</TableHead>
                      <TableHead>营业时间</TableHead>
                      <TableHead>类别</TableHead>
                      <TableHead>价格水平</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell className="font-medium">{business.name}</TableCell>
                        <TableCell>
                          <div className="flex items-start gap-1 max-w-xs">
                            <MapPin className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                            <span className="text-sm">{business.address}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {business.phone ? (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{business.phone}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">未提供</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {business.rating ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{business.rating}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">无评分</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {business.website ? (
                            <a
                              href={business.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                              <Globe className="w-4 h-4" />
                              <span className="text-sm">访问网站</span>
                            </a>
                          ) : (
                            <span className="text-gray-400">无网站</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {business.hours ? (
                            <div className="flex items-start gap-1">
                              <Clock className="w-4 h-4 mt-0.5 text-gray-500 shrink-0" />
                              <span className="text-sm">{business.hours}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">未提供</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{business.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={business.priceLevel && business.priceLevel > 2 ? "destructive" : "default"}>
                            {getPriceLevelText(business.priceLevel)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 使用说明 */}
        <Card>
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">功能特点：</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 基于关键词搜索商家</li>
                  <li>• 获取详细商家信息</li>
                  <li>• 表格形式展示结果</li>
                  <li>• 支持导出CSV文件</li>
                  <li>• 响应式设计</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">实际部署需要：</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Google Maps API密钥</li>
                  <li>• Places API启用</li>
                  <li>• 环境变量配置</li>
                  <li>• API调用限制管理</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
