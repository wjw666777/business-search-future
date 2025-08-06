import { type NextRequest, NextResponse } from "next/server"

// 百度地图API后端路由
export async function POST(request: NextRequest) {
  try {
    const { keyword, location, radius = 5000 } = await request.json()

    // 在实际应用中，您需要设置BAIDU_MAPS_API_KEY环境变量
    const apiKey = process.env.BAIDU_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "缺少百度地图API密钥" }, { status: 500 })
    }

    // 构建百度地图Place API请求
    const searchUrl = new URL("https://api.map.baidu.com/place/v2/search")
    searchUrl.searchParams.append("query", keyword)
    searchUrl.searchParams.append("region", location || "全国")
    searchUrl.searchParams.append("output", "json")
    searchUrl.searchParams.append("ak", apiKey)
    searchUrl.searchParams.append("page_size", "20")
    searchUrl.searchParams.append("page_num", "0")

    if (radius) {
      searchUrl.searchParams.append("radius", radius.toString())
    }

    const response = await fetch(searchUrl.toString())
    const data = await response.json()

    if (data.status !== 0) {
      return NextResponse.json({ error: `百度地图API错误: ${data.message}` }, { status: 400 })
    }

    // 处理搜索结果
    const businesses = data.results.map((place: any) => ({
      id: place.uid,
      name: place.name,
      address: place.address,
      phone: place.telephone,
      rating: place.overall_rating,
      website: place.detail_url,
      hours: place.opening_hours,
      category: place.tag || "未分类",
      priceLevel: place.price ? Math.min(Math.floor(place.price / 50) + 1, 4) : 0,
      distance: place.distance ? `${(place.distance / 1000).toFixed(1)}km` : undefined,
      location: place.location,
    }))

    return NextResponse.json({ businesses })
  } catch (error) {
    console.error("搜索商家API错误:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
