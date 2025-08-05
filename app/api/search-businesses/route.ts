import { type NextRequest, NextResponse } from "next/server"

// 后端API路由 - 调用Google Places API
export async function POST(request: NextRequest) {
  try {
    const { keyword, location, radius = 5000 } = await request.json()

    // 在实际应用中，您需要设置GOOGLE_MAPS_API_KEY环境变量
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "缺少Google Maps API密钥" }, { status: 500 })
    }

    // 构建Google Places API请求
    const searchUrl = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json")
    searchUrl.searchParams.append("query", keyword)
    searchUrl.searchParams.append("key", apiKey)

    if (location) {
      searchUrl.searchParams.append("location", location)
      searchUrl.searchParams.append("radius", radius.toString())
    }

    const response = await fetch(searchUrl.toString())
    const data = await response.json()

    if (data.status !== "OK") {
      return NextResponse.json({ error: `Google Places API错误: ${data.status}` }, { status: 400 })
    }

    // 处理搜索结果
    const businesses = await Promise.all(
      data.results.slice(0, 20).map(async (place: any) => {
        // 获取详细信息
        const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json")
        detailsUrl.searchParams.append("place_id", place.place_id)
        detailsUrl.searchParams.append("key", apiKey)
        detailsUrl.searchParams.append(
          "fields",
          "name,formatted_address,formatted_phone_number,rating,website,opening_hours,types,price_level",
        )

        const detailsResponse = await fetch(detailsUrl.toString())
        const detailsData = await detailsResponse.json()

        if (detailsData.status === "OK") {
          const details = detailsData.result
          return {
            id: place.place_id,
            name: details.name,
            address: details.formatted_address,
            phone: details.formatted_phone_number,
            rating: details.rating,
            website: details.website,
            hours: details.opening_hours?.weekday_text,
            category: details.types?.[0]?.replace(/_/g, " ") || "未分类",
            priceLevel: details.price_level,
          }
        }
        return null
      }),
    )

    // 过滤掉null值
    const validBusinesses = businesses.filter(Boolean)

    return NextResponse.json({ businesses: validBusinesses })
  } catch (error) {
    console.error("搜索商家API错误:", error)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
