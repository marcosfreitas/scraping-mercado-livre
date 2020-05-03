# Pré-requisitos

Este projeto está equipado com docker-compose, para utilizar instale-o.

Importe esta coleção de requests no Postman.

https://www.getpostman.com/collections/4fa70ef729d0bf6056b7

# Execução

Rode o projeto executando `docker-compose down; docker-compose up --build --remove-orphans` na raiz do repositório clonado.

Dando tudo certo, o projeto estará rodando com este endereço base: **http://localhost:8081/v1** e este endpoint disponível:

- GET **/products** : lista de dados buscados