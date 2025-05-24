"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  Target,
  BarChart3,
  MoreHorizontal,
  Bell,
  User,
  Settings,
  CreditCard,
  LogOut,
  UserPlus,
  UsersIcon,
  BookOpen,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export function Navigation() {
  const pathname = usePathname()
  const { toast } = useToast()

  const showMockToast = () => {
    toast({
      title: "Mock Feature",
      description: "You've clicked a mock button! This menu will work in the full build.",
      duration: 3000,
    })
  }

  const mainTabs = [
    { href: "/", label: "Home", icon: Home, enabled: true },
    { href: "/leads", label: "Leads", icon: Target, enabled: false },
    { href: "/bookings", label: "Bookings", icon: Calendar, enabled: false },
    { href: "/patients", label: "Patients", icon: Users, enabled: false },
    { href: "/forum", label: "Forum", icon: MessageSquare, enabled: true },
    { href: "/insights", label: "Insights", icon: BarChart3, enabled: false },
  ]

  const moreItems = [
    { href: "/referrals", label: "Referral Manager", icon: UserPlus },
    { href: "/team", label: "Team Management", icon: UsersIcon },
    { href: "/resources", label: "Clinical Resources", icon: BookOpen },
  ]

  const profileItems = [
    { href: "/profile/settings", label: "Settings", icon: Settings },
    { href: "/profile/plan", label: "My Plan", icon: CreditCard },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-clarity-blue text-xl font-medium">genie</span>
              <span className="text-gray-300">|</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-off-white rounded-full flex items-center justify-center">
                  <span className="text-vital-green text-sm font-bold">✚</span>
                </div>
                <span className="text-gray-700 font-medium">Green Cross Clinic</span>
              </div>
            </div>

            {/* Main Navigation Tabs */}
            <div className="flex items-center space-x-1">
              {mainTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href))

                if (tab.enabled) {
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-clarity-blue text-white"
                          : "text-gray-600 hover:text-clarity-blue hover:bg-blue-50",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </Link>
                  )
                } else {
                  return (
                    <button
                      key={tab.href}
                      onClick={showMockToast}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                }
              })}

              {/* More Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                    <span>More</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {moreItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <DropdownMenuItem
                        key={item.href}
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={showMockToast}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-2">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                    <span className="font-medium text-sm">Follow-up reminder</span>
                    <span className="text-xs text-gray-500">John Tan is due for a follow-up consultation</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                    <span className="font-medium text-sm">New booking</span>
                    <span className="text-xs text-gray-500">Lisa Pereira booked a trial consultation</span>
                    <span className="text-xs text-gray-400">4 hours ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                    <span className="font-medium text-sm">Forum question</span>
                    <span className="text-xs text-gray-500">High-fit question about energy crashes</span>
                    <span className="text-xs text-gray-400">6 hours ago</span>
                  </DropdownMenuItem>
                </div>
                <div className="p-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-xs" onClick={showMockToast}>
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-2">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-500">
                    2
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <h3 className="font-medium text-gray-900">Messages</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                    <span className="font-medium text-sm">Patient message</span>
                    <span className="text-xs text-gray-500">David Lee: "Thank you for the consultation..."</span>
                    <span className="text-xs text-gray-400">1 hour ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3">
                    <span className="font-medium text-sm">Forum reply</span>
                    <span className="text-xs text-gray-500">Someone replied to your answer about sleep quality</span>
                    <span className="text-xs text-gray-400">3 hours ago</span>
                  </DropdownMenuItem>
                </div>
                <div className="p-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-xs" onClick={showMockToast}>
                    View all messages
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="w-5 h-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-900">Dr. Sarah Chen</p>
                  <p className="text-sm text-gray-500">Green Cross Clinic</p>
                </div>
                {profileItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <DropdownMenuItem
                      key={item.href}
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={showMockToast}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center space-x-2 cursor-pointer text-red-600"
                  onClick={showMockToast}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
