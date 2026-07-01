# 🏆 PredictSF Ranking MVP

Página estática, moderna e responsiva para exibir o ranking geral do PredictSF. O MVP não usa backend, banco de dados, framework ou etapa de build: os dados são carregados diretamente do arquivo `ranking.json`.

## Stack

- HTML5 semântico
- CSS3 organizado
- JavaScript ES6
- Tailwind CSS via CDN
- Google Fonts: Poppins para títulos e Inter para conteúdo

## Estrutura

```text
/ranking
│
├── index.html      # Página principal e estilos do MVP
├── app.js          # Carregamento, ordenação e renderização do ranking
├── ranking.json    # Dados estáticos dos jogadores
└── README.md       # Documentação do projeto
```

## Como funciona

Ao abrir a página em um servidor estático, o JavaScript executa o seguinte fluxo:

1. Busca o arquivo `ranking.json`.
2. Valida se o conteúdo é um array.
3. Ordena os jogadores por `points` em ordem decrescente.
4. Calcula as posições dinamicamente a partir da lista ordenada.
5. Renderiza todos os cards com medalhas para o Top 3.

> A posição nunca é lida do JSON. Ela sempre é calculada no navegador com base na pontuação atual.

## Formato do JSON

O arquivo `ranking.json` deve conter um array de jogadores neste formato:

```json
[
  {
    "id": 1,
    "name": "Caleb",
    "avatar": "C",
    "points": 187
  },
  {
    "id": 2,
    "name": "Lucas",
    "avatar": "L",
    "points": 181
  },
  {
    "id": 3,
    "name": "Pedro",
    "avatar": "P",
    "points": 178
  }
]
```

### Campos

- `id`: identificador único do jogador.
- `name`: nome exibido no card.
- `avatar`: inicial exibida no avatar circular.
- `points`: pontuação usada para ordenar o ranking.

## Como atualizar o ranking

1. Abra o arquivo `ranking.json`.
2. Adicione, remova ou edite jogadores.
3. Atualize o valor de `points` sempre que a pontuação mudar.
4. Salve o arquivo e publique novamente, se estiver em produção.

A lista pode ficar em qualquer ordem dentro do JSON, pois a interface sempre ordena por pontuação automaticamente.

## Rodando localmente

Por usar `fetch()` para carregar `ranking.json`, rode os arquivos com um servidor estático local:

```bash
python3 -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

Também é possível usar qualquer servidor estático moderno, como Live Server no VS Code ou o preview do Cloudflare Pages.

## Publicação no Cloudflare Pages

1. Envie os arquivos para um repositório Git.
2. No painel da Cloudflare, acesse **Workers & Pages**.
3. Crie um novo projeto do Pages e conecte o repositório.
4. Configure:
   - **Build command:** deixe vazio.
   - **Build output directory:** `/`.
5. Faça o deploy.

Como não existe build, o Cloudflare Pages publicará diretamente os arquivos estáticos da raiz do projeto.

## Design e UX

- Fundo azul escuro `#07162A`.
- Card central premium com largura máxima de `700px`.
- Visual inspirado em Apple + Sofascore.
- Cards responsivos sem barra horizontal.
- Hover suave com transição de `200ms`.
- Animação de fade na entrada da lista.
- Medalhas para 1º, 2º e 3º lugares.
- Pontuação alinhada à direita.

## Manutenção

A lógica principal fica em funções pequenas no `app.js`:

- `loadRanking()`
- `sortPlayers()`
- `renderRanking()`
- `createPlayerCard()`

Isso facilita alterações futuras sem adicionar dependências ou complexidade desnecessária.
