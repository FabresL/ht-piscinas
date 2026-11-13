# HT Piscinas — Site Institucional

Site institucional da **HT Piscinas** (limpeza e manutenção de piscinas e de motores em Porto Alegre e Região Metropolitana). Objetivo: apresentar os serviços, mostrar piscinas reais e levar o cliente ao WhatsApp.

## Como rodar
HTML, CSS e JavaScript puros, sem dependências: abra `index.html` no navegador.
Opcional (servidor local): `python -m http.server 8000` e acesse http://localhost:8000

## Estrutura
```
index.html   página principal (início, carrossel, serviços, contato)
loja.html    vitrine de produtos (abre em nova aba)
style.css    estilos mobile first (#1d5271 e #fff)
script.js    menu mobile, carrossel (autoplay, setas, pontos, swipe), fallback da logo
assets/      favicon.svg (HT) + imagens reais
```

## Imagens (já incluídas em `assets/`)
| Arquivo | Uso |
|---|---|
| `logo.png` | Logo branca com fundo transparente (header) |
| `piscina-1.jpg` … `piscina-4.jpg` | Carrossel (para mais fotos, duplique `<figure>` no `index.html`) |
| `produto-*.jpg` | Vitrine em `loja.html` (duplique `<article class="produto">`) |

Sem `logo.png`, o header mostra "HT Piscinas" em texto. O favicon já usa apenas "HT".

## Contato configurado
WhatsApp: https://wa.me/5551997576515 · E-mail: htpservicos@gmail.com

Desenvolvido por Lorenzo Fabres — [GitHub @FabresL](https://github.com/FabresL)

## Google Maps (loja)
Em `script.js`, preencha `CONFIG.mapsApiKey` (chave da Maps JavaScript API) e `CONFIG.loja` (lat/lng). Sem chave, a página mostra um espaço reservado.

## Orçamento
O formulário abre o WhatsApp com a mensagem pronta (número em `CONFIG.whatsapp`). Instagram: https://www.instagram.com/htpiscinas_/
