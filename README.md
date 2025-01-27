# Bem vindo ao servidor da Contabilidade Hohl

## Descrição Geral

Este projeto consiste em uma API desenvolvida utilizando Elysia, TypeScript e Supabase, com o objetivo de receber dados de formulários submetidos por usuários e geri-los eficientemente. A API recebe informações como e-mail, nome, telefone e mensagem, garantindo que essas informações sejam manipuladas de forma segura e organizada.

## Objetivos do Projeto

1. **Coleta de Dados**: Receber dados enviados por usuários através de uma requisição POST, contendo informações essenciais como e-mail, nome, telefone e mensagem.

2. **Armazenamento de Dados**: Utilizar o Supabase como solução de banco de dados para armazenar as informações recebidas de forma segura e persistente. Isso facilita o acesso e manipulação futuros para análises ou relatórios.

3. **Envio de E-mails**: Automaticamente enviar e-mails de confirmação para usuários finais e notificar especialistas responsáveis assim que uma nova solicitação é recebida. Isso melhora a comunicação direta com o usuário e mantém os especialistas informados.

4. **Autenticação e Segurança**: Implementar a autenticação através de API Keys para assegurar que apenas clientes autorizados possam acessar os serviços da API, prevenindo inserções ou consultas indevidas no banco de dados.

5. **Rotatividade de Chaves e Segurança Adicional**: Assegurar que as API Keys utilizadas sejam geridas de forma segura, com possibilidade de rotatividade e expiração, para aumentar a segurança contra acessos não autorizados.

6. **Resiliência e Monitoramento**: Detectar e lidar com requisições maliciosas ou não autorizadas, garantindo que o sistema permaneça seguro e confiável.

## Tecnologias Utilizadas

- **Elysia**: Framework web para Node.js usado para criar a API, proporcionando um ambiente rápido e eficiente.

- **TypeScript**: Adotada para assegurar tipagem estática, reduzindo erros durante o desenvolvimento e melhorando a manutenção do código.

- **Supabase**: Um serviço de banco de dados hospedado que fornece armazenamento e consultas eficientes, permitindo o uso de autenticação e gerenciamento de dados de forma simplificada.

- **Nodemailer**: Biblioteca para manipulação de e-mails, utilizada para enviar notificações automáticas aos usuários e especialistas.

- **UUID**: Utilizado para gerar identificadores únicos para as chaves de API.

## Benefícios

- **Automatização e Eficiência**: As operações automatizadas, como envio de e-mails e gestão de dados, facilitam a operação do sistema e melhoram a experiência do cliente.
  
- **Segurança Avançada**: Com a implementação de API Keys e outros mecanismos de segurança, o sistema garante que apenas usuários autorizados tenham acesso, minimizando riscos de segurança.

- **Escalabilidade**: O uso do Supabase e Elysia permite que o sistema facilmente escale suas operações conforme o volume de dados e número de usuários cresce.

## Configuração de Variáveis de Ambiente

Para assegurar que todas as funcionalidades do sistema operem corretamente, é necessário configurar variáveis de ambiente que armazenam chaves e credenciais sensíveis. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```plaintext
SUPABASE_URL="https://vveciefndmmumrjrmcjx.supabase.co"
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZWNpZWZuZG1tdW1yanJtY2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MzExNDgsImV4cCI6MjA1MzUwNzE0OH0.OQN-uArON1WdfCTg0oWKJFXBuKtb5nXDvbjfBJnYCw8
EMAIL_USER=e24741662@gmail.com
EMAIL_PASSWORD=fpsevfuuohqqnlqh
```

## Instruções de Inicialização
1. **Instalar Dependências** : Use o `Bun` ou `npm` para instalar todas as dependências do projeto definidas no `package.json`.
```bash
bun install
```
2. **Configurar Variáveis de Ambiente** : Verifique se o arquivo `.env` está corretamente configurado com suas credenciais.
3. **Iniciar o Servidor** : Execute o comando `bun run dev` para iniciar o servidor.
```bash
bun run dev
```
4. **Testar a API** : Use uma ferramenta como Insomnia ou Postman para testar a API.
Este projeto traz uma solução eficaz e segura para gerenciamento de solicitações recebidas via formulários, garantindo que as informações dos usuários sejam processadas de maneira eficiente, segura e automatizada.