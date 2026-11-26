export type SignalId = 'speech' | 'ecg' | 'ppg' | 'pcg';

export interface SignalSpec {
  id: SignalId;
  label: string;
  fullName: string;
  unit: string;
  sampleRateLabel: string;
  accentColor: string;
  represents: string;
  howHarishWorked: string;
  methods: string[];
  relatedProject: string;
  relatedProjectId: string;
  annotations: { label: string; value: string }[];
}

export const RESEARCH_SIGNALS: Record<SignalId, SignalSpec> = {
  speech: {
    id: 'speech',
    label: 'Speech',
    fullName: 'Acoustic Speech Waveform',
    unit: 'Norm. Amplitude',
    sampleRateLabel: '16 kHz Acoustic • Spontaneous & Read Speech',
    accentColor: '#0F766E',
    represents:
      'Airborne vocal fold vibrations, articulation dynamics, pause patterns, and respiratory modulation carrying both linguistic content and autonomic physiological cues.',
    howHarishWorked:
      'Collected spontaneous and read speech across clinical and exercise protocols; built ASR-to-graph pipelines for Alzheimer’s detection (~91% accuracy), dysarthria severity pipelines, and ICA-based breathing/heart-rate extraction.',
    methods: ['Whisper', 'wav2vec2', 'ASR-to-Graph GNN', 'ICA', 'Librosa'],
    relatedProject: 'Alzheimer’s Dementia Detection (EUSIPCO 2026) & Exercise Read-Speech (EUSIPCO 2024)',
    relatedProjectId: 'alzheimers-gnn',
    annotations: [
      { label: 'Focus', value: 'Prosody, pauses & spectral envelope' },
      { label: 'Models', value: 'Whisper, wav2vec2, GNN' },
      { label: 'Venues', value: 'INTERSPEECH 2025, EUSIPCO 2024/2026' },
    ],
  },
  ecg: {
    id: 'ecg',
    label: 'ECG',
    fullName: 'Electrocardiogram',
    unit: 'mV (Cardiac Electrical)',
    sampleRateLabel: 'Synchronized Reference • 40+ Participants',
    accentColor: '#1D4ED8',
    represents:
      'Electrical depolarization and repolarization across the myocardium (P wave, QRS complex, T wave), providing exact beat-to-beat R–R interval and heart-rate ground truth.',
    howHarishWorked:
      'Recorded synchronized ECG alongside speech and PPG from 40+ participants at TCS Research to benchmark speech-based heart-rate estimation and study autonomic confidence proxies.',
    methods: ['Cross-Sensor Synchronization', 'R-Peak Reference Extraction', 'SHAP / LIME Grounding'],
    relatedProject: 'Heart Rate as Confidence Proxy (INTERSPEECH 2025) & 40+ Participant Study',
    relatedProjectId: 'confidence-heart-rate',
    annotations: [
      { label: 'Morphology', value: 'P–QRS–T Complex' },
      { label: 'Role', value: 'Synchronized cardiac reference' },
      { label: 'Cohort', value: '40+ Multimodal Participants' },
    ],
  },
  ppg: {
    id: 'ppg',
    label: 'PPG',
    fullName: 'Photoplethysmogram',
    unit: 'Optical Pulse Intensity',
    sampleRateLabel: 'Optical Peripheral Pulse • Synchronized',
    accentColor: '#B45309',
    represents:
      'Volumetric microvascular blood-flow changes per cardiac cycle, exhibiting a sharp systolic peak followed by a dicrotic notch and diastolic decay.',
    howHarishWorked:
      'Acquired synchronized PPG alongside speech and ECG in the 40+ participant multimodal corpus, supporting preprocessing, pulse-rate alignment, and cross-modal evaluation.',
    methods: ['Pulse Preprocessing', 'Multimodal Alignment', 'Time-Series Denoising'],
    relatedProject: 'Synchronized Multimodal Speech-ECG-PPG Data Collection',
    relatedProjectId: 'multimodal-data-collection',
    annotations: [
      { label: 'Morphology', value: 'Systolic Peak & Dicrotic Notch' },
      { label: 'Role', value: 'Wearable optical pulse benchmark' },
      { label: 'Pipeline', value: 'Speech + ECG + PPG alignment' },
    ],
  },
  pcg: {
    id: 'pcg',
    label: 'PCG',
    fullName: 'Phonocardiogram',
    unit: 'Acoustic Heart Sound',
    sampleRateLabel: 'Auscultation Audio • S1 / S2 & Murmurs',
    accentColor: '#BE123C',
    represents:
      'Mechanical acoustic vibrations produced by cardiac valve closures (S1 lub, S2 dub) and turbulent blood-flow murmurs linked to structural or coronary abnormalities.',
    howHarishWorked:
      'Analyzed phonocardiogram (PCG) audio signals to detect heart murmurs, classify normal vs. abnormal heartbeats, and investigate acoustic indicators associated with coronary artery disease (CAD).',
    methods: ['Murmur Detection', 'Normal vs. Abnormal Classification', 'CAD Acoustic Indicators'],
    relatedProject: 'TCS Research — Cardiac Acoustic & CAD Detection Studies',
    relatedProjectId: 'multimodal-data-collection',
    annotations: [
      { label: 'Events', value: 'S1 / S2 Heart Sounds & Murmurs' },
      { label: 'Clinical Target', value: 'Coronary Artery Disease (CAD)' },
      { label: 'Explainability', value: 'SHAP / LIME Feature Mapping' },
    ],
  },
};
