// interessado.js

import InteressadoDAO from "../Persistencia/InteressadoDAO.js";

export default class Interessado {
    #cli_cod;
    #cli_nome;
    #cli_tipo;
    #cli_cpf;
    #cli_cnpj;
    #cli_plano;
    #func_cod

    constructor(cli_cod = 0, cli_nome = "",cli_tipo = "", cli_cpf = "",cli_cnpj="",cli_plano="",func_cod="") {
        this.#cli_cod = cli_cod;
        this.#cli_nome = cli_nome;
        this.#cli_tipo = cli_tipo;
        this.#cli_cpf = cli_cpf;
        this.#cli_cnpj = cli_cnpj ;
        this.#cli_plano = cli_plano; 
        this.#func_cod = func_cod;
        

    }




    get cli_cod() {
        return this.#cli_cod;
    }

    set cli_cod(novocli_cod) {
        this.#cli_cod = novocli_cod;
    }
//-----------------------------
get cli_plano() {
    return this.#cli_plano;
}

set cli_plano(novocli_plano) {
    this.#cli_plano = novocli_plano;
}



//==============================
    get func_cod() {
        return this.#func_cod;
    }

    set func_cod(novofunc_cod) {
        this.#func_cod = novofunc_cod;
    }
    //Interessado
    
    get cli_cpf() {
        return this.#cli_cpf;
    }

    set cli_cpf(novocli_cpf) {
        this.#cli_cpf = novocli_cpf;
    }
    //------------------------

    
    get cli_cnpj() {
        return this.#cli_cnpj;
    }
    set cli_cnpj(novocli_cnpj) {
        this.#cli_cnpj = novocli_cnpj;
    }
    
    //---------------------------
    get cli_nome() {
        return this.#cli_nome;
    }

    set cli_nome(novocli_nome) {
        this.#cli_nome = novocli_nome;
    }

    get cli_tipo() {
        return this.#cli_tipo;
    }

    set cli_tipo(novacli_tipo) {
        this.#cli_tipo = novacli_tipo;
    }

    async gravar() {
        const dao = new InteressadoDAO();
        await dao.gravar(this);
    }
    async atualizar() {
        const dao = new InteressadoDAO();
        await dao.atualizar(this);
    }

    async excluir() {
        const dao = new InteressadoDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa) {
        const dao = new InteressadoDAO();
        return await dao.consultar(termoDePesquisa);
    }
    async consultar1() {
        const dao = new InteressadoDAO();
        return await dao.consultar1();
    }

    toString() {
        return `Interessado código: ${this.#cli_cod} - cli_nome: ${this.#cli_nome} - cli_tipo: ${this.#cli_tipo}  - cli_cpf: ${this.cli_cpf} -  cli_cnpj: ${this.cli_cnpj} -  cli_plano: ${this.#cli_plano} -  func_cod: ${this.#func_cod}`;
    }

    toJSON() {
        return {
            "cli_cod": this.#cli_cod,
            "cli_nome": this.#cli_nome,
            "cli_tipo": this.#cli_tipo,
            "cli_cpf": this.#cli_cpf,
            "cli_cnpj": this.#cli_cnpj,
            "cli_plano": this.#cli_plano,
            "func_cod": this.#func_cod
        };
    }
}
