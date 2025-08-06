"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Phone, Star, Clock, Globe, Download, Settings } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
  distance?: string
}

export default function BaiduMapsSearch() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")

  // 模拟百度地图API搜索结果
  const mockSearchResults: Business[] = [
    {
      id: "1",
      name: "星巴克咖啡（国贸店）",
      address: "北京市朝阳区建国门外大街1号国贸大厦B1层",
      phone: "010-6505-2288",
      rating: 4.2,
      website: "https://www.starbucks.com.cn",
      hours: "周一至周日 07:00-22:00",
      category: "咖啡厅",
      priceLevel: 2,
      distance: "1.2km",
    },
    {
      id: "2",
      name: "瑞幸咖啡（建外SOHO店）",
      address: "北京市朝阳区东三环中路39号建外SOHO东区3号楼1层",
      phone: "400-033-0808",
      rating: 4.0,
      website: "https://www.luckincoffee.com",
      hours: "周一至周日 06:30-21:30",
      category: "咖啡厅",
      priceLevel: 1,
      distance: "0.8km",
    },
    {
      id: "3",
      name: "海底捞火锅（王府井店）",
      address: "北京市东城区王府井大街255号北京apm购物中心5层",
      phone: "010-6528-8888",
      rating: 4.5,
      website: "https://www.haidilao.com",
      hours: "周一至周日 10:30-02:00",
      category: "火锅店",
      priceLevel: 3,
      distance: "2.1km",
    },
    {
      id: "4",
      name: "全聚德烤鸭店（前门店）",
      address: "北京市东城区前门大街30号",
      phone: "010-6701-1379",
      rating: 4.1,
      website: "https://www.quanjude.com.cn",
      hours: "周一至周日 11:00-21:30",
      category: "中餐厅",
      priceLevel: 4,
      distance: "3.5km",
    },
    {
      id: "5",
      name: "华润万家超市（双井店）",
      address: "北京市朝阳区东三环南路58号富顿中心1-2层",
      phone: "010-8778-1234",
      rating: 3.8,
      hours: "周一至周日 08:00-22:00",
      category: "超市",
      priceLevel: 2,
      distance: "1.8km",
    },
    {
      id: "6",
      name: "同仁堂药店（王府井店）",
      address: "北京市东城区王府井大街40号",
      phone: "010-6525-3906",
      rating: 4.3,
      website: "https://www.tongrentang.com",
      hours: "周一至周日 08:30-21:00",
      category: "药店",
      priceLevel: 2,
      distance: "2.3km",
    },
  ]

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return

    setLoading(true)

    // 模拟API调用延迟
    setTimeout(() => {
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
    const levels = ["免费", "经济实惠", "中等消费", "较高消费", "高端消费"]
    return levels[level] || "未知"
  }

  const getPriceBadgeColor = (level?: number) => {
    if (!level || level <= 1) return "bg-green-100 text-green-800 border-green-200"
    if (level <= 2) return "bg-blue-100 text-blue-800 border-blue-200"
    if (level <= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "咖啡厅": "bg-amber-100 text-amber-800 border-amber-200",
      "火锅店": "bg-red-100 text-red-800 border-red-200",
      "中餐厅": "bg-orange-100 text-orange-800 border-orange-200",
      "超市": "bg-green-100 text-green-800 border-green-200",
      "药店": "bg-blue-100 text-blue-800 border-blue-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const exportToCSV = () => {
    const headers = ["商家名称", "地址", "电话", "评分", "网站", "营业时间", "类别", "价格水平", "距离"]
    const csvContent = [
      headers.join(","),
      ...businesses.map((business) =>
        [
          `"${business.name}"`,
          `"${business.address}"`,
          `"${business.phone || "未提供"}"`,
          business.rating || "无评分",
          `"${business.website || "无网站"}"`,
          `"${business.hours || "未提供"}"`,
          `"${business.category}"`,
          `"${getPriceLevelText(business.priceLevel)}"`,
          `"${business.distance || "未知"}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "domestic_businesses.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 搜索表单 */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 border-red-100">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl text-gray-800">国内商家搜索</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  使用百度地图API搜索国内商家信息
                </CardDescription>
              </div>
            </div>
            
            {/* API配置按钮 */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  API配置
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>百度地图API配置</DialogTitle>
                  <DialogDescription>
                    请输入您的百度地图API密钥以启用真实数据搜索
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="baidu-api-key">API密钥</Label>
                    <Input
                      id="baidu-api-key"
                      placeholder="请输入百度地图API密钥"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• 访问 <a href="https://lbsyun.baidu.com/" target="_blank" className="text-blue-600 hover:underline">百度地图开放平台</a> 获取API密钥</p>
                    <p>• 需要启用"地点检索服务"权限</p>
                  </div>
                  <Button 
                    onClick={() => {
                      localStorage.setItem('baidu_api_key', apiKey)
                      alert('API密钥已保存')
                    }}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  >
                    保存配置
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="keyword-baidu" className="text-sm font-medium text-gray-700">搜索关键词</Label>
              <Input
                id="keyword-baidu"
                placeholder="例如：咖啡店、火锅、超市、药店"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="border-red-200 focus:border-red-400 focus:ring-red-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-baidu" className="text-sm font-medium text-gray-700">位置（可选）</Label>
              <Input
                id="location-baidu"
                placeholder="例如：北京市朝阳区、上海市浦东新区"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="border-red-200 focus:border-red-400 focus:ring-red-400"
              />
            </div>
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <Button 
                onClick={handleSearch} 
                disabled={loading || !searchKeyword.trim()} 
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg h-10"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    搜索中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    搜索
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 搜索结果 */}
      {businesses.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                  搜索结果
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  找到 {businesses.length} 个相关商家
                </CardDescription>
              </div>
              <Button 
                onClick={exportToCSV} 
                variant="outline" 
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                导出CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* 移动端卡片视图 */}
            <div className="block sm:hidden space-y-4">
              {businesses.map((business) => (
                <Card key={business.id} className="border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm">{business.name}</h3>
                        {business.distance && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {business.distance}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{business.address}</span>
                      </div>
                      
                      {business.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-600">{business.phone}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {business.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{business.rating}</span>
                            </div>
                          )}
                          <Badge className={`text-xs border ${getCategoryColor(business.category)}`}>
                            {business.category}
                          </Badge>
                        </div>
                        <Badge className={`text-xs border ${getPriceBadgeColor(business.priceLevel)}`}>
                          {getPriceLevelText(business.priceLevel)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 桌面端表格视图 */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <TableHead className="font-semibold text-gray-700">商家名称</TableHead>
                    <TableHead className="font-semibold text-gray-700">地址</TableHead>
                    <TableHead className="font-semibold text-gray-700">电话</TableHead>
                    <TableHead className="font-semibold text-gray-700">评分</TableHead>
                    <TableHead className="font-semibold text-gray-700">网站</TableHead>
                    <TableHead className="font-semibold text-gray-700">营业时间</TableHead>
                    <TableHead className="font-semibold text-gray-700">类别</TableHead>
                    <TableHead className="font-semibold text-gray-700">价格水平</TableHead>
                    <TableHead className="font-semibold text-gray-700">距离</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businesses.map((business, index) => (
                    <TableRow key={business.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <TableCell className="font-medium text-gray-900">{business.name}</TableCell>
                      <TableCell>
                        <div className="flex items-start gap-1 max-w-xs">
                          <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                          <span className="text-sm text-gray-600">{business.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {business.phone ? (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{business.phone}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">未提供</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {business.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{business.rating}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">无评分</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {business.website ? (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            <span className="text-sm">访问网站</span>
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">无网站</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {business.hours ? (
                          <div className="flex items-start gap-1">
                            <Clock className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-600">{business.hours}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">未提供</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs border ${getCategoryColor(business.category)}`}>
                          {business.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs border ${getPriceBadgeColor(business.priceLevel)}`}>
                          {getPriceLevelText(business.priceLevel)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {business.distance ? (
                          <span className="text-sm text-gray-600 font-medium">{business.distance}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">未知</span>
                        )}
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
      <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 border-red-100">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
            使用说明 - 百度地图版
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                功能特点：
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>专注国内商家信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>中文搜索体验优化</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>本土化数据更准确</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>支持距离显示</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>中国特色商家类别</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                API配置需要：
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>百度地图API密钥</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>地点检索服务</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>地理编码服务</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>API调用配额管理</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
