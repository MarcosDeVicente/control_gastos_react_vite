import React from "react";
//components
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtros,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtros ? (
        <>
          <h2>
            {gastos.length ? "Gastos" : "No hay gastos en esta categoría"}
          </h2>
          {gastosFiltrados.map((gasto) => {
            return (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>
          {gastos.map((gasto) => {
            return (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
