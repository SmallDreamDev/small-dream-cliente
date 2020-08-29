function handleUnexpectedError(error, callback){
    if(error){
        callback("Ha ocurrido un error inesperado");
    }
}

class APIManager {
    constructor(){
        this.sessionToken = "";
        this.getToken = this.getToken.bind(this);
    }

    getToken(){
        return this.sessionToken;
    }

    logIn(user, password, callback){
        this.sessionToken = "";
        
        let url = "http://localhost:8080/usuario/identificarse";
        let body = {
            nombre_usuario : user,
            clave : password
        };
        let options = {
           method : "POST",
           body : JSON.stringify(body),
           headers: {
               "Content-Type" : "application/json"
           }
        };
        let _this = this;
        fetch(url, options).then(function(res) {
            if(res.status !== 200){
                callback("El usuario o contraseña son incorrectos");
            }else{
                res.json().then(function(data) {
                    _this.sessionToken = data.token;
                    callback("");
                }, function(error){
                    handleUnexpectedError(error, callback);
                });
            }
        }).catch(function(error) {
            handleUnexpectedError(error, callback);
        });
        
    }
}

let apiManager = new APIManager();
export { apiManager };