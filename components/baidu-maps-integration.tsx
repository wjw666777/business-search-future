"use client"

// 百度地图API集成组件
// 在实际使用中，您需要添加百度地图API密钥

interface BaiduMapsConfig {
  apiKey: string
  version?: string
}

interface BaiduPlaceResult {
  uid: string
  name: string
  address: string
  telephone?: string
  overall_rating?: number
  detail_url?: string
  opening_hours?: string
  tag: string
  price?: number
  distance?: number
  location?: {
    lat: number
    lng: number
  }
}

export class BaiduMapsService {
  private apiKey: string
  private map: any
  private localSearch: any

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  // 初始化百度地图服务
  async initialize() {
    if (typeof window !== "undefined" && window.BMap) {
      // 创建地图实例
      const mapContainer = document.createElement("div")
      mapContainer.style.display = "none"
      document.body.appendChild(mapContainer)

      this.map = new window.BMap.Map(mapContainer)
      this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11) // 北京

      // 创建本地搜索实例
      this.localSearch = new window.BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map, autoViewport: false },
      })
    }
  }

  // 搜索商家
  async searchPlaces(keyword: string, location?: string): Promise<BaiduPlaceResult[]> {
    return new Promise((resolve, reject) => {
      if (!this.localSearch) {
        reject(new Error("百度地图服务未初始化"))
        return
      }

      // 设置搜索完成的回调函数
      this.localSearch.setSearchCompleteCallback((results: any) => {
        if (this.localSearch.getStatus() === window.BMAP_STATUS_SUCCESS) {
          const places: BaiduPlaceResult[] = []

          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            const poi = results.getPoi(i)
            places.push({
              uid: poi.uid || `poi_${i}`,
              name: poi.title,
              address: poi.address,
              telephone: poi.telephone,
              overall_rating: poi.overall_rating,
              detail_url: poi.detail_url,
              tag: poi.tag || "未分类",
              price: poi.price,
              distance: poi.distance,
              location: poi.point
                ? {
                    lat: poi.point.lat,
                    lng: poi.point.lng,
                  }
                : undefined,
            })
          }

          resolve(places)
        } else {
          reject(new Error(`百度地图搜索失败: ${this.localSearch.getStatus()}`))
        }
      })

      // 执行搜索
      if (location) {
        this.localSearch.searchInCity(location, keyword)
      } else {
        this.localSearch.search(keyword)
      }
    })
  }

  // 根据地址获取坐标
  async geocode(address: string): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !window.BMap) {
        reject(new Error("百度地图API未加载"))
        return
      }

      const geocoder = new window.BMap.Geocoder()
      geocoder.getPoint(address, (point: any) => {
        if (point) {
          resolve({ lat: point.lat, lng: point.lng })
        } else {
          reject(new Error("地址解析失败"))
        }
      })
    })
  }

  // 计算两点间距离
  getDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
    if (typeof window === "undefined" || !window.BMap) {
      return 0
    }

    const p1 = new window.BMap.Point(point1.lng, point1.lat)
    const p2 = new window.BMap.Point(point2.lng, point2.lat)
    return this.map.getDistance(p1, p2)
  }
}

// 加载百度地图API脚本
export const loadBaiduMapsAPI = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.BMap) {
      resolve()
      return
    }

    // 设置全局回调函数
    window.baiduMapInit = () => {
      resolve()
    }

    const script = document.createElement("script")
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${apiKey}&callback=baiduMapInit`
    script.async = true

    script.onerror = () => reject(new Error("百度地图API加载失败"))

    document.head.appendChild(script)
  })
}

// 扩展Window接口以支持百度地图
declare global {
  interface Window {
    BMap: any
    BMAP_STATUS_SUCCESS: any
    baiduMapInit: () => void
  }
}
