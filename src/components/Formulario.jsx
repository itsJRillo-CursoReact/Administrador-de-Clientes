import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = yup.object().shape({
    nombre: yup
      .string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),

    empresa: yup.string().required("El nombre de la empresa es obligatorio"),

    correo: yup
      .string()
      .email("Correo no válido")
      .required("El correo es obligatorio"),

    telefono: yup
      .number()
      .integer("Número no válido")
      .positive("Número no válido")
      .typeError("Número no válido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        const url = `http://localhost:3000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const url = "http://localhost:3000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log("error");
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar cliente"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          correo: cliente?.correo ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10 p-3 ">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:{" "}
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alert>{errors.nombre}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:{" "}
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alert>{errors.empresa}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="correo">
                  Correo:{" "}
                </label>
                <Field
                  id="correo"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Correo del cliente"
                  name="correo"
                />
                {errors.correo && touched.correo ? (
                  <Alert>{errors.correo}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Teléfono:{" "}
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Teléfono del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alert>{errors.telefono}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:{" "}
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Paciente"}
                className="mt-5 w-full py-3 bg-blue-800 text-white uppercase text-center font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
