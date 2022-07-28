import { useNavigate, useParams } from "react-router-dom";

const VerCliente = () => {
  const {id} = useParams();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Cliente</h1>
      <p className="mt-3">
        Llena los siguientes campos para registrar a un cliente
      </p>
    </>
  );
};

export default VerCliente;
