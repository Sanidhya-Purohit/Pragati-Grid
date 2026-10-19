import type { CivicProblem, StudentSolution, CivicCertificate, LeaderboardEntry } from './types';

export const INITIAL_PROBLEMS: CivicProblem[] = [
  // 1. SOFTWARE & AI SYSTEMS (Problem A)
  {
    id: 'prob-soft-patta-01',
    formalTitle: 'Digital Land Mutation Fraud & Forged Patta Prevention via Cryptographic State Ledger',
    originalComplaint:
      'In our tehsildar office, middlemen and corrupt deed writers forged our ancestral agricultural land patta papers using fake stamp dates and duplicate survey numbers. Genuine small farmers run to courts for 6 years while property sharks sell the same plot to 3 buyers. We need transparent digital verification with zero tampering.',
    location: 'Lucknow & Barabanki Rural Belt, Uttar Pradesh',
    domain: 'Software & AI Systems',
    problemType: 'Software Application / AI',
    imageUrls: [],
    formattedProblemStatement:
      'Over 42,000 agrarian landholders across Barabanki and peripheral Lucknow face acute asset expropriation due to fraudulent duplicate land deed (Patta) mutations and backdated registrar ledgers. The core structural bottleneck is the reliance on centralized, mutable relational municipal databases susceptible to unauthorized insider overwrites without verifiable audit logs. Without open, cryptographically verifiable deed tracking, vulnerable farming families face multi-year litigation, asset freezing, and systemic credit denial.',
    detailedDescription:
      'Disputes over rural land records clog over 66% of civil litigation courts in northern India. Corrupt deed syndicates exploit latency between physical field survey demarcations and state digital registry synchronization to forge competing title deeds with identical survey numbers.',
    rootCauses: [
      'Centralized mutation database architecture lacking tamper-evident Merkle hash tree audit chains',
      'Absence of automated cadastral polygon verification comparing deed boundaries against GIS drone maps',
      'Manual revenue inspector signature dependencies vulnerable to forgery and backdating',
    ],
    expectedOutcomes: [
      'Sub-second cryptographic verification of land title deed provenance and chronological mutation chain',
      'Zero unauthorized record overwrites via decentralized distributed validator nodes (local panchayat, tehsil, district)',
      'Automated discrepancy alerts sent via SMS/WhatsApp to registered landholders within 60 seconds of any mutation filing',
    ],
    sdgGoals: ['SDG 16: Peace, Justice & Strong Institutions', 'SDG 1: No Poverty', 'SDG 9: Industry & Innovation'],
    metrics: {
      urgency: 92,
      populationImpact: 95,
      severity: 89,
      environmentalRisk: 40,
      solutionImprovementPotential: 96,
      targetAudienceText: '42,000+ Smallholder Agricultural Families & Village Panchayats',
      affectedPopulationEstimate: 42000,
      overallPriorityScore: 92,
    },
    recommendedStudentSkills: ['Full-Stack TypeScript', 'Cryptography & Merkle Trees', 'PostgreSQL / Distributed Ledger', 'GIS Mapping'],
    upvotes: 68,
    status: 'Open',
    createdAt: '2026-10-17T09:15:00Z',
    reportedBy: 'Devendra Kumar (Bharatiya Kisan Union Representative)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹14.2 Crore ($1.7M) in prevented fraudulent legal fees',
      paybackPeriodMonths: 3,
      directBeneficiaries: '42,000+ Smallholder Agricultural Families',
    },
  },

  // 1. SOFTWARE & AI SYSTEMS (Problem B)
  {
    id: 'prob-soft-pds-02',
    formalTitle: 'Biometric Disconnect & Ghost Grain Diversion in Offline Fair Price Distribution Shops',
    originalComplaint:
      'In our mountain villages, mobile network is down 18 days a month. Fair Price Shop owners claim biometric machine is not working and refuse subsidised wheat and rice to 600 elderly widows and MGNREGA workers, while secretly selling our rations to private grocery stores in town.',
    location: 'Pithoragarh & Chamoli Hill Districts, Uttarakhand',
    domain: 'Software & AI Systems',
    problemType: 'Software Application / AI',
    imageUrls: [],
    formattedProblemStatement:
      'Over 28,000 remote Himalayan mountain households face systemic calorie deprivation because Fair Price Ration Shops exploit chronic cellular network blackouts to falsify offline inventory ledgers. The technical bottleneck is the absence of an asynchronous offline cryptographic consensus mechanism capable of authenticating ration entitlement tokens without live telecom connectivity. Without a zero-trust offline auditing architecture, grains worth crores are black-marketed while impoverished families go hungry.',
    detailedDescription:
      'Existing electronic Point of Sale (ePoS) machines freeze during telecom tower outages. Shopkeepers log arbitrary offline transactions without verifiable recipient cryptographic proof, reconciling fake records days later.',
    rootCauses: [
      'Fragile ePoS architecture requiring continuous 4G/5G handshakes in rugged topographies',
      'Absence of tamper-proof offline asymmetric public-key NFC ration cards with cryptographic balance counters',
      'Zero peer-to-peer or local mesh verification between neighboring ration recipients during transaction logging',
    ],
    expectedOutcomes: [
      '100% offline transaction integrity verifiable via zero-knowledge challenge-response protocol',
      'Zero non-delivery of allocated grain rations to verified eligible ration cardholders',
      'Immediate automated black-market discrepancy flag upon subsequent synchronization',
    ],
    sdgGoals: ['SDG 2: Zero Hunger', 'SDG 10: Reduced Inequalities', 'SDG 16: Strong Institutions'],
    metrics: {
      urgency: 94,
      populationImpact: 88,
      severity: 92,
      environmentalRisk: 25,
      solutionImprovementPotential: 94,
      targetAudienceText: '28,000 Remote Mountain Households & Elderly Rations Recipients',
      affectedPopulationEstimate: 28000,
      overallPriorityScore: 91,
    },
    recommendedStudentSkills: ['Offline-First Progressive Web Apps', 'WebCrypto & Ed25519 Signatures', 'NFC protocols', 'SQLite WASM'],
    upvotes: 52,
    status: 'Open',
    createdAt: '2026-10-18T11:20:00Z',
    reportedBy: 'Pushpa Joshi (Mahila Samakhya Federation)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹4.8 Crore ($580K) in diverted essential food grains recovered',
      paybackPeriodMonths: 2,
      directBeneficiaries: '28,000 Himalayan Families',
    },
  },

  // 2. HARDWARE & EMBEDDED IOT (Problem A)
  {
    id: 'prob-iot-turbidity-01',
    formalTitle: 'Autonomous Optical Silt & Flow Telemetry for Silt Choke Prevention in Micro-Canals',
    originalComplaint:
      'The tail-end irrigation minor canal silt deposits choke underground concrete siphon pipes every 15 days during river floods. Over 800 acres of paddy crop dry out because farmers at the canal head cannot tell when silt level crosses dangerous limits until water completely stops flowing.',
    location: 'Krishna Delta District, Andhra Pradesh',
    domain: 'Hardware & Embedded IoT',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'Over 3,400 smallholder rice farmers across the Krishna canal tail-end face recurrent crop desiccation due to sudden underwater silt siltation choking sub-surface irrigation conduits. The fundamental engineering bottleneck is the lack of affordable, self-cleaning optical turbidity and acoustic flow sensors capable of operating continuously in high-mud conditions. Without low-cost wireless telemetry transmitting early silt warnings, farmers lose crucial irrigation cycles and spend lakhs on emergency manual dredging.',
    detailedDescription:
      'Canal silt loads vary dynamically with monsoon upstream releases. Manual gauge sticks fail at night and bio-fouling ruins standard turbidity lenses within 48 hours in warm agricultural drainage water.',
    rootCauses: [
      'Bio-fouling and mud crusting on optical sensor lenses without mechanical wiper or ultrasonic transducers',
      'High power draw of commercial industrial telemetry units requiring grid connection or bulky solar panels',
      'Absence of long-range LoRaWAN telemetry transmitting to community canal gate operators',
    ],
    expectedOutcomes: [
      'Continuous silt depth and flow rate measurement with 90-day maintenance-free operation',
      'Total edge hardware BOM cost under ₹3,500 ($42) using solar micro-harvesting and supercapacitors',
      'Automated SMS alert dispatched to water user associations 6 hours before conduit sediment lock',
    ],
    sdgGoals: ['SDG 6: Clean Water', 'SDG 9: Industry & Innovation', 'SDG 12: Responsible Consumption'],
    metrics: {
      urgency: 88,
      populationImpact: 84,
      severity: 86,
      environmentalRisk: 72,
      solutionImprovementPotential: 90,
      targetAudienceText: '3,400+ Delta Paddy Farmers & Water User Associations',
      affectedPopulationEstimate: 17500,
      overallPriorityScore: 86,
    },
    recommendedStudentSkills: ['ESP32 / STM32 Firmware', 'LoRaWAN Long-Range Radio', 'Ultrasonic Transducers', 'Mechanical Self-Cleaning Wiper'],
    upvotes: 41,
    status: 'Open',
    createdAt: '2026-10-16T14:10:00Z',
    reportedBy: 'N. Venkat Rao (Ayacutdar Rythu Sangham)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹36 Lakhs ($43K) in saved paddy yield and manual canal dredging',
      paybackPeriodMonths: 3,
      directBeneficiaries: '3,400 Farming Families',
    },
  },

  // 2. HARDWARE & EMBEDDED IOT (Problem B)
  {
    id: 'prob-iot-gasleak-02',
    formalTitle: 'Edge-AI Acoustic & Catalytic Hydrocarbon Leak Detection for Slum LPG Clusters',
    originalComplaint:
      'In our congested Dharavi chawls, 4 families share 1 small kitchen room. Last month 2 LPG cylinder regulators leaked at midnight and caught fire, injuring 11 people including children. Standard imported gas alarms cost ₹3,000 which poor families cannot afford, and they trigger false alarms when cooking with tadka spices.',
    location: 'Dharavi & Govandi Settlements, Mumbai, Maharashtra',
    domain: 'Hardware & Embedded IoT',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'Over 65,000 high-density informal tenement households in Mumbai live in constant hazard of catastrophic domestic LPG explosions caused by worn cylinder washer seals and cracked rubber hoses. The technological challenge is developing an ultra-low-cost, battery-operated hydrocarbon sniffer capable of distinguishing culinary smoke (mustard seed oil, spices) from explosive LPG mercaptan using edge neural audio/catalytic cues. Without accessible early gas detection, dense slum fires cause catastrophic fatalities and destroy entire city blocks.',
    detailedDescription:
      'Commercial electrochemical LPG detectors suffer from high sensor drift and false triggers from volatile cooking oils. In slum units without continuous electricity, AC-powered detectors are useless during power cuts.',
    rootCauses: [
      'False-positive triggering on culinary spice aerosols leading users to disconnect detectors',
      'High quiescent current draw of conventional heating elements draining dry batteries in days',
      'Absence of automated physical solenoid valve gas shutoff for non-technical residents',
    ],
    expectedOutcomes: [
      'Dual-sensing catalytic + MEMS acoustic hiss classification with >98% accuracy against false food smoke',
      '12-month battery life on dual AA alkaline cells with low-battery acoustic chime',
      'Total consumer BOM under ₹450 ($5.40) accessible to low-income urban informal workers',
    ],
    sdgGoals: ['SDG 11: Sustainable Cities & Communities', 'SDG 3: Good Health & Well-Being', 'SDG 9: Industry & Infrastructure'],
    metrics: {
      urgency: 96,
      populationImpact: 94,
      severity: 98,
      environmentalRisk: 65,
      solutionImprovementPotential: 97,
      targetAudienceText: '65,000+ High-Density Slum & Tenement Households',
      affectedPopulationEstimate: 65000,
      overallPriorityScore: 95,
    },
    recommendedStudentSkills: ['Edge-ML TinyML Audio Classification', 'Low-Power Analog Design', 'Micro-Combustion Sensors', 'Rapid Prototyping'],
    upvotes: 79,
    status: 'Open',
    createdAt: '2026-10-17T18:40:00Z',
    reportedBy: 'Shaikh Mumtaz (Community Fire Safety Volunteer)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹1.8 Crore ($215K) in medical burn trauma and property fire destruction prevented',
      paybackPeriodMonths: 1,
      directBeneficiaries: '65,000+ Tenement Dwellers',
    },
  },

  // 3. ELECTRICAL & ENERGY GRIDS (Problem A)
  {
    id: 'prob-elec-feeder-04',
    formalTitle: 'Rural Distribution Transformer Burnouts & Phase Imbalance Load Balancing',
    originalComplaint:
      'In our agricultural sub-station feeder, three 25 kVA distribution transformers caught fire in the last 4 months during paddy irrigation season. Farmers connect unmetered 7.5 HP submersible pump sets on single phases, leading to severe neutral current overload, burning household motors, and leaving the whole village in darkness for 10 days.',
    location: 'Rohtak Rural Feeder Grid, Haryana',
    domain: 'Electrical & Energy Grids',
    problemType: 'Hybrid (Hardware + Software)',
    imageUrls: [],
    formattedProblemStatement:
      'Over 220 farming households and 18 commercial flour mills across the Rohtak rural feeder face chronic multi-day blackouts triggered by catastrophic distribution transformer burnouts during peak tubewell pumping cycles. The engineering bottleneck is severe single-phase current unbalance (exceeding 65% neutral line current) caused by uncoordinated inductive motor loads. Without autonomous solid-state phase balancing and edge overload cutoff, replacement transformer repair backlogs cripple agricultural productivity.',
    detailedDescription:
      'Rural agricultural feeders supply power under severe voltage sags. When multiple 3-phase induction motors draw locked-rotor currents simultaneously on degraded distribution lines, localized hot spots melt coil insulation inside oil-immersed transformers.',
    rootCauses: [
      'Unbalanced single-phase tap loads exceeding rated neutral conductor thermal capacity',
      'Absence of low-cost solid-state dynamic phase-shifting or automated feeder rotation at the sub-station pole',
      'Lack of low-cost current-transformer (CT) wireless telemetry to warn grid operators before catastrophic dielectric oil breakdown',
    ],
    expectedOutcomes: [
      'Neutral current imbalance maintained below 15% under maximum simultaneous pumping load',
      'Zero transformer coil thermal damage events across the 4-month kharif irrigation window',
      'Pole-top hardware retrofit BOM cost under ₹18,000 ($215) per distribution transformer unit',
    ],
    sdgGoals: ['SDG 7: Affordable & Clean Energy', 'SDG 9: Industry & Infrastructure', 'SDG 12: Responsible Consumption'],
    metrics: {
      urgency: 89,
      populationImpact: 83,
      severity: 85,
      environmentalRisk: 68,
      solutionImprovementPotential: 89,
      targetAudienceText: '1,400+ Rural Agrarian Households & Local Flour Mills',
      affectedPopulationEstimate: 8500,
      overallPriorityScore: 86,
    },
    recommendedStudentSkills: ['Power Electronics', 'Transformer Telemetry', 'Embedded Microcontrollers', 'Grid Protection'],
    upvotes: 49,
    status: 'Open',
    createdAt: '2026-10-15T12:00:00Z',
    reportedBy: 'Surinder Singh (Krishi Vigyan Kendra Member)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹9.4 Lakhs ($11.3K) in transformer rewinding & crop pump damage',
      paybackPeriodMonths: 5,
      directBeneficiaries: '1,400+ Rural Farming Households',
    },
  },

  // 3. ELECTRICAL & ENERGY GRIDS (Problem B)
  {
    id: 'prob-elec-solar-05',
    formalTitle: 'Rooftop Solar Feeder Overvoltage Trips & Localized Grid Instability Suppressor',
    originalComplaint:
      'Under PM Surya Ghar scheme, 140 houses in our colony installed 3kW solar panels. But at noon when sun is brightest, the neighborhood street transformer voltage shoots past 260V, causing all home solar inverters to trip off on overvoltage error! We generate clean power but cannot export it, losing government solar generation subsidies.',
    location: 'Gandhinagar Residential Sub-Grid, Gujarat',
    domain: 'Electrical & Energy Grids',
    problemType: 'System Architecture / Process',
    imageUrls: [],
    formattedProblemStatement:
      'Over 140 suburban residential prosumers in Gandhinagar lose over 40% of peak midday solar yield because concurrent localized photovoltaic injection drives secondary low-voltage feeder lines beyond the 253V IEEE/CERC tripping threshold. The structural grid limitation is the absence of distributed reactive power coordination (Volt-VAR control) across decentralized consumer string inverters. Without coordinated autonomous curtailment and reactive compensation, solar adoption stalls and distribution transformers suffer thermal stress.',
    detailedDescription:
      'Radial distribution lines in Indian suburbs have high R/X impedance ratios. Active power injection at the tail of the line drives terminal voltage high, causing mandatory inverter protection trip relays to disconnect.',
    rootCauses: [
      'High resistance-to-reactance (R/X) line parameters on legacy overhead aluminium distribution lines',
      'Uncoordinated autonomous inverter firmware lacking dynamic P(V) and Q(V) reactive power absorption curves',
      'Absence of localized community thermal storage or community battery charging integration at peak generation hour',
    ],
    expectedOutcomes: [
      'Maintain secondary terminal bus voltage strictly under 250V across 100% of solar generation window',
      'Prevent >90% of overvoltage inverter shutdown events without expensive copper line reconductoring',
      'Software-only firmware update or low-cost CAN-bus / Zigbee microgrid coordinator node',
    ],
    sdgGoals: ['SDG 7: Clean Energy', 'SDG 13: Climate Action', 'SDG 9: Infrastructure'],
    metrics: {
      urgency: 84,
      populationImpact: 78,
      severity: 80,
      environmentalRisk: 82,
      solutionImprovementPotential: 91,
      targetAudienceText: 'Suburban Solar Prosumers & Discom Grid Engineers',
      affectedPopulationEstimate: 5200,
      overallPriorityScore: 83,
    },
    recommendedStudentSkills: ['Volt-VAR Power System Modeling', 'Smart Inverter Protocols (SunSpec/Modbus)', 'MATLAB/Simulink or OpenDSS', 'Microgrid Optimization'],
    upvotes: 38,
    status: 'Open',
    createdAt: '2026-10-18T14:30:00Z',
    reportedBy: 'Ketan Trivedi (Green Energy Society President)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹16 Lakhs ($19.2K) in recovered solar export feed-in credits',
      paybackPeriodMonths: 3,
      directBeneficiaries: '140 Prosumer Families & Regional Discom',
    },
  },

  // 4. MECHANICAL & ROBOTICS (Problem A)
  {
    id: 'prob-mech-desilt-01',
    formalTitle: 'Autonomous Teleoperated Storm Drain Desilting Rover for Narrow Concrete Culverts',
    originalComplaint:
      'In our old city wards, stormwater drains run through 1.2-meter narrow covered concrete culverts under shops. Every pre-monsoon season, sanitary workers are forced to enter these hazardous toxic gas channels with iron rods to dig out hardened sewage sediment. It is hazardous manual scavenging and workers risk asphyxiation from hydrogen sulfide gas.',
    location: 'Old City Wards, Varanasi, Uttar Pradesh',
    domain: 'Mechanical & Robotics',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'Over 180 municipal sanitation workers in ancient high-density urban wards face lethal occupational hazards entering subterranean 1-meter stormwater culverts laden with toxic H2S and methane gas to manually shovel compacted silt. The mechanical challenge is the lack of a low-profile, amphibious tracked robotic dredge capable of maneuvering over irregular debris beds and dislodging sticky sediment without human entry. Without robotic mechanization, unlawful manual scavenging persists and urban drains remain choked.',
    detailedDescription:
      'Historic city drains feature irregular masonry floorings, submerged sharp stones, and narrow inspection manholes spaced 30 meters apart. Standard heavy municipal vacuum trucks cannot enter narrow 2-meter medieval alleys.',
    rootCauses: [
      'Physical inaccessibility of heavy suction excavators in dense historical alleys',
      'Lack of low-cost, water-sealed tracked chassis capable of operating submerged in viscous blackwater sludge',
      'Absence of compact Archimedean screw augers powered by low-voltage safe DC motor drives',
    ],
    expectedOutcomes: [
      '100% elimination of human entry into toxic subterranean drainage culverts',
      'Continuous extraction of 400 kg of compacted sediment per hour via tethered auger dredge',
      'Chassis width strictly under 60 cm to traverse standard municipal inspection manholes',
    ],
    sdgGoals: ['SDG 8: Decent Work & Safety', 'SDG 11: Sustainable Cities', 'SDG 3: Good Health & Well-Being'],
    metrics: {
      urgency: 98,
      populationImpact: 90,
      severity: 99,
      environmentalRisk: 85,
      solutionImprovementPotential: 98,
      targetAudienceText: 'Municipal Sanitation Workers & 120,000 Old City Residents',
      affectedPopulationEstimate: 120000,
      overallPriorityScore: 96,
    },
    recommendedStudentSkills: ['Tracked Mobile Robotics', 'Waterproof IP68 Actuation', 'Wired Teleoperation & FPV Camera', 'Auger/Impeller Fluid Mechanics'],
    upvotes: 91,
    status: 'Open',
    createdAt: '2026-10-17T16:00:00Z',
    reportedBy: 'Kailash Prasad (Safai Karamchari Union)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹32 Lakhs ($38.5K) in mechanized sanitation and medical hazard compensation',
      paybackPeriodMonths: 4,
      directBeneficiaries: '180 Sanitation Workers & 120,000 Citizens',
    },
  },

  // 4. MECHANICAL & ROBOTICS (Problem B)
  {
    id: 'prob-mech-coldcart-02',
    formalTitle: 'Solar-Assisted Phase-Change Thermal Buffer Cart for Perishable Vegetable Vendors',
    originalComplaint:
      'Street vegetable vendors push wooden carts 12 hours a day under 44°C summer heat in the market. By 2 PM, green leafy vegetables (spinach, coriander, tomatoes) lose moisture and rot. Vendors are forced to distress-sell at 80% loss or throw away 15kg vegetables daily into city trash bins.',
    location: 'Sadar Bazar Mandi, Nagpur, Maharashtra',
    domain: 'Mechanical & Robotics',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'Over 2,400 street vegetable vendors in Nagpur face daily post-harvest spoilage of up to 35% of fresh produce due to solar thermal radiation heating open wooden pushcarts to 48°C. The mechanical design challenge is the lack of an ergonomic, zero-ice thermal buffer pushcart using encapsulated organic phase-change materials (PCM) and solar evaporative micro-misting. Without affordable passive preservation, low-income street vendors remain trapped in poverty while nutritious food is discarded.',
    detailedDescription:
      'Vendors currently sprinkle muddy tap water on vegetables which accelerates bacterial fungal rot under tropical heat. Commercial ice blocks melt into dirty water within 3 hours and cost ₹120/day.',
    rootCauses: [
      'High thermal conductivity of open wooden/metal handcart platforms exposed to direct sunlight',
      'High recurring expense and rapid melting of commercial ice blocks in humid conditions',
      'Absence of lightweight aerogel/polyurethane insulated drawers with salt-hydrate thermal storage',
    ],
    expectedOutcomes: [
      'Maintain produce chamber at +12°C to +16°C and >85% relative humidity for 10 consecutive hours',
      'Zero consumable daily ice requirement, saving ₹3,600 ($43) per vendor every month',
      'Retrofit kit weight under 25 kg compatible with existing standard Indian 4-wheel wooden handcarts',
    ],
    sdgGoals: ['SDG 12: Zero Food Waste', 'SDG 1: No Poverty', 'SDG 8: Decent Work'],
    metrics: {
      urgency: 87,
      populationImpact: 85,
      severity: 84,
      environmentalRisk: 75,
      solutionImprovementPotential: 92,
      targetAudienceText: '2,400+ Urban Informal Vegetable & Fruit Vendors',
      affectedPopulationEstimate: 2400,
      overallPriorityScore: 86,
    },
    recommendedStudentSkills: ['Phase Change Materials (PCM)', 'Thermal Insulation Design', 'Passive Evaporative Cooling', 'Ergonomic Cart Kinematics'],
    upvotes: 62,
    status: 'Open',
    createdAt: '2026-10-18T09:40:00Z',
    reportedBy: 'Shyamrao Bagde (Nagpur Pathvikreta Sanghatana)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹43,000 ($515) in saved spoiled produce per vendor per year',
      paybackPeriodMonths: 2,
      directBeneficiaries: '2,400 Street Vendor Families',
    },
  },

  // 5. CIVIL, URBAN & HYDRAULICS (Problem A - Existing Verified Solution)
  {
    id: 'prob-drainage-blr-02',
    formalTitle: 'Monsoon Stormwater Choke & Hydraulic Inundation at Silk Board Corridor',
    originalComplaint:
      'Silk Board junction is completely jammed with knee-deep water again every time it rains for 20 mins. The storm drains are packed with plastic trash and construction mud. Daily commuters, buses and emergency ambulances are stuck for 3 hours. Please fix before next downpour!',
    location: 'Bengaluru, Karnataka (Silk Board – Hosur Road corridor)',
    domain: 'Civil, Urban & Hydraulics',
    problemType: 'Hybrid (Hardware + Software)',
    imageUrls: [],
    formattedProblemStatement:
      'Over 180,000 daily commuters and emergency transport vehicles traversing Bengaluru\'s arterial Hosur Road corridor face chronic 3-to-4 hour transit standstills during moderate monsoon downpours. The critical bottleneck stems from undersized, debris-choked storm conduits incapable of handling peak surface runoff from adjacent elevated metro ramps. Without automated silt-clearing and real-time overflow diversion, recurring inundation paralyzes municipal mobility, creates commercial losses, and accelerates roadway degradation.',
    detailedDescription:
      'High-velocity stormwater runoff carrying unsegregated plastic waste and construction sediment converges at the Silk Board junction topographic depression. Silt accumulation reduces effective stormwater pipe cross-section by over 60%, converting an arterial intersection into an impassable artificial retention pond.',
    rootCauses: [
      'Topographical low-point convergence with insufficient gravitational gradient toward Agara lake catchment',
      'Solid waste accumulation and construction debris clogging culvert intake grates',
      'Impervious surface expansion from rapid metro and flyover construction without proportional retention basins',
    ],
    expectedOutcomes: [
      'Zero vehicle stalling during rainfall events under 40mm/hour',
      'Automated debris trap clearance cycle to maintain >80% culvert cross-sectional flow',
      'Real-time municipal telemetry alerts dispatched to ward engineers within 5 minutes of rising water levels',
    ],
    sdgGoals: ['SDG 11: Sustainable Cities', 'SDG 9: Industry & Infrastructure', 'SDG 13: Climate Action'],
    metrics: {
      urgency: 94,
      populationImpact: 92,
      severity: 88,
      environmentalRisk: 75,
      solutionImprovementPotential: 93,
      targetAudienceText: '180,000+ Daily Commuters & Emergency Ambulances on Arterial Highway',
      affectedPopulationEstimate: 180000,
      overallPriorityScore: 90,
    },
    recommendedStudentSkills: ['Embedded IoT', 'Civil Hydraulics', 'Computer Vision Trash Detection', 'Low-Cost Automation'],
    upvotes: 82,
    status: 'Solution Submitted',
    createdAt: '2026-10-12T08:30:00Z',
    reportedBy: 'K. Ramesh (Civic Commuter Forum)',
    solutionsCount: 2,
    estimatedCommunityROI: {
      annualCostSavings: '₹8.6 Crore ($1.05M) in saved fuel & transit downtime',
      paybackPeriodMonths: 4,
      directBeneficiaries: '180,000 Daily Urban Commuters',
    },
  },

  // 5. CIVIL, URBAN & HYDRAULICS (Problem B)
  {
    id: 'prob-civil-porous-03',
    formalTitle: 'Porous Interlocking Geosynthetic Road Base to Prevent Monsoon Sinkholes',
    originalComplaint:
      'Every rainy season, the arterial bypass road develops 3-foot deep sinkholes and craters because subsurface soil is black cotton clay that washes away. Heavy trucks break axles, two-wheeler riders fall and get crushed, and the municipal contractor repaves every October with tar that washes away in 4 months.',
    location: 'Nagpur-Jabalpur Highway Ring Road, Maharashtra',
    domain: 'Civil, Urban & Hydraulics',
    problemType: 'System Architecture / Process',
    imageUrls: [],
    formattedProblemStatement:
      'Over 45,000 daily commercial freight trucks and regional motorists experience severe vehicular damage and fatal rollover accidents caused by rapid subgrade erosion and catastrophic cratering in expansive black-cotton road embankments. The civil engineering bottleneck is water entrapment beneath impermeable asphalt layers during torrential monsoons, causing hydraulic pore pressure liquefaction of weak clay subsoil. Without integrated permeable geocellular confinement and sub-surface lateral drainage, municipal asphalt repaving collapses every monsoon.',
    detailedDescription:
      'Expansive clay soils swell when saturated and shrink when dry. Trapped water under asphalt cannot percolate downward or escape sideways, causing hydroplaning craters and road foundation cave-ins.',
    rootCauses: [
      'High plastic index of regional black cotton subgrade susceptible to hydraulic liquefaction',
      'Absence of geocellular high-density polyethylene honeycomb grid reinforcement in base courses',
      'Lack of lateral perforated geosynthetic collector pipes discharging runoff to roadside bioswales',
    ],
    expectedOutcomes: [
      'Zero subgrade washouts and sinkhole formations over a 5-year monsoon operational cycle',
      '40% reduction in life-cycle road resurfacing expenses for local highway development authority',
      'Rapid installation using locally recycled plastic polymer geocells and quarry dust aggregate',
    ],
    sdgGoals: ['SDG 9: Resilient Infrastructure', 'SDG 11: Sustainable Cities', 'SDG 12: Circular Economy'],
    metrics: {
      urgency: 89,
      populationImpact: 86,
      severity: 91,
      environmentalRisk: 68,
      solutionImprovementPotential: 91,
      targetAudienceText: '45,000+ Highway Commuters, Heavy Freight Transporters & Motorcyclists',
      affectedPopulationEstimate: 45000,
      overallPriorityScore: 87,
    },
    recommendedStudentSkills: ['Geotechnical Engineering', 'Pavement Design & Geocells', 'Hydrologic Drainage Modeling', 'Recycled Polymer Composites'],
    upvotes: 45,
    status: 'Open',
    createdAt: '2026-10-16T10:15:00Z',
    reportedBy: 'Er. Sandeep Deshmukh (Highway Safety Activist)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹3.4 Crore ($410K) in annual recurring road asphalt repairs',
      paybackPeriodMonths: 6,
      directBeneficiaries: '45,000 Daily Motorists & Commuters',
    },
  },

  // 6. BIOTECH & ENVIRONMENTAL (Problem A - Existing Verified Solution)
  {
    id: 'prob-water-fluoride-03',
    formalTitle: 'Groundwater Fluorosis Crisis & Geogenic Hydroxyapatite Degradation in Deep Borewells',
    originalComplaint:
      'In our village Chityal, borewell water tastes bitter and yellow. Children have brown stained teeth and older people suffer from terrible joint stiffness and knee deformities. RO plant installed 3 years back is broken because replacement filters are too costly. We need low-cost decentralized water purification urgently.',
    location: 'Nalgonda District, Telangana (Chityal Rural Block)',
    domain: 'Biotech & Environmental',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'More than 14,000 rural residents across Chityal panchayat consume deep-borewell drinking water containing geogenic fluoride concentrations exceeding 4.8 mg/L (against WHO safe limits of 1.0 mg/L). Chronic ingestion has caused severe dental and skeletal fluorosis among school-age children and daily wage farmworkers. High maintenance costs and membrane fouling of centralized reverse-osmosis plants leave communities with no affordable, sustained source of potable water.',
    detailedDescription:
      'Deep granitic aquifers in the Nalgonda geological formation leach excessive fluoride ions into village borewells. Conventional RO filter membranes foul rapidly in high-hardness groundwater, resulting in prohibitive replacement expenses ($1,200/year) that village panchayats cannot sustain.',
    rootCauses: [
      'Geogenic leaching of fluorite and fluoro-apatite minerals from granitic bedrock into deep bore aquifers',
      'Breakdown of centralized membrane RO plants due to lack of localized technical maintenance skills and replacement fund deficits',
      'Absence of affordable, locally regenerable low-cost adsorbent media (such as activated alumina or modified biochar) at household points of use',
    ],
    expectedOutcomes: [
      'Fluoride levels attenuated to strictly under 1.0 mg/L at household tap point of use',
      'Operational material cost below ₹0.15 ($0.0018) per liter of treated water',
      'Regenerable filter design using locally sourced agricultural waste biochar and food-grade calcium salts',
    ],
    sdgGoals: ['SDG 6: Clean Water & Sanitation', 'SDG 3: Good Health & Well-Being', 'SDG 10: Reduced Inequalities'],
    metrics: {
      urgency: 96,
      populationImpact: 86,
      severity: 94,
      environmentalRisk: 82,
      solutionImprovementPotential: 96,
      targetAudienceText: '14,000+ Rural Villagers, Schoolchildren & Daily Wage Farmers',
      affectedPopulationEstimate: 14000,
      overallPriorityScore: 91,
    },
    recommendedStudentSkills: ['Chemical Filtration', 'Biochar Adsorption', 'Low-Cost Materials', 'Community Health'],
    upvotes: 94,
    status: 'Verified Solved',
    createdAt: '2026-10-08T10:15:00Z',
    reportedBy: 'V. Laxmamma (Grama Panchayat Health Worker)',
    solutionsCount: 1,
    estimatedCommunityROI: {
      annualCostSavings: '₹18 Lakhs ($21.6K) in healthcare and fluoride treatment',
      paybackPeriodMonths: 2,
      directBeneficiaries: '14,000+ Rural Villagers',
    },
  },

  // 6. BIOTECH & ENVIRONMENTAL (Problem B)
  {
    id: 'prob-bio-stubble-04',
    formalTitle: 'On-Farm Stubble Torrefaction & Low-Emission Dense Pelleting Kiln',
    originalComplaint:
      'Every October after paddy harvest, farmers have only 15 days window before sowing wheat. Happy seeder machines are too slow and diesel rental is ₹1,800/acre which we cannot afford. So everyone is forced to burn 4 lakh tons of paddy straw in open fields, choking Delhi NCR in yellow toxic smog and burning soil microbes.',
    location: 'Sangrur & Ludhiana Farming Belt, Punjab',
    domain: 'Biotech & Environmental',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'Over 35,000,000 residents across the Indo-Gangetic plains suffer extreme respiratory distress every autumn from hazardous PM2.5 smog plumes generated by burning 20 million tons of rice straw stubble across Punjab and Haryana. The agricultural bottleneck is the tight 14-day turnaround window between rice harvest and wheat seeding, combined with the lack of decentralized, tractor-PTO powered thermal torrefaction kilns that can convert bulky raw straw into high-energy industrial biomass pellets directly in the village. Without decentralized economic valorization, open field burning remains the only viable option for small farmers.',
    detailedDescription:
      'Paddy straw contains high silica content (12-16%) which abrades conventional boilers and makes straw unsuitable for cattle fodder. Centralized biomass power plants fail because transporting loose straw over 25 km is economically unviable.',
    rootCauses: [
      'Prohibitive volumetric transport costs of uncompacted, loose paddy straw bales',
      'High silica content causing clinkering in commercial thermal power plant boilers',
      'Lack of decentralized mobile torrefaction kilns operating on self-generated syngas at village farm gates',
    ],
    expectedOutcomes: [
      'Conversion of raw straw into 19 MJ/kg hydrophobic bio-coal pellets directly at the village farm gate',
      'Guaranteed farmer purchase price of ₹1,500/ton, creating a new rural income stream',
      '95% reduction in open smoke and particulate emissions compared to field burning',
    ],
    sdgGoals: ['SDG 13: Climate Action', 'SDG 3: Health', 'SDG 7: Clean Energy', 'SDG 12: Circular Bioeconomy'],
    metrics: {
      urgency: 97,
      populationImpact: 99,
      severity: 96,
      environmentalRisk: 98,
      solutionImprovementPotential: 99,
      targetAudienceText: '35,000,000 Indo-Gangetic Plains Citizens & 120,000 Rice Farmers',
      affectedPopulationEstimate: 35000000,
      overallPriorityScore: 98,
    },
    recommendedStudentSkills: ['Biomass Pyrolysis & Torrefaction', 'Thermal Engineering', 'Agricultural Machinery', 'Emissions Scrubbing'],
    upvotes: 98,
    status: 'Open',
    createdAt: '2026-10-17T07:20:00Z',
    reportedBy: 'Gurpreet Singh Mann (Kisan Vikas Samiti)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹140 Crore ($16.8M) in avoided respiratory healthcare hospitalization',
      paybackPeriodMonths: 3,
      directBeneficiaries: '35M Northern India Residents',
    },
  },

  // 7. HEALTHCARE & ASSISTIVE TECH (Problem A)
  {
    id: 'prob-health-coldchain-05',
    formalTitle: 'Last-Mile Vaccine Cold-Chain Temperature Excursions in Remote Tribal Sub-Centres',
    originalComplaint:
      'Our primary health sub-centre is located 38 kilometers uphill in deep forest. The ice packs in vaccine transport boxes melt in 5 hours under 40°C heat before auxiliary nurse midwives (ANMs) can reach remote tribal hamlets. Tetanus, Hepatitis-B and rotavirus vials spoil, leaving hundreds of infants without immunization.',
    location: 'Bastar Tribal Belt, Chhattisgarh (Dantewada Rural Health Circle)',
    domain: 'Healthcare & Assistive Tech',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'More than 1,200 infants across 24 remote tribal forest hamlets in Bastar risk receiving compromised or inactivated vaccines due to acute thermal excursions exceeding +8°C during last-mile foot transits. The underlying failure is the thermal inadequacy of conventional passive ice-pack cold boxes during 8-hour tropical treks in 42°C ambient heat. Without active solar-solid-state thermal buffering and digital logging, preventable neonatal infectious disease rates remain alarmingly high.',
    detailedDescription:
      'Cold-chain protocol mandates +2°C to +8°C storage. High ambient humidity and solar radiation in dense forest regions melt frozen gel packs within 4 hours. Auxiliary Nurse Midwives lack any visual or electronic notification when temperature thresholds are breached.',
    rootCauses: [
      'Rapid thermal conductivity of legacy expanded polystyrene (EPS) insulated carriers',
      'Absence of lightweight, wearable Peltier thermoelectric cooling with flexible solar charging backpacks',
      'Lack of Bluetooth/BLE temperature logger with audible alarm alerting field healthcare workers before vaccine denaturation',
    ],
    expectedOutcomes: [
      'Continuous 16-hour thermal stability maintained strictly within +2°C to +8°C window',
      'Total carrier weight strictly under 3.5 kilograms for ergonomic foot travel across hilly forest terrain',
      'Hardware cost under ₹4,200 ($50) per community health worker kit',
    ],
    sdgGoals: ['SDG 3: Good Health & Well-Being', 'SDG 10: Reduced Inequalities', 'SDG 12: Responsible Consumption'],
    metrics: {
      urgency: 95,
      populationImpact: 88,
      severity: 96,
      environmentalRisk: 62,
      solutionImprovementPotential: 96,
      targetAudienceText: '1,200+ Remote Tribal Infants, Pregnant Mothers & Auxiliary Nurse Midwives',
      affectedPopulationEstimate: 1200,
      overallPriorityScore: 92,
    },
    recommendedStudentSkills: ['Thermoelectric Peltier HVAC', 'Phase Change Materials', 'BLE Data Logging', 'Biomedical Packaging'],
    upvotes: 73,
    status: 'Open',
    createdAt: '2026-10-16T15:40:00Z',
    reportedBy: 'Dr. Sunita Markam (Rural Medical Officer)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹6.2 Lakhs ($7.5K) in wasted biological vaccine vials',
      paybackPeriodMonths: 2,
      directBeneficiaries: '1,200+ Tribal Infants & Expectant Mothers',
    },
  },

  // 7. HEALTHCARE & ASSISTIVE TECH (Problem B)
  {
    id: 'prob-health-braille-06',
    formalTitle: 'Affordable Electromagnetic Tactile Braille Cell & Vernacular STEM Reader for Blind Students',
    originalComplaint:
      'Blind students in government special schools cannot study mathematics, coding, or science textbooks because paper Braille books are scarce, bulky (one class 10 book takes 12 thick volumes), and cost ₹8,000 to print. Commercial refreshable Braille displays from Europe cost over ₹1,50,000 ($1,800), completely unaffordable for poor visually impaired children.',
    location: 'Blind Relief Association & Special Schools, New Delhi & Jaipur',
    domain: 'Healthcare & Assistive Tech',
    problemType: 'Hardware / Physical Device',
    imageUrls: [],
    formattedProblemStatement:
      'Over 140,000 visually impaired school and college students in India are functionally excluded from STEM education and digital literacy because refreshable piezoelectric Braille displays remain priced out of reach at over ₹1.5 Lakhs ($1,800). The electromechanical bottleneck is reliance on proprietary multi-layer piezoelectric ceramic benders that require specialized high-voltage driver circuits. Without an affordable electromagnetic or micro-servo tactile dot actuator operating on open vernacular text-to-Braille software, visually impaired youth remain shut out from tech and scientific employment.',
    detailedDescription:
      'Paper Braille cannot display dynamic content, code, or mathematics formulas. Text-to-speech audio helps for general literature, but blind students cannot understand spatial mathematics, chemistry equations, or programming indentation through audio alone.',
    rootCauses: [
      'Expensive piezoelectric crystal actuator monopolies controlling global refreshable Braille hardware',
      'High power draw and fragile mechanical latching of imported tactile pins',
      'Lack of open-source Hindi/Tamil/Bengali/Telugu Unicode-to-Grade-2 Braille firmware mapping',
    ],
    expectedOutcomes: [
      '20-cell refreshable tactile Braille display with sub-100ms pin actuation refresh',
      'Total retail manufacturing cost under ₹6,500 ($78), a 95% cost reduction over European imports',
      'Built-in Bluetooth & USB HID keyboard interface compatible with Android and Linux screen readers',
    ],
    sdgGoals: ['SDG 4: Quality Inclusive Education', 'SDG 10: Reduced Inequalities', 'SDG 8: Decent Work'],
    metrics: {
      urgency: 93,
      populationImpact: 90,
      severity: 94,
      environmentalRisk: 30,
      solutionImprovementPotential: 97,
      targetAudienceText: '140,000+ Visually Impaired School & University STEM Students',
      affectedPopulationEstimate: 140000,
      overallPriorityScore: 93,
    },
    recommendedStudentSkills: ['Micro-Electromechanical Actuators (MEMS)', 'Low-Cost Coil Actuation', 'Embedded Firmware C++', 'Accessibility & Screen Reader Protocol'],
    upvotes: 84,
    status: 'Open',
    createdAt: '2026-10-18T16:00:00Z',
    reportedBy: 'Anand Sharma (National Association for the Blind)',
    solutionsCount: 0,
    estimatedCommunityROI: {
      annualCostSavings: '₹18,000 ($215) per student in recurring paper Braille transcription expenses',
      paybackPeriodMonths: 4,
      directBeneficiaries: '140,000+ Visually Impaired Students',
    },
  },
];

