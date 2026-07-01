# 🏆 PredictSF Ranking MVP

Uma página estática, moderna e responsiva para exibir o ranking do PredictSF. Desenvolvida com HTML5, CSS3, JavaScript ES6 e Tailwind CSS via CDN.

## 📋 Visão Geral

Este é um MVP totalmente estático, sem dependências de backend, banco de dados ou frameworks. A página usa uma lista JSON embutida no `index.html` como fonte única para exibir o ranking de forma elegante e responsiva.

**Stack utilizado:**
- HTML5 (semântico)
- CSS3 (moderno e responsivo)
- JavaScript ES6 embutido no `index.html`
- Tailwind CSS (via CDN)
- Google Fonts (Poppins e Inter)

## 📁 Estrutura do Projeto

```
/ranking
│
├── index.html          # Página principal, dados e lógica do ranking
└── README.md           # Este arquivo
```

## 🎨 Design

**Paleta de cores:**
- Background: `#07162A` (azul escuro)
- Card: `#102340` (azul mais claro)
- Borda: `#1E4B82` (azul médio)
- Azul principal: `#2F80FF` (azul vibrante)
- Texto: `#FFFFFF` (branco)
- Texto secundário: `#A9B6C9` (cinza azulado)
- Medalhas: `#F5C542` (ouro), `#C8CED8` (prata), `#CD7F32` (bronze)

**Tipografia:**
- Títulos: Poppins (600, 700)
- Conteúdo: Inter (400, 500, 600)

**Características:**
- Card centralizado com largura máxima de 700px
- Totalmente responsivo (desktop e mobile)
- Hover suave com transição de 200ms
- Animação de fade na entrada
- Rolagem suave (scroll behavior)

## 🚀 Como Usar

### Estrutura dos dados do ranking

A lista JSON embutida no `index.html`, dentro de `<script type="application/json" id="rankingData">`, deve conter um array de objetos com os seguintes campos:

```json
[
  {
    "id": 1,
    "name": "Nome do Jogador",
    "avatar": "A",
    "points": 187
  }
]
```

**Campos obrigatórios:**
- `id` (number): Identificador único
- `name` (string): Nome do jogador
- `avatar` (string): Inicial do nome (1 caractere)
- `points` (number): Pontuação

**Observação importante:** O arquivo não precisa estar ordenado. A página automaticamente ordena os jogadores por pontuação (decrescente) e calcula as posições.

### Atualizar o Ranking

1. Abra o arquivo `index.html`
2. Procure por `<script type="application/json" id="rankingData">`
3. Atualize os dados dos jogadores (adicione, remova ou modifique)
4. Salve o arquivo
5. Recarregue a página no navegador

Os dados serão carregados automaticamente e a lista será renderizada com as novas posições.

### Executar Localmente

Para testar localmente, você precisa servir os arquivos com um servidor HTTP (não pode abrir `index.html` diretamente do arquivo):

**Opção 1: Python 3**
```bash
python -m http.server 8000
```

**Opção 2: Node.js (http-server)**
```bash
npx http-server
```

**Opção 3: Live Server (VS Code)**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

Acesse `http://localhost:8000` no navegador.

## 📱 Responsividade

- **Desktop:** Lista centralizada com largura máxima de 700px
- **Mobile:** Cards ocupam praticamente toda a largura (com padding lateral)
- **Sem barra horizontal:** Totalmente responsivo em qualquer resolução

## 🌐 Deploy no Cloudflare Pages

### Requisitos
- Conta no Cloudflare
- Repositório Git (GitHub, GitLab, ou Gitea)

### Passos

1. **Faça push do código para um repositório Git:**
   ```bash
   git add .
   git commit -m "Initial commit: PredictSF Ranking MVP"
   git push origin main
   ```

2. **Acesse o Cloudflare Dashboard:**
   - Vá para https://dash.cloudflare.com
   - Navegue até "Pages"
   - Clique em "Create a project"

3. **Conecte seu repositório:**
   - Selecione seu provedor de Git
   - Autorize o Cloudflare a acessar seus repositórios
   - Selecione o repositório `ranking-PredictSF`

4. **Configure o build:**
   - Build command: deixe vazio (não há build necessário)
   - Build output directory: `/` (raiz do projeto)

5. **Deploy:**
   - Clique em "Save and Deploy"
   - O site será publicado automaticamente em `https://<seu-projeto>.pages.dev`

### Atualizações Automáticas

Cada vez que você fizer push para o branch `main`, o Cloudflare Pages automaticamente:
- Detecta as mudanças
- Faz redeploy do site
- Seu ranking será atualizado em minutos

## 🔧 Desenvolvimento

### Modularidade do JavaScript

O JavaScript embutido em `index.html` é organizado em funções limpas e bem documentadas:

- `init()` - Lê os dados JSON embutidos na página e inicializa o ranking
- `sortPlayers()` - Ordena jogadores por pontuação
- `createPlayerCard()` - Cria elemento HTML do card
- `renderRanking()` - Renderiza a lista completa

### Boas Práticas

- ✅ HTML semântico
- ✅ Sem duplicação de código
- ✅ Comentários descritivos
- ✅ Variáveis e funções com nomes claros
- ✅ Tratamento de erros
- ✅ Responsivo com CSS moderno
- ✅ Performance otimizada
- ✅ Compatibilidade com navegadores modernos

## 🎯 Performance

- **Sem dependências externas** (exceto Tailwind e Google Fonts via CDN)
- **Tamanho reduzido** (< 50KB total)
- **Carregamento rápido** (sem assets pesados)
- **Zero latência de API** (dados estáticos)

## 🌟 Recursos

- ✨ Animações suaves e elegantes
- 🏅 Medalhas para top 3 posições
- 📊 Avatares circulares com gradiente
- 💫 Hover effects premium
- 📱 Design responsivo perfeito
- ♿ Semântica acessível

## 📝 Exemplo de Uso

### Adicionar um novo jogador

1. Abra `index.html` e procure por `rankingData`
2. Adicione um novo objeto ao array:

```json
{
  "id": 7,
  "name": "Carlos",
  "avatar": "C",
  "points": 128
}
```

3. Salve e recarregue a página

### Atualizar pontos

Simplesmente modifique o valor de `points` no JSON embutido em `index.html`:

```json
{
  "id": 1,
  "name": "Caleb",
  "avatar": "C",
  "points": 195  // Pontuação atualizada
}
```

A página automaticamente recalculará o ranking.

## ⚠️ Notas Importantes

1. **Atualize apenas o JSON embutido no `index.html`:** ele é a fonte única do ranking
2. **Não confie na ordem do JSON:** a página sempre ordena por pontuação
3. **ID é apenas identificador:** não é usado para ordenação
4. **Avatar deve ser 1 caractere:** recomendado usar a inicial do nome

## 🤝 Contribuições

Este é um MVP pronto para produção. Melhorias futuras podem incluir:
- Animação ao trocar posições
- Filtros ou busca
- Histórico de pontuações
- Temas (dark/light)

## 📄 Licença

Este projeto é de código aberto e livre para uso.

---

**Desenvolvido com ❤️ para PredictSF**