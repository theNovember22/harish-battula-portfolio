export interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

export const PROFILE = {
  name: 'Harish Battula',
  monogram: 'HB',
  role: 'AI/ML Researcher',
  affiliation: 'Researcher @ TCS Research',
  tenureNote: '3+ Years Research Experience',
  location: 'Mumbai, India',
  researchHubs: 'Pune • Mumbai • Hyderabad, India',
  email: 'battulav61@gmail.com',
  phone: '+91-9705853790',
  cvPath: './Harish_Battula_CV.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/harish-battula-a441a0126/',
    scholar: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
    github: 'https://github.com/battulaharish2',
    researchJournal: 'https://battulaharish2.github.io/research-journal/',
    signalExplorer: 'https://battulaharish2.github.io/signal-explorer/',
  },
  domains: [
    'Speech',
    'Biomedical Signals',
    'Healthcare AI',
    'Multimodal Learning',
  ],
  heroHeadline:
    'I build AI systems that learn from speech, physiological signals, and other complex biomedical data.',
  heroSubstatement:
    'Researcher at TCS Research working across speech processing, physiological sensing, healthcare AI, graph neural networks, and trustworthy machine learning.',
  aboutSummary:
    'I work at the intersection of machine learning, speech, and biomedical signal processing, with a focus on building models that can extract meaningful information from complex human data. My research spans physiological sensing, neurological speech analysis, healthcare AI, and multimodal learning.',
  aboutTrajectory:
    'My current research focuses on analysing, detecting, and classifying diseases using image, speech, and biomedical signal data including ECG, PPG, and PCG. I aspire to extend this work to multimodal health data to study how diseases progress over time—especially through reliable, uncertainty-aware methods that can learn from sparse or incomplete observations in collaboration with clinicians.',
  availability:
    'Open to AI/ML Research & Applied Scientist opportunities',
} as const;

export const AT_A_GLANCE_METRICS: MetricItem[] = [
  {
    value: '3+',
    label: 'Years in Research',
    detail: 'TCS Research (Sep 2023 – Present) & prior ML research',
  },
  {
    value: '40+',
    label: 'Study Participants',
    detail: 'Synchronized speech, ECG & PPG physiological data collection',
  },
  {
    value: '4',
    label: 'Conference Papers',
    detail: 'Accepted across INTERSPEECH, EUSIPCO & IEEE IAS',
  },
  {
    value: '~91%',
    label: 'Dataset Accuracy',
    detail: 'ASR-to-graph GNN pipeline for Alzheimer’s speech detection',
  },
  {
    value: 'INTERSPEECH',
    label: '2025 • Rotterdam',
    detail: 'Heart rate as a proxy for confidence in spoken speech',
  },
  {
    value: 'EUSIPCO',
    label: '2024 & 2026',
    detail: 'Lyon (Exercise Speech HR) & Bruges (Alzheimer’s GNN)',
  },
];

export const EDUCATION = [
  {
    degree: 'Master of Technology (M.Tech.) — Electrical Engineering',
    institution: 'National Institute of Technology Warangal',
    period: '2021 – 2023',
    location: 'Warangal, India',
    thesis: 'Electrical Load Demand Forecasting Using Machine Learning Techniques',
    details:
      'Developed machine learning and deep learning approaches for short-, medium-, and long-term electricity load demand prediction, building a foundation in time-series modeling and comparative evaluation.',
  },
  {
    degree: 'Bachelor of Technology (B.Tech.) — Electrical and Electronics Engineering',
    institution: 'R.V.R. & J.C. College of Engineering',
    period: '2015 – 2019',
    location: 'Guntur, India',
    grade: 'CGPA: 9.17',
    details:
      'Undergraduate training in electrical engineering systems, signal fundamentals, and quantitative modeling.',
  },
] as const;

export const EARLIER_WORK = {
  company: 'ZF Technologies',
  role: 'Computer Vision Intern',
  period: 'June 2022 – July 2023',
  location: 'Hyderabad, India',
  highlights: [
    'Developed and evaluated computer vision and deep learning approaches for object detection, semantic segmentation, and human pose estimation using Python, OpenCV, and deep learning frameworks.',
    'Built end-to-end image and video processing pipelines covering preprocessing, data preparation, model training, evaluation, and application prototyping.',
  ],
  tags: [
    'Object Detection',
    'Semantic Segmentation',
    'Human Pose Estimation',
    'OpenCV',
    'Video Pipelines',
  ],
} as const;
