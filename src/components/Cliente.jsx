import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar}) => {
  const { nombre, empresa, correo, telefono, notas, id } = cliente;
  const navigate = useNavigate();
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">Correo: </span>{" "}
          {correo}{" "}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Teléfono: </span>{" "}
          {telefono}{" "}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="mt-3 bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>

        <button
          type="button"
          className="mt-3 bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => handleEliminar(id)}
        >
          Eliminar
        </button>

        <button
          type="button"
          className=" mt-3 bg-amber-600 hover:bg-amber-700 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
