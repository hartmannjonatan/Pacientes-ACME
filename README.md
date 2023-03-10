# Exercício para a vaga de desenvolvedor na empresa Interprocess Gemed: Gerenciamento de pacientes da clínica ACME

Esse repositório contém o exercício de gerenciamento de pacientes, contendo os seguintes requisitos:
- Listar pacientes, com opção de filtro pelo nome;
- Cadastrar/editar paciente;
- Inativar paciente;

Dessa forma é avaliado além dos requisitos a organização do código, conhecimento de React, conhecimento web e conhecimento de git.

## :rocket: Começando
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins avaliativos.

### 📋Pré-requisitos
- [Composer](https://getcomposer.org/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [php vs. 8.0.8](https://www.php.net/downloads.php)
- [MySQL](https://www.mysql.com/downloads/)
- Acesse seu SGBD e crie um novo banco de dados com o nome "acme"

### :wrench: Instalação

Primeiro, acesse seu cmd e execute os seguintes comandos:
```
git clone https://github.com/hartmannjonatan/Pacientes-ACME.git
```

```
cd Pacientes-ACME
```

```
composer install
```
> Neste será necessário uma confirmação digitando "yes" e pressionando enter;

#### Configurando o banco de dados

Altere o arquivo ".env" na raiz do projeto editando a variável "DATABASE_URL" para:

```
mysql://link de acesso ao seu BD/acme"
```
(o link será algo como: "root@127.0.0.1:3306" se for local)

Abra o diretório raiz no terminal e execute o seguinte comando:
```
php bin/console doctrine:migrations:migrate
```

#### Instalando/iniciando dependências
Execute os seguintes comandos no terminal (no diretório principal do projeto):
```
yarn install
```

```
yarn encore dev
```

### :arrow_forward: Executando
Execute o seguinte comando no terminal:
```
symfony server:start
```
> Copie o link mostrado no terminal (algo como "https://127.0.0.1:8000") e abra-o no navegador

O sistema está pronto para ser testado!

