import Interessado from "../Modelo/Interessados.js";

export default class InteressadoController{

    //Esta classe irá traduzir pedidos HTTP em 
    //comandos internos da aplicação
    //A nossa aplicação sabe gravar , atualizar, excluir e consultar Interessados
    // no banco de dados

    //Será necessario manipular requisições HTTP (GET, POST, PUT OU PATCH, DELETE)

    //CAMADA DE CONTROLE SERÁ ASSINCRONA 

    gravar(requisicao, resposta){

        //preparar o metodo gravar para produzir respostas no formato JSON
        resposta.type('application/json');

        //HTTP gravar um Interessado é enviar uma requisição do tipo POST
        //trazendo dados no formato JSON
       if(requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body; //extrair dados do corpo da requisição
            const nome = dados.nome;
            const tipo = dados.tipo;
            const cpf = dados.cpf;
            const cnpj = dados.cnpj;
            const plano= dados.plano;
            const func= dados.func;
            console.log("Dados:",dados);
            
            //pseudo validação nos dados   
            if (nome,tipo){
                const interessado = new Interessado(0, nome,tipo,cpf,cnpj,func,plano,func)
                interessado.gravar().then(()=>{
                    resposta.status(201);
                    resposta.json({
                        'status':true,
                        'mensagem': 'Interessado gravado  com sucesso!',
                        'codigo_interessado': interessado.cli_cod
                    })
                }).catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        'status':false,
                        'mensagem':'não foi possivel armazenar o interessado!' + erro.message
                    })
                });
            }
            else{
                resposta.status(400)
                resposta.json({
                    'status':false,
                    'mensagem': 'Por favor, informe usuário e senha de acesso!'
                })
            }

        }
       else{
           resposta.status(400);
           resposta.json({
                'status': 'Requisição inválida dentro da gravar!'
           })

       }



    }
    atualizar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === 'PATCH'|| requisicao.method === 'PUT') && requisicao.is('application/json')){
            const dados = requisicao.body; //extrair dados do corpo da requisição
            // o codigo será extraido da url, exemplo: http://localhost:3000/interessado/1 1 é o codigo
            const codigo = requisicao.params.id;
            if (codigo && codigo > 0){
                const interessado = new Interessado(codigo, dados.nome, dados.tipo, dados.cpf, dados.cnpj, dados.plano,1);
                console.log("Dados dentro da atualizar",dados);
                interessado.atualizar().then(()=>{
                    resposta.status(200);
                    resposta.json({
                        'status': true,
                        'mensagem': 'Interessado atualizado com sucesso!',

                    })
                }).catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        'status': false,
                        'mensagem': 'Não foi possivel atualizar o interessado!' + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    'status': false,
                    'mensagem': 'Informe o usuário e senha!'
                })
            }

        }
        else{
            resposta.status(405);
            resposta.json({
                'status': false,
                'mensagem': 'Requisição inválida!'
            })
        }

    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'DELETE'){
            //o codigo do interessado que será excluido será extraido da url
            const codigo = requisicao.params.id;
            if (codigo && codigo > 0){
                const interessado = new Interessado(codigo);
                interessado.excluir()
                .then(()=>{
                    resposta.status(200);
                    resposta.json({
                        'status':true,
                        'mensagem': 'Interessado excluido!',   

                    })
                })
                .catch((erro)=>{
                    resposta.status(500);
                    resposta.json({
                        'status':false,
                        'mensagem': 'Não foi possivel excluir!' + erro.message
                    })
                })
            }
            else{
                resposta.status(400);
                resposta.json({
                    'status': false,
                    'mensagem': 'Informe o usuarioo que deseja excluir!'

                })
            }
        }
        else{
            resposta.status(405);
            resposta.json({
                'status':false,
                'mensagem': 'Requisição inválida!'
            })
        }

    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'GET'){
            const termoDePesquisa = requisicao.params.id;
            console.log("ID DENTRO DA CONSULTAR:",termoDePesquisa);
            const interessado = new Interessado(0);
            interessado.consultar(termoDePesquisa)
            .then((interessados)=>{
                resposta.status(200);
                resposta.json(interessados);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    'status': false,
                    'mensagem': 'Não foi possivel consultar o interessado!' + erro.message

                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                'status':false,
                'mensagem': 'Requisição inválida! dentro da consultar'
            })
        }
        
    }
    consultar1(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'GET'){
            //const termoDePesquisa = requisicao.params.termo;
            const interessado = new Interessado(0);
            interessado.consultar1()
            .then((interessados)=>{
                resposta.status(200);
                resposta.json(interessados);
            })
            .catch((erro)=>{
                resposta.status(500);
                resposta.json({
                    'status': false,
                    'mensagem': 'Não foi possivel consultar o interessado!' + erro.message

                })
            })
        }
        else{
            resposta.status(405);
            resposta.json({
                'status':false,
                'mensagem': 'Requisição inválida! dentro da consultar'
            })
        }
        
    }
}   

