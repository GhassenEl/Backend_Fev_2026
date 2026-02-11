// fi west package.json kont 3amel start 3al fichier server 3ala hathaka routes ma5dmoch
// 5ater 9a3ed ta3mel listen 3ala server e5er

// server-auto-port.js
// const express = require('express');

// function startServer(port) {
//     const app = express();
//     app.use(express.json());

//     app.get('/', (req, res) => {
//         res.send(`Serveur sur port ${port}`);
//     });

//     const server = app.listen(port, () => {
//         console.log(` PORT ${port} OK: http://localhost:${port}`);
//     });

//     server.on('error', (err) => {
//         if (err.code === 'EADDRINUSE') {
//             console.log(` Port ${port} occupé, essai suivant...`);
//             startServer(port + 1);
//         }
//     });
// }

// startServer(5000);
