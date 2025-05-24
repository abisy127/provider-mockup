"use client"

import {
  Calendar,
  Clock,
  ChevronRight,
  Target,
  BarChart3,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  Heart,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [todaysFocusExpanded, setTodaysFocusExpanded] = useState(true)
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  const upcomingPatients = [
    { time: "9:00am", name: "John Tan", type: "Follow-up", link: "/insights" },
    { time: "10:30am", name: "Lim Boon Keng", type: "Follow-up", link: "/insights/lim-boon-keng" },
    { time: "2:00pm", name: "David Lee", type: "Initial Consult", link: "/insights" },
    { time: "3:30pm", name: "Lisa Pereira", type: "Trial Consult", link: "/insights" },
  ]

  const actionItems = [
    {
      text: "3 high-fit forum questions waiting for reply",
      priority: "high",
      link: "/forum",
    },
    {
      text: "Turn on trial consults for 4 eligible leads",
      priority: "medium",
      link: "/insights",
    },
    {
      text: "⭐ Respond to trending threads to earn Top Contributor badge",
      priority: "low",
      link: "/forum",
    },
  ]

  const todaysFocusItems = actionItems.slice(0, 2)

  const funnelData = {
    views: 40,
    trials: 8,
    booked: 5,
  }

  const getConversionRate = (from: number, to: number) => {
    return Math.round((to / from) * 100)
  }

  const getSegmentTooltip = (segment: string) => {
    switch (segment) {
      case "views":
        return `${funnelData.views} people viewed your profile this week`
      case "trials":
        return `${funnelData.trials} signed up for a trial consult (${getConversionRate(funnelData.views, funnelData.trials)}% converted from views)`
      case "booked":
        return `${funnelData.booked} patients confirmed a booking (${getConversionRate(funnelData.trials, funnelData.booked)}% converted from trials)`
      default:
        return ""
    }
  }

  const lastSyncTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Dr. Sarah Chen</h1>
        </div>

        {/* Practice Snapshot - Full Width Priority Card */}
        <Card className="mb-6 border-l-4 border-l-clarity-blue bg-gradient-to-r from-blue-50/50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-clarity-blue" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today</p>
                    <p className="text-lg font-semibold text-gray-900">6 booked · 2 trial consults · 1 no-show</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-vital-green" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Next</p>
                    <p className="text-lg font-semibold text-gray-900">9:00am – John Tan (follow-up)</p>
                  </div>
                </div>
              </div>
              <Link href="/insights">
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>View Patient</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Row - 3 Inline Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Card 1: High-Fit Opportunities */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-4 h-4 text-vital-green" />
                <span className="text-sm font-medium text-gray-600">High-Fit Opportunities</span>
              </div>

              <div className="space-y-4">
                {/* Patient Leads */}
                <div>
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900 font-mono">8</span>
                    <span className="text-sm text-gray-700">High-Fit Patient Leads this week</span>
                  </div>
                  <p className="text-xs text-gray-500">Based on health data & goals</p>
                </div>

                {/* Forum Questions */}
                <div>
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900 font-mono">3</span>
                    <span className="text-sm text-gray-700">Forum Questions Unanswered</span>
                  </div>
                  <p className="text-xs text-gray-500">Answering builds visibility & trust</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-sm text-clarity-blue hover:text-blue-700 flex items-center space-x-1">
                  <span>View More</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Lead Funnel (Keep as is) */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-clarity-blue" />
                  <span className="text-sm font-medium text-gray-600">Lead Funnel</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-medium">Lead Funnel</p>
                      <p className="text-sm">This shows how many people progressed through your lead journey:</p>
                      <ul className="text-sm space-y-1">
                        <li>• {funnelData.views} viewed your profile</li>
                        <li>• {funnelData.trials} signed up for a trial consult</li>
                        <li>• {funnelData.booked} confirmed a booking</li>
                      </ul>
                      <p className="text-sm">
                        Use this to track how effectively you're converting visibility into actual patients.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Summary Line */}
              <div className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-3">
                <span>{funnelData.views} views</span>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span>{funnelData.trials} trials</span>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span>{funnelData.booked} bookings</span>
              </div>

              {/* Segmented Funnel Bar */}
              <div className="space-y-3 mb-4">
                <div className="flex h-4 rounded-lg overflow-hidden bg-gray-100">
                  {/* Views Segment */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`bg-clarity-blue transition-all duration-200 cursor-pointer ${
                          hoveredSegment === "views" ? "brightness-110 scale-y-110" : ""
                        }`}
                        style={{ width: "50%" }}
                        onMouseEnter={() => setHoveredSegment("views")}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getSegmentTooltip("views")}</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Trials Segment */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`bg-spark-yellow transition-all duration-200 cursor-pointer ${
                          hoveredSegment === "trials" ? "brightness-110 scale-y-110" : ""
                        }`}
                        style={{ width: "30%" }}
                        onMouseEnter={() => setHoveredSegment("trials")}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getSegmentTooltip("trials")}</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Booked Segment */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`bg-vital-green transition-all duration-200 cursor-pointer ${
                          hoveredSegment === "booked" ? "brightness-110 scale-y-110" : ""
                        }`}
                        style={{ width: "20%" }}
                        onMouseEnter={() => setHoveredSegment("booked")}
                        onMouseLeave={() => setHoveredSegment(null)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getSegmentTooltip("booked")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Labels below bar */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Views</span>
                  <span>Trials</span>
                  <span>Booked</span>
                </div>
              </div>

              {/* Conversion Rate and Trend - Two separate lines */}
              <div className="space-y-1 mb-4">
                <div className="text-xs text-gray-500">
                  Conversion this week: {getConversionRate(funnelData.views, funnelData.booked)}% (view to booking)
                </div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Up 2 bookings from last week
                </div>
              </div>

              <div className="flex justify-end">
                <button className="text-sm text-clarity-blue hover:text-blue-700 flex items-center space-x-1">
                  <span>View More</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Retention & Continuity */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">Retention & Continuity</span>
              </div>

              <div className="space-y-4">
                {/* Overdue Follow-ups */}
                <div>
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900 font-mono">5</span>
                    <span className="text-sm text-gray-700">Patients Overdue for Follow-Up</span>
                  </div>
                  <p className="text-xs text-gray-500">Missed follow-up consult, consider reaching out</p>
                </div>

                {/* Outcome Tracking */}
                <div>
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900 font-mono">10</span>
                    <span className="text-sm text-gray-700">Outcome Tracking Opt-Ins</span>
                  </div>
                  <p className="text-xs text-gray-500">Patients sharing post-care tracking data</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-end">
                  <button className="text-sm text-clarity-blue hover:text-blue-700 flex items-center space-x-1">
                    <span>View More</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two-Column Section: Action Dashboard + This Week's Schedule */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          {/* Left Column (60%) - Action Dashboard */}
          <div className="col-span-3">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Action Dashboard</CardTitle>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setTodaysFocusExpanded(!todaysFocusExpanded)}
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <span>Today's Focus: {todaysFocusItems.length} items</span>
                      {todaysFocusExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {todaysFocusExpanded && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border">
                    <p className="text-xs text-gray-600 mb-2">
                      Top priorities based on your upcoming bookings and open questions
                    </p>
                    <div className="space-y-2">
                      {todaysFocusItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              item.priority === "high" ? "bg-red-500" : "bg-yellow-500"
                            }`}
                          ></div>
                          <span className="text-sm text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* High Priority */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          High
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm">3 high-fit forum questions waiting for reply</p>
                    </div>
                    <Link href="/forum">
                      <Button size="sm" className="bg-clarity-blue hover:bg-blue-700 text-xs px-3 py-1">
                        Take Action
                      </Button>
                    </Link>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  {/* Medium Priority */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                        >
                          Medium
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm">Turn on trial consults for 4 eligible leads</p>
                    </div>
                    <Link href="/insights">
                      <Button variant="outline" size="sm" className="text-xs px-3 py-1">
                        Take Action
                      </Button>
                    </Link>
                  </div>

                  <div className="border-t border-gray-100"></div>

                  {/* Low Priority */}
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full">
                          Low
                        </Badge>
                      </div>
                      <p className="text-gray-700 text-sm">
                        ⭐ Respond to trending threads to earn Top Contributor badge
                      </p>
                    </div>
                    <Link href="/forum">
                      <Button variant="ghost" size="sm" className="text-xs px-3 py-1">
                        Take Action
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (40%) - This Week's Schedule */}
          <div className="col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">This Week's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {upcomingPatients.map((patient, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.time} – {patient.name}
                        </p>
                        <p className="text-xs text-gray-500">({patient.type})</p>
                      </div>
                      <Link href={patient.link}>
                        <ChevronRight className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </Link>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <button className="text-sm text-clarity-blue hover:text-blue-700 flex items-center space-x-1">
                      <span>View More</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
