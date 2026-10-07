# Enterprise React starter

Minimal Vite + React starter using `@poluru-labs/enterprise-design-system-react`. The app includes the design-system theme and toast providers, a starter view, and no application routes or demo data.

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Default dev server: http://127.0.0.1:5189
Preview server: http://127.0.0.1:4189

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |

## Structure

```text
src/
  App.jsx       Starter application surface
  App.css       Starter styles
  main.jsx      React entry point and global styles
  test/setup.js Test environment setup
```

Replace the starter view in `src/App.jsx` with your application UI. Add routes, components, data, and tests as the project grows.
