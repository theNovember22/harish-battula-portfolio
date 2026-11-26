/**
 * Single source of truth for Harish Battula's research portfolio.
 * Edit text, publication links, skills, and placeholder URLs here without
 * touching any React components.
 */

// ---------------------------------------------------------------------------
// PLACEHOLDER / TODO LINKS — Replace these as PDFs, repos, and photos become public
// ---------------------------------------------------------------------------
export const TODO = {
  /** Place Harish's portrait photo at /public/images/harish.jpg */
  PHOTO_PATH: './images/harish.jpg',
  /** Replace with a raster 1200x630 PNG if preferred; currently uses /public/og-image.svg */
  OG_IMAGE_PATH: './og-image.svg',
  /** Add hosted PDF URL once camera-ready proceedings are public */
  EUSIPCO_2026_PDF: null, // TODO: Add EUSIPCO 2026 paper PDF URL
  EUSIPCO_2026_CODE: null, // TODO: Add EUSIPCO 2026 code repository URL
  INTERSPEECH_2025_PDF: null, // TODO: Add INTERSPEECH 2025 paper PDF URL (ISCA Archive)
  INTERSPEECH_2025_CODE: null, // TODO: Add INTERSPEECH 2025 code repository URL
  EUSIPCO_2024_PDF: null, // TODO: Add EUSIPCO 2024 paper PDF URL
  EUSIPCO_2024_CODE: null, // TODO: Add EUSIPCO 2024 code repository URL
  IEEE_IAS_2023_PDF: null, // TODO: Add IEEE IAS 2023 paper PDF URL (IEEE Xplore)
  PCG_PAPER_OR_NOTE: 'https://battulaharish2.github.io/research-journal/learning-from-heart-sounds/index.html',
  XAI_DETAIL_LINK: 'https://battulaharish2.github.io/signal-explorer/',
};

export const PROFILE = {
  name: 'Harish Battula',
  role: 'AI/ML Researcher',
  affiliation: 'TCS Research',
  location: 'Mumbai, India',
  email: 'battulav61@gmail.com',
  cvUrl: './Harish_Battula_CV.pdf',
  openTo: 'Open to: AI/ML Research roles, healthcare AI, speech and biosignals',
  links: {
    linkedin: 'https://www.linkedin.com/in/harish-battula-a441a0126/',
    scholar: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
    github: 'https://github.com/battulaharish2',
    signalExplorer: 'https://battulaharish2.github.io/signal-explorer/',
    researchJournal: 'https://battulaharish2.github.io/research-journal/',
  },
  quickFacts: [
    { label: 'Role', value: 'TCS Research (Sep 2023–Present)' },
    { label: 'Papers', value: '4 Accepted Conference Papers' },
    { label: 'Cohort', value: '40+ Synchronized Participants' },
    { label: 'Benchmark', value: '~91% on Evaluated Alzheimer’s Set' },
  ],
};

export const CHAPTERS = [
  { id: 'hero', code: '00', shortTitle: 'Voice & Heartbeat' },
  { id: 'speech-hr', code: '01', shortTitle: '40+ Cohort & ICA' },
  { id: 'confidence', code: '02', shortTitle: 'Vocal Confidence' },
  { id: 'alzheimers', code: '03', shortTitle: 'Alzheimer’s GNN' },
  { id: 'stethoscope', code: '04', shortTitle: 'PCG & Dysarthria' },
  { id: 'trust', code: '05', shortTitle: 'SHAP & Trust' },
  { id: 'vision', code: '06', shortTitle: 'Where Next' },
  { id: 'about', code: '07', shortTitle: 'About Harish' },
  { id: 'publications', code: '08', shortTitle: 'Publications' },
  { id: 'contact', code: '09', shortTitle: 'Contact' },
];

export const HERO_CONTENT = {
  eyebrow: 'Harish Battula • AI/ML Researcher • TCS Research',
  headline: 'Your voice carries your heartbeat.',
  subline:
    'Harish Battula, AI/ML researcher, TCS Research. I build models that listen to speech and signals to detect disease earlier.',
  primaryCta: 'Follow the signal ↓',
  secondaryCta: 'Download CV',
};

