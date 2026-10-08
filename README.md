# Bethania Saraiva — Next.js

## Desenvolvimento

```bash
npm install
npm run dev
```

O site fica em `http://localhost:3000`.

## Editor visual

Abra `http://localhost:3000/desenvolvedor.html`. As alterações são mantidas no navegador durante a edição.

Ao clicar em **Aplicar no projeto Next**, selecione a raiz deste projeto (a pasta que contém `public`). O editor atualiza:

- `public/editor-overrides.css`, para layout e aparência;
- `public/site-content.json`, para textos e imagens.

Em navegadores sem acesso de gravação a pastas, use **Baixar configuração** e substitua esses dois arquivos manualmente dentro de `public`.

## Versão anterior

O site HTML original e todos os seus arquivos estão preservados em `legacy/`.

## SEO, Google e IAs

Domínio oficial usado pelo site:

```bash
https://psibethaniasaraiva.com.br
```

### 1. Configurar a URL do site

No ambiente de produção, configure a variável:

```bash
NEXT_PUBLIC_SITE_URL=https://psibethaniasaraiva.com.br
```

No projeto local, essa variável fica em `.env`.

### 2. Conferir arquivos publicados

Depois do deploy, abra estes links no navegador:

- `https://psibethaniasaraiva.com.br/`
- `https://psibethaniasaraiva.com.br/robots.txt`
- `https://psibethaniasaraiva.com.br/sitemap.xml`
- `https://psibethaniasaraiva.com.br/llms.txt`
- `https://psibethaniasaraiva.com.br/manifest.webmanifest`

Todos devem abrir sem erro.

### 3. Google Search Console

1. Acesse `https://search.google.com/search-console`.
2. Clique em **Adicionar propriedade**.
3. Escolha **Domínio** e informe `psibethaniasaraiva.com.br`.
4. O Google vai mostrar um registro TXT.
5. Entre no painel onde o domínio foi comprado e adicione esse TXT no DNS.
6. Volte ao Search Console e clique em **Verificar**.
7. Depois de verificado, vá em **Sitemaps**.
8. Envie `https://psibethaniasaraiva.com.br/sitemap.xml`.
9. Em **Inspeção de URL**, teste `https://psibethaniasaraiva.com.br/` e clique em **Solicitar indexação**.

### 4. Bing Webmaster Tools

1. Acesse `https://www.bing.com/webmasters`.
2. Entre com uma conta Microsoft.
3. Importe o site do Google Search Console ou adicione manualmente.
4. Envie o sitemap `https://psibethaniasaraiva.com.br/sitemap.xml`.

O Bing também alimenta parte das buscas usadas por assistentes e mecanismos de IA.

### 5. Google Perfil da Empresa

1. Acesse `https://business.google.com/`.
2. Crie ou reivindique o perfil de Bethania Saraiva.
3. Use a categoria principal **Psicóloga**.
4. Configure o endereço:
   `Rua Salgado Filho, 90, sala 501, Centro, Carlos Barbosa, RS, 95185-000`.
5. Adicione o telefone/WhatsApp: `+55 51 98060-2305`.
6. Adicione o site: `https://psibethaniasaraiva.com.br`.
7. Publique fotos reais do consultório e uma foto profissional.
8. Na descrição, mencione psicoterapia clínica presencial em Carlos Barbosa e atendimento online.

### 6. Instagram e links externos

No Instagram `@psibethaniasaraiva`, confira:

- link da bio apontando para `https://psibethaniasaraiva.com.br`;
- nome exibido com "Bethania Saraiva";
- bio mencionando "Psicóloga Clínica" e "Carlos Barbosa";
- endereço ou cidade consistentes com o site.

### 7. Consistência NAP

Mantenha sempre igual em todos os lugares:

- Nome: Bethania Saraiva
- Área: Psicóloga Clínica
- Endereço: Rua Salgado Filho, 90, sala 501, Centro, Carlos Barbosa, RS, 95185-000
- Telefone: +55 51 98060-2305
- Site: https://psibethaniasaraiva.com.br

Essa consistência ajuda muito na busca local.

### 8. Testes recomendados

Depois que o site estiver no ar, teste:

- `https://search.google.com/test/rich-results`
- `https://pagespeed.web.dev/`
- `https://validator.schema.org/`

Use a URL principal `https://psibethaniasaraiva.com.br/`.
