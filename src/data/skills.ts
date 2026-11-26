export interface ResearchFocusArea {
  id: string;
  code: string;
  title: string;
  summary: string;
  keywords: string[];
  connectedTo: string[];
}

export interface ToolboxCategory {
  id: string;
  category: string;
  subtitle: string;
  items: string[];
}

export interface ResearchPipelineStep {
  step: string;
  title: string;
  description: string;
  evidence: string;
}

export const RESEARCH_FOCUS_AREAS: ResearchFocusArea[] = [
  {
    id: 'speech-audio',
    code: 'DOMAIN 01',
    title: 'Speech & Audio AI',
    summary:
      'Extracting linguistic, structural, and acoustic biomarkers from spontaneous and read speech for neurological and physiological assessment.',
    keywords: [
      'Speech processing',
      'ASR',
      'Spontaneous speech analysis',
      'Neurological speech disorders',
      'Dysarthria',
      'Whisper',
      'wav2vec2',
    ],
    connectedTo: ['Healthcare AI', 'Multimodal Learning'],
  },
  {
    id: 'biomedical-signals',
    code: 'DOMAIN 02',
    title: 'Biomedical Signal Processing',
    summary:
      'Acquiring, synchronizing, and decomposing non-invasive physiological waveforms to surface subtle cardiopulmonary dynamics.',
    keywords: [
      'ECG',
      'PPG',
      'PCG',
      'Heart-rate estimation',
      'Breathing-pattern extraction',
      'ICA',
      'Physiological sensing',
    ],
    connectedTo: ['Speech & Audio AI', 'Multimodal Learning'],
  },
  {
    id: 'healthcare-ai',
    code: 'DOMAIN 03',
    title: 'Healthcare AI',
    summary:
      'Developing diagnostic and screening models for neurodegenerative and cardiovascular conditions grounded in clinical signal evidence.',
    keywords: [
      'Alzheimer’s / dementia detection',
      'CAD-related acoustic analysis',
      'Murmur detection',
      'Disease detection',
      'Neurological disorders',
    ],
    connectedTo: ['Speech & Audio AI', 'Trustworthy AI'],
  },
  {
    id: 'multimodal-learning',
    code: 'DOMAIN 04',
    title: 'Multimodal Learning',
    summary:
      'Aligning heterogeneous vocal, cardiac, and visual observations—and preparing models for sparse or irregularly sampled longitudinal health data.',
    keywords: [
      'Speech + physiological signals',
      'Multimodal representation',
      'Synchronized data (40+ participants)',
      'Incomplete observations',
    ],
    connectedTo: ['Biomedical Signal Processing', 'Trustworthy AI'],
  },
  {
    id: 'trustworthy-ai',
    code: 'DOMAIN 05',
    title: 'Trustworthy AI',
    summary:
      'Ensuring clinical models remain interpretable, calibrated under uncertainty, and robust across recording conditions and patient populations.',
    keywords: [
      'SHAP & LIME explainability',
      'Uncertainty awareness',
      'Robustness',
      'Fairness',
      'Reliable machine learning',
    ],
    connectedTo: ['Healthcare AI', 'Multimodal Learning'],
  },
];

export const RESEARCH_APPROACH_PIPELINE: ResearchPipelineStep[] = [
  {
    step: '01',
    title: 'Problem',
    description:
      'Formulate clinically and physiologically grounded questions where non-invasive signals can inform health or cognitive state.',
    evidence: 'Dementia screening, speaker confidence, CAD acoustic cues',
  },
  {
    step: '02',
    title: 'Data',
    description:
      'Design acquisition protocols and curate synchronized multimodal recordings under real-world conditions.',
    evidence: '40+ participants with synchronized Speech, ECG & PPG',
  },
  {
    step: '03',
    title: 'Preprocessing',
    description:
      'Align cross-sensor streams, denoise physiological channels, and extract clean acoustic/cardiac intervals.',
    evidence: 'ICA source separation, ASR decoding, ECG/PPG/PCG filtering',
  },
  {
    step: '04',
    title: 'Representation',
    description:
      'Transform raw time series and transcripts into domain-meaningful structures that preserve relational and spectral topology.',
    evidence: 'Transcript-derived graphs, wav2vec2/Whisper features, Welch spectra',
  },
  {
    step: '05',
    title: 'Model',
    description:
      'Train and compare classical statistical, deep learning, and graph architectures suited to data geometry and sample regime.',
    evidence: 'Graph Neural Networks (PyG), CNNs, BERT, time-series models',
  },
  {
    step: '06',
    title: 'Evaluation',
    description:
      'Benchmark generalization rigorously across conditions, subjects, and forecasting horizons without inflated claims.',
    evidence: '~91% Alzheimer’s dataset accuracy; resting vs. heavy exercise contrast',
  },
  {
    step: '07',
    title: 'Interpretability',
    description:
      'Audit model predictions to verify that learned cues align with genuine physiological and linguistic mechanisms.',
    evidence: 'SHAP & LIME attributions mapped to physiological significance',
  },
  {
    step: '08',
    title: 'Research Insight',
    description:
      'Distill findings into peer-reviewed scientific publications, interactive Streamlit/FastAPI prototypes, and open tools.',
    evidence: 'INTERSPEECH 2025, EUSIPCO 2024/2026, Signal Explorer',
  },
];

