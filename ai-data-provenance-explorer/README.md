# Data Provenance Explorer (ProvDesk)

Lineage graphs as tables, dataset versions, custody events, and audit trails — light theme **`#2391FF`**, Roboto and Lato, powered by `@poluru-labs/enterprise-design-system-react`.

## Run

```bash
npm install
npm run dev
```

http://127.0.0.1:5211 → `/prov/overview`

## Routes

- `/prov/overview` — Registry snapshot and activity
- `/prov/datasets` — Versions and hashes
- `/prov/lineage` — Upstream / downstream edges
- `/prov/custody` — Zone handoffs
- `/prov/audit` — Immutable log
- `/prov/settings` — Retention and notifications

Footer: [Subrahmanyam Poluru](https://polurus.com) · [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react)