export const CHAPTER_01 = {
  code: 'CHAPTER 01',
  question: 'Can a voice reveal a heartbeat?',
  answer:
    'In our 40+ participant study, we recorded synchronized speech alongside clinical ECG and optical PPG sensors. Using independent component analysis (ICA), we separated breathing patterns and cardiac correlates from read speech—capturing clear physiological differences between resting and heavy physical activity.',
  citationLabel: 'Heart Rate from Read-Speech Influenced by Physical Exercise — EUSIPCO 2024 (Lyon)',
  linkText: 'Read conference note & paper record',
  linkUrl: 'https://battulaharish2.github.io/research-journal/eusipco-2024/index.html',
  metrics: [
    { label: 'Participants', value: '40+' },
    { label: 'Modalities', value: 'Speech + ECG + PPG' },
    { label: 'Method', value: 'ICA Separation' },
  ],
};

export const CHAPTER_02 = {
  code: 'CHAPTER 02',
  question: 'Can heartbeat reveal confidence?',
  answer:
    'Spoken communication leaves measurable autonomic traces before a listener ever scores how sure a speaker sounds. Through participant data collection, speech processing, and physiological signal analysis, we investigated heart rate as a quantitative proxy for human confidence in spoken speech.',
  citationLabel: 'Heart Rate as a Proxy Measure to Assess Human Confidence in Spoken Speech — INTERSPEECH 2025 (Rotterdam)',
  linkText: 'View INTERSPEECH 2025 conference record',
  linkUrl: 'https://battulaharish2.github.io/research-journal/interspeech-2025/index.html',
};

export const CHAPTER_03 = {
  code: 'CHAPTER 03',
  question: 'Can the way we talk reveal Alzheimer’s?',
  simpleExplanation:
    'An automated pipeline converts natural spoken speech into text, maps how words connect to each other like a network, and detects Alzheimer’s patterns with ~91% accuracy on the evaluated dataset.',
  technicalExplanation:
    'An end-to-end ASR-to-graph pipeline transforms spontaneous speech into transcript-derived relational graphs and trains Graph Neural Networks (PyTorch Geometric), achieving ~91% accuracy on the evaluated dataset.',
  accuracyCallout: '~91% accuracy on the evaluated dataset',
  citationLabel:
    'Alzheimer’s Dementia Detection from Spontaneous Speech Using Graph Neural Networks — EUSIPCO 2026 (Bruges)',
  linkText: 'View publication record on Google Scholar',
  linkUrl: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
  sampleTranscriptTokens: [
    'Well',
    'the',
    'boy',
    'is',
    'reaching',
    'for',
    'the',
    'jar',
    'and',
    'the',
    'stool',
    'is',
    'tilting',
  ],
};

export const CHAPTER_04 = {
  code: 'CHAPTER 04',
  question: 'What can a stethoscope sound tell us?',
  answer:
    'We analyze phonocardiogram (PCG) heart recordings to detect murmurs, distinguish normal from abnormal heartbeats, and investigate acoustic indicators linked to coronary artery disease (CAD). Alongside cardiac auscultation, we build machine learning and deep learning pipelines for dysarthria speech analysis and neurological severity assessment.',
  linkText: 'Read ongoing heart-sound research note',
  linkUrl: TODO.PCG_PAPER_OR_NOTE,
};

export const CHAPTER_05 = {
  code: 'CHAPTER 05',
  question: 'Why should anyone trust the model?',
  answer:
    'A clinical prediction only matters when its reasoning aligns with physiology. We apply SHAP and LIME to trace influential signal features back to meaningful cardiac and acoustic mechanisms—building toward uncertainty-aware, robust, and fair machine learning.',
  linkText: 'Inspect interactive Signal Explorer lab',
  linkUrl: TODO.XAI_DETAIL_LINK,
  shapFeatures: [
    { feature: 'S1–S2 Spectral Energy Ratio', weight: 0.42, positive: true },
    { feature: 'Murmur Mid-Systolic Band', weight: 0.34, positive: true },
    { feature: 'R–R Interval Variability', weight: 0.25, positive: true },
    { feature: 'Resp. ICA Modulation (0.25 Hz)', weight: -0.18, positive: false },
    { feature: 'Background Noise Floor', weight: -0.09, positive: false },
  ],
};

export const CHAPTER_06 = {
  code: 'CHAPTER 06',
  question: 'Where is this going?',
  answerFirstPerson:
    'My current work detects disease across speech, ECG, PPG, PCG, and images—but a single snapshot is rarely enough for preventive care. I want to extend this toward multimodal health trajectories over time, developing uncertainty-aware models that learn from sparse or irregularly sampled clinical observations and distinguish true disease progression from treatment effects alongside clinicians.',
  linkText: 'See background & credentials',
  linkTarget: '#about',
  milestones: [
    { label: 'Single-Snapshot Detection', detail: 'Speech, ECG, PPG, PCG & Images' },
    { label: 'Multimodal Trajectories', detail: 'Longitudinal disease progression' },
    { label: 'Sparse & Irregular Data', detail: 'Missingness-aware clinical modeling' },
    { label: 'Uncertainty & Causality', detail: 'Progression vs. treatment effects' },
  ],
};

