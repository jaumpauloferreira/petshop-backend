import FilhoteDAO from "../Persistencia/FilhoteDAO.js";

export default class Filhote {
    #sal_cod;
    #sal_tipo;
    #sal_valor;

    constructor(sal_cod,sal_tipo, sal_valor) {
        this.#sal_cod = sal_cod
        this.#sal_tipo = sal_tipo;
        this.#sal_valor = sal_valor;
    }

    get sal_cod() {
        return this.#sal_cod;
    }

    set sal_cod(novoSalCod) {
        this.#sal_cod = novoSalCod;
    }

    get sal_tipo() {
        return this.#sal_tipo;
    }

    set sal_tipo(novoSalTipo) {
        this.#sal_tipo = novoSalTipo;
    }

    get sal_valor() {
        return this.#sal_valor;
    }

    set sal_valor(novoSalValor) {
        this.#sal_valor = novoSalValor;
    }

    async gravar() {
        const dao = new FilhoteDAO();
        await dao.gravar(this);
    }
   
    toJSON() {
        return {
            "sal_cod": this.#sal_cod,
            "sal_tipo": this.#sal_tipo,
            "sal_valor": this.#sal_valor
        };
    }
}
