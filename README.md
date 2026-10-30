Markdown
# 📚 Sistema de Biblioteca - API REST (NestJS + SQLite)

API modular desenvolvida com **NestJS**, **TypeORM** e **SQLite** (`better-sqlite3`) para gerir uma biblioteca escolar ou universitária, garantindo portabilidade local e conformidade com regras de negócio estritas.

---

## 🚀 Como Rodar o Projeto e o Banco de Dados

### Pré-requisitos
* **Node.js** (versão 18 ou superior recomendada)
* **npm** (gerenciador de pacotes do Node)

### Passo a Passo

1. **Instalar as dependências:**
   No terminal, na raiz do projeto, execute:
   ```bash
   npm install
Iniciar a aplicação em modo de desenvolvimento:

Bash

npm run start:dev

Nota sobre a Base de Dados: O ficheiro da base de dados (database.sqlite) será gerado automaticamente na raiz do projeto assim que a aplicação iniciar, através do sincronismo do TypeORM.

A API estará disponível em: http://localhost:3000

📋 Lista de Endpoints
👤 Autores (/autores)
GET /autores - Lista todos os autores

POST /autores - Regista um novo autor

GET /autores/:id - Obtém os detalhes de um autor específico

DELETE /autores/:id - Remove um autor do sistema

📂 Categorias (/categorias)
GET /categorias - Lista todas as categorias

POST /categorias - Regista uma nova categoria

GET /categorias/:id - Obtém os detalhes de uma categoria

DELETE /categorias/:id - Remove uma categoria

📖 Livros (/livros)
GET /livros - Lista todos os livros cadastrados

POST /livros - Cadastra um novo livro (vinculado a Autor e Categoria)

GET /livros/:id - Obtém os dados de um livro específico

DELETE /livros/:id - Remove um livro do sistema

🧑 Leitores (/leitores)
GET /leitores - Lista todos os leitores registados

POST /leitores - Cadastra um novo leitor (com validação de matrícula e e-mail únicos)

GET /leitores/:id - Obtém os dados de um leitor

DELETE /leitores/:id - Remove um leitor

🔄 Empréstimos (/emprestimos)
GET /emprestimos - Lista todos os empréstimos ativos e históricos

POST /emprestimos - Regista a realização de um novo empréstimo (valida disponibilidade de exemplares e pendências do leitor)

GET /emprestimos/:id - Detalha um empréstimo específico

PATCH /emprestimos/:id/devolver - Regista a devolução de um livro (calcula eventuais multas por atraso)

DELETE /emprestimos/:id - Remove o registo de um empréstimo

<img width="6399" height="3745" alt="modelo" src="https://github.com/user-attachments/assets/6773bb76-de90-4d81-8505-54058e3d7f79" />

