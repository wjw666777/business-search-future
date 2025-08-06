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
}

export default function GoogleMapsSearch() {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")

  // 模拟Google Places API搜索结果
  const mockSearchResults: Business[] = [
    {
      id: "1",
      name: "Starbucks Coffee",
      address: "1234 Main Street, New York, NY 10001, USA",
      phone: "+1 (212) 555-0123",
      rating: 4.2,
      website: "https://www.starbucks.com",
      hours: "Mon-Sun 6:00 AM - 10:00 PM",
      category: "Coffee Shop",
      priceLevel: 2,
    },
    {
      id: "2",
      name: "McDonald's",
      address: "5678 Broadway, New York, NY 10019, USA",
      phone: "+1 (212) 555-0456",
      rating: 3.8,
      website: "https://www.mcdonalds.com",
      hours: "Mon-Sun 24 hours",
      category: "Fast Food",
      priceLevel: 1,
    },
    {
      id: "3",
      name: "The Coffee Bean & Tea Leaf",
      address: "9012 5th Avenue, New York, NY 10028, USA",
      phone: "+1 (212) 555-0789",
      rating: 4.1,
      website: "https://www.coffeebean.com",
      hours: "Mon-Sun 7:00 AM - 9:00 PM",
      category: "Coffee Shop",
      priceLevel: 2,
    },
    {
      id: "4",
      name: "Whole Foods Market",
      address: "3456 Park Avenue, New York, NY 10016, USA",
      phone: "+1 (212) 555-0321",
      rating: 4.3,
      website: "https://www.wholefoodsmarket.com",
      hours: "Mon-Sun 8:00 AM - 10:00 PM",
      category: "Grocery Store",
      priceLevel: 3,
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
    if (!level) return "Unknown"
    const levels = ["Free", "Inexpensive", "Moderate", "Expensive", "Very Expensive"]
    return levels[level] || "Unknown"
  }

  const getPriceBadgeColor = (level?: number) => {
    if (!level || level <= 1) return "bg-green-100 text-green-800 border-green-200"
    if (level <= 2) return "bg-blue-100 text-blue-800 border-blue-200"
    if (level <= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Coffee Shop": "bg-amber-100 text-amber-800 border-amber-200",
      "Fast Food": "bg-red-100 text-red-800 border-red-200",
      "Restaurant": "bg-orange-100 text-orange-800 border-orange-200",
      "Grocery Store": "bg-green-100 text-green-800 border-green-200",
      "Pharmacy": "bg-blue-100 text-blue-800 border-blue-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const exportToCSV = () => {
    const headers = ["Business Name", "Address", "Phone", "Rating", "Website", "Hours", "Category", "Price Level"]
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
    link.setAttribute("download", "international_businesses.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 搜索表单 */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-green-50 border-blue-100">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-md">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl text-gray-800">International Business Search</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  Search global business information using Google Maps API
                </CardDescription>
              </div>
            </div>
            
            {/* API配置按钮 */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  API Config
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Google Maps API Configuration</DialogTitle>
                  <DialogDescription>
                    Enter your Google Maps API key to enable real data search
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="google-api-key">API Key</Label>
                    <Input
                      id="google-api-key"
                      placeholder="Enter Google Maps API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Visit <a href="https://console.cloud.google.com/" target="_blank" className="text-blue-600 hover:underline">Google Cloud Console</a> to get API key</p>
                    <p>• Enable "Places API" service</p>
                  </div>
                  <Button 
                    onClick={() => {
                      localStorage.setItem('google_api_key', apiKey)
                      alert('API key saved successfully')
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    Save Configuration
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-sm font-medium text-gray-700">Search Keywords</Label>
              <Input
                id="keyword"
                placeholder="e.g., coffee shop, restaurant, store"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location (Optional)</Label>
              <Input
                id="location"
                placeholder="e.g., New York, London, Tokyo"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-end sm:col-span-2 lg:col-span-1">
              <Button 
                onClick={handleSearch} 
                disabled={loading || !searchKeyword.trim()} 
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-lg h-10"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Search
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
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                  Search Results
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  Found {businesses.length} businesses
                </CardDescription>
              </div>
              <Button 
                onClick={exportToCSV} 
                variant="outline" 
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
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
                        {business.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{business.rating}</span>
                          </div>
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
                        <Badge className={`text-xs border ${getCategoryColor(business.category)}`}>
                          {business.category}
                        </Badge>
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
                    <TableHead className="font-semibold text-gray-700">Business Name</TableHead>
                    <TableHead className="font-semibold text-gray-700">Address</TableHead>
                    <TableHead className="font-semibold text-gray-700">Phone</TableHead>
                    <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                    <TableHead className="font-semibold text-gray-700">Website</TableHead>
                    <TableHead className="font-semibold text-gray-700">Hours</TableHead>
                    <TableHead className="font-semibold text-gray-700">Category</TableHead>
                    <TableHead className="font-semibold text-gray-700">Price Level</TableHead>
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
                          <span className="text-gray-400 text-sm">Not provided</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {business.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{business.rating}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No rating</span>
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
                            <span className="text-sm">Visit</span>
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">No website</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {business.hours ? (
                          <div className="flex items-start gap-1">
                            <Clock className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                            <span className="text-sm text-gray-600">{business.hours}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Not provided</span>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 使用说明 */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-green-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
            Usage Guide - Google Maps Version
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Features:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Global business information search</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Multi-language keyword support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Detailed business ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>International address format</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Rich business categories</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                API Configuration:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Google Maps API key</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Places API service enabled</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Geocoding API (optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>API usage quota management</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
