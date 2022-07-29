import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario"


const EditarCliente = () => {
  
  const [cliente, setCliente] = useState({});
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } 
      
      catch (error) {
        console.log(error);
      }

      setTimeout(() =>{
        setCargando(false);
      }, 500)

    };

    obtenerClienteAPI();
  }, []);

  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>   
        {cliente?.nombre ? (
          <div>
            <p className="mt-3">Llena los campos a editar</p>
            <Formulario cliente={cliente} cargando={cargando}/>
          </div>
        ) : (<p className=" mt-10 uppercase font-bold text-lg text-blue-900">No se encuentra ese cliente</p>)}
    </>
  );
};

export default EditarCliente;
