export interface ResearchRepo {
  name: string;
  description: string;
  language: string | null;
  stars: number;
  updatedAt: string;
  topic: string;
  htmlUrl: string;
  homepage?: string;
}

export const FALLBACK_REPOS: ResearchRepo[] = [
  {
    name: 'signal-explorer',
    description:
      'Browser-local signal analysis lab for speech, audio, ECG, PPG, PCG, and EEG—with Welch spectra, STFT spectrograms, pitch contours, and EMD examples.',
    language: 'JavaScript',
    stars: 0,
    updatedAt: '2026-10-24T17:14:08Z',
    topic: 'Biomedical Signal Lab',
    htmlUrl: 'https://github.com/battulaharish2/signal-explorer',
    homepage: 'https://battulaharish2.github.io/signal-explorer/',
  },
  {
    name: 'research-journal',
    description:
      'Harish Battula — research notes on heart sounds, INTERSPEECH 2025, and EUSIPCO 2024 conference journals.',
    language: 'Python',
    stars: 0,
    updatedAt: '2026-10-25T20:04:25Z',
    topic: 'Research & Conference Journal',
    htmlUrl: 'https://github.com/battulaharish2/research-journal',
    homepage: 'https://battulaharish2.github.io/research-journal/',
  },
  {
    name: 'ElectricalLF',
    description:
      'Comparative study of forecasting problems on electrical load time-series data using deep learning techniques (IEEE IAS I&CPS 2023).',
    language: 'Python',
    stars: 0,
    updatedAt: '2023-06-16T13:10:28Z',
    topic: 'Time-Series Forecasting',
    htmlUrl: 'https://github.com/battulaharish2/ElectricalLF',
  },
  {
    name: 'harish_STLF',
    description:
      'Short-term electrical load demand forecasting notebooks using PyTorch neural networks and time-series modeling.',
    language: 'Jupyter Notebook',
    stars: 0,
    updatedAt: '2024-04-30T05:43:11Z',
    topic: 'Deep Learning Time-Series',
    htmlUrl: 'https://github.com/battulaharish2/harish_STLF',
  },
];
