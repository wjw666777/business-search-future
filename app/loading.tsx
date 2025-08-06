import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* 页面标题加载状态 */}
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg animate-pulse">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <Skeleton className="h-8 sm:h-10 w-80 mx-auto mb-2" />
          <Skeleton className="h-4 sm:h-5 w-96 mx-auto" />
        </div>

        {/* Tab切换加载状态 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-full">
              {/* Tab列表加载状态 */}
              <div className="grid w-full grid-cols-2 h-12 sm:h-14 bg-gray-100/80 rounded-xl p-1 mb-6">
                <Skeleton className="h-full rounded-lg" />
                <Skeleton className="h-full rounded-lg" />
              </div>

              {/* 搜索表单加载状态 */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-green-50 border-blue-100">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-lg" />
                      <div>
                        <Skeleton className="h-6 w-48 mb-1" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                    </div>
                    <Skeleton className="w-24 h-8 rounded hidden sm:block" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="flex items-end sm:col-span-2 lg:col-span-1">
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 功能对比说明加载状态 */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* 国内版卡片加载状态 */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-4 sm:p-6 border border-red-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-200/30 to-orange-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 国外版卡片加载状态 */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6 border border-blue-100">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 加载提示 */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">正在加载商家搜索工具...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
