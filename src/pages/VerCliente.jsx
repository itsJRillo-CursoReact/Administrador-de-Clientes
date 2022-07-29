import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});

  const [cargando, setCargando] = useState(true);

  const { id } = useParams();
  const { nombre, empresa, correo, telefono, notas } = cliente;

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:3000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() =>{
        setCargando(false);
      }, 500)

    };

    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner/>
  ) : (
    <div>
      {Object.keys(cliente).length === 0 ? (
        <p>No hay Resultados</p>
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">Ver Cliente</h1>
          <p className="mt-3 mb-10">Información del cliente</p>

          {nombre && (
            <p className="text-xl mt-3">
              <span className="text-gray-600 uppercase font-bold">
                {" "}
                Nombre:{" "}
              </span>
              {nombre}
            </p>
          )}

          {correo && (
            <p className="text-xl mt-3">
              <span className="text-gray-600 uppercase font-bold">
                {" "}
                Correo:{" "}
              </span>
              {correo}
            </p>
          )}

          {telefono && (
            <p className="text-xl mt-3">
              <span className="text-gray-600 uppercase font-bold">
                {" "}
                Teléfono:{" "}
              </span>
              {telefono}
            </p>
          )}
          {empresa && (
            <p className="text-xl mt-3">
              <span className="text-gray-600 uppercase font-bold">
                {" "}
                Empresa:{" "}
              </span>
              {empresa}
            </p>
          )}

          {notas && (
            <p className="text-xl mt-3">
              <span className="text-gray-600 uppercase font-bold">
                {" "}
                Notas:{" "}
              </span>
              {notas}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VerCliente;
