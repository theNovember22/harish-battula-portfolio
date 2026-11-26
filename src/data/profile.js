/**
 * Single source of truth for Harish Battula's research portfolio.
 * Edit text, publication links, skills, and placeholder URLs here without
 * touching any React components.
 */

// ---------------------------------------------------------------------------
// PLACEHOLDER / TODO LINKS — Replace these as PDFs and repos become public
// ---------------------------------------------------------------------------
export const TODO = {
  PHOTO_PATH: './images/harish.jpg',
  OG_IMAGE_PATH: './og-image.svg',
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
  researchHubs: 'Pune • Mumbai • Hyderabad',
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

export const HERO_CONTENT = {
  eyebrow: 'Harish Battula • AI/ML Researcher • TCS Research',
  headline: 'Your voice carries your heartbeat.',
  subline:
    'Harish Battula, AI/ML researcher, TCS Research. I build models that listen to speech and signals to detect disease earlier.',
  primaryCta: 'Follow the signal →',
  secondaryCta: 'Download CV',
};

export const PROJECT_CHAPTERS_META = [
  { id: 'speech-hr', code: '01', shortTitle: 'Speech → Heart Rate' },
  { id: 'confidence', code: '02', shortTitle: 'Confidence Proxy' },
  { id: 'alzheimers', code: '03', shortTitle: 'Alzheimer’s GNN' },
  { id: 'stethoscope', code: '04', shortTitle: 'PCG & Dysarthria' },
  { id: 'trust', code: '05', shortTitle: 'SHAP & Trust' },
  { id: 'vision', code: '06', shortTitle: 'Where Next' },
];

export const CHAPTER_01 = {
  code: 'CHAPTER 01',
  question: 'Can a voice reveal a heartbeat?',
  answer:
    'In our 40+ participant study, we recorded synchronized speech alongside clinical ECG and optical PPG sensors. Using independent component analysis (ICA), we separated breathing patterns and cardiac correlates from read speech—capturing clear physiological differences between resting and heavy physical activity.',
  citationLabel: 'Heart Rate from Read-Speech Influenced by Physical Exercise — EUSIPCO 2024 (Lyon)',
  linkText: 'Read conference note & paper record',
  linkUrl: 'https://battulaharish2.github.io/research-journal/eusipco-2024/index.html',
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
  milestones: [
    { label: 'Single-Snapshot Detection', detail: 'Speech, ECG, PPG, PCG & Images' },
    { label: 'Multimodal Trajectories', detail: 'Longitudinal disease progression' },
    { label: 'Sparse & Irregular Data', detail: 'Missingness-aware clinical modeling' },
    { label: 'Uncertainty & Causality', detail: 'Progression vs. treatment effects' },
  ],
};

export const EDUCATION_PAGE_DATA = {
  eyebrow: 'Academic Foundation',
  headline: 'From power-grid time series to clinical human signals.',
  subline:
    'Rigorous training in electrical engineering and temporal modeling laid the mathematical groundwork for physiological signal decomposition and healthcare AI.',
  masters: {
    degree: 'Master of Technology (M.Tech.)',
    field: 'Electrical Engineering',
    institution: 'National Institute of Technology Warangal',
    period: '2021 – 2023',
    location: 'Warangal, India',
    thesisTitle: 'Electrical Load Demand Forecasting Using Machine Learning Techniques',
    thesisSummary:
      'Designed and benchmarked machine learning and deep learning architectures across short-, medium-, and long-term electricity load forecasting horizons—establishing core expertise in sequence modeling, temporal feature engineering, and comparative evaluation.',
    outcomes: [
      'Published comparative findings at IEEE IAS Industrial and Commercial Power Systems (I&CPS) Conference 2023, Las Vegas.',
      'Open-sourced experimental implementations on GitHub (ElectricalLF & harish_STLF).',
    ],
    links: [
      { label: 'ElectricalLF Repository', url: 'https://github.com/battulaharish2/ElectricalLF' },
      { label: 'STLF Notebooks', url: 'https://github.com/battulaharish2/harish_STLF' },
    ],
  },
  bachelors: {
    degree: 'Bachelor of Technology (B.Tech.)',
    field: 'Electrical and Electronics Engineering',
    institution: 'R.V.R. & J.C. College of Engineering',
    period: '2015 – 2019',
    location: 'Guntur, India',
    cgpa: '9.17',
    cgpaScale: '/ 10.0',
    summary:
      'Undergraduate foundation in signals and systems, circuit analysis, power systems, and quantitative problem solving.',
  },
  bridgeSteps: [
    { step: '01', title: 'Signal Fundamentals', detail: 'B.Tech. EEE • R.V.R. & J.C. (9.17 CGPA)' },
    { step: '02', title: 'Temporal Deep Learning', detail: 'M.Tech. Thesis • NIT Warangal' },
    { step: '03', title: 'Visual Perception', detail: 'Computer Vision Intern • ZF Technologies' },
    { step: '04', title: 'Healthcare & Speech AI', detail: 'Researcher • TCS Research' },
  ],
};

export const EXPERIENCE_DETAILS = {
  eyebrow: 'Research & Engineering Career',
  headline: 'Three years turning raw human signals into clinical evidence.',
  photoUrl: TODO.PHOTO_PATH,
  photoAlt: 'Portrait of Harish Battula, AI/ML Researcher',
  photoCaption: 'Paris • EUSIPCO 2024 • Peer Reviewer: IEEE IAS & Elsevier BSPC',
  summary:
    'At TCS Research since September 2023, my work spans the complete research lifecycle: participant study design, synchronized multimodal sensing, representation learning, explainability, and interactive research prototypes.',
  highlights: [
    { value: '3+', label: 'Years in Research' },
    { value: '40+', label: 'Sync Participants' },
    { value: '~91%', label: 'Alzheimer’s Set Accuracy' },
    { value: '4', label: 'Accepted Papers' },
  ],
  tcs: {
    organization: 'Tata Consultancy Services (TCS) Research',
    role: 'Researcher — Speech Signal Processing and AI for Healthcare',
    period: 'September 2023 – Present',
    locations: 'Pune, Mumbai, Hyderabad, India',
    workstreams: [
      {
        id: 'sensing',
        code: 'STREAM 01',
        title: 'Synchronized Physiological Sensing & ICA',
        venue: 'EUSIPCO 2024 • INTERSPEECH 2025',
        problem:
          'Public speech corpora lack time-locked cardiac ground truth needed to test whether speech carries autonomic markers.',
        approach:
          'Collected synchronized speech, ECG, and PPG recordings from 40+ participants; developed ICA algorithms extracting breathing patterns and heart rate across rest and heavy exercise, and evaluated heart rate as a confidence proxy.',
        outcome:
          'Demonstrated physiologically meaningful separation between resting and heavy activity conditions; accepted at EUSIPCO 2024 and INTERSPEECH 2025.',
        tags: ['40+ Participants', 'Speech + ECG + PPG', 'ICA', 'Heart-Rate Estimation'],
      },
      {
        id: 'neurological',
        code: 'STREAM 02',
        title: 'Neurological Speech & Graph Neural Networks',
        venue: 'EUSIPCO 2026 • Clinical Speech',
        problem:
          'Capturing structural cognitive decline and motor-speech severity from spontaneous utterances without manual clinical transcription.',
        approach:
          'Built an automated ASR-to-graph pipeline turning spontaneous speech transcripts into graph representations for Graph Neural Networks (PyTorch Geometric), alongside ML/DL pipelines for dysarthria severity assessment.',
        outcome:
          'Achieved ~91% accuracy on the evaluated Alzheimer’s speech dataset; accepted at EUSIPCO 2026 (Bruges, Belgium).',
        tags: ['ASR-to-Graph', 'PyTorch Geometric', 'GNN', 'Whisper', 'wav2vec2', 'Dysarthria'],
      },
      {
        id: 'cardiac',
        code: 'STREAM 03',
        title: 'Cardiac Auscultation (PCG) & CAD Acoustics',
        venue: 'Heart Sound Diagnostics',
        problem:
          'Screening heart-valve abnormalities and acoustic indicators of coronary artery disease (CAD) directly from auscultation audio.',
        approach:
          'Analyzed phonocardiogram (PCG) recordings to detect cardiac murmurs, distinguish normal from abnormal heartbeats, and characterize acoustic indicators associated with CAD.',
        outcome:
          'Expanded cardiac sensing capabilities beyond speech-derived proxies into direct mechanical heart-sound modeling and public research notes.',
        tags: ['PCG Audio', 'Murmur Detection', 'CAD Indicators', 'Time-Frequency Analysis'],
      },
      {
        id: 'xai-prototypes',
        code: 'STREAM 04',
        title: 'Explainable AI, Prototypes & Peer Review',
        venue: 'SHAP • LIME • IEEE IAS & Elsevier BSPC',
        problem:
          'Ensuring stakeholders and clinicians can verify why a model flags a physiological recording—and interact with live prototypes.',
        approach:
          'Applied SHAP and LIME to link influential features back to physiological significance, developed facial landmark emotion recognition pipelines, and shipped interactive Streamlit and FastAPI research prototypes.',
        outcome:
          'Communicated findings to internal stakeholders, presented at INTERSPEECH/EUSIPCO, and contributed peer reviews for IEEE IAS and Elsevier BSPC.',
        tags: ['SHAP', 'LIME', 'FastAPI', 'Streamlit', 'MediaPipe', 'Peer Review'],
      },
    ],
  },
  zf: {
    organization: 'ZF Technologies',
    role: 'Computer Vision Intern',
    period: 'June 2022 – July 2023',
    location: 'Hyderabad, India',
    summary:
      'Built end-to-end visual perception pipelines using Python, OpenCV, and deep learning frameworks prior to joining TCS Research.',
    pillars: [
      { title: 'Object Detection', detail: 'Model training & evaluation on visual scenes' },
      { title: 'Semantic Segmentation', detail: 'Pixel-level scene parsing & preprocessing' },
      { title: 'Human Pose Estimation', detail: 'Keypoint tracking & video pipeline prototyping' },
    ],
  },
  skillGroups: [
    { group: 'Programming & ML', items: ['Python', 'PyTorch', 'TensorFlow / Keras', 'scikit-learn', 'Model Evaluation'] },
    { group: 'Biomedical Signals & Time Series', items: ['Speech Processing', 'ECG / PPG / PCG', 'Breathing Extraction', 'Heart-Rate Estimation', 'ICA', 'Time-Series Forecasting'] },
    { group: 'Graph & Speech Models', items: ['Graph Neural Networks', 'PyTorch Geometric', 'ASR', 'Whisper', 'wav2vec2', 'Librosa', 'SoundFile', 'Hugging Face', 'BERT'] },
    { group: 'Vision, XAI & Engineering', items: ['OpenCV', 'MediaPipe', 'Object Detection', 'Segmentation', 'Pose Estimation', 'SHAP', 'LIME', 'CUDA', 'Linux', 'Git', 'FastAPI', 'Streamlit'] },
  ],
};

export const PUBLICATIONS = [
  {
    id: 'eusipco-2026',
    title: 'Alzheimer’s Dementia Detection from Spontaneous Speech Using Graph Neural Networks',
    venue: 'EUSIPCO',
    year: 2026,
    location: 'Bruges, Belgium',
    status: 'Accepted',
    bibtex: `@inproceedings{battula2026alzheimers,
  title={Alzheimer's Dementia Detection from Spontaneous Speech Using Graph Neural Networks},
  author={Battula, Harish and others},
  booktitle={Proceedings of the European Signal Processing Conference (EUSIPCO)},
  year={2026},
  address={Bruges, Belgium}
}`,
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
    bibtex: `@inproceedings{battula2025confidence,
  title={Heart Rate as a Proxy Measure to Assess Human Confidence in Spoken Speech},
  author={Battula, Harish and Deshpande, Gauri and Gudipalli, Yagna and Patel, Sachin},
  booktitle={Proceedings of INTERSPEECH},
  year={2025},
  address={Rotterdam, Netherlands}
}`,
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
    bibtex: `@inproceedings{battula2024exercise,
  title={Heart Rate from Read-Speech Influenced by Physical Exercise},
  author={Battula, Harish and Deshpande, Gauri and Patel, Sachin and Schuller, Bj{\\"o}rn W.},
  booktitle={Proceedings of the European Signal Processing Conference (EUSIPCO)},
  year={2024},
  address={Lyon, France}
}`,
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
    bibtex: `@inproceedings{battula2023comparative,
  title={A Comparative Study of Forecasting Problems on Electrical Load Timeseries Data using Deep Learning Techniques},
  author={Battula, Harish and others},
  booktitle={IEEE IAS Industrial and Commercial Power Systems Technical Conference (I\\&CPS)},
  year={2023},
  address={Las Vegas, NV, USA}
}`,
    links: [
      { label: 'Code (GitHub)', url: 'https://github.com/battulaharish2/ElectricalLF' },
      { label: 'Scholar', url: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao' },
      { label: 'PDF (TODO)', url: TODO.IEEE_IAS_2023_PDF },
    ],
  },
];

export const CHAPTER_09_CONTACT = {
  code: 'CORRESPONDENCE',
  closingLine: 'Working on something where signals meet medicine? Let’s talk.',
  subline:
    'I welcome conversations with AI/ML research labs, healthcare AI groups, applied science teams, and university collaborators working at the intersection of speech, biosignals, and trustworthy machine learning.',
  topics: [
    'Speech & Acoustic Biomarkers',
    'Synchronized Physiological Sensing',
    'Graph & Multimodal Health ML',
    'Uncertainty & Disease Progression',
  ],
};