export const TOOLBOX_CATEGORIES: ToolboxCategory[] = [
  {
    id: 'ml',
    category: 'Machine Learning & Models',
    subtitle: 'Core modeling frameworks & neural architectures',
    items: ['PyTorch', 'TensorFlow / Keras', 'Scikit-learn', 'GNN', 'CNN', 'BERT', 'Hugging Face'],
  },
  {
    id: 'speech',
    category: 'Speech & Audio',
    subtitle: 'ASR, acoustic features & neurological speech processing',
    items: ['Whisper', 'wav2vec2', 'Librosa', 'SoundFile', 'ASR', 'Speech Processing'],
  },
  {
    id: 'signals',
    category: 'Biomedical Signals',
    subtitle: 'Physiological sensing & time-series analysis',
    items: ['ECG', 'PPG', 'PCG', 'Heart-rate Estimation', 'Breathing-pattern Extraction', 'ICA', 'Time-Series Forecasting'],
  },
  {
    id: 'graph',
    category: 'Graph Learning',
    subtitle: 'Structured transcript & relational modeling',
    items: ['Graph Neural Networks', 'PyTorch Geometric', 'Transcript-Derived Graphs'],
  },
  {
    id: 'explainability',
    category: 'Explainability & Trust',
    subtitle: 'Post-hoc physiological grounding & interpretability',
    items: ['SHAP', 'LIME', 'Uncertainty-Aware Analysis', 'Robustness'],
  },
  {
    id: 'vision',
    category: 'Computer Vision',
    subtitle: 'Visual perception & facial landmark analysis',
    items: ['OpenCV', 'MediaPipe', 'Object Detection', 'Semantic Segmentation', 'Human Pose Estimation'],
  },
  {
    id: 'engineering',
    category: 'Research & Engineering',
    subtitle: 'Experimentation, compute & interactive prototypes',
    items: ['Python', 'CUDA', 'GPU Computing', 'Linux', 'Git', 'Jupyter', 'FastAPI', 'Streamlit'],
  },
];

export const FUTURE_RESEARCH_DIRECTIONS = {
  progression: [
    {
      stage: 'Past Foundation',
      period: '2021 – 2023',
      focus: 'Time-series forecasting (NIT Warangal) & Computer Vision pipelines (ZF Technologies)',
    },
    {
      stage: 'Current Focus',
      period: '2023 – Present',
      focus: 'Speech, ECG, PPG & PCG disease/physiological modeling + GNNs at TCS Research',
    },
    {
      stage: 'Next Frontier',
      period: 'Forward Trajectory',
      focus: 'Longitudinal multimodal trajectories & uncertainty-aware clinical ML',
    },
  ],
  interests: [
    {
      title: 'Disease Detection & Classification',
      detail:
        'Analysing and classifying neurological and cardiovascular conditions from image, speech, ECG, PPG, and PCG data.',
    },
    {
      title: 'Multimodal Representation Learning',
      detail:
        'Learning joint representations across heterogeneous health modalities that preserve complementary clinical signal cues.',
    },
    {
      title: 'Disease Progression Modelling',
      detail:
        'Studying how diseases evolve over time and how individual trajectories support earlier detection and preventive care.',
    },
    {
      title: 'Speech & Physiological Biomarkers',
      detail:
        'Identifying reproducible vocal and cardiopulmonary biomarkers for continuous, non-invasive disease monitoring.',
    },
    {
      title: 'Incomplete & Irregularly Sampled Health Data',
      detail:
        'Developing methods capable of learning reliably from sparse, missing, or asynchronous real-world clinical observations.',
    },
    {
      title: 'Trustworthy Machine Learning',
      detail:
        'Building calibrated uncertainty, robustness, fairness, and explainability to distinguish progression from treatment effects with clinicians.',
    },
  ],
};
