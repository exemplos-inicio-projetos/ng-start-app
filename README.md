# Angular App

Sugestão de arquitetura para App Angular 7 (v 7.2.7).

Dar clone nesse Projeto e logo após `npm i` para instalar a última versão das dependências do app e iniciar o desenvolvimento.

## Development server

Digite `npm start` para começar. O browser será aberto automaticamente em `http://localhost:4200/`.

## HMR

Esse app está configurado para utilizar o HMR (Hot Module Reload) para recarregar apenas os arquivos alterados não fazendo o reload da aplicação toda, assim preservando o seu estado ao alterar arquivos.

* [Tutorial HMR](https://codinglatte.com/posts/angular/enabling-hot-module-replacement-angular-6/)

## Paths

Ao adicionar modulos certifique-se de adicionar seu caminho aos paths do arquivo `tsconfig.json` para simplificar os caminhos dos imports.

Reinicie sua IDE para certificar de que os paths serão reconhecidos.

```sh 
"paths": {
      "core/*": ["src/app/core/*"],
      "guards/*": ["src/app/guards/*"],
      "feature/*": ["src/app/modules/feature/*"],
      "shared/*": ["src/app/modules/shared/*"]
    }
```

## Proxy

Adicione os end-points da sua api no arquivo `proxy.conf.json` para evitar problemas com CORS (desenvolvimento apenas).

* [Fazendo o CORS seu amigo](https://www.hiago.me/2018/09/08/ionic-angular-fazendo-o-cors-seu-amigo/) - By Hiago.

```sh 
{
  "/api": {
    "target": "http://localhost:4200",
    "secure": false
  }
}
```

## Frameworks CSS

Neste projeto está sendo utilizado o sistema de grid do bootstrap, apenas ele, caso não queira utilizá-lo digite `npm rm bootstrap` e remova o import no arquivo `angular.json`.

* [Docs Bootstrap Grid](https://getbootstrap.com/docs/4.1/layout/grid/) - Grid Docs.

O `normalize.scss` também está sendo utilizado é um reset de alguns elementos que não funcionam corretamente em alguns browsers entre outros, para mais detalhes visitar o repositório.

* [Normalize](https://github.com/necolas/normalize.css) - Repostório normalize.css.

```sh
  "styles": [
    "src/styles.scss",
    "./node_modules/bootstrap/dist/css/bootstrap-grid.min.css",
    "./node_modules/normalize.css/normalize.css"
  ],
```

## Estrutura de Arquivos

As pastas estão organizadas desta maneira, cada módulo tem suas pastas `component`, `directives`, `models`, `pages`, `pipes` e `services`, dentro das pastas existe um arquivo `index.ts` para exportar os arquivos da pasta para deixar mais simples muitos imports.

Em especial o `feature` module que é um modulo referência para criar outros também tem uma pasta `modules` caso seu feature módule cresça muito você ir modularizando ele também.

Quanto ao `shared` module não deixei para que houvesse rotas nele por não fazer sentido porém caso seja util para você basta ter como base o `feature` module para criar as rotas.

```sh 
📦src
 ┣ 📂app
 ┃ ┣ 📂animations
 ┃ ┣ 📂core
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂directives
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂pipes
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┣ 📜core.component.ts
 ┃ ┃ ┗ 📜core.module.ts
 ┃ ┣ 📂guards
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂directives
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂pipes
 ┃ ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜auth-routing.module.ts
 ┃ ┃ ┃ ┣ 📜auth.guard.ts
 ┃ ┃ ┃ ┗ 📜auth.module.ts
 ┃ ┣ 📂interceptors
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂feature
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂directives
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📂modules
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂pipes
 ┃ ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜feature-root.component.html
 ┃ ┃ ┃ ┣ 📜feature-root.component.scss
 ┃ ┃ ┃ ┣ 📜feature-root.component.ts
 ┃ ┃ ┃ ┣ 📜feature-routing.module.ts
 ┃ ┃ ┃ ┗ 📜feature.module.ts
 ┃ ┃ ┗ 📂shared
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂directives
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂pipes
 ┃ ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┗ 📜shared.module.ts
 ┃ ┣ 📜app-routing.module.ts
 ┃ ┣ 📜app.component.ts
 ┃ ┗ 📜app.module.ts
 ┣ 📂assets
 ┣ 📂environments
 ┣ 📂themes
```