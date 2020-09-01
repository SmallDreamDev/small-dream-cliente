import React from "react";

class AbstractManager {
    constructor() {
        this.headers = [];
    }

    getHeaders() {
        return [...this.headers].unshift("#");
    }
}

class ActivityManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre", "Zona"];
    }

    process(entry) {
        const { _id, nombre, zona } = entry;
        return (
            <tr>
                <td>{_id}</td>
                <td>{nombre}</td>
                <td>{zona}</td>
            </tr>
        );
    }
}

class CategoryManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre"];
    }

    process(entry) {
        const { _id, nombre } = entry;
        return (
            <tr>
                <td>{_id}</td>
                <td>{nombre}</td>
            </tr>
        );
    }
}

class ClientManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre y apellidos", "DNI", "Contacto", "Fecha de nacimiento"];
    }

    process(entry) {
        const { _id, nombre_completo, dni, contacto, fecha_nacimiento } = entry;
        return (
            <tr>
                <td>{_id}</td>
                <td>{nombre_completo}</td>
                <td>{dni}</td>
                <td>{contacto}</td>
                <td>{fecha_nacimiento}</td>
            </tr>
        );
    }
}

class InstructorManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre y apellidos", "DNI", "Contacto"];
    }

    process(entry) {
        const { _id, nombre_completo, dni, contacto } = entry;
        return (
            <tr>
                <td>{_id}</td>
                <td>{nombre_completo}</td>
                <td>{dni}</td>
                <td>{contacto}</td>
            </tr>
        );
    }
}

class MaterialManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Descripción", "Precio"];
    }

    process(entry) {
        const {_id, descripcion, precio} = entry;
        return (
            <tr>
                <td>{_id}</td>
                <td>{descripcion}</td>
                <td>{precio}</td>
            </tr>
        );
    }
}

class ScheduleManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["# Actividad", "# Monitor", "# Horario"];
    }

    process(entry) {
        const { _id, id_actividad, id_monitor, id_horario }
    }
}

function getManager(collectionName) {
    switch (collectionName) {
        case "actividades": return new ActivityManager();
        case "categorias": return new CategoryManager();
        case "clientes": return new ClientManager();
        case "materiales": return new MaterialManager();
        case "monitores": return new InstructorManager();
        case "programas": return new ScheduleManager();
        default: return null;
    }
}

function getCollectionName(guiName) {
    switch (guiName) {
        case "Actividades": return "actividades";
        case "Categorías": return "categorias";
        case "Clientes": return "clientes";
        case "Materiales": return "materiales";
        case "Monitores": return "monitores";
        case "Programaciones": return "programas";
        default: return "";
    }
}

export { getManager, getCollectionName }