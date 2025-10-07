# FastWork Backend

Backend Spring Boot para o sistema FastWork.

## Como executar

1. Certifique-se de ter o Java 17+ e Maven instalados
2. Execute o comando:
```bash
mvn spring-boot:run
```

Ou use o script:
```bash
run.bat
```

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/register` - Cadastrar usuário

#### Login - Exemplo de requisição:
```json
{
  "email": "admin@fastwork.com",
  "password": "123456"
}
```

#### Registro - Exemplo de requisição:
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "123456",
  "wantToAdvertise": true,
  "telefone": "11999999999",
  "regiao": "São Paulo, SP",
  "habilidades": "React, JavaScript",
  "descricao": "Desenvolvedor Frontend"
}
```

## Credenciais de teste
- **Admin**: admin@fastwork.com / 123456
- **Contratante**: maria@fastwork.com / 123456
- **Profissional**: joao@fastwork.com / 123456

## Banco de dados
- Usa H2 em memória para desenvolvimento
- Console H2: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: (vazio)

## Estrutura das Tabelas
- **Profissional**: Usuários que oferecem serviços
- **Contratante**: Usuários que contratam serviços
- **Avaliacoes**: Avaliações dos profissionais
- **Denuncias**: Denúncias contra profissionais
- **Favoritos**: Profissionais favoritados pelos contratantes

O backend roda na porta 8080 e tem CORS habilitado para http://localhost:5173