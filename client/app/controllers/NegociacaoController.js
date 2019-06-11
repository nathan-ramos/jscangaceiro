class NegociacaoController{

    constructor(){
        const $ = document.querySelector.bind(document);
       
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._negociacoes = new Negociacoes(model =>{
            console.log(this);
            this._negociacoesView.update(model);
        });
        
        this._negociacoesView = new NegociacoesView('#negociacoes');
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagem);
    
    }

    adiciona(event){
        event.preventDefault();
        this._negociacoes.adiciona(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
        this._limparFormulario();
    }

    apaga(){
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

    _criarNegociacao(){
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limparFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus()
    }
    
}