export const INITIAL_VERIFIED_SOLUTION: StudentSolution = {
  id: 'sol-fluoride-nit-01',
  problemId: 'prob-water-fluoride-03',
  problemTitle: 'Groundwater Fluorosis Crisis & Geogenic Hydroxyapatite Degradation in Deep Borewells',
  studentName: 'Aarav Patel & Priya Sundaram',
  university: 'National Institute of Technology, Warangal',
  degreeBranch: 'B.Tech Chemical & Environmental Engineering (Class of 2026)',
  teamMembers: 'Aarav Patel (Lead), Priya Sundaram (Materials), R. Karthik (Community Field Testing)',
  solutionTitle: 'AquaPure BioFlour: Modified Coconut-Shell Biochar & Nano-Hydroxyapatite Adsorption Filter Cartridge',
  executiveSummary:
    'A gravity-fed, point-of-use dual-stage adsorbent column utilizing pyrolyzed coconut-shell biochar doped with synthesized nano-hydroxyapatite (n-HAp) derived from poultry eggshell waste. The system strips fluoride from 5.2 mg/L to 0.65 mg/L without electricity or pressurized membrane backwash.',
  technicalArchitecture:
    'The system features two concentric food-grade gravity chambers. Raw borewell water passes through a pre-filtration 5-micron spun polypropylene sediment disc into a 3.5kg packed bed of calcium-doped biochar. High-affinity Ca2+ sites on the hydroxyapatite lattice undergo irreversible ion exchange with aqueous F- anions (forming fluorapatite). Regeneration is achieved every 4 months via low-cost 0.5% alum soak, giving a media lifespan of 24 months. Flow rate is regulated at 18 Liters/hour using a simple venturi flow limiter.',
  materialsAndTech: [
    'Pyrolyzed Coconut Shell Biochar (400°C activation)',
    'Synthesized Eggshell-derived Nano-Hydroxyapatite',
    'Food-grade HDPE double-tier gravity cylinders',
    'Gravity-fed 18 L/hr flow-meter orifice',
    'Low-cost Alum regeneration protocol',
  ],
  estimatedCost: '₹1,850 ($22) per 20-liter daily household unit; recurring annual media reload ₹220 ($2.60)',
  scalabilityPlan:
    'Manufactured using locally aggregated coconut agricultural waste in Telangana. Village women self-help groups (SHGs) are trained in 1-day workshops to handle biochar packing and quarterly alum rinses, creating village micro-enterprises.',
  demoOrGithubLink: 'https://github.com/pragati-grid-innovations/aquapure-bioflour-warangal',
  submittedAt: '2026-10-15T16:45:00Z',
  certificateId: 'PRG-2026-B8E29A',
  evaluation: {
    overallScore: 88,
    isApprovedForCertificate: true,
    subScores: {
      problemFit: 94,
      feasibility: 90,
      costEffectiveness: 92,
      innovation: 85,
      realWorldImpact: 89,
    },
    strengths: [
      'Exceptional utilization of agricultural and poultry waste streams (coconut shells & eggshells) to cut adsorbent media expense by 78%.',
      'Completely non-electric gravity-fed design perfectly suited for rural Indian hamlets with erratic power supplies.',
      'Clear, practical SHG-led regeneration model that solves recurring maintenance failure of centralized RO plants.',
    ],
    weaknesses: [
      'Requires periodic field monitoring to ensure households do not exhaust the adsorbent bed past breakthrough concentration.',
      'Initial thermal calcination of eggshells requires standardized temperature controls to maintain high-surface-area nano-crystallites.',
    ],
    implementationRisks: [
      'Channeling effects inside the packed bed if granular media is packed without uniform particle sieve grading.',
    ],
    nextSteps: [
      'Conduct a 60-household 90-day pilot trial with Nalgonda District Water & Sanitation Mission.',
      'Apply for CSIR-NEERI validation protocol certification.',
    ],
    improvements: [
      'Incorporate automated mechanical flow-rate limiter to prevent user overdrawing.',
      'Provide concise laminated regional Telugu maintenance chart for village self-help groups.',
    ],
    evaluatorVerdict:
      'Awarded the Pragati Grid Verified Engineering Credential with Honors. The submission provides a direct, highly practical, and field-tested solution to a lethal groundwater public health emergency.',
    evaluatedAt: '2026-10-15T18:30:00Z',
    peerReviewCouncilVerdict:
      'Awarded the Pragati Grid Verified Engineering Credential with Honors. The submission provides a direct, highly practical, and field-tested solution to a lethal groundwater public health emergency.',
  },
};

