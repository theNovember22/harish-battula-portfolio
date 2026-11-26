export interface ResearchStory {
  id: string;
  title: string;
  domain: string;
  highlight: string;
  problem: string;
  methodology: string;
  implementation: string;
  evaluation: string;
  outcome: string;
  tags: string[];
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  location: string;
  summary: string;
  details: string[];
}

export const TCS_EXPERIENCE_HEADER = {
  organization: 'Tata Consultancy Services (TCS) Research',
  role: 'Researcher — Speech Signal Processing and AI for Healthcare',
  period: 'September 2023 – Present',
  locations: 'Pune, Mumbai, Hyderabad, India',
  summary:
    'Conducting end-to-end applied ML research spanning experimental data collection, physiological signal processing, clinical speech modeling, explainable AI, and stakeholder-facing prototypes.',
};

export const RESEARCH_STORIES: ResearchStory[] = [
  {
    id: 'sync-collection',
    title: 'Multimodal Physiological Data Collection & Speech-Based Heart Rate Estimation',
    domain: 'Physiological Sensing',
    highlight: '40+ Participants',
    problem:
      'Estimating physiological parameters like heart rate from speech requires accurately time-locked acoustic and clinical reference recordings.',
    methodology:
      'Designed synchronized acquisition workflows capturing speech alongside reference ECG and PPG signals across 40+ participants.',
    implementation:
      'Built multimodal preprocessing, cross-stream alignment, and feature extraction pipelines in Python.',
    evaluation:
      'Validated physiological signal quality and evaluated speech-based heart-rate estimation across participant sessions.',
    outcome:
      'Established an empirical 40+ participant multimodal corpus supporting ongoing speech-physiology studies.',
    tags: ['Speech', 'ECG', 'PPG', 'Data Collection', 'Preprocessing'],
  },
  {
    id: 'breathing-ica',
    title: 'Breathing-Pattern Extraction & Exercise Heart-Rate Separation via ICA',
    domain: 'Biomedical Signal Processing',
    highlight: 'EUSIPCO 2024',
    problem:
      'Separating physiological respiratory and cardiac signatures embedded inside read-speech under varying physical exertion.',
    methodology:
      'Applied Independent Component Analysis (ICA) and spectral signal decomposition to isolate breathing-pattern dynamics and heart-rate correlates.',
    implementation:
      'Implemented ICA-based decomposition and speech acoustic feature pipelines comparing resting and heavy physical activity regimes.',
    evaluation:
      'Assessed physiological consistency against ground-truth activity states and cardiac metrics.',
    outcome:
      'Demonstrated physiologically meaningful differences between resting and heavy physical activity conditions; accepted at EUSIPCO 2024.',
    tags: ['ICA', 'Breathing Patterns', 'Heart-Rate Estimation', 'Read Speech'],
  },
  {
    id: 'alzheimers-asr-gnn',
    title: 'ASR-to-Graph Pipeline for Alzheimer’s Dementia Detection',
    domain: 'Clinical Speech & Graph Learning',
    highlight: '~91% Accuracy • EUSIPCO 2026',
    problem:
      'Capturing structural and cognitive speech disruptions in spontaneous speech without manual transcript dependence.',
    methodology:
      'Coupled Automatic Speech Recognition (ASR) outputs with transcript-derived graph construction and Graph Neural Networks.',
    implementation:
      'Built the end-to-end ASR-to-graph architecture and trained GNN classifiers using PyTorch and PyTorch Geometric.',
    evaluation:
      'Evaluated diagnostic classification performance on benchmark dementia speech datasets.',
    outcome:
      'Achieved approximately 91% accuracy on the evaluated dataset; accepted at EUSIPCO 2026 in Bruges, Belgium.',
    tags: ['ASR', 'Graph Neural Networks', 'PyTorch Geometric', 'Alzheimer’s'],
  },
  {
    id: 'dysarthria-severity',
    title: 'Dysarthria Speech Analysis & Neurological Severity Assessment',
    domain: 'Neurological Speech Disorders',
    highlight: 'Clinical Speech AI',
    problem:
      'Quantifying speech impairment characteristics and severity levels in dysarthria for neurological disorder assessment.',
    methodology:
      'Investigated acoustic, articulatory, and representation-based cues relevant to dysarthric speech degradation.',
    implementation:
      'Developed machine learning and deep learning pipelines spanning speech embeddings, preprocessing, and severity classification.',
    evaluation:
      'Benchmarked multi-approach pipelines for dysarthria speech analysis and severity grading.',
    outcome:
      'Advanced speech biomarker capabilities for neurological speech disorder monitoring.',
    tags: ['Dysarthria', 'Speech Embeddings', 'wav2vec2', 'Whisper', 'Neurological AI'],
  },
  {
    id: 'pcg-cad-murmurs',
    title: 'Phonocardiogram (PCG) Murmur Detection & CAD Acoustic Indicators',
    domain: 'Cardiac Acoustic AI',
    highlight: 'PCG • CAD',
    problem:
      'Detecting cardiac murmurs, distinguishing normal from abnormal heartbeats, and identifying acoustic indicators of coronary artery disease (CAD).',
    methodology:
      'Analyzed phonocardiogram (PCG) recordings for time-frequency acoustic signatures tied to cardiac valve and vascular dynamics.',
    implementation:
      'Built PCG preprocessing, heartbeat categorization, and acoustic feature analysis pipelines.',
    evaluation:
      'Evaluated discrimination between normal, murmur, and CAD-related cardiac sound profiles.',
    outcome:
      'Expanded cardiovascular acoustic sensing from speech-linked physiology into direct heart-sound diagnostics.',
    tags: ['PCG', 'Murmur Detection', 'CAD', 'Acoustic Biomarkers'],
  },
  {
    id: 'xai-prototypes-review',
    title: 'Explainable AI (SHAP/LIME), Prototypes, Facial Landmarks & Peer Review',
    domain: 'Trustworthy ML & Engineering',
    highlight: 'SHAP/LIME • IEEE/Elsevier Reviewer',
    problem:
      'Translating black-box physiological ML outputs into clinically interpretable insights and interactive stakeholder demonstrations.',
    methodology:
      'Applied SHAP and LIME attributions to connect influential signal features back to their physiological significance; explored facial landmark emotion recognition.',
    implementation:
      'Engineered interactive research prototypes with Streamlit and FastAPI for internal stakeholder communication and live demonstration.',
    evaluation:
      'Presented findings at INTERSPEECH and EUSIPCO and contributed peer reviews for IEEE Industrial Application Society (IAS) and Elsevier Biomedical Signal Processing and Control (BSPC).',
    outcome:
      'Bridged experimental ML models with interpretable physiological validation and production-ready research demos.',
    tags: ['SHAP', 'LIME', 'FastAPI', 'Streamlit', 'MediaPipe', 'Peer Review'],
  },
];

