import React, { useState, useEffect } from "react";
//components
import Mensaje from "../components/Mensaje";
//assets
import CerrarBtn from "../../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimaModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      const { nombre, cantidad, categoria, fecha, id } = gastoEditar;
      setNombre(nombre);
      setCantidad(cantidad);
      setCategoria(categoria);
      setFecha(fecha);
      setId(id);
    }
  }, []);

  const ocultarModal = () => {
    setModal(false);
    setAnimaModal(false);
    setGastoEditar({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    guardarGasto({ nombre, cantidad, categoria, id });
    setModal(false);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} onClick={ocultarModal} />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : ""}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade Nombre del Gasto"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          ></input>
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto: ej 300"
            value={cantidad}
            onChange={(e) => {
              setCantidad(e.target.value);
            }}
          ></input>
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
          type="submit"
        ></input>
      </form>
    </div>
  );
};

export default Modal;
