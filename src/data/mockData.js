// Mock data for TanahPulih - Malaysian Paddy Farming Platform

export const farmerProfile = {
  name: 'Syed Bin Shahran',
  role: 'Paddy Farmer',
  location: 'Selangor, Malaysia',
  avatar: null,
  farmSize: '5.2 Hectares',
  riceVariety: 'MR219',
  plantingDate: '12 May 2024',
  stats: {
    totalScans: 24,
    totalAlerts: 12,
    healthScore: 85,
  }
}

export const weatherData = {
  temperature: 32,
  condition: 'Sunny',
  humidity: 76,
  rainProbability: 20,
  wind: '12 km/h NE',
  uv: 'High',
  location: 'Selangor',
}

export const fieldStatus = {
  overall: 'Healthy',
  ndvi: 0.81,
  evi: 0.74,
  lastUpdated: '10 min ago',
  healthyPercent: 85,
  moderatePercent: 10,
  severePercent: 5,
  nitrogenPercent: 5,
  waterPercent: 5,
}

export const alerts = [
  {
    id: 1,
    type: 'weather',
    icon: 'rain',
    title: 'Heavy Rain Forecast',
    description: 'Expected tomorrow',
    risk: 'Medium',
    time: '2h ago',
    priority: 'medium',
    color: '#2196F3',
    bgColor: '#E3F2FD',
  },
  {
    id: 2,
    type: 'disease',
    icon: 'leaf',
    title: 'Possible Fungal Infection',
    description: 'Field B — Please inspect the field',
    risk: 'High',
    time: '4h ago',
    priority: 'high',
    color: '#E53935',
    bgColor: '#FFEBEE',
  },
  {
    id: 3,
    type: 'field',
    icon: 'nitrogen',
    title: 'Nitrogen Deficiency',
    description: 'Apply nitrogen fertilizer soon',
    risk: 'Low',
    time: '6h ago',
    priority: 'low',
    color: '#FB8C00',
    bgColor: '#FFF3E0',
  },
  {
    id: 4,
    type: 'weather',
    icon: 'sun',
    title: 'High UV Index Alert',
    description: 'UV index 8 today — protect crops',
    risk: 'Low',
    time: '8h ago',
    priority: 'low',
    color: '#FB8C00',
    bgColor: '#FFF3E0',
  },
  {
    id: 5,
    type: 'system',
    icon: 'update',
    title: 'Satellite Data Updated',
    description: 'New NDVI scan available for Field A',
    risk: null,
    time: '1d ago',
    priority: 'info',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
  },
]

export const recommendations = [
  {
    id: 1,
    icon: 'inspect',
    title: 'Inspect Field 0',
    description: 'Check for disease symptoms',
    priority: 'High Priority',
    priorityLevel: 'high',
    color: '#E53935',
    bgColor: '#FFEBEE',
    iconBg: '#FFEBEE',
  },
  {
    id: 2,
    icon: 'fertilize',
    title: 'Apply Fertilizer',
    description: 'Nitrogen recommended',
    priority: 'Medium Priority',
    priorityLevel: 'medium',
    color: '#FB8C00',
    bgColor: '#FFF3E0',
    iconBg: '#FFF3E0',
  },
  {
    id: 3,
    icon: 'rain',
    title: 'Monitor Rainfall',
    description: 'Heavy rain expected',
    priority: 'Medium Priority',
    priorityLevel: 'medium',
    color: '#2196F3',
    bgColor: '#E3F2FD',
    iconBg: '#E3F2FD',
  },
  {
    id: 4,
    icon: 'drain',
    title: 'Improve Drainage',
    description: 'Ensure water flow in the field',
    priority: 'Low Priority',
    priorityLevel: 'low',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    iconBg: '#E8F5E9',
  },
]

export const diagnosisResult = {
  disease: 'Brown Spot Disease',
  confidence: 92,
  riskLevel: 'Moderate',
  symptoms: [
    'Brown circular lesions on the leaves',
    'Yellow halo around spots',
    'Lesions enlarge under humid conditions',
  ],
  recommendations: [
    'Improve field drainage',
    'Monitor disease spreading',
    'Apply recommended treatment',
  ],
}

