import Filhote from "../Modelo/Filhotes.js";
import FilhoteDAO from "../Persistencia/FilhoteDAO.js";
const filhoteDAO = new FilhoteDAO();

export default class filhoteController {

    async gravar(requisicao, resposta) {
        try {
            const dados = requisicao.body;
            const novaFilhote = new Filhote(0,dados.tipo, dados.valor);
            await novaFilhote.gravar();

            resposta.status(201).json({
                status: true,
                mensagem: 'Filhote gravada com sucesso!',
                idFilhote: novaFilhote.sal_cod
            });
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: 'Erro ao gravar filhote: ' + erro.message
            });
        }
    }

    async atualizar(requisicao, resposta) {
        try {
            const dados = requisicao.body;
            const idFilhote = requisicao.params.id;
            console.log("ID DA FILHOTES",idFilhote);
            console.log("Dados da filhote atualizada:",dados);
            const filhoteAtualizada = new Filhote(0,dados.tipo, dados.valor);
            filhoteAtualizada.sal_cod = idFilhote;
            
            const filhoteDAO = new FilhoteDAO();
            await filhoteDAO.atualizar(filhoteAtualizada);

            resposta.status(200).json({
                status: true,
                mensagem: 'Filhote atualizada com sucesso!'
            });
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: 'Erro ao atualizar filhote: ' + erro.message
            });
        }
    }

    async excluir(requisicao, resposta) {
        try {
            const idFilhote = requisicao.params.id;
            console.log("ID DENTRO DA EXCLUIR",idFilhote);

            const filhoteDAO = new FilhoteDAO();
            const filhoteAtualizada = new Filhote(idFilhote);
            await filhoteDAO.excluir(filhoteAtualizada);

            resposta.status(200).json({
                status: true,
                mensagem: 'Filhote excluída com sucesso!'
            });
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: 'Erro ao excluir filhote: ' + erro.message
            });
        }
    }

    async consultar(requisicao, resposta) {
        try {
            const idFilhote = requisicao.params.id;
            const filhoteDAO = new FilhoteDAO();
            const filhote = await filhoteDAO.consultar(idFilhote);

            resposta.status(200).json(filhote);
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: 'Erro ao consultar filhote: ' + erro.message
            });
        }
    }

    async consultarTodos(requisicao, resposta) {
        try {
            const filhoteDAO = new FilhoteDAO();
            const filhotes = await filhoteDAO.consultarTodos();

            resposta.status(200).json(filhotes);
        } catch (erro) {
            resposta.status(500).json({
                status: false,
                mensagem: 'Erro ao consultar todas as filhotes: ' + erro.message
            });
        }
    }
}
