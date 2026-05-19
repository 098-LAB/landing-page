---
description: Uso obrigatório de tokens de cor e tamanho do Tailwind
alwaysApply: true
globs:
  - "src/components/**"
  - "src/app/**"
---

# Objetivo
Proibir o uso de valores hardcoded para cores e tamanhos, garantindo consistência visual e fácil manutenção através de tokens definidos no Tailwind.

# Diretrizes
- **Nunca** usar valores literais (ex.: `#fff`, `#000`, `#1a1a1a`, `16px`, `24px`) diretamente no código ou classes customizadas.
- Usar **tokens do Tailwind** definidos no `tailwind.config.ts` ou variáveis CSS globais.
- Todos os espaçamentos, tamanhos de fonte, larguras e alturas devem vir de utilitários do Tailwind (`px-4`, `text-lg`, `w-6`, etc.).
- Todas as cores devem vir dos tokens configurados no Tailwind (`bg-primary`, `text-muted-foreground`, `border-border`, etc.).
- Caso precise de uma nova cor/tamanho que não exista, **adicionar no tema** (`tailwind.config.ts`) em vez de escrever hardcoded.

# Boas práticas
- Preferir classes utilitárias Tailwind (`text-sm`, `h-10`, `bg-primary`) a estilos inline.
- Utilizar `styles.ts` apenas para regras complexas que não possam ser representadas como classes Tailwind.
- Se usar variáveis CSS para temas, definir no `:root` e referenciar via Tailwind (`var(--primary)` etc.).

# Revisão
Antes de concluir o PR:
- Verificar se não existem cores hexadecimais, nomes de cor CSS (`red`, `blue` etc.) ou tamanhos fixos (`px`, `em`, `rem`) escritos manualmente.
- Garantir que todas as novas cores/tamanhos foram adicionadas ao sistema de design no `tailwind.config.ts` ou tema global.