export const INITIAL_CERTIFICATES: CivicCertificate[] = [
  {
    id: 'PRG-2026-B8E29A',
    solutionId: 'sol-fluoride-nit-01',
    problemId: 'prob-water-fluoride-03',
    problemTitle: 'Groundwater Fluorosis Crisis & Geogenic Hydroxyapatite Degradation in Deep Borewells',
    studentName: 'Aarav Patel & Priya Sundaram',
    university: 'National Institute of Technology, Warangal',
    degreeBranch: 'B.Tech Chemical & Environmental Engineering (Class of 2026)',
    domain: 'Biotech & Environmental',
    issueDate: 'October 15, 2026',
    verifiedMetrics: {
      problemFit: 94,
      feasibility: 90,
      costEffectiveness: 92,
      innovation: 85,
      realWorldImpact: 89,
    },
    hash: 'b8e29a7c4f1d3e8091a45c6e88b204',
    councilVerdict:
      'Awarded for developing AquaPure BioFlour: a verified decentralized eggshell-hydroxyapatite and coconut biochar filter stripping geogenic fluoride from 5.2 mg/L to under 0.65 mg/L without grid electricity.',
  },
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Aarav Patel & Priya Sundaram',
    university: 'National Institute of Technology, Warangal',
    problemsSolved: 1,
    totalImpactPoints: 88,
    topDomain: 'Biotech & Environmental',
    verifiedCertificates: 1,
  },
  {
    rank: 2,
    name: 'Vikram Malhotra & Ananya Sen',
    university: 'IIT Madras & Anna University',
    problemsSolved: 1,
    totalImpactPoints: 85,
    topDomain: 'Civil, Urban & Hydraulics',
    verifiedCertificates: 1,
  },
  {
    rank: 3,
    name: 'Rohit Verma & Team Kaizen',
    university: 'College of Engineering, Pune (COEP)',
    problemsSolved: 1,
    totalImpactPoints: 82,
    topDomain: 'Mechanical & Robotics',
    verifiedCertificates: 1,
  },
  {
    rank: 4,
    name: 'Deepak Sharma & Sneha Iyer',
    university: 'IIT Delhi & BITS Pilani',
    problemsSolved: 1,
    totalImpactPoints: 79,
    topDomain: 'Electrical & Energy Grids',
    verifiedCertificates: 1,
  },
  {
    rank: 5,
    name: 'Tanvi Nair & Devansh Gupta',
    university: 'IIIT Hyderabad',
    problemsSolved: 1,
    totalImpactPoints: 76,
    topDomain: 'Software & AI Systems',
    verifiedCertificates: 1,
  },
];
