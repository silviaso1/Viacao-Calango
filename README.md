# Viação Calango

Bem-vindo ao projeto **Viação Calango**, um sistema desenvolvido para gerenciar as operações da Viação Calango. Este projeto inclui tanto o **front-end** quanto o **back-end**, com o **PHP** no lado do servidor e **MySQL** como banco de dados para armazenar as informações necessárias. O sistema foi projetado para fornecer uma interface simples e eficiente para gerenciar os dados da empresa, como motoristas, veículos e itinerários.

## 🚀 Tecnologias Utilizadas

O projeto é dividido entre o front-end e o back-end, utilizando as seguintes tecnologias:

- **Front-end**:  
  - **HTML5**: Estrutura da página.
  - **CSS3**: Estilo e layout responsivo.
  - **JavaScript**: Funcionalidades interativas e dinâmicas.

- **Back-end**:  
  - **PHP**: Processamento e manipulação de dados no servidor.
  - **MySQL**: Banco de dados para armazenamento de informações.
  
Com isso, garantimos uma experiência de usuário fluída, combinando um design simples e intuitivo com um sistema robusto de gerenciamento de dados.

## 🔧 Pré-requisitos

Antes de começar, você precisará ter algumas ferramentas instaladas em seu computador:

- **PHP**: Certifique-se de que você tenha a versão 7.x ou superior instalada. Você pode baixar o PHP [aqui](https://www.php.net/downloads).
  
- **Servidor web**: Pode ser o Apache, Nginx ou qualquer outro servidor que suporte PHP. O mais comum é o uso do XAMPP ou WAMP para ambientes locais.
  
- **PHPMYADMIN**: O banco de dados utilizado neste projeto. É necessário ter um servidor MySQL em funcionamento ou utilizar algum serviço de banco de dados online.

## 📂 Como Clonar o Repositório

1. Abra o terminal (ou prompt de comando) em seu computador.
2. Execute o comando abaixo para clonar o repositório para o seu diretório local:

    ```bash
    git clone https://github.com/silviaso1/Viacao-Calango.git
    ```

3. Após o clone, navegue até a pasta do projeto com o comando:

    ```bash
    cd viacao-calango
    ```

Pronto! Agora você tem uma cópia do repositório no seu computador e pode começar a configurar o ambiente.

## ⚙️ Configuração do Banco de Dados

1. **Criação do Banco de Dados:**

   - Acesse o MySQL e crie um novo banco de dados. Você pode fazer isso pelo terminal do MySQL ou por uma ferramenta gráfica como o **phpMyAdmin**.
   - O nome do banco de dados pode ser **viacao_calango** ou qualquer outro nome que preferir, mas será necessário alterar o arquivo de configuração para refletir isso.

   Para criar o banco, execute o seguinte comando SQL no MySQL:

    ```sql
    CREATE DATABASE viacao_calango;
    ```

2. **Importando o Esquema de Tabelas:**

   - Na pasta do projeto, você encontrará uma pasta chamada `database/` contendo o arquivo `schema.sql`. Este arquivo contém as instruções necessárias para criar as tabelas no banco de dados.
   - Importe este arquivo no seu banco de dados usando o seguinte comando:

    ```bash
    mysql -u root -p viacao_calango < database/schema.sql
    ```

    **Obs:** Lembre-se de substituir `root` pelo nome de usuário e fornecer a senha do MySQL, se necessário.

3. **Configuração do Arquivo de Conexão**

   - Dentro da pasta `config/`, localize o arquivo `db_config.php`. Neste arquivo, você deverá configurar as credenciais do seu banco de dados.

    Exemplo de configuração:

    ```php
    <?php
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root'); // Alterar para seu usuário do MySQL
    define('DB_PASSWORD', ''); // Alterar para sua senha
    define('DB_DATABASE', 'viacao_calango'); // Nome do banco de dados
    ?>
    ```

    Certifique-se de que os valores correspondem ao seu ambiente local.

## 🚀 Como Executar o Projeto

Com a configuração do banco de dados concluída, siga os seguintes passos para rodar o projeto:

1. **Iniciar o Servidor Local**

   Se você estiver utilizando o **XAMPP** ou **WAMP**, basta colocar o código fonte do projeto na pasta de servidores local (por exemplo, `htdocs` no XAMPP ou `www` no WAMP). Isso permite que você acesse o projeto através do navegador.

   Se preferir usar o PHP embutido, navegue até o diretório do projeto e execute o seguinte comando:

   ```bash
   php -S localhost:8000
