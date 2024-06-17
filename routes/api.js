const { spawn } = require('child_process');
const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const pythonProcess = spawn('python', ['../ai/ai.py', message]);

        let responseData = '';
        let responseSent = false; // Флаг, чтобы отслеживать, был ли ответ уже отправлен

        // Получение данных из stdout процесса Python
        pythonProcess.stdout.on('data', (data) => {
            responseData += data.toString();
        });

        // Обработка завершения процесса Python
        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
            if (!responseSent) {
                responseSent = true;
                res.send(responseData);
            }
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error from Python: ${data}`);
            if (!responseSent) {
                responseSent = true;
                res.status(500).send('Failed to generate response');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        if (!responseSent) {
            res.status(500).send('Failed to generate response');
        }
    }
});

module.exports = router;
