// é uma micro apliacação express que se encarrega de processar
//requisições em uma determinado endpoint

import {Router} from 'express';
import InteressadoController from '../Controle/InteressadoController.js';


const rotaInteressado = new Router();
const cliCtrl = new InteressadoController();

rotaInteressado
.get('/:id', cliCtrl.consultar)  // ROTA PADRÃO ESTA CONSULTADO USAURIO PASSANDO ID POR URL
.get('/', cliCtrl.consultar1) // Consultar todos Interessados por padrão;
.post('/', cliCtrl.gravar) // ALTERAR A ROTA DE GRAVAR PARA GRAVAR O USUARIO
.put('/:id', cliCtrl.atualizar)
.patch('/:id', cliCtrl.atualizar)
.delete('/:id', cliCtrl.excluir);

export default rotaInteressado;

