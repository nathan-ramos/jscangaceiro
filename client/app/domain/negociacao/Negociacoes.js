class Negociacoes {
    constructor(funcAtualizaView) {
        this._negociacoes = [];
        this._funcAtualizaView = funcAtualizaView;
        Object.freeze(this);
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._funcAtualizaView(this);
    }
 
    esvazia(){
        this._negociacoes.length = 0;
        this._funcAtualizaView(this);
    }
 
    paraArray() {
        return [].concat(this._negociacoes);
    }


    get volumeTotal(){
        
        return this._negociacoes.reduce(
            (total,negociacao)=> total + negociacao.volume,0);
    }

}