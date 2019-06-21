/*Criando módulo para que as propriedadesos 
e métodos privados não sejam acessados.

A classe é retornada para que a mesma possa ser acessada

no escopo global.

*/
    const stores = ['negociacoes'];
    let connection = null;
    let close = null;

  export class ConnectionFactory {

        static getConnection() {
            return new Promise((resolve, reject) => {
                if (connection) return resolve(connection);

                const openRequest = indexedDB.open('jscangaceiro', 3);
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    connection = e.target.result;

                    close = connection.close.bind(connection);
                    connection.close = () =>{
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };
                    resolve(e.target.result);
                };

                openRequest.onerror = e => {
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
        static closeConnection(){
            if(connection){
                close();
            }
        }

    }
