export interface Publication {
  id: string;
  title: string;
  venue: string;
  venueShort: string;
  year: number;
  location: string;
  domain: string;
  status: string;
  contribution: string;
  bibtex: string;
  links: {
    label: string;
    href: string;
  }[];
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'eusipco-2026',
    title: 'Alzheimer’s Dementia Detection from Spontaneous Speech Using Graph Neural Networks',
    venue: 'European Signal Processing Conference (EUSIPCO)',
    venueShort: 'EUSIPCO 2026',
    year: 2026,
    location: 'Bruges, Belgium',
    domain: 'Speech AI • Graph Neural Networks • Healthcare',
    status: 'Accepted',
    contribution:
      'Proposes an ASR-to-graph pipeline that builds transcript-derived graph representations from spontaneous speech and trains Graph Neural Networks for dementia detection (~91% accuracy on the evaluated dataset).',
    bibtex: `@inproceedings{battula2026alzheimers,
  title={Alzheimer's Dementia Detection from Spontaneous Speech Using Graph Neural Networks},
  author={Battula, Harish and others},
  booktitle={Proceedings of the European Signal Processing Conference (EUSIPCO)},
  year={2026},
  address={Bruges, Belgium}
}`,
    links: [
      {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
      },
    ],
  },
  {
    id: 'interspeech-2025',
    title: 'Heart Rate as a Proxy Measure to Assess Human Confidence in Spoken Speech',
    venue: 'INTERSPEECH 2025',
    venueShort: 'INTERSPEECH 2025',
    year: 2025,
    location: 'Rotterdam, Netherlands',
    domain: 'Speech Processing • Physiological Sensing',
    status: 'Accepted',
    contribution:
      'Investigates heart rate extracted alongside spoken speech as an objective physiological proxy for assessing speaker confidence during communication.',
    bibtex: `@inproceedings{battula2025confidence,
  title={Heart Rate as a Proxy Measure to Assess Human Confidence in Spoken Speech},
  author={Battula, Harish and Deshpande, Gauri and Gudipalli, Yagna and Patel, Sachin},
  booktitle={Proceedings of INTERSPEECH},
  year={2025},
  address={Rotterdam, Netherlands}
}`,
    links: [
      {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
      },
      {
        label: 'Conference Journal',
        href: 'https://battulaharish2.github.io/research-journal/interspeech-2025/index.html',
      },
    ],
  },
  {
    id: 'eusipco-2024',
    title: 'Heart Rate from Read-Speech Influenced by Physical Exercise',
    venue: 'European Signal Processing Conference (EUSIPCO)',
    venueShort: 'EUSIPCO 2024',
    year: 2024,
    location: 'Lyon, France',
    domain: 'Biomedical Signal Processing • Speech Acoustics',
    status: 'Accepted',
    contribution:
      'Introduces ICA-based breathing-pattern extraction and heart-rate estimation from read speech, demonstrating physiologically meaningful differences between resting and heavy physical activity.',
    bibtex: `@inproceedings{battula2024exercise,
  title={Heart Rate from Read-Speech Influenced by Physical Exercise},
  author={Battula, Harish and Deshpande, Gauri and Patel, Sachin and Schuller, Bj{\\"o}rn W.},
  booktitle={Proceedings of the European Signal Processing Conference (EUSIPCO)},
  year={2024},
  address={Lyon, France}
}`,
    links: [
      {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
      },
      {
        label: 'Conference Journal',
        href: 'https://battulaharish2.github.io/research-journal/eusipco-2024/index.html',
      },
    ],
  },
  {
    id: 'ieee-ias-2023',
    title: 'A Comparative Study of Forecasting Problems on Electrical Load Timeseries Data using Deep Learning Techniques',
    venue: 'IEEE IAS Industrial and Commercial Power Systems (I&CPS) Conference',
    venueShort: 'IEEE IAS I&CPS 2023',
    year: 2023,
    location: 'Las Vegas, Nevada, USA',
    domain: 'Time-Series Modeling • Deep Learning',
    status: 'Accepted',
    contribution:
      'Compares deep learning architectures across short-, medium-, and long-term electrical load forecasting horizons from M.Tech. research at NIT Warangal.',
    bibtex: `@inproceedings{battula2023comparative,
  title={A Comparative Study of Forecasting Problems on Electrical Load Timeseries Data using Deep Learning Techniques},
  author={Battula, Harish and others},
  booktitle={IEEE IAS Industrial and Commercial Power Systems Technical Conference (I\\&CPS)},
  year={2023},
  address={Las Vegas, NV, USA}
}`,
    links: [
      {
        label: 'GitHub Repository',
        href: 'https://github.com/battulaharish2/ElectricalLF',
      },
      {
        label: 'Google Scholar',
        href: 'https://scholar.google.com/citations?user=jEgWu88AAAAJ&hl=en&oi=ao',
      },
    ],
  },
];
