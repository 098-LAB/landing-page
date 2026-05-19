---
description: Estrutura de pastas para componentes, páginas/telas e fluxos
alwaysApply: true
---

# Objetivo
Aplicar padrão de subpastas para **componentes escopados** e **fluxos**.

# Componentes escopados
- Quando um componente é usado exclusivamente por uma página/tela ou por um "componente maior", ele deve ficar em `components/` **dentro** do contexto.
- Cada componente escopado cria sua própria pasta: `ComponentName/` com `index.tsx`, `styles.ts` e `types.ts`.

## Exemplos
MeuComponente/
└─ components/
├─ SpecificComponent1/
│  ├─ index.tsx
│  ├─ styles.ts
│  └─ types.ts
└─ SpecificComponent2/
├─ index.tsx
├─ styles.ts
└─ types.ts
└─ index.tsx
└─ styles.ts
└─ types.ts

sign-in/
└─ components/
├─ SpecificComponent1/
├─ SpecificComponent2/
└─ index.tsx
└─ styles.ts
└─ types.ts

# Páginas/Telas de fluxos
- **React Web (Next.js App Router)**: subpasta `pages/` dentro do fluxo, cada passo possui sua subpasta com `page.tsx`, `types.ts` e `styles.ts`.

## Web (Next.js)
sign-up/
└─ pages/
├─ sign-up-step-01/
└─ sign-up-step-02/