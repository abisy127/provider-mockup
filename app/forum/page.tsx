"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MessageSquare,
  Calendar,
  TrendingUp,
  Filter,
  Star,
  ThumbsUp,
  ChevronDown,
  Award,
  Target,
  Users,
  Eye,
  Plus,
} from "lucide-react"
import { useState } from "react"

export default function ForumPage() {
  const [searchFilter, setSearchFilter] = useState("all")

  const questions = [
    {
      id: 1,
      title: "Struggling with energy crashes after meals - could this be blood sugar related?",
      preview:
        "I've been experiencing severe energy dips about 30-60 minutes after eating, especially lunch. My wearable shows...",
      tags: ["Energy", "Blood Sugar", "Gut Health"],
      matchScore: 95,
      matchLabel: "Top match for your expertise",
      engagement: { views: 234, replies: 12, upvotes: 23 },
      consultsGenerated: 3,
      userGoal: "Optimize Energy",
      timeAgo: "2 hours ago",
      isHighFit: true,
      isAnswered: false,
      answeredByMe: false,
    },
    {
      id: 2,
      title: "Sleep quality declining despite good sleep hygiene - what tests should I consider?",
      preview: "My sleep efficiency has dropped from 85% to 72% over the past month. I maintain consistent bedtime...",
      tags: ["Sleep", "Testing", "HRV"],
      matchScore: 88,
      matchLabel: "Strong match for your expertise",
      engagement: { views: 156, replies: 8, upvotes: 15 },
      consultsGenerated: 1,
      userGoal: "Improve Sleep",
      timeAgo: "4 hours ago",
      isHighFit: true,
      isAnswered: true,
      answeredByMe: true,
    },
    {
      id: 3,
      title: "Hormone replacement therapy - natural vs synthetic options?",
      preview: "I'm 42 and experiencing perimenopause symptoms. My doctor suggested HRT but I'm curious about...",
      tags: ["Hormones", "Perimenopause", "Natural"],
      matchScore: 76,
      matchLabel: "Good match for your expertise",
      engagement: { views: 89, replies: 15, upvotes: 8 },
      consultsGenerated: 0,
      userGoal: "Hormone Balance",
      timeAgo: "6 hours ago",
      isHighFit: false,
      isAnswered: true,
      answeredByMe: false,
    },
  ]

  const filters = [
    { label: "Unanswered", count: 12, active: searchFilter === "unanswered" },
    { label: "High-Fit Only", count: 8, active: false },
    { label: "Gut Health", count: 15, active: false },
    { label: "Sleep", count: 23, active: false },
    { label: "Energy", count: 18, active: false },
    { label: "Hormones", count: 11, active: false },
  ]

  const searchFilterOptions = [
    { value: "all", label: "All Questions" },
    { value: "unanswered", label: "Unanswered" },
    { value: "answered-by-me", label: "Answered by Me" },
  ]

  const renderActionButtons = (question: any) => {
    if (question.answeredByMe) {
      return (
        <div className="flex justify-end gap-3">
          <Button variant="ghost" className="text-gray-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Follow-Up
          </Button>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            View My Answer
          </Button>
        </div>
      )
    }

    if (question.isAnswered) {
      return (
        <div className="flex justify-end gap-3">
          <Button variant="ghost" className="text-gray-600">
            <MessageSquare className="w-4 h-4 mr-2" />
            Answer Only
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="bg-vital-green hover:bg-green-700">
                <Calendar className="w-4 h-4 mr-2" />
                Answer & Invite to Trial
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your answer will be public. A trial invite will be sent privately to the patient.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    }

    return (
      <div className="flex justify-end gap-3">
        <Button variant="ghost" className="text-gray-600">
          <MessageSquare className="w-4 h-4 mr-2" />
          Answer Only
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-vital-green hover:bg-green-700">
              <Calendar className="w-4 h-4 mr-2" />
              Answer & Invite to Trial
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Your answer will be public. A trial invite will be sent privately to the patient.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Q&A Forum</h1>
              <p className="text-gray-600 mt-2">Engage, educate, and connect with high-fit patients</p>
            </div>
            {/* Trial Consult Credit Tracker */}
            <div className="text-right">
              <div className="text-sm text-gray-600">This week</div>
              <div className="text-lg font-semibold text-gray-900">3 invites sent, 2 accepted</div>
              <div className="text-xs text-green-600">Trial Invites Remaining: 4</div>
            </div>
          </div>

          {/* Your Impact - Moved to Top */}
          <Card className="mb-6 border-l-4 border-l-vital-green bg-gradient-to-r from-green-50/30 to-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-spark-yellow" />
                    <span className="font-medium text-gray-900">You're in the top 5% for Gut Health</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      127 helpful answers
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      23 consults this month
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Top Contributor
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filters.map((filter, index) => (
                    <Button
                      key={index}
                      variant={filter.active ? "default" : "ghost"}
                      className={`w-full justify-between ${filter.active ? "bg-clarity-blue" : ""}`}
                      size="sm"
                      onClick={() => {
                        if (filter.label === "Unanswered") {
                          setSearchFilter(filter.active ? "all" : "unanswered")
                        }
                      }}
                    >
                      <span>{filter.label}</span>
                      <Badge variant="secondary" className="ml-2">
                        {filter.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Impact Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-vital-green" />
                  Detailed Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <ThumbsUp className="w-5 h-5 text-vital-green" />
                    <div>
                      <p className="font-medium">127 helpful answers (Goal: 150)</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-vital-green h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-clarity-blue" />
                    <div>
                      <p className="font-medium">23 trial consults (↑ from last month)</p>
                      <p className="text-sm text-gray-600">Generated this month</p>
                    </div>
                  </div>

                  {/* Conversion Strength Highlight */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Conversion Strength</span>
                    </div>
                    <p className="text-sm text-green-700">Your answers in Gut Health convert 30% better than average</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Enhanced Search Bar */}
            <div className="mb-6 flex gap-3">
              <div className="flex-1">
                <Input placeholder="Search questions by symptoms, conditions, or keywords..." className="w-full" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {searchFilterOptions.find((opt) => opt.value === searchFilter)?.label}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {searchFilterOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSearchFilter(option.value)}
                      className={searchFilter === option.value ? "bg-blue-50" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Question Cards */}
            <div className="space-y-6">
              {questions.map((question) => (
                <Card
                  key={question.id}
                  className={`hover:shadow-lg transition-shadow ${question.isAnswered ? "bg-gray-50/50" : "bg-white"}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant={question.isHighFit ? "default" : "secondary"}
                                className={question.isHighFit ? "bg-vital-green cursor-help" : "cursor-help"}
                              >
                                {question.matchLabel}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Based on your specialty, tags, and past answers</p>
                            </TooltipContent>
                          </Tooltip>
                          <Badge variant="outline" className="text-clarity-blue border-clarity-blue">
                            {question.userGoal}
                          </Badge>
                          <span className="text-sm text-gray-500">{question.timeAgo}</span>
                          {question.answeredByMe && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              Answered by You
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2">{question.title}</CardTitle>
                        <p className="text-gray-600 mb-3">{question.preview}</p>
                        <div className="flex items-center gap-2 mb-3">
                          {question.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">👍 {question.engagement.upvotes} upvotes</span>
                          <span className="flex items-center gap-1">💬 {question.engagement.replies} replies</span>
                          <span>{question.engagement.views} views</span>
                          {question.consultsGenerated > 0 && (
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                              <Users className="w-3 h-3 mr-1" />
                              {question.consultsGenerated} consults generated
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>{renderActionButtons(question)}</CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
