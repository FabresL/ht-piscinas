# HT Piscinas

Site institucional da **HT Piscinas**, empresa de limpeza e manutenção de piscinas em Porto Alegre e Região Metropolitana. O objetivo é apresentar os serviços, mostrar trabalhos realizados, exibir os produtos à venda e facilitar o pedido de orçamento pelo WhatsApp.

🔗 **Site:** https://fabresl.github.io/ht-piscinas/

---

## Conteúdo

### Página principal (`index.html`)

- **Cabeçalho fixo** com logo e menu de navegação (Início, Serviços, Orçamento, Sobre/Contato e Loja de Produtos).
- **Hero** com chamada principal e botão direto para o WhatsApp.
- **Carrossel "Piscinas que já cuidamos"** com fotos reais das piscinas, em loop contínuo, com setas, indicadores e gesto de arrastar.
- **Serviços:**
  - Manutenção de Piscinas
  - Limpeza de Piscinas
  - Manutenção de Motores de Piscinas
- **Orçamento:** formulário que monta a mensagem e abre o WhatsApp já preenchida.
- **Sobre/Contato (rodapé):** responsável, telefone/WhatsApp, e-mail, Instagram (@htpiscinas\_), área de atendimento e créditos do desenvolvedor.

### Loja de Produtos (`loja.html`)

- **Vitrine** com produtos para tratamento de piscinas (cloro, algicida, clarificante, elevador de pH e fita teste), cada um com selo de categoria, características e botão de consulta pelo WhatsApp.
- **Filtro por categoria:** Cloro, Algicida e clarificante, Ajuste e teste.
- **Atendimento:** card de ajuda para quem não sabe qual produto escolher.
- **Orçamento de produtos** pelo WhatsApp.
- **Onde estamos:** mapa do Google Maps com o endereço da loja.

### Em todas as páginas

- Botão flutuante de WhatsApp.
- Favicon com as iniciais "HT".

---

## Tecnologias

| Tecnologia               | Uso                                                                    |
| ------------------------ | ---------------------------------------------------------------------- |
| **HTML5**                | Estrutura semântica das páginas                                        |
| **CSS3**                 | Estilização (custom properties, Flexbox, Grid, gradientes e animações) |
| **JavaScript (vanilla)** | Menu mobile, carrossel, filtro da loja, formulário de orçamento e mapa |
| **Google Fonts**         | Tipografia Sora                                                        |
| **Google Maps**          | Mapa da loja (iframe, com suporte opcional à Maps JavaScript API)      |
| **WhatsApp (wa.me)**     | Links de contato e envio de orçamentos                                 |
| **SVG**                  | Ícones e favicon                                                       |
| **GitHub Pages**         | Hospedagem                                                             |

Sem frameworks ou bibliotecas externas.

---

## Estrutura

```
index.html   página principal
loja.html    loja de produtos
style.css    estilos
script.js    interações
assets/      logo, favicon e imagens
```

---

Desenvolvido por **Lorenzo Fabres** — [GitHub @FabresL](https://github.com/FabresL)
