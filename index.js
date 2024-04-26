import express from "express";
import rotaInteressado from "./Rotas/rotaInteressado.js";
import rotaFilhotes from "./Rotas/rotaFilhotes.js";
import cors from 'cors';

const host = '0.0.0.0'; 
const porta = 3000;

const app = express();
app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/interessados', rotaInteressado);
app.use('/filhotes', rotaFilhotes);

app.listen(porta, host, ()=> {
    console.log(`Servirdor rodando em http://${host}:${porta}`);
})
