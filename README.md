# DSM-2026-1-P1-G3
Repositório do GRUPO 03 do Projeto Interdisciplinar do 1º semestre DSM 2026/1. Alunos Integrantes: Rafael Vinicius de Paula, Derik Silva Luis de Souza, Thales Augusto Bortolini Xavier


# Içougue — Marketplace de Açougues Online

> Plataforma web que conecta clientes aos melhores açougues da região, permitindo comprar carnes de qualidade com entrega em domicílio.

---

## Sobre o Projeto
Este projeto tem como objetivo demonstrar a capacidade técnica desenvolvida pelos alunos ao longo do primeiro semestre de 2026, no curso de Desenvolvimento de Software Multiplataforma da Fatec Franca.


O **Içougue** é um marketplace digital desenvolvido como **Projeto Interdisciplinar** nas disciplinas de Engenharia de Software I, Desenvolvimento Web I e Design Digital.

A plataforma permite que açougues cadastrem seus produtos e recebam pedidos online, enquanto clientes navegam pelo catálogo, adicionam itens ao carrinho e finalizam compras com diferentes formas de pagamento — tudo em uma interface moderna e responsiva.

---

## Funcionalidades

### Para o Cliente
- Navegação por açougues parceiros com nota, tempo de entrega e distância
- Catálogo de produtos com filtro por categoria
- Carrinho de compras com atualização em tempo real
- Checkout com 4 formas de pagamento: Cartão, Pix, Boleto e Dinheiro
- Cupom de desconto
- Avaliação de pedidos com nota por critérios

### Para o Açougue
- Painel de pedidos com status em tempo real (Novo → Em preparo → Em entrega → Entregue)
- Levantamento de estoque com filtros e exportação CSV
- Cadastro e gerenciamento de produtos com upload de foto
- Resumo de faturamento diário

### Geral
- Cadastro e login de usuários
- Termos de Uso
- Interface responsiva (desktop, tablet e mobile)

---

## Estrutura de Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Página inicial — hero, categorias, açougues e produtos em destaque |
| `acougue.html` | Página do açougue com produtos e mini-carrinho |
| `carrinho.html` | Carrinho de compras com resumo do pedido |
| `pagamento.html` | Checkout com endereço e formas de pagamento |
| `cadastro.html` | Cadastro de novo cliente |
| `login.html` | Login na conta |
| `levantamento.html` | Inventário de produtos do açougue |
| `cadastro-produto.html` | Formulário de cadastro de produto |
| `pedidos-acougue.html` | Painel de pedidos do açougue |
| `avaliacao.html` | Avaliação de pedido entregue |
| `termos.html` | Termos de Uso da plataforma |

---

## Tecnologias Utilizadas

- **HTML5** — estrutura semântica das páginas
- **CSS3** — estilização com variáveis CSS, flexbox, grid e responsividade
- **JavaScript (Vanilla)** — lógica de carrinho, renderização de produtos, filtros e navegação
- **Google Fonts** — tipografia: Playfair Display + Nunito

> Sem frameworks externos. Todo o código foi escrito do zero pelo grupo.

---

## Identidade Visual

| Elemento | Valor |
|---|---|
| Cor primária | `#C8102E` (vermelho) |
| Cor de destaque | `#F5A623` (âmbar) |
| Fundo | `#F7F7F5` (off-white) |
| Tipografia — Títulos | Playfair Display (serif) |
| Tipografia — Corpo | Nunito (sans-serif) |

---

## Organização do Repositório

```
içougue/
├── index.html
├── acougue.html
├── avaliacao.html
├── cadastro.html
├── cadastro-produto.html
├── carrinho.html
├── levantamento.html
├── login.html
├── pagamento.html
├── pedidos-acougue.html
├── termos.html
├── style.css
├── script.js
└── README.md
```

---

## Documentação

O projeto conta com um documento de especificação de sistema (formato RUP) contendo:

- Regras de Negócio (RN001–RN010)
- 15 Requisitos Funcionais com Requisitos Não Funcionais vinculados
- Matriz de Rastreabilidade RF × RN e RF × RF
- Modelo de Negócios Canvas

---

## Equipe

Derik Silva Luis de Sousa

Rafael Vinicius de Paula

Thales Augusto Bortolini Xavier

Tiago Luis de Sousa Junior

---

## Informações Acadêmicas

**Curso:** Desenvolvimento de Software Multiplataforma  
**Instituição:** [Fatec Franca]  
**Período:** 1º Semestre 2026
