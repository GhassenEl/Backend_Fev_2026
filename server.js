// server-auto-port.js
const express = require('express');

function startServer(port) {
    const app = express();
    app.use(express.json());
    
    app.get('/', (req, res) => {
        res.send(`✅ Serveur sur port ${port}`);
    });
    
    const server = app.listen(port, () => {
        console.log(`✅ PORT ${port} OK: http://localhost:${port}`);
    });
    
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`❌ Port ${port} occupé, essai suivant...`);
            startServer(port + 1);
        }
    });
}

startServer(5000);