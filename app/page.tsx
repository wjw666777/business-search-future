"use client"

import { useState, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, MapPin, Sparkles, Zap } from 'lucide-react'
import GoogleMapsSearch from "@/components/google-maps-search"
import BaiduMapsSearch from "@/components/baidu-maps-search"
import Loading from "./loading"

function BusinessSearchContent() {
  const [activeTab, setActiveTab] = useState("domestic")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* 页面标题 - 移动端优化 */}
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            智能商家搜索工具
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            支持国内外商家信息搜索，一站式解决您的商家查找需求
          </p>
        </div>

        {/* Tab切换 - 移动端优化 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <CardTitle className="text-lg sm:text-xl text-gray-800">选择搜索版本</CardTitle>
            </div>
            <CardDescription className="text-sm text-gray-600">
              根据您的需求选择合适的地图服务
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14 bg-gray-100/80 rounded-xl p-1">
                <TabsTrigger 
                  value="domestic" 
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">国内版</span>
                  <span className="xs:hidden">国内</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="international" 
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">国外版</span>
                  <span className="xs:hidden">国外</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="domestic" className="mt-6">
                <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
                  <BaiduMapsSearch />
                </Suspense>
              </TabsContent>

              <TabsContent value="international" className="mt-6">
                <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
                  <GoogleMapsSearch />
                </Suspense>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 功能对比说明 - 移动端优化 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-lg sm:text-xl text-gray-800">版本对比</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* 国内版卡片 */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-4 sm:p-6 border border-red-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-200/30 to-orange-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">国内版（百度地图）</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>覆盖中国大陆地区商家信息</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>中文搜索体验更佳</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>本土化商家数据更准确</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>支持中文地址和电话格式</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>适合国内业务场景</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* 国外版卡片 */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6 border border-blue-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">国外版（Google Maps）</h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>全球商家信息覆盖</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>多语言搜索支持</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>国际化商家数据丰富</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>详细的评分和评论</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>适合海外业务场景</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function BusinessSearchApp() {
  return (
    <Suspense fallback={<Loading />}>
      <BusinessSearchContent />
    </Suspense>
  )
}
