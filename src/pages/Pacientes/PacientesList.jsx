import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit} from "react-icons/fa";
import axios from '../../api';


const PacientesList = () => {

  const [pacientes, setPacientes] = useState([])


  useEffect(() => {
    const buscarPaciente = () => {
        axios.get('/pacientes')
        .then(response => {
          setPacientes(response.data)
        })
        .catch(error => {
          console.error("Ocorreu um erro", error)
        })
    }
    buscarPaciente()

  },[])


  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ position: "relative" }}>
        Lista de Pacientes
      </h2>

      <Link to="/add-pacientes" className="btn btn-primary mb-2">
        <FaPlus className="icon" /> Adicionar Paciente
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Nome Completo:</th>
            <th>Telefone:</th>
            <th>Sexo:</th>
            <th>CPF:</th>
            <th>RG:</th>
            <th>Plano de Saúde:</th>
          </tr>
        </thead>
        <tbody>
          {
            pacientes.map(paciente => (
            <tr key={paciente.id}>
              <td>{paciente.nomeCompleto}</td>
              <td>{paciente.telefone}</td>
              <td>{paciente.sexo}</td>
              <td>{paciente.cpf}</td>
              <td>{paciente.rg}</td>
              <td>{paciente.planoDeSaude}</td>
              <td>
                <Link to={`edit-paciente/${paciente.id}`} className="btn btn-sm btn-warning">
                    <FaEdit  className="icon icon-btn" /> Editar
                </Link>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default PacientesList;
