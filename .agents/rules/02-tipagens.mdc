---
description: Declaração de Tipagens
alwaysApply: true
---

# Padrão
- **Componentes e Páginas:** arquivo `types.ts` no mesmo diretório do componente/página.
- **Models/DTOs/Globais:** `[nome].types.ts` em camelCase conforme contexto.

## Exemplos (componentes e páginas)
flow/login/components/SpecificComponent1/
index.tsx
styles.ts
types.ts

flow/login/
index.tsx
layout.tsx
styles.ts
types.ts

## Model
src/domain/model/
health.types.ts
userRoles.types.ts

- Para contextos com variações: usar subpastas.

src/domain/model/booking-flow/
health.types.ts
exam.types.ts

## DTO
- Prefixar com método/endpoint.

infrastrucure/hooks/product/dtos/
getProductList.types.ts

## Routes
- `src/lib/routes/types.ts` concentra as tipagens de rotas.
- Definir helpers tipados para paths (ver paths.ts).