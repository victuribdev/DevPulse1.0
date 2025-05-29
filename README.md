# DevPulse

DevPulse é uma plataforma que analisa o perfil de desenvolvedores no GitHub, fornecendo insights valiosos sobre padrões de contribuição, hábitos de desenvolvimento e bem-estar do desenvolvedor.

## Funcionalidades

- Análise detalhada de contribuições no GitHub
- Métricas de produtividade, consistência e saúde mental
- Recomendações personalizadas
- Relatórios de atividade
- Visualização de tendências de desenvolvimento

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- Spring Security
- PostgreSQL
- Maven

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Chart.js

## Instalação e Uso

### Pré-requisitos
- Java 17 ou superior
- Node.js 18 ou superior
- PostgreSQL 12 ou superior
- Maven
- Conta no GitHub com token de acesso pessoal

### Backend

1. Clone o repositório
2. Configure o arquivo `application.properties` ou `application.yml` com suas credenciais:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/devpulse
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   github.token=seu_token_github
   ```

3. Execute o projeto:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Frontend

1. Instale as dependências:
   ```bash
   cd frontend
   npm install
   ```

2. Configure o arquivo `.env`:
   ```
   VITE_API_URL=http://localhost:8083/api
   ```

3. Execute o projeto:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

```
devpulse/
├── backend/                 # Aplicação Spring Boot
│   ├── src/
│   └── pom.xml
│
└── frontend/                # Aplicação React
    ├── src/
    ├── public/
    └── package.json
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 