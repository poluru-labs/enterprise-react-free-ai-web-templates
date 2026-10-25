# AI Supply Chain Control Tower

ChainPulse — monitor demand, shipments, supplier risk, and inventory on a light control tower powered by `@poluru-labs/enterprise-design-system-react`. Brand accent `#1A5276`, Roboto and Lato via Google Fonts.

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5205

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build (port 4205) |

## Routes

- `/tower/overview` — Network snapshot and region mix
- `/tower/demand` — Forecasts, spikes, and variance
- `/tower/shipments` — Lanes, modes, and ETAs
- `/tower/suppliers` — Vendor risk and reviews
- `/tower/inventory` — Regional coverage and DC health
- `/tower/settings` — Planning windows, floors, and exports

## Footer

Created by [Subrahmanyam Poluru](https://polurus.com). Built with [@poluru-labs/enterprise-design-system-react](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-react).
