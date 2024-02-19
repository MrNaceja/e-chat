
import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import initSocketIo from "./socket/index.ts";

const app = express();
const httpServer = createServer(app);

const projectDir = process.cwd()
const clientBuild = path.join(projectDir, 'client', 'build')
app.use(express.static(clientBuild))

app.get('/', (req, res) => {
   res.sendFile(path.join('src', 'app', 'index.html'), {
     root: clientBuild
   });
})

const PORT = 3000
httpServer.listen(PORT, () => {
   console.log(`Servidor rodando 🚀 - http://localhost:${PORT}`)
   initSocketIo(httpServer)
});