export const RESEARCH_TIMELINE: TimelineMilestone[] = [
  {
    year: '2023',
    title: 'NIT Warangal M.Tech. & Joined TCS Research',
    subtitle: 'IEEE IAS I&CPS 2023 • Las Vegas, USA',
    location: 'Warangal → TCS Research (Pune / Mumbai / Hyderabad)',
    summary:
      'Completed M.Tech. in Electrical Engineering at NIT Warangal (load forecasting thesis), published at IEEE IAS I&CPS 2023, and joined TCS Research in September 2023.',
    details: [
      'Completed Master’s thesis on Electrical Load Demand Forecasting Using Machine Learning Techniques.',
      'Accepted paper at IEEE IAS Industrial and Commercial Power Systems Conference 2023.',
      'Concluded Computer Vision internship at ZF Technologies (June 2022 – July 2023).',
      'Joined TCS Research as Researcher — Speech Signal Processing and AI for Healthcare.',
    ],
  },
  {
    year: '2024',
    title: 'EUSIPCO 2024 Acceptance & Multimodal Study',
    subtitle: 'Heart Rate from Read-Speech Influenced by Physical Exercise',
    location: 'Lyon, France',
    summary:
      'Demonstrated ICA-based breathing-pattern and heart-rate estimation from read speech across resting and heavy physical activity conditions.',
    details: [
      'Collected synchronized speech, ECG, and PPG recordings across 40+ participants.',
      'Developed ICA algorithms isolating physiological cardiac/respiratory patterns from speech.',
      'Presented paper at EUSIPCO 2024 in Lyon, France.',
    ],
  },
  {
    year: '2025',
    title: 'INTERSPEECH 2025 Acceptance & Dysarthria Modeling',
    subtitle: 'Heart Rate as a Proxy Measure for Human Confidence in Spoken Speech',
    location: 'Rotterdam, Netherlands',
    summary:
      'Investigated physiological heart rate as an objective proxy for confidence in spoken speech while expanding neurological dysarthria and PCG pipelines.',
    details: [
      'Accepted at INTERSPEECH 2025 in Rotterdam, Netherlands.',
      'Built ML/DL pipelines for dysarthria speech analysis and severity assessment.',
      'Applied SHAP/LIME explainability and developed FastAPI/Streamlit research prototypes.',
    ],
  },
  {
    year: '2026',
    title: 'EUSIPCO 2026 Acceptance — Alzheimer’s GNNs',
    subtitle: 'Alzheimer’s Dementia Detection from Spontaneous Speech Using Graph Neural Networks',
    location: 'Bruges, Belgium',
    summary:
      'Designed an ASR-to-graph pipeline transforming spontaneous speech transcripts into graph representations, achieving ~91% accuracy on the evaluated dataset.',
    details: [
      'Constructed transcript-derived graph representations from spontaneous speech ASR outputs.',
      'Trained Graph Neural Networks achieving ~91% accuracy on the evaluated Alzheimer’s dataset.',
      'Accepted at EUSIPCO 2026 in Bruges, Belgium.',
    ],
  },
  {
    year: 'Present',
    title: 'Multimodal Healthcare AI & Trustworthy ML',
    subtitle: 'Disease Progression, Uncertainty & Clinical Collaboration',
    location: 'Mumbai, India • TCS Research',
    summary:
      'Extending multimodal physiological and acoustic biomarkers toward longitudinal disease progression modeling under sparse, irregular clinical observations.',
    details: [
      'Investigating phonocardiogram (PCG) murmurs and CAD acoustic indicators.',
      'Advancing uncertainty-aware, robust, and fair ML methods for real-world clinical settings.',
      'Serving as peer reviewer for IEEE IAS and Elsevier Biomedical Signal Processing and Control (BSPC).',
    ],
  },
];
