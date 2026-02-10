# NexoUVT — Convertidor Fiscal UVT

Herramienta en linea para convertir UVT a pesos colombianos y viceversa con alertas fiscales inteligentes. Parte del [Ecosistema Nexo](https://cloution.cloud) desarrollado por **Cloution SAS**.

**Sitio**: [nexouvt.cloution.cloud](https://nexouvt.cloution.cloud)

## Funcionalidades

- Conversion bidireccional UVT a Pesos y Pesos a UVT
- Soporte multianual (2024, 2025, 2026)
- Alertas fiscales inteligentes (sanciones, topes, umbrales)
- Tabla de sanciones tributarias 2026
- Topes de renta personas naturales 2026
- Seccion FAQ con preguntas frecuentes
- Descarga PDF tabla de retencion en la fuente 2026 (lead magnet)
- Envio de email con Resend

## Stack

- **Framework**: Astro 5 (SSG) + React Islands
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **Deploy**: Vercel (static + serverless para /api/send-lead)
- **Email**: Resend (dominio cloution.cloud)

## Estructura

```
src/
├── components/
│   ├── converter/            # Componentes React del convertidor
│   │   ├── UvtConverter.tsx  # Orquestador principal
│   │   ├── ConversionInput.tsx # Campos bidireccionales
│   │   ├── CopyButtons.tsx   # Copiar resultados
│   │   ├── FiscalAlerts.tsx  # Alertas fiscales
│   │   └── YearSelector.tsx  # Selector de ano
│   ├── content/              # Secciones SEO (Astro)
│   │   ├── UvtExplanation.astro
│   │   ├── SancionesTable.astro
│   │   ├── TopesRenta.astro
│   │   └── FaqSection.astro
│   ├── layout/               # Header, Footer, CookieBanner
│   ├── lead/                 # LeadCaptureModal, LeadMagnetBanner
│   └── seo/                  # AdSlot, JsonLd
├── data/                     # Datos fiscales (UVT, alertas, sanciones, topes)
├── lib/                      # Utilidades (conversion, formato)
├── pages/
│   ├── index.astro           # Home
│   ├── privacidad.astro      # Politica de privacidad
│   └── api/send-lead.ts      # Endpoint Resend (serverless)
└── styles/
    └── global.css            # Tailwind v4 tokens
```

## Comandos

```bash
npm install      # Instalar dependencias
npm run dev      # Servidor de desarrollo
npm run build    # Build de produccion
npm run preview  # Preview local del build
```

## Variables de entorno

```
RESEND_API_KEY=re_xxxxx   # API key de Resend para envio de emails
```

## Datos fiscales

Los valores UVT se actualizan anualmente en `src/data/uvt-config.ts`:

| Ano  | Valor UVT  |
|------|------------|
| 2026 | $52.374    |
| 2025 | $49.799    |
| 2024 | $47.065    |

Para agregar un nuevo ano: actualizar `uvt-config.ts`, `sanciones-20XX.ts` y `topes-renta-20XX.ts`.

## Empresa

**Cloution SAS** — NIT 901.917.255-6
Calle 70 A # 21 - 34, Bogota, Colombia
contacto@cloutionsas.com
