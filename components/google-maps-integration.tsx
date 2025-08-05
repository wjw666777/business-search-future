"use client"

// Google Maps API集成组件
// 在实际使用中，您需要添加Google Maps API密钥

interface GoogleMapsConfig {
  apiKey: string
  libraries: string[]
}

interface PlaceResult {
  place_id: string
  name: string
  formatted_address: string
  formatted_phone_number?: string
  rating?: number
  website?: string
  opening_hours?: {
    weekday_text: string[]
  }
  types: string[]
  price_level?: number
}

export class GoogleMapsService {
  private apiKey: string
  private service: any

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  // 初始化Google Maps服务
  async initialize() {
    if (typeof window !== "undefined" && window.google) {
      const map = new window.google.maps.Map(document.createElement("div"))
      this.service = new window.google.maps.places.PlacesService(map)
    }
  }

  // 搜索商家
  async searchPlaces(keyword: string, location?: string): Promise<PlaceResult[]> {
    return new Promise((resolve, reject) => {
      if (!this.service) {
        reject(new Error("Google Maps service not initialized"))
        return
      }

      const request = {
        query: keyword,
        location: location ? new window.google.maps.LatLng(39.9042, 116.4074) : undefined, // 默认北京
        radius: 5000,
        type: "establishment",
      }

      this.service.textSearch(request, (results: any[], status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results)
        } else {
          reject(new Error(`Places search failed: ${status}`))
        }
      })
    })
  }

  // 获取商家详细信息
  async getPlaceDetails(placeId: string): Promise<PlaceResult> {
    return new Promise((resolve, reject) => {
      if (!this.service) {
        reject(new Error("Google Maps service not initialized"))
        return
      }

      const request = {
        placeId: placeId,
        fields: [
          "name",
          "formatted_address",
          "formatted_phone_number",
          "rating",
          "website",
          "opening_hours",
          "types",
          "price_level",
        ],
      }

      this.service.getDetails(request, (place: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place)
        } else {
          reject(new Error(`Place details failed: ${status}`))
        }
      })
    })
  }
}

// 加载Google Maps API脚本
export const loadGoogleMapsAPI = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.google) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Google Maps API"))

    document.head.appendChild(script)
  })
}
