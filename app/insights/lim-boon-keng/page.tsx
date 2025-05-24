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
} from "lucide-react"
import { useState } from "react"

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

  const groupedInsights = patient.insights.reduce(
    (acc, insight) => {
      if (!acc[insight.system]) acc[insight.system] = []
      acc[insight.system].push(insight)
      return acc
    },
    {} as Record<string, typeof patient.insights>,
  )

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
  )
}
