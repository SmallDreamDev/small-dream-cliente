function handleUnexpectedError(error, callback) {
    if (error) {
        callback("Ha ocurrido un error inesperado");
    }
}

class APIManager {
    constructor() {
        this.sessionToken = "";
        this.baseURL = "http://localhost:8080";
        this.getToken = this.getToken.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
        this.logIn = this.logIn.bind(this);
        this.getEntityList = this.getEntityList.bind(this);
        this.getEntityDetails = this.getEntityDetails.bind(this);
        this.updateEntityData = this.updateEntityData.bind(this);
        this.getAttendance = this.getAttendance.bind(this);
        this.createEntity = this.createEntity.bind(this);
    }

    getToken() {
        return this.sessionToken;
    }

    logIn(user, password, callback) {
        this.sessionToken = "";

        let url = this.baseURL + "/usuario/identificarse";
        let body = {
            nombre_usuario: user,
            clave: password
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        };
        let _this = this;
        fetch(url, options).then(function (res) {
            if (res.status !== 200) {
                callback("El usuario o contraseña son incorrectos");
            } else {
                res.json().then(function (data) {
                    _this.sessionToken = data.token;
                    callback("");
                }, function (error) {
                    handleUnexpectedError(error, callback);
                });
            }
        }).catch(function (error) {
            handleUnexpectedError(error, callback);
        });

    }

    getEntityList(collectionName, callback) {
        let url = this.baseURL + "/" + collectionName + "/listar";
        let options = {
            method: "GET"
        };
        fetch(url, options).then(function (res) {
            if (res.status !== 200) {
                callback([]);
            } else {
                res.json().then(function (data) {
                    callback(data.entityList);
                }, function (error) {
                    callback([]);
                });
            }
        }).catch(function (error) {
            callback([]);
        });
    }

    deleteEntity(id, collectionName, callback) {
        let url = this.baseURL + "/" + collectionName + "/eliminar";
        let body = {
            entityId: id
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        };
        fetch(url, options).then(function (res) {
            if (res.status !== 200) {
                callback(false);
            } else {
                callback(true);
            }
        }).catch(function (error) {
            callback(false);
        });
    }

    getEntityDetails(id, collectionName, callback) {
        let url = this.baseURL + "/" + collectionName + "/detalles/" + id;
        let options = {
            method: "GET"
        };
        fetch(url, options).then(function (res) {
            if (res.status !== 200) {
                callback(null);
            } else {
                res.json().then(function (data) {
                    callback(data.entityDetails);
                }, function (error) {
                    callback(null);
                });
            }
        }).catch(function (error) {
            callback(null);
        });
    }

    updateEntityData(id, newEntity, collectionName, callback) {
        let url = this.baseURL + "/" + collectionName + "/actualizar";
        let body = {
            entityId: id,
            entity: newEntity
        };
        let options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        };
        fetch(url, options).then(function (res) {
            if (res.status !== 200) {
                if (res.status === 422) {
                    res.json().then(function (errorResponse) {
                        callback(false, errorResponse.validationErrorMessage);
                    }, function (error) {
                        callback(false, "Error inesperado: no se ha actualizado");
                    });
                } else {
                    callback(false, "Error inesperado: no se ha actualizado");
                }
            } else {
                callback(true, "Actualizado correctamente");
            }
        }).catch(function (error) {
            callback(false, "Error inesperado: no se ha actualizado");
        });
    }

    getAttendance(workshopId, callback) {
        let url = this.baseURL + "/asistencia/listar";
        let options = {
            method: "GET"
        };
        fetch(url, options).then(function (res) {
            if (res.status !== 200) {
                callback([], "Ha habido un error al conseguir esta información de la base de datos");
            } else {
                res.json().then(function (data) {
                    let attendances = data.entityList.filter(function (att) { return att.id_taller === workshopId; });
                    callback(attendances);
                }, function (error) {
                    callback([], "Ha habido un error al conseguir esta información de la base de datos");
                });
            }
        }).catch(function (error) {
            callback([], "Ha habido un error al conseguir esta información de la base de datos");
        });
    }

    createEntity(body, collectionName, callback) {
        let url = this.baseURL + "/" + collectionName + "/crear";
        let options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        };
        fetch(url, options).then(function (res) {
            if (res.status < 200 && res.status >= 400) {
                if (res.status === 422) {
                    res.json().then(function (errorResponse) {
                        callback(false, errorResponse.validationErrorMessage);
                    }, function (error) {
                        callback(false, "Error inesperado: no se ha creado la entrada");
                    });
                } else {
                    callback(false, "Error inesperado: no se ha creado la entrada");
                }
            } else {
                callback(true);
            }
        }).catch(function (error) {
            callback(false, "Error inesperado: no se ha creado la entrada");
        });
    }

    createEntityForForms(entityData, collectionName, callbackError, callbackSuccess) {
        let url = `${this.baseURL}/${collectionName}/crear`;
        let options = {
            method: "POST",
            body: JSON.stringify(entityData),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch(url, options).then(function (response) {
            return [response.status, response.json()];
        }).then(function (result) {
            result[1].then(function (jsonBody) {
                if (result[0] !== 201) {
                    callbackError(jsonBody);
                } else {
                    callbackSuccess(jsonBody);
                }
            });
        }).catch(function (error) {
            callbackError(error);
        });
    }
}

let apiManager = new APIManager();
export { apiManager };
