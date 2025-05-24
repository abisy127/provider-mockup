"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Heart,
  Activity,
  Moon,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileText,
  Download,
  MessageSquare,
  Plus,
  BarChart3,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
  Pill,
  Database,
  UserX,
  Eye,
  Droplets,
  UserPlus,
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowRight, Info } from "lucide-react"

export default function LimBoonKengInsightsPage() {
  const [doctorNote, setDoctorNote] = useState("")
  const [previousNotesOpen, setPreviousNotesOpen] = useState(false)
  const [historySearch, setHistorySearch] = useState("")
  const [newTest, setNewTest] = useState({ name: "", rationale: "", priority: "medium" })
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  })
  const [showTestForm, setShowTestForm] = useState(false)
  const [showMedicationForm, setShowMedicationForm] = useState(false)
  const [showSessionSummary, setShowSessionSummary] = useState(false)
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [referralData, setReferralData] = useState({
    specialty: "",
    reason: "",
    urgency: "routine",
  })
  const [currentMedicationsExpanded, setCurrentMedicationsExpanded] = useState(true)

  const patient = {
    name: "Lim Boon Keng",
    age: 58,
    lastVisit: "2 January 2025",
    tags: ["Metabolic Risk", "Returning Patient"],
    preVisitNotes:
      "I've been feeling more tired in the mornings and get very thirsty throughout the day. I also had a small wound on my foot that took longer than usual to heal. My blood sugar readings have been a bit erratic over the past month.",
    allergies: [],
    symptoms: ["Frequent urination", "Fatigue", "Delayed wound healing", "Increased thirst"],
    insights: [
      {
        title: "Elevated fasting glucose levels (>7.0 mmol/L) on 4 out of 7 days",
        reasoning: "Consistent pattern over 2 weeks — suggests impaired glucose regulation",
        system: "Metabolic",
      },
      {
        title: "HRV + sleep disruption post-carb-heavy dinners",
        reasoning: "Potential glycemic variability impact on recovery patterns",
        system: "Sleep",
      },
    ],
    wearableData: {
      hrv: { current: 28, change: -12, unit: "ms" },
      sleep: { current: 68, change: -10, unit: "%" },
      glucose: { current: 8.1, change: 16, unit: "mmol/L" },
      lastSync: "1 hour ago",
      device: "Freestyle Libre + Apple Watch",
    },
    journalHighlights: [
      "Increased consumption of sugary drinks during late afternoons",
      "Reduced physical activity (no workouts logged for past 10 days)",
      "Late dinners (>9PM) noted 5 of 7 days",
    ],
    outcomeScore: {
      current: 4.8,
      previous: 6.2,
      improvement: -1.4,
    },
    previousNotes: [
      {
        date: "December 2024",
        summary: "Glucose levels stable, discussed meal timing and exercise routine",
        doctor: "Dr. Sarah Chen",
      },
      {
        date: "October 2024",
        summary: "HbA1c improved to 7.2%, continue current medication regimen",
        doctor: "Dr. Sarah Chen",
      },
    ],
    medicalHistory: [
      "Type 2 Diabetes (diagnosed 2018) – on Metformin 1000mg BD",
      "Hypertension (2020) – on Amlodipine 5mg daily",
      "Hyperlipidemia (2019) – diet-controlled",
      "Cataract surgery (2022) – left eye",
    ],
    suggestedTests: [
      {
        test: "HbA1c Test",
        reasoning: "Confirm long-term glucose control",
      },
      {
        test: "Diabetic Foot Screening",
        reasoning: "Due to slow wound healing",
      },
      {
        test: "Continuous Glucose Monitor (2-week)",
        reasoning: "To map glycemic variability",
      },
      {
        test: "Nutritionist Referral",
        reasoning: "For meal timing & sugar intake",
      },
    ],
  }

  const currentMedications = [
    {
      name: "Metformin",
      dosage: "1000mg",
      frequency: "Twice daily",
      remainingSupply: "8 days left",
      status: "on-track",
      adherence: 88,
    },
    {
      name: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
      remainingSupply: "15 days left",
      status: "on-track",
      adherence: 92,
    },
  ]

  const medicationHistory = [
    {
      name: "Glipizide",
      dosage: "5mg",
      frequency: "Twice daily",
      prescribedDate: "August 2024",
      instructions: "Take 30 minutes before meals",
      adherence: "Stopped",
      status: "stopped",
    },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      prescribedDate: "June 2024",
      instructions: "Take in the evening",
      adherence: "72% compliant",
      status: "tracking",
    },
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedDate: "May 2024",
      instructions: "Monitor blood pressure weekly",
      adherence: "Completed",
      status: "completed",
    },
  ]

  const groupedInsights = patient.insights.reduce(
    (acc, insight) => {
      if (!acc[insight.system]) acc[insight.system] = []
      acc[insight.system].push(insight)
      return acc
    },
    {} as Record<string, typeof patient.insights>,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-700 bg-green-100 border-green-200"
      case "running-low":
        return "text-orange-700 bg-orange-100 border-orange-200"
      case "not-taken":
        return "text-red-700 bg-red-100 border-red-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return "✓"
      case "running-low":
        return "⚠️"
      case "not-taken":
        return "✖️"
      default:
        return "•"
    }
  }

  const getAdherenceColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-100"
      case "tracking":
        return "text-blue-700 bg-blue-100"
      case "stopped":
        return "text-red-700 bg-red-100"
      default:
        return "text-gray-700 bg-gray-100"
    }
  }

  const generateSessionSummary = () => {
    return `
**Session Summary - ${new Date().toLocaleDateString()}**

**Patient:** ${patient.name}, Age ${patient.age}

**Chief Concerns:** ${patient.symptoms.join(", ")}

**Assessment:** ${doctorNote || "No notes recorded"}

**Tests Ordered:** ${newTest.name || "None"}

**Medications Prescribed:** ${newMedication.name || "None"}

**Follow-up Plan:** Schedule in 2-4 weeks to review glucose control and lifestyle modifications.

*This is an AI-generated summary, and will be shared with the patient for their reference*
    `.trim()
  }

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-screen flex flex-col">
        {/* Top Action Bar */}
        <div className="flex justify-end mb-4 space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Sync to NEHR
          </Button>
          <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
            <UserX className="w-4 h-4" />
            Mark as No-Show
          </Button>
        </div>

        {/* Patient Overview Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-gray-900">{patient.name}</h1>
                <div className="flex gap-2">
                  {patient.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">
                Age {patient.age} · Last visit: {patient.lastVisit}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search all history..."
                className="w-64"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area with Independent Scrolling */}
        <div className="grid grid-cols-5 gap-6 flex-1 min-h-0">
          {/* LEFT COLUMN (65%) - Patient Context & Insights */}
          <div className="col-span-3 overflow-y-auto pr-2 space-y-6">
            {/* AI-Powered Suggestions (Beta) */}
            <Card className="bg-gray-50/50 border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-gray-700">Smart Review</span> <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                    Beta
                  </Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            AI suggestions are based on health signals, journal entries, and recent trends. This is a
                            support tool, not a clinical decision engine. Final decisions rest with the clinician.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      This tool supports your clinical thinking. It does not replace your expertise or clinical
                      judgment.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Suggested Diagnosis */}
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Suggested Diagnosis</span>
                      <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                        High confidence
                      </Badge>
                    </div>
                    <p className="text-gray-800 font-medium mb-3">
                      Likely: Diabetic Complications (Poor Glycemic Control)
                    </p>

                    {/* Explainability */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
                        >
                          Why this suggestion? <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                          <p className="text-sm text-blue-800 font-medium mb-2">Contributing factors:</p>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• HbA1c elevated at 8.1% (target &lt;7.0%)</li>
                            <li>• Fasting glucose consistently &gt;7.0 mmol/L</li>
                            <li>• Patient reported delayed wound healing</li>
                            <li>• Increased thirst and frequent urination symptoms</li>
                            <li>• Glucose variability noted in recent readings</li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Feedback */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Was this helpful?</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-green-100">
                        👍
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-red-100">
                        👎
                      </Button>
                    </div>
                  </div>

                  {/* Suggested Action */}
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700 block mb-3">Suggested Action</span>
                    <p className="text-gray-800 mb-3">
                      Consider insulin therapy adjustment and diabetic foot examination
                    </p>

                    {/* Explainability */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal"
                        >
                          Why this action? <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                          <p className="text-sm text-blue-800 font-medium mb-2">Recommended because:</p>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• HbA1c above target suggests need for therapy intensification</li>
                            <li>• Delayed wound healing indicates diabetic complications risk</li>
                            <li>• Current Metformin monotherapy may be insufficient</li>
                            <li>• Foot examination warranted given healing concerns</li>
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Feedback */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Was this helpful?</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-green-100">
                        👍
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-red-100">
                        👎
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pre-Visit Notes */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  What the patient shared before the session
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-200">
                  <p className="text-gray-700 leading-relaxed">{patient.preVisitNotes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                        ⚠️ {allergy}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">None reported</p>
                )}
              </CardContent>
            </Card>

            {/* Reported Symptoms */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Reported Symptoms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {patient.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline" className="border-orange-500 text-orange-700">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Screening Reports & Key Biomarkers */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Screening Reports & Key Biomarkers
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert("Full biomarker history with trends and charts would open here")}
                    className="flex items-center gap-2"
                  >
                    View All Biomarkers & History
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* HbA1c */}
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">HbA1c</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Target: &lt;7.0% for most adults with diabetes</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Badge className="bg-red-100 text-red-700 border-red-200">High</Badge>
                    </div>
                    <div className="text-2xl font-bold text-red-700 mb-1">8.1%</div>
                    <p className="text-xs text-gray-500">Tested on 15 Dec 2024</p>
                  </div>

                  {/* Fasting Glucose */}
                  <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">Fasting Glucose</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Normal: 3.9-5.5 mmol/L</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">Borderline</Badge>
                    </div>
                    <div className="text-2xl font-bold text-orange-700 mb-1">7.2 mmol/L</div>
                    <p className="text-xs text-gray-500">Tested on 15 Dec 2024</p>
                  </div>

                  {/* LDL Cholesterol */}
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">LDL Cholesterol</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Target: &lt;2.6 mmol/L for diabetes patients</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Borderline</Badge>
                    </div>
                    <div className="text-2xl font-bold text-yellow-700 mb-1">3.1 mmol/L</div>
                    <p className="text-xs text-gray-500">Tested on 10 Nov 2024</p>
                  </div>

                  {/* eGFR */}
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">eGFR</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Normal: &gt;90 mL/min/1.73m²</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200">Normal</Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-700 mb-1">95 mL/min</div>
                    <p className="text-xs text-gray-500">Tested on 10 Nov 2024</p>
                  </div>

                  {/* Triglycerides */}
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">Triglycerides</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Normal: &lt;1.7 mmol/L</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Badge className="bg-red-100 text-red-700 border-red-200">High</Badge>
                    </div>
                    <div className="text-2xl font-bold text-red-700 mb-1">2.8 mmol/L</div>
                    <p className="text-xs text-gray-500">Tested on 10 Nov 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flagged Patterns - Grouped by System */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Flagged Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(groupedInsights).map(([system, insights]) => (
                    <div key={system}>
                      <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">{system}</h4>
                      <div className="space-y-3">
                        {insights.map((insight, index) => (
                          <div key={index} className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-200">
                            <p className="font-medium text-orange-900 mb-1">{insight.title}</p>
                            <p className="text-sm text-orange-700">{insight.reasoning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Connected Health Devices */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Connected Health Devices
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() =>
                      alert(
                        `Full health data from ${patient.wearableData.device}\nLast sync: ${patient.wearableData.lastSync}\n\n7-day and 30-day trend charts would open here.`,
                      )
                    }
                  >
                    <BarChart3 className="w-4 h-4" />
                    View Full Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg border">
                    <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <div className="text-sm font-medium text-gray-600">HRV</div>
                    <div className="text-xl font-bold text-gray-900 font-mono">
                      {patient.wearableData.hrv.current}
                      {patient.wearableData.hrv.unit}
                    </div>
                    <div className="text-xs text-red-600 flex items-center justify-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {patient.wearableData.hrv.change}%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border">
                    <Moon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm font-medium text-gray-600">Sleep Efficiency</div>
                    <div className="text-xl font-bold text-gray-900 font-mono">
                      {patient.wearableData.sleep.current}
                      {patient.wearableData.sleep.unit}
                    </div>
                    <div className="text-xs text-red-600 flex items-center justify-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {patient.wearableData.sleep.change}%
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border">
                    <Droplets className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="text-sm font-medium text-gray-600">Daily Avg Glucose</div>
                    <div className="text-xl font-bold text-gray-900 font-mono">
                      {patient.wearableData.glucose.current}
                      {patient.wearableData.glucose.unit}
                    </div>
                    <div className="text-xs text-red-600 flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" />+{patient.wearableData.glucose.change}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journal Highlights */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Journal Highlights</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert("Full journal timeline would open here with detailed entries and dates.")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Journal
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patient.journalHighlights.map((highlight, index) => (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-200">
                      <p className="text-yellow-800 text-sm">{highlight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outcome Tracking */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Outcome Tracking</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      alert(
                        "All outcome metrics across visits would show here: glucose trends, HbA1c history, weight tracking, etc.",
                      )
                    }
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View All Outcomes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Metabolic Health Score</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-600 font-mono">
                        {patient.outcomeScore.current}/10
                      </span>
                      <div className="flex items-center gap-1 text-sm text-red-600">
                        <TrendingDown className="w-4 h-4" />
                        <span>{patient.outcomeScore.improvement}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${(patient.outcomeScore.current / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Glucose control and lifestyle consistency have declined since last check-in.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Previous Doctor Notes */}
            <Card>
              <Collapsible open={previousNotesOpen} onOpenChange={setPreviousNotesOpen}>
                <CardHeader className="pb-4">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between cursor-pointer">
                      <CardTitle className="text-lg">Previous Doctor Notes</CardTitle>
                      {previousNotesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </CollapsibleTrigger>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <div className="space-y-3">
                      {patient.previousNotes.map((note, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{note.date}</span>
                            <span className="text-sm text-gray-500">{note.doctor}</span>
                          </div>
                          <p className="text-sm text-gray-700">{note.summary}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Medication History */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Medication History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-48 overflow-y-auto space-y-3">
                  {medicationHistory.map((medication, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{medication.name}</span>
                        <Badge className={getAdherenceColor(medication.status)}>{medication.adherence}</Badge>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p>
                          {medication.dosage}, {medication.frequency}
                        </p>
                        <p>Prescribed: {medication.prescribedDate}</p>
                        {medication.instructions && <p>Instructions: {medication.instructions}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Medical History</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      alert("Full medical history with detailed records, lab results, and imaging would open here.")
                    }
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full History
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {patient.medicalHistory
                    .filter((item) => !historySearch || item.toLowerCase().includes(historySearch.toLowerCase()))
                    .map((item, index) => (
                      <div key={index} className="text-sm text-gray-700 py-1 border-b border-gray-100 last:border-0">
                        • {item}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN (35%) - Doctor Workspace */}
          <div className="col-span-2 overflow-y-auto pl-2 space-y-6">
            {/* Doctor Notes - Top Priority */}
            <Card className="border-l-4 border-l-clarity-blue">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-clarity-blue">Your Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Document clinical impressions, plan, or follow-up steps..."
                  className="min-h-[200px] resize-none"
                  value={doctorNote}
                  onChange={(e) => setDoctorNote(e.target.value)}
                />
                <div className="mt-3 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setShowSessionSummary(!showSessionSummary)}>
                    Generate Summary
                  </Button>
                  <Button size="sm" className="bg-clarity-blue hover:bg-blue-700">
                    Save Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Session Summary */}
            {showSessionSummary && (
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-green-700">Session Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{generateSessionSummary()}</pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Suggested Tests & Referrals */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Suggested Tests & Referrals</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowTestForm(!showTestForm)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.suggestedTests.map((test, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-green-800 mb-1">{test.test}</p>
                          <p className="text-sm text-green-600">{test.reasoning}</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-3 flex items-center gap-1">
                          <Plus className="w-3 h-3" />
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}

                  {showTestForm && (
                    <div className="p-4 bg-blue-50 rounded-lg border">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="testName">Test Name</Label>
                          <Input
                            id="testName"
                            value={newTest.name}
                            onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                            placeholder="e.g., Lipid Panel"
                          />
                        </div>
                        <div>
                          <Label htmlFor="testRationale">Clinical Rationale</Label>
                          <Textarea
                            id="testRationale"
                            value={newTest.rationale}
                            onChange={(e) => setNewTest({ ...newTest, rationale: e.target.value })}
                            placeholder="Why is this test needed?"
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-clarity-blue hover:bg-blue-700">
                            Add Test
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setShowTestForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Prescribe Medication */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    Prescribe Medication
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowMedicationForm(!showMedicationForm)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Prescription
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Current Medications */}
                <Collapsible open={currentMedicationsExpanded} onOpenChange={setCurrentMedicationsExpanded}>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between cursor-pointer mb-4">
                      <CardTitle className="text-md">Current Medications</CardTitle>
                      {currentMedicationsExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-3">
                      {currentMedications.map((medication, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{medication.name}</span>
                            <Badge className={getStatusColor(medication.status)}>
                              {getStatusIcon(medication.status)} {medication.remainingSupply}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700">
                            <p>
                              {medication.dosage}, {medication.frequency}
                            </p>
                            <p>Adherence: {medication.adherence}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {showMedicationForm && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="medName">Medication Name</Label>
                      <Input
                        id="medName"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                        placeholder="e.g., Metformin"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input
                          id="dosage"
                          value={newMedication.dosage}
                          onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                          placeholder="e.g., 500mg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input
                          id="frequency"
                          value={newMedication.frequency}
                          onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                          placeholder="e.g., Twice daily"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={newMedication.duration}
                        onChange={(e) => setNewMedication({ ...newMedication, duration: e.target.value })}
                        placeholder="e.g., 90 days"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={newMedication.instructions}
                        onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                        placeholder="Take with meals to reduce stomach upset"
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-vital-green hover:bg-green-700">
                        Add Prescription
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowMedicationForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Clinical Actions */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Clinical Actions</h4>
                    <Button className="w-full bg-vital-green hover:bg-green-700 justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Follow-Up
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Refer to a Specialist
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Refer to a Specialist</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="specialty" className="text-right">
                              Specialty
                            </Label>
                            <Select
                              onValueChange={(value) => setReferralData({ ...referralData, specialty: value })}
                              defaultValue={referralData.specialty}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a specialty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Cardiology">Cardiology</SelectItem>
                                <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                                <SelectItem value="Nephrology">Nephrology</SelectItem>
                                <SelectItem value="Neurology">Neurology</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reason" className="text-right">
                              Reason
                            </Label>
                            <Textarea
                              id="reason"
                              className="col-span-3"
                              placeholder="Reason for referral"
                              value={referralData.reason}
                              onChange={(e) => setReferralData({ ...referralData, reason: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="urgency" className="text-right">
                              Urgency
                            </Label>
                            <Select
                              onValueChange={(value) => setReferralData({ ...referralData, urgency: value })}
                              defaultValue={referralData.urgency}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select urgency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="routine">Routine</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                                <SelectItem value="stat">Stat</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button type="submit">Submit Referral</Button>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    {/* Internal Actions */}
                    <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">Internal Actions</h4>
                    <Button variant="ghost" className="w-full justify-start text-gray-600">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Mark for Discussion
                    </Button>
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
