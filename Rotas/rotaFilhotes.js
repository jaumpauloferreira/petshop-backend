// filhotesRota.js

import { Router } from 'express';
import FilhoteController from '../Controle/FilhoteController.js';

const rotaFilhotes = new Router();
const filhoteCtrl = new FilhoteController();

rotaFilhotes
    .get('/:id', filhoteCtrl.consultar)  
    .get('/', filhoteCtrl.consultarTodos)
    .post('/', filhoteCtrl.gravar)
    .put('/:id', filhoteCtrl.atualizar)
    .delete('/:id', filhoteCtrl.excluir);

export default rotaFilhotes;