export const cropStatusData = {
  fields: [
    { id: 'A', name: 'Field A', ndvi: 0.81, evi: 0.74, status: 'healthy', area: '2.1 Ha' },
    { id: 'B', name: 'Field B', ndvi: 0.65, evi: 0.58, status: 'moderate', area: '1.8 Ha' },
    { id: 'C', name: 'Field C', ndvi: 0.88, evi: 0.82, status: 'healthy', area: '1.3 Ha' },
  ],

  ndviTrend: [
    { week: 'W1', value: 0.72 },
    { week: 'W2', value: 0.75 },
    { week: 'W3', value: 0.78 },
    { week: 'W4', value: 0.81 },
    { week: 'W5', value: 0.80 },
    { week: 'W6', value: 0.83 },
  ],
  eviTrend: [
    { week: 'W1', value: 0.60 },
    { week: 'W2', value: 0.64 },
    { week: 'W3', value: 0.68 },
    { week: 'W4', value: 0.74 },
    { week: 'W5', value: 0.72 },
    { week: 'W6', value: 0.76 },
  ],
}

export const chatMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hello Ahmad! 👋 How can I help you with your crops today?',
    time: '9:41 AM',
  }
]

export const suggestedQuestions = [
  'Why are my leaves turning yellow?',
  'How do I treat brown spot disease?',
  'Will rain affect fertilizer application?',
  'Best fertilizer for paddy growth?',
]

export const aiResponses = {
  'Why are my leaves turning yellow?': 'Yellow leaves in paddy can be caused by several factors:\n\n🌱 **Nitrogen Deficiency** — Most common cause. The older/lower leaves turn yellow first. Apply urea fertilizer at 45-60 kg/ha.\n\n💧 **Waterlogging** — Poor drainage causes root oxygen deprivation. Check field drainage.\n\n🦠 **Disease** — Rice tungro virus causes yellowing. Check for stunted growth alongside yellowing.\n\nBased on your field data, **Nitrogen deficiency** is the most likely cause. I recommend applying nitrogen fertilizer within 3-5 days.',
  'How do I treat brown spot disease?': 'Brown Spot Disease (*Cochliobolus miyabeanus*) treatment:\n\n1. **Fungicide Application** — Apply Mancozeb or Propiconazole at first sign of infection\n2. **Improve Nutrition** — Ensure adequate silicon and potassium\n3. **Drainage** — Improve field drainage to reduce humidity\n4. **Remove Infected Leaves** — Collect and dispose of heavily infected plant material\n5. **Monitor Weekly** — Track spread using the app scan feature\n\n⚠️ Act quickly — under humid conditions this disease spreads rapidly.',
  'Will rain affect fertilizer application?': 'Heavy rain can significantly affect fertilizer effectiveness:\n\n☔ **Avoid applying fertilizer** 24-48 hours before heavy rain (>25mm)\n🌧️ **Light rain** (5-10mm) after application is actually beneficial for absorption\n\n**For your field:** Rain is forecast tomorrow (20mm). I recommend:\n- **Do not apply** urea or granular fertilizer today\n- Wait 2 days after rain before applying\n- Consider foliar spray for urgent cases\n\n📅 Best window: 3-4 days from now (partly cloudy, 15-20°C)',
  'Best fertilizer for paddy growth?': 'For MR219 variety in Selangor, optimal fertilizer program:\n\n**Basal Application (transplanting):**\n- NPK 15:15:15 — 150 kg/ha\n\n**1st Top Dressing (21-28 DAS):**\n- Urea 46% N — 75 kg/ha\n\n**2nd Top Dressing (45-50 DAS):**\n- Urea — 50 kg/ha\n- MOP (Potassium) — 30 kg/ha\n\n**3rd Top Dressing (Panicle initiation):**\n- NPK 12:6:22 — 100 kg/ha\n\n💡 Pro tip: Split nitrogen applications increase efficiency by 20-30% vs single application.',
}

// Stakeholder dashboard data
export const stakeholderRegions = ['All Regions', 'Selangor', 'Kedah', 'Perak']

