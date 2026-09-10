# Poluru Synth Studio · AI Synthetic Data Studio

Enterprise AI Synthetic Data Studio by [Poluru Labs](https://polurus.com). Generate high-fidelity synthetic datasets with mathematical differential privacy guarantees, automated PII/PHI redaction, Kolmogorov-Smirnov quality checks, correlation preservation matrices, and Train-on-Synthetic Test-on-Real (TSTR) machine learning utility benchmarks.

Brand primary color: `#05339C`  
Typography: Google Roboto & Open Sans

## Features

- **Interactive Generator Studio**: Live playground to synthesize domain datasets (Healthcare EHR, FinTech AML transactions, Omnichannel Retail Customer 360, IoT telemetry, Conversational LLM turns) with real-time progress simulation and live preview.
- **Differential Privacy & Privacy Guard**: Track $(\varepsilon, \delta)$ privacy budget consumption, enforce Laplace/Gaussian noise mechanisms, run empirical attack simulations (Membership Inference, Attribute Inversion, Singling Out, Linkage), and review HIPAA / GDPR / CCPA / EU AI Act certificates.
- **Statistical Quality & Fidelity Benchmarks**: Evaluate Kolmogorov-Smirnov test pass rates, Wasserstein distance, Jensen-Shannon divergence, Cramér's V associations, and multivariate correlation preservation heatmaps.
- **Train on Synthetic, Test on Real (TSTR)**: Machine learning utility parity reports comparing models trained on synthetic vs real data across XGBoost, LightGBM, Random Forest, Logistic Regression, and Deep Neural Nets.
- **Dataset Catalog & Deep Inspector**: Browse and inspect schemas, statistical summaries, live data samples featuring realistic Poluru entities (`Subbu Poluru`, `Dr. Subrahmanyam Poluru`, `Ananya Poluru`, `Poluru FinTech`, `Subbu Analytics`), and export in CSV, JSON, Parquet, or Python SDK code.
- **Automated Continuous Pipelines**: Scheduled batch synthesis and continuous streaming workers syncing sanitized synthetic data into Snowflake, BigQuery, and Cloudflare R2 object storage.
- **Schema Rules & Constraint Engine**: Enforce physiological domain rules, cross-column logic assertions, and custom regex masks with Luhn checksum validation.
- **Team & API Key Access**: Role-based access control and programmatic SDK tokens for team members (`Subbu Poluru`, `Subrahmanyam Poluru`, `Ananya Poluru`, `Vikram Subbu Poluru`, `Kiran Subbu`).

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Default dev server: [http://localhost:5194/synthetic-data/overview](http://localhost:5194/synthetic-data/overview)  
Preview server: [http://localhost:4194/synthetic-data/overview](http://localhost:4194/synthetic-data/overview)

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server (port 5194) |
| `npm test` | Run Vitest unit tests |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build (port 4194) |

## Stack

- **React 18** + **React Router 6**
- **Vite 5**
- **Bootstrap 5** + **Bootstrap Icons**
- **[`@poluru-labs/enterprise-design-system-react`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react)**
- **Google Fonts (Roboto & Open Sans)**
- **Vitest** + **Testing Library** + **jsdom**

