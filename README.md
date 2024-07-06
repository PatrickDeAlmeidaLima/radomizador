# Shuffle Files App

## Descrição

Este projeto é um script em Node.js que embaralha e renomeia arquivos em um diretório específico e seus subdiretórios recursivamente, a partir de uma data e hora especificada. O script verifica diariamente se a data limite foi atingida e, se sim, embaralha o conteúdo dos arquivos e renomeia-os com nomes randômicos.

## Pré-requisitos

- Node.js instalado
- NPM (Node Package Manager) instalado

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/PatrickDeAlmeidaLima/radomizador

2. **Navegue até o diretório do projeto:**

cd randomizador

3. **Instale as dependências necessárias:**

    ```bash
    npm install

4. ## **Configuração**

- Abra o arquivo random.js e configure os seguintes parâmetros conforme necessário:

- Diretório Base: O diretório a partir do qual o script começará a embaralhar arquivos. Atualmente, é configurado para o diretório do próprio script (__dirname).

    ```bash
    const baseFolderPath = __dirname; // Diretório base é o mesmo do script

- Data Limite: A data e hora após a qual o script deve começar a embaralhar arquivos. Substitua pela data e hora desejadas.

    ```bash
    const checkDate = new Date('2024-07-01T00:00:00'); // Substitua pela data limite

- Hora de Verificação: A hora do dia em que o script deve verificar a data e embaralhar arquivos (formato 24 horas).

    ```bash
    const checkHour = 10; // Hora do dia para checar (24h formato)

## Uso
1. Para iniciar o script, execute:

    ```bash
    npm start

O script irá:

- Verificar imediatamente se a data limite foi atingida.
- Se a data limite for atingida, ele irá embaralhar os arquivos e renomeá-los.
- Se a data limite ainda não tiver sido atingida, ele irá agendar a verificação diária para a hora especificada.

## Funcionalidades

- Gerar Nomes Randômicos para Arquivos: Utiliza identificadores únicos (UUID) para gerar nomes randômicos para os arquivos.
- Embaralhar Conteúdo dos Arquivos: Lê o conteúdo de cada arquivo, embaralha as linhas ou o conteúdo e escreve o conteúdo embaralhado de volta no arquivo.
- Ler Diretórios Recursivamente: Lê todos os arquivos e subdiretórios a partir do diretório base e aplica o embaralhamento a todos os arquivos encontrados.
- Agendamento Diário: Usa a biblioteca node-schedule para verificar a data e hora uma vez por dia e executar o embaralhamento conforme necessário.

## Estrutura do Projeto

- random.js: Script principal
- package.json: Configurações do projeto e dependências
- README.md: Documentação do projeto

### Dependências
- node-schedule: Para agendar tarefas em horários específicos.
- crypto: Para gerar nomes randômicos seguros para os arquivos.


Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.