// Per-region datasets — each region has its own metrics, trend, alert mix and farm list.
export const stakeholderDataByRegion = {
  Selangor: {
    totalFarms: 45,
    totalAlerts: 112,
    avgHealthScore: 82,
    healthTrend: [
      { month: 'Jan', score: 75 },
      { month: 'Feb', score: 77 },
      { month: 'Mar', score: 74 },
      { month: 'Apr', score: 79 },
      { month: 'May', score: 81 },
      { month: 'Jun', score: 82 },
    ],
    alertsByType: [
      { name: 'Weather', value: 35, color: '#2196F3' },
      { name: 'Disease', value: 32, color: '#E53935' },
      { name: 'Nutrient', value: 18, color: '#FB8C00' },
      { name: 'Others', value: 15, color: '#9E9E9E' },
    ],
    farms: [
      { id: 'SGR-01', name: 'Sawah Sekinchan A', owner: 'Ahmad Razak', size: '3.4 ha', health: 88, status: 'Healthy', alerts: 1 },
      { id: 'SGR-02', name: 'Sawah Sekinchan B', owner: 'Syed Bin Shahran', size: '5.2 ha', health: 85, status: 'Healthy', alerts: 0 },
      { id: 'SGR-03', name: 'Sawah Tanjung Karang', owner: 'Lim Wei Hock', size: '4.1 ha', health: 71, status: 'Moderate', alerts: 2 },
      { id: 'SGR-04', name: 'Sawah Bestari Jaya', owner: 'Kumaresan a/l Raju', size: '2.8 ha', health: 64, status: 'Moderate', alerts: 3 },
      { id: 'SGR-05', name: 'Sawah Sabak Bernam', owner: 'Nurul Aisyah', size: '3.9 ha', health: 90, status: 'Healthy', alerts: 0 },
    ],
  },
  Kedah: {
    totalFarms: 38,
    totalAlerts: 134,
    avgHealthScore: 75,
    healthTrend: [
      { month: 'Jan', score: 68 },
      { month: 'Feb', score: 70 },
      { month: 'Mar', score: 66 },
      { month: 'Apr', score: 72 },
      { month: 'May', score: 74 },
      { month: 'Jun', score: 75 },
    ],
    alertsByType: [
      { name: 'Weather', value: 45, color: '#2196F3' },
      { name: 'Disease', value: 28, color: '#E53935' },
      { name: 'Nutrient', value: 17, color: '#FB8C00' },
      { name: 'Others', value: 10, color: '#9E9E9E' },
    ],
    farms: [
      { id: 'KDH-01', name: 'Sawah Alor Setar', owner: 'Hafiz Ismail', size: '6.0 ha', health: 80, status: 'Healthy', alerts: 1 },
      { id: 'KDH-02', name: 'Sawah Jitra', owner: 'Wong Mei Ling', size: '4.5 ha', health: 58, status: 'Severe', alerts: 4 },
      { id: 'KDH-03', name: 'Sawah Pendang', owner: 'Azman Yusof', size: '5.1 ha', health: 76, status: 'Moderate', alerts: 2 },
      { id: 'KDH-04', name: 'Sawah Kota Setar', owner: 'Ravi Chandran', size: '3.3 ha', health: 84, status: 'Healthy', alerts: 0 },
    ],
  },
  Perak: {
    totalFarms: 45,
    totalAlerts: 96,
    avgHealthScore: 79,
    healthTrend: [
      { month: 'Jan', score: 73 },
      { month: 'Feb', score: 75 },
      { month: 'Mar', score: 72 },
      { month: 'Apr', score: 77 },
      { month: 'May', score: 78 },
      { month: 'Jun', score: 79 },
    ],
    alertsByType: [
      { name: 'Weather', value: 38, color: '#2196F3' },
      { name: 'Disease', value: 30, color: '#E53935' },
      { name: 'Nutrient', value: 12, color: '#FB8C00' },
      { name: 'Others', value: 20, color: '#9E9E9E' },
    ],
    farms: [
      { id: 'PRK-01', name: 'Sawah Sungai Manik', owner: 'Faridah Othman', size: '4.7 ha', health: 86, status: 'Healthy', alerts: 0 },
      { id: 'PRK-02', name: 'Sawah Hutan Melintang', owner: 'Tan Soo Beng', size: '3.6 ha', health: 79, status: 'Healthy', alerts: 1 },
      { id: 'PRK-03', name: 'Sawah Bagan Datuk', owner: 'Suresh Kumar', size: '5.5 ha', health: 69, status: 'Moderate', alerts: 2 },
    ],
  },
}

