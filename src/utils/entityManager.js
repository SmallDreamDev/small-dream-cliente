import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomCheckbox } from "./../components/CustomCheckbox";
import { v4 } from "uuid";

class AbstractManager {
    constructor() {
        this.headers = [];
    }

    getHeaders(headerCheckbox, handler) {
        let clone = [...this.headers];
        clone.unshift("#");
        clone.unshift(<Form.Check key={v4()} ref={headerCheckbox} type="checkbox" onChange={handler}/>);
        return clone;
    }

    createCheckbox(checkboxes, index){
        let checkbox = React.createRef();
        checkboxes.push(checkbox);
        let cb = <CustomCheckbox id={index} ref={checkbox}/>;
        return cb;
    }
}

class ActivityManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre", "Zona", "Categorías asociadas", "Materiales usados"];
    }

    process(entry, index, checkboxes) {
        const { _id, nombre, zona } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=actividades&id=${_id}`}>{index + 1}</Link></td>
                <td>{nombre}</td>
                <td>{zona}</td>
                <td><Link to={`/detalles?collection=actividades&id=${_id}`}>Ver categorías asociadas</Link></td>
                <td><Link to={`/detalles?collection=actividades&id=${_id}`}>Ver materiales usados</Link></td>
            </tr>
        );
    }
}

class CategoryManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre", "Actividades en esta categoría"];
    }

    process(entry, index, checkboxes) {
        const { _id, nombre } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=categorias&id=${_id}`}>{index + 1}</Link></td>
                <td>{nombre}</td>
                <td><Link to={`/detalles?collection=categorias&id=${_id}`}>Ver actividades</Link></td>
            </tr>
        );
    }
}

class ClientManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre y apellidos", "DNI", "Contacto", "Fecha de nacimiento", "Actividades en las que está apuntado"];
    }

    process(entry, index, checkboxes) {
        const { _id, nombre_completo, dni, contacto, fecha_nacimiento } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=clientes&id=${_id}`}>{index + 1}</Link></td>
                <td>{nombre_completo}</td>
                <td>{dni}</td>
                <td>{contacto}</td>
                <td>{fecha_nacimiento}</td>
                <td><Link to={`/detalles?collection=clientes&id=${_id}`}>Ver actividades</Link></td>
            </tr>
        );
    }
}

class InstructorManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre y apellidos", "DNI", "Contacto"];
    }

    process(entry, index, checkboxes) {
        const { _id, nombre_completo, dni, contacto } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=monitores&id=${_id}`}>{index + 1}</Link></td>
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
        this.headers = ["Descripción", "Precio", "Actividades que usan este material"];
    }

    process(entry, index, checkboxes) {
        const { _id, descripcion, precio } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=materiales&id=${_id}`}>{index + 1}</Link></td>
                <td>{descripcion}</td>
                <td>{precio}</td>
                <td><Link to={`/detalles?collection=materiales&id=${_id}`}>Ver actividades</Link></td>
            </tr>
        );
    }
}

class WorkshopManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["# Actividad", "# Monitor", "Fecha", "Hora inicio", "Hora fin", "Plazas totales", "# Modo de pago", "Clientes apuntados"];
    }

    process(entry, index, checkboxes) {
        const { _id, id_actividad, id_monitor, fecha, hora_inicio, hora_fin, plazas, id_modo_pago } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=talleres&id=${_id}`}>{index + 1}</Link></td>
                <td><Link to={`/detalles?collection=actividades&id=${id_actividad}`}>Ver actividad</Link></td>
                <td><Link to={`/detalles?collection=monitores${id_monitor}`}>Ver monitor</Link></td>
                <td>{fecha}</td>
                <td>{hora_inicio}</td>
                <td>{hora_fin}</td>
                <td>{plazas}</td>
                <td><Link to={`/detalles?collection=modosDePago${id_modo_pago}`}>Ver modo de pago</Link></td>
                <td><Link to={`/detalles?collection=talleres&id=${_id}`}>Ver clientes apuntados</Link></td>
            </tr>
        );
    }
}

function getCollectionName(guiName) {
    switch (guiName) {
        case "Actividades": return "actividades";
        case "Categorías": return "categorias";
        case "Clientes": return "clientes";
        case "Materiales": return "materiales";
        case "Monitores": return "monitores";
        case "Programaciones": return "talleres";
        default: return "";
    }
}

function getManager(collectionName) {
    switch (collectionName) {
        case "actividades": return new ActivityManager();
        case "categorias": return new CategoryManager();
        case "clientes": return new ClientManager();
        case "materiales": return new MaterialManager();
        case "monitores": return new InstructorManager();
        case "talleres": return new WorkshopManager();
        default: return null;
    }
}

export { getManager, getCollectionName };