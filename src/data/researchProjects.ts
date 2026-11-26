export interface PipelineStage {
  id: string;
  label: string;
  shortTag: string;
  explanation: string;
  artifact: string;
}

export interface ResearchCaseStudy {
  id: string;
  number: string;
  title: string;
  venueBadge: string;
  status: string;
  areas: string[];
  highlightMetric: string;
  highlightLabel: string;
  question: string;
  problem: string;
  motivation: string;
  data: string;
  method: string;
  model: string;
  result: string;
  publication: string;
  technologies: string[];
  visualType: 'asr-graph' | 'confidence-hr' | 'exercise-speech' | 'multimodal-sync';
  pipelineStages?: PipelineStage[];
  links?: {
    label: string;
    href: string;
  }[];
}

export const SELECTED_RESEARCH: ResearchCaseStudy[] = [
  {
    id: 'alzheimers-gnn',
    number: 'RESEARCH PROJECT 01',
    title: 'Alzheimer’s Dementia Detection from Spontaneous Speech',
    venueBadge: 'EUSIPCO 2026 — Accepted',
    status: 'Bruges, Belgium',
    areas: ['Speech AI', 'Graph Neural Networks', 'Healthcare AI'],
    highlightMetric: '~91%',
    highlightLabel: 'Classification Accuracy (Evaluated Dataset)',
    question:
      'Can structural relationships inside automatically transcribed spontaneous speech capture early cognitive decline?',
    problem:
      'Detecting Alzheimer’s dementia from spontaneous conversational speech without relying exclusively on manual clinical transcription or invasive neuroimaging.',
    motivation:
      'Spontaneous speech encodes subtle lexical, syntactic, and structural disruptions caused by cognitive decline. Transforming spoken narratives into explicit relational graphs allows message-passing networks to model structural coherence beyond flat bag-of-words or sequential embeddings.',
    data: 'Spontaneous speech recordings from evaluated clinical dementia assessment datasets.',
    method:
      'Designed an automated speech recognition (ASR)-to-graph pipeline that transcribes spontaneous utterances and constructs transcript-derived graph representations capturing semantic and structural token relationships.',
    model:
      'Automatic Speech Recognition (Whisper / ASR) coupled with transcript-derived graph construction and Graph Neural Networks (PyTorch Geometric).',
    result:
      'Achieved approximately 91% accuracy on the evaluated Alzheimer’s speech dataset while maintaining an interpretable structural representation of spoken transcripts.',
    publication:
      'Alzheimer’s Dementia Detection from Spontaneous Speech Using Graph Neural Networks — Accepted at EUSIPCO 2026, Bruges, Belgium.',
    technologies: ['PyTorch', 'PyTorch Geometric', 'Graph Neural Networks', 'ASR', 'Whisper', 'Python'],
    visualType: 'asr-graph',
    pipelineStages: [
      {
        id: 'speech',
        label: 'Speech',
        shortTag: 'Audio Input',
        explanation:
          'Raw spontaneous speech recordings capturing pauses, disfluencies, lexical hesitations, and natural narrative flow.',
        artifact: 'Acoustic signal (16 kHz PCM)',
      },
      {
        id: 'asr',
        label: 'ASR',
        shortTag: 'Transcription',
        explanation:
          'Automatic Speech Recognition converts spontaneous spoken audio into word-level transcripts without manual clinical transcription bottlenecks.',
        artifact: 'Speech-to-text decoding',
      },
      {
        id: 'transcript',
        label: 'Transcript',
        shortTag: 'Linguistic Stream',
        explanation:
          'Cleaned token sequences preserving word order, repetition patterns, and discourse structure from spontaneous speech.',
        artifact: 'Tokenized utterance sequence',
      },
      {
        id: 'graph',
        label: 'Graph Representation',
        shortTag: 'Structural Encoding',
        explanation:
          'Transcript-derived graph construction maps tokens and contextual/structural dependencies into nodes and weighted edges.',
        artifact: 'G = (V, E) transcript graph',
      },
      {
        id: 'gnn',
        label: 'Graph Neural Network',
        shortTag: 'Relational Learning',
        explanation:
          'Message-passing Graph Neural Network aggregates neighborhood structure across the transcript graph to learn discourse-level representations.',
        artifact: 'PyTorch Geometric GNN',
      },
      {
        id: 'detection',
        label: 'Dementia Detection',
        shortTag: 'Clinical Output',
        explanation:
          'Graph-level readout classifies Alzheimer’s dementia vs. control speech, achieving ~91% accuracy on the evaluated dataset.',
        artifact: '~91% accuracy on evaluated set',
      },
    ],
    links: [
      {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
      },
    ],
  },
  {
    id: 'confidence-heart-rate',
    number: 'RESEARCH PROJECT 02',
    title: 'Heart Rate as a Proxy Measure for Human Confidence in Spoken Speech',
    venueBadge: 'INTERSPEECH 2025 — Accepted',
    status: 'Rotterdam, Netherlands',
    areas: ['Speech Processing', 'Physiological Sensing', 'Affective & Behavioral AI'],
    highlightMetric: 'Speech + HR',
    highlightLabel: 'Physiological Proxy Investigation',
    question:
      'Can physiological signals provide objective information about human confidence during spoken communication?',
    problem:
      'Assessing internal speaker confidence relies largely on subjective self-reporting or external listener ratings, which often diverge from underlying autonomic state.',
    motivation:
      'Spoken communication induces measurable autonomic cardiovascular responses. Examining heart rate alongside vocal acoustics reveals whether physiological markers serve as a reliable proxy for speaker confidence.',
    data: 'Participant study combining spoken speech recordings with synchronized physiological heart-rate measurements (ECG/PPG).',
    method:
      'Synchronized participant speech and cardiac signal acquisition, followed by speech processing, physiological feature extraction, and comparative statistical/ML analysis linking cardiac dynamics with confidence states.',
    model:
      'Speech signal processing + physiological heart-rate & breathing-pattern extraction and feature-level modeling.',
    result:
      'Demonstrated the relationship between autonomic heart-rate signatures and human confidence during spoken speech, accepted at INTERSPEECH 2025.',
    publication:
      'Heart Rate as a Proxy Measure to Assess Human Confidence in Spoken Speech — Accepted at INTERSPEECH 2025, Rotterdam, Netherlands.',
    technologies: ['Speech Processing', 'ECG', 'PPG', 'Heart-Rate Estimation', 'Librosa', 'Python'],
    visualType: 'confidence-hr',
    links: [
      {
        label: 'INTERSPEECH 2025 Journal Note',
        href: 'https://battulaharish2.github.io/research-journal/interspeech-2025/index.html',
      },
    ],
  },
  {
    id: 'exercise-read-speech',
    number: 'RESEARCH PROJECT 03',
    title: 'Heart Rate from Read-Speech Influenced by Physical Exercise',
    venueBadge: 'EUSIPCO 2024 — Accepted',
    status: 'Lyon, France',
    areas: ['Biomedical Signal Processing', 'ICA', 'Speech Acoustics'],
    highlightMetric: 'ICA',
    highlightLabel: 'Resting vs. Heavy Activity Separation',
    question:
      'Can breathing patterns and heart-rate information be extracted non-invasively from read speech across resting and post-exercise states?',
    problem:
      'Cardiopulmonary monitoring typically requires contact sensors (ECG electrodes or optical PPG clips), limiting unobtrusive assessment during everyday speech.',
    motivation:
      'Physical exertion alters respiratory mechanics and cardiac rate, which leave subtle physiological modulations inside vocal production and breath intervals.',
    data: 'Read-speech recordings paired with physiological ground truth captured under resting and heavy physical activity conditions.',
    method:
      'Developed algorithms for breathing-pattern extraction and heart-rate estimation directly from speech signals using Independent Component Analysis (ICA), then evaluated physiological separability across activity regimes.',
    model:
      'Independent Component Analysis (ICA) source separation and acoustic-physiological spectral analysis.',
    result:
      'Demonstrated physiologically meaningful differences between resting and heavy physical activity conditions in extracted breathing and heart-rate indicators.',
    publication:
      'Heart Rate from Read-Speech Influenced by Physical Exercise — Accepted at EUSIPCO 2024, Lyon, France.',
    technologies: ['Independent Component Analysis', 'Speech Processing', 'Heart-Rate Estimation', 'Signal Filtering', 'Python'],
    visualType: 'exercise-speech',
    links: [
      {
        label: 'EUSIPCO 2024 Journal Note',
        href: 'https://battulaharish2.github.io/research-journal/eusipco-2024/index.html',
      },
    ],
  },
  {
    id: 'multimodal-data-collection',
    number: 'RESEARCH PROJECT 04',
    title: 'Multimodal Synchronized Speech, ECG & PPG Acquisition for Heart-Rate Estimation',
    venueBadge: 'TCS Research — Empirical Study',
    status: '40+ Participants',
    areas: ['Multimodal Sensing', 'Data Collection', 'Biomedical Preprocessing'],
    highlightMetric: '40+',
    highlightLabel: 'Participants Collected & Synchronized',
    question:
      'How do we build clean, temporally aligned multimodal datasets where vocal acoustics and cardiac waveforms share exact ground-truth timing?',
    problem:
      'Public speech datasets rarely include simultaneous ECG and PPG ground truth, while clinical physiological datasets lack controlled speech protocols.',
    motivation:
      'Advancing speech-based physiological sensing requires real-world multimodal acquisition protocols with strict cross-sensor synchronization, artifact inspection, and reproducible preprocessing.',
    data: 'Synchronized speech audio, electrocardiogram (ECG), and photoplethysmogram (PPG) recordings collected from more than 40 participants.',
    method:
      'Designed and executed participant data collection protocols, temporal alignment across acoustic and physiological streams, quality screening, and multimodal feature preprocessing.',
    model:
      'Cross-modal signal synchronization, filtering, R-peak / pulse reference extraction, and ML/DL evaluation pipelines for speech-based heart-rate estimation.',
    result:
      'Established a validated 40+ participant multimodal corpus supporting ongoing speech-to-physiology estimation, explainability (SHAP/LIME), and conference publications.',
    publication:
      'Foundation dataset & experimental framework supporting TCS Research physiological speech studies.',
    technologies: ['Speech Audio', 'ECG', 'PPG', 'Signal Synchronization', 'SHAP', 'LIME', 'FastAPI', 'Streamlit'],
    visualType: 'multimodal-sync',
    links: [
      {
        label: 'Signal Explorer Lab',
        href: 'https://battulaharish2.github.io/signal-explorer/',
      },
    ],
  },
];
