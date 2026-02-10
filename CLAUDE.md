# NexoUVT - Convertidor Fiscal Inteligente

## Stack
- **Framework**: Astro 5 (SSG) + React Islands
- **Styling**: Tailwind CSS v4 (CSS-first config, no tailwind.config.js)
- **Deploy**: Vercel (static + serverless for /api/send-lead)
- **Email**: Resend

## Architecture
- Static HTML for all SEO content (Astro components)
- React islands only for interactive parts: converter (`client:load`) and lead banner (`client:visible`)
- All fiscal data centralized in `src/data/` - update UVT values there for new years
- Conversion functions are pure (no side effects) in `src/lib/conversion.ts`

## Key Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Data Updates (Annual)
To add a new year's UVT value:
1. Add entry to `src/data/uvt-config.ts` (first position in array = current year)
2. Update `src/data/sanciones-2026.ts` filename and data if needed
3. Update `src/data/topes-renta-2026.ts` filename and data if needed
4. JSON-LD in `src/components/seo/JsonLd.astro` references specific values

## Environment Variables
- `RESEND_API_KEY` - Required for lead capture email sending

## Design Tokens
Defined in `src/styles/global.css` using Tailwind v4 `@theme`:
- Primary: `#08D9D6` (cyan, matches NexoContable)
- Secondary: `#252A34`
- Font: Poppins

## Formatting Patterns
Uses same patterns as NexoContable: `Intl.NumberFormat('es-CO', {style:'currency', currency:'COP'})` in `src/lib/format.ts`
