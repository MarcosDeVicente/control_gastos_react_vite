import { useState, useEffect } from "react";
//components
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros";
//assets
import IconoNuevoGasto from "../img/nuevo-gasto.svg";
//helpers
import { generarId } from "./helpers";

function App() {
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem("presupuesto") ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimaModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  //filtros
  const [filtros, setFiltros] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  //reset App

  useEffect(() => {
    if (filtros) {
      //filtrar
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtros
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtros]);
  //fin de filtros

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimaModal(true);
      }, 300);
    }
  }, [gastoEditar]);

  //Local Storage
  useEffect(() => {
    Number(localStorage.setItem("presupuesto", presupuesto ?? 0));
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto") ?? 0);
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);
  //Fin Local Storage

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimaModal(true);
    }, 300);
  };

  const eliminarGasto = (id) => {
    const nuevosGastos = gastos.filter((gasto) => gasto.id !== id);
    setGastos(nuevosGastos);
  };

  const guardarGasto = (nuevoGasto) => {
    if (nuevoGasto.id) {
      const gastosActualizados = gastos.map((item) =>
        item.id === nuevoGasto.id ? nuevoGasto : item
      );
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      nuevoGasto.id = generarId();
      nuevoGasto.fecha = Date.now();
      setGastos([...gastos, nuevoGasto]);
    }
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      ></Header>
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtros={filtros} setFiltros={setFiltros}></Filtros>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtros={filtros}
              gastosFiltrados={gastosFiltrados}
            ></ListadoGastos>
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            ></img>
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimaModal={setAnimaModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