export const CHAPTER_07 = {
  code: 'CHAPTER 07',
  question: 'The person behind the signals.',
  photoUrl: TODO.PHOTO_PATH,
  photoAlt: 'Portrait of Harish Battula, AI/ML Researcher',
  bio:
    'I hold an M.Tech. in Electrical Engineering from NIT Warangal, where my thesis investigated deep learning for electrical load demand forecasting, following a B.Tech. in EEE from R.V.R. & J.C. College of Engineering (9.17 CGPA). After interning in computer vision at ZF Technologies, I joined TCS Research in September 2023 and serve as a peer reviewer for IEEE Industrial Application Society (IAS) and Elsevier Biomedical Signal Processing and Control (BSPC).',
  path: [
    { period: '2015–2019', role: 'B.Tech. EEE (CGPA 9.17)', org: 'R.V.R. & J.C. College of Engineering' },
    { period: '2021–2023', role: 'M.Tech. EE • Load Forecasting Thesis', org: 'NIT Warangal' },
    { period: '2022–2023', role: 'Computer Vision Intern', org: 'ZF Technologies' },
    { period: 'Sep 2023–Present', role: 'Researcher — Speech & Healthcare AI', org: 'TCS Research' },
  ],
  skillGroups: [
    { group: 'ML & Graphs', items: 'PyTorch • TensorFlow/Keras • Scikit-learn • PyTorch Geometric • GNN • BERT' },
    { group: 'Speech & Audio', items: 'Whisper • wav2vec2 • ASR • Librosa • SoundFile • Hugging Face' },
    { group: 'Biosignals', items: 'ECG • PPG • PCG • Breathing-pattern extraction • Heart-rate estimation • ICA' },
    { group: 'Vision & Stack', items: 'OpenCV • MediaPipe • SHAP • LIME • CUDA • Linux • FastAPI • Streamlit' },
  ],
  linkText: 'Browse peer-reviewed publications',
  linkTarget: '#publications',
};

export const PUBLICATIONS = [
  {
    id: 'eusipco-2026',
    title: 'Alzheimer’s Dementia Detection from Spontaneous Speech Using Graph Neural Networks',
    venue: 'EUSIPCO',
    year: 2026,
    location: 'Bruges, Belgium',
    status: 'Accepted',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao' },
      { label: 'PDF (TODO)', url: TODO.EUSIPCO_2026_PDF },
      { label: 'Code (TODO)', url: TODO.EUSIPCO_2026_CODE },
    ],
  },
  {
    id: 'interspeech-2025',
    title: 'Heart Rate as a Proxy Measure to Assess Human Confidence in Spoken Speech',
    venue: 'INTERSPEECH',
    year: 2025,
    location: 'Rotterdam, Netherlands',
    status: 'Accepted',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao' },
      { label: 'Conference Note', url: 'https://battulaharish2.github.io/research-journal/interspeech-2025/index.html' },
      { label: 'PDF (TODO)', url: TODO.INTERSPEECH_2025_PDF },
    ],
  },
  {
    id: 'eusipco-2024',
    title: 'Heart Rate from Read-Speech Influenced by Physical Exercise',
    venue: 'EUSIPCO',
    year: 2024,
    location: 'Lyon, France',
    status: 'Accepted',
    links: [
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao' },
      { label: 'Conference Note', url: 'https://battulaharish2.github.io/research-journal/eusipco-2024/index.html' },
      { label: 'PDF (TODO)', url: TODO.EUSIPCO_2024_PDF },
    ],
  },
  {
    id: 'ieee-ias-2023',
    title: 'A Comparative Study of Forecasting Problems on Electrical Load Timeseries Data using Deep Learning Techniques',
    venue: 'IEEE IAS I&CPS',
    year: 2023,
    location: 'Las Vegas, USA',
    status: 'Accepted',
    links: [
      { label: 'Code (GitHub)', url: 'https://github.com/battulaharish2/ElectricalLF' },
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao' },
      { label: 'PDF (TODO)', url: TODO.IEEE_IAS_2023_PDF },
    ],
  },
];

export const CHAPTER_09_CONTACT = {
  code: 'CHAPTER 09',
  closingLine: 'Working on something where signals meet medicine? Let’s talk.',
  subline:
    'Whether you are exploring speech biomarkers, multimodal clinical ML, or applied research roles, I would be glad to connect.',
};
