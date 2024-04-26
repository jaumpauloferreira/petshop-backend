import conectar from "./Conexao.js";
import Filhote from "../Modelo/Filhotes.js";

export default class FilhoteDAO {

    async gravar(filhote) {
        if (filhote instanceof Filhote) {
            const conexao = await conectar();
            const sql = `INSERT INTO filhotes (sal_tipo, sal_valor) VALUES (?, ?)`;
            const parametros = [filhote.sal_tipo, filhote.sal_valor];
        
            const [resultados] = await conexao.execute(sql, parametros);
            filhote.sal_cod = resultados.insertId; 
        }
    }

    async atualizar(filhote) {
        if (filhote instanceof Filhote) {
            const conexao = await conectar();
            const sql = `UPDATE filhotes SET sal_tipo = ?, sal_valor = ? WHERE sal_cod = ?`;
            const parametros = [filhote.sal_tipo, filhote.sal_valor, filhote.sal_cod];
    
            await conexao.execute(sql, parametros);
        }
    }

    async excluir(filhote) {
        if (filhote instanceof Filhote) {
            const conexao = await conectar();
            const sql = `DELETE FROM filhotes WHERE sal_cod = ?`;
            const parametros = [filhote.sal_cod];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(id) {
        const conexao = await conectar();
        const sql = `SELECT * FROM filhotes WHERE sal_cod = ?`;
        const [registros] = await conexao.execute(sql, [id]);
        
        const listaFilhotes = registros.map(registro => {
            return new Filhote(
                registro.sal_cod, 
                registro.sal_tipo, 
                registro.sal_valor
            );
        });

        return listaFilhotes;
    }

    async consultarTodos() {
        const conexao = await conectar();
        const sql = `SELECT * FROM filhotes`;
        const [registros] = await conexao.execute(sql);
        
        const listaFilhotes = registros.map(registro => {
            return new Filhote(
                registro.sal_cod, // Aqui deveria ser registro.sal_tipo
                registro.sal_tipo, // Aqui deveria ser registro.sal_valor
                registro.sal_valor // Aqui deveria ser registro.sal_valor
            );
        });
    
        return listaFilhotes;
    }
}
