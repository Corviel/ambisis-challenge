Este é um projeto desafio criado com [Next.js](https://nextjs.org/).

# Guia para subir o projeto

> **Atenção! Este passo é obrigatório.**

Para subir o projeto corretamente você precisará ter o software [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado em sua máquina para fazer o uso do banco de dados.


## Passo a passo

### Prisma e banco de dados

Primeiro, copie o arquivo `.env.example` e renomei-o para `.env`. O [Prisma](https://www.prisma.io/) usará as informações dentro dele para conectar-se ao banco de dados.

Agora, utilize o Docker para subir o banco de dados rodando o comando `docker compose up -d` depois de ter o Docker aberto em sua máquina.

Agora seu banco de dados deve estar funcionando e acessível através da URL [localhost:3306](localhost:3306) 👌

### Next.js

Em seguida, instale as dependências do projeto rodando `npm install`

Após ter feito o último passo você precisará rodar comandos para criar e popular as tabelas do banco e gerar o instância do prisma que o projeto utiliza.

Referência: https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started

```
npx prisma migrate dev --name init

npx prisma db seed

npx prisma generate
```

Agora você pode optar por usar o servidor de desenvolvimento com o comando `npm run dev` ou criar a build do projeto e iniciar o servidor de "produção" com os comandos `npm run build` e `npm run start`

```bash
npm run dev
# ou
npm run build && npm run start
```

Abra [http://localhost:3000](http://localhost:3000) com o seu navegador para ver o resultado.