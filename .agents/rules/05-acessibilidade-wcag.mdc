---
description: Boas práticas de acessibilidade para desenvolvimento de componentes
alwaysApply: true
globs:
  - "src/components/**"
  - "src/app/**"
---

# Objetivo
Garantir que todos os componentes desenvolvidos considerem critérios de acessibilidade desde a concepção, seguindo as diretrizes do **WCAG 2.0**.

# Diretrizes Gerais
- **Semântica**: utilizar elementos HTML adequados para o contexto (ex.: `<button>` para ações, `<nav>` para navegação).
- **Teclado**: todos os elementos interativos devem ser acessíveis por teclado (`Tab`, `Enter`, `Space`) e manter foco visível.
- **ARIA**: usar atributos `aria-*` apenas quando necessário, evitando redundância com semântica nativa.
- **Contraste**: seguir as proporções mínimas do WCAG 2.0 (nível AA: 4.5:1 para texto normal, 3:1 para texto grande).
- **Leitores de tela**: garantir que o conteúdo importante seja lido corretamente (uso de `aria-label`, `alt` em imagens, e headings `<h1>`...`<h6>` bem estruturados).
- **Feedback**: mudanças de estado visíveis e perceptíveis para todos os usuários (ex.: mensagens de erro devem ser legíveis por leitores de tela e visualmente destacadas).

# Diretrizes específicas para UI com Tailwind + shadcn/ui
- Usar componentes shadcn baseados em Radix sempre que possível, pois já possuem acessibilidade embutida.
- Ao estender componentes, preservar atributos de acessibilidade já presentes.
- Garantir foco e estado ativo visíveis usando classes Tailwind (`focus-visible:outline`, `ring` etc.).
- Validar contraste usando ferramentas de verificação durante o desenvolvimento.

# Revisão
- Antes de concluir um PR, verificar:
  - Navegação completa via teclado.
  - Textos alternativos para imagens e ícones.
  - Estrutura semântica coerente.
  - Contraste conforme WCAG 2.0 AA.