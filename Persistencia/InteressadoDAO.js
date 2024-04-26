// InteressadoDAO.js

import conectar from "../Persistencia/Conexao.js";

import Interessado from "../Modelo/Interessados.js";


export default class InteressadoDAO {
  async gravar(interessado) {
    if (interessado instanceof Interessado) {
      const conexao = await conectar();
      let sql;
      let parametros;
      console.log("Tipo do Interessado:", interessado.cli_tipo);

      if (interessado.cli_tipo === "E") {
        sql = `INSERT INTO interessado (cli_nome,cli_tipo,cli_cnpj,cli_plano) VALUES (?,?,?,?)`;
        parametros = [
          interessado.cli_nome,
          interessado.cli_tipo,
          interessado.cli_cnpj,
          interessado.func_cod,
        ];
      } else if (interessado.cli_tipo === "C") {
        // Usando else if para garantir que um dos dois será executado
        sql = `INSERT INTO interessado (cli_nome,cli_tipo,cli_cpf,cli_plano) VALUES (?,?,?,?)`;
        parametros = [
          interessado.cli_nome,
          interessado.cli_tipo,
          interessado.cli_cpf,
          interessado.func_cod,
        ];
        // Correção de digitação para cli_cpf
      }
      console.log("Sql:", sql);
      console.log("parametros:", parametros);
      if (sql && parametros) {
        const [resultados] = await conexao.execute(sql, parametros);
        interessado.cli_cod = resultados.insertId; // Supondo que `cli_cod` é gerado automaticamente pelo banco e você quer armazenar este ID no objeto interessado. Isso depende do seu SGBD.
      } else {
        throw new Error("Tipo de interessado não definido corretamente.");
      }
    }
  }
  async atualizar(interessado) {
    if (interessado instanceof Interessado) {
      const conexao = await conectar();
      let sql; // Move a declaração para fora dos blocos if/else
      let parametros; // Move a declaração para fora dos blocos if/else

      if (interessado.cli_tipo === "E") {
        sql = `UPDATE interessado set cli_nome = ?, cli_tipo = ?, cli_cnpj = ?, cli_plano = ? where cli_cod = ?`;
        parametros = [
          interessado.cli_nome,
          interessado.cli_tipo,
          interessado.cli_cnpj,
          interessado.cli_plano,
          interessado.cli_cod,
        ];
        console.log("PARAMETROS DENTRO DA EMPRESA", parametros);
      } else {
        // Correção do nome do campo de 'cli_cnpf' para 'cli_cpf'
        sql = `UPDATE interessado set cli_nome = ?, cli_tipo = ?, cli_cpf = ?, cli_plano = ? where cli_cod = ?`;
        parametros = [
          interessado.cli_nome,
          interessado.cli_tipo,
          interessado.cli_cpf,
          interessado.cli_plano,
          interessado.cli_cod,
        ];
        console.log("PARAMETROS DENTRO DO INTERESSADO", parametros);
      }

      const [resultados] = await conexao.execute(sql, parametros);
    }
  }
  async excluir(interessado) {
    if (interessado instanceof Interessado) {
      const conexao = await conectar();
      const sql = `DELETE FROM interessado WHERE cli_cod = ?`;
      const parametros = [interessado.cli_cod];
      await conexao.execute(sql, parametros);
    }
  }

  async consultar(id) {
    const sql = `SELECT * FROM interessado WHERE cli_cod = ?`;
    const conexao = await conectar();
    const [registros] = await conexao.execute(sql, [id]);
    let listaInteressados = [];
    for (const registro of registros) {
      const interessado = new Interessado(
        registro.cli_cod,
        registro.cli_nome,
        registro.cli_tipo,
        registro.cli_cnpf,
        registro.cli_cnpj,
        registro.cli_plano,
        registro.cli_func_cod
      );
      listaInteressados.push(interessado);
    }
    return listaInteressados;
  }
  async consultar1() {
    const sql = `SELECT * FROM interessado;`;
    const conexao = await conectar();
    const [registros] = await conexao.execute(sql);
    let listaInteressados = [];
    for (const registro of registros) {
      const interessado = new Interessado(
        registro.cli_cod,
        registro.cli_nome,
        registro.cli_tipo,
        registro.cli_cpf,
        registro.cli_cnpj,
        registro.cli_plano,
        registro.func_cod
      );
      listaInteressados.push(interessado);
    }
    return listaInteressados;
  }
}