// Aggregated "All Regions" view — derived from the per-region datasets above.
function buildAllRegionsData() {
  const regions = Object.values(stakeholderDataByRegion)
  const totalFarms = regions.reduce((sum, r) => sum + r.totalFarms, 0)
  const totalAlerts = regions.reduce((sum, r) => sum + r.totalAlerts, 0)
  const avgHealthScore = Math.round(regions.reduce((sum, r) => sum + r.avgHealthScore, 0) / regions.length)

  const monthKeys = regions[0].healthTrend.map(t => t.month)
  const healthTrend = monthKeys.map((month, i) => ({
    month,
    score: Math.round(regions.reduce((sum, r) => sum + r.healthTrend[i].score, 0) / regions.length),
  }))

  const alertTotals = {}
  const alertMeta = {}
  regions.forEach(r => r.alertsByType.forEach(a => {
    alertTotals[a.name] = (alertTotals[a.name] || 0) + a.value
    alertMeta[a.name] = a.color
  }))
  const grandTotal = Object.values(alertTotals).reduce((s, v) => s + v, 0)
  const alertsByType = Object.entries(alertTotals).map(([name, value]) => ({
    name,
    value: Math.round((value / grandTotal) * 100),
    color: alertMeta[name],
  }))

  const farms = regions.flatMap(r => r.farms)

  return { totalFarms, totalAlerts, avgHealthScore, healthTrend, alertsByType, farms }
}

export const stakeholderData = {
  regions: stakeholderRegions,
  byRegion: {
    'All Regions': buildAllRegionsData(),
    ...stakeholderDataByRegion,
  },
  // Summary row used by the Regional Overview table on the dashboard (always shows every region).
  farmsData: Object.entries(stakeholderDataByRegion).map(([region, d]) => ({
    region,
    farms: d.totalFarms,
    healthy: d.avgHealthScore,
    alerts: d.totalAlerts,
  })),
}

export function getStakeholderData(region) {
  return stakeholderData.byRegion[region] || stakeholderData.byRegion['All Regions']
}

// Mock monthly report data per region, used by the Stakeholder Reports page.
export const stakeholderReports = {
  'All Regions': {
    summary: 'Overall paddy health across all monitored regions improved this month, with disease-related alerts trending down.',
    productionTrend: [
      { month: 'Jan', tonnes: 410 },
      { month: 'Feb', tonnes: 430 },
      { month: 'Mar', tonnes: 405 },
      { month: 'Apr', tonnes: 455 },
      { month: 'May', tonnes: 470 },
      { month: 'Jun', tonnes: 488 },
    ],
    topIssues: ['Fungal infection clusters in Kedah', 'Heavy rain risk in Selangor coastal farms', 'Nitrogen deficiency reports rising'],
  },
  Selangor: {
    summary: 'Selangor farms show strong recovery in health scores, though two farms remain in moderate risk due to recent rainfall.',
    productionTrend: [
      { month: 'Jan', tonnes: 150 },
      { month: 'Feb', tonnes: 158 },
      { month: 'Mar', tonnes: 149 },
      { month: 'Apr', tonnes: 165 },
      { month: 'May', tonnes: 172 },
      { month: 'Jun', tonnes: 178 },
    ],
    topIssues: ['Coastal flooding risk near Sabak Bernam', 'Moderate health scores in Bestari Jaya'],
  },
  Kedah: {
    summary: 'Kedah continues to report the highest alert volume, driven by weather events and one severe disease case in Jitra.',
    productionTrend: [
      { month: 'Jan', tonnes: 130 },
      { month: 'Feb', tonnes: 134 },
      { month: 'Mar', tonnes: 125 },
      { month: 'Apr', tonnes: 142 },
      { month: 'May', tonnes: 146 },
      { month: 'Jun', tonnes: 150 },
    ],
    topIssues: ['Severe fungal outbreak in Jitra', 'Frequent weather alerts region-wide'],
  },
  Perak: {
    summary: 'Perak remains stable with consistent health scores; Bagan Datuk farm needs monitoring for early signs of stress.',
    productionTrend: [
      { month: 'Jan', tonnes: 130 },
      { month: 'Feb', tonnes: 138 },
      { month: 'Mar', tonnes: 131 },
      { month: 'Apr', tonnes: 148 },
      { month: 'May', tonnes: 152 },
      { month: 'Jun', tonnes: 160 },
    ],
    topIssues: ['Moderate stress signs in Bagan Datuk', 'Stable nutrient levels region-wide'],
  },
}
