import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaQuestionCircle, FaCheckCircle} from "react-icons/fa";
import axios from '../../api';
import Modal from 'react-modal'


const PacientesList = () => {

  const [pacientes, setPacientes] = useState([])
  const [modalAberto, setModalaberto] = useState(false)
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null)
  const [tooltipAberto, setTooltipAberto] = useState(false)
  const [modalConcluido, setModalConcluido] = useState(false)


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

  const abrirModal = (paciente) => {
    setPacienteSelecionado(paciente)
    setModalaberto(true)
    

  }

  const fecharModal = () => {
    setModalaberto(false)
    setPacienteSelecionado(null)
  }

  const abrirModalConcluido = () => {
    setModalConcluido(true)
    setTimeout(()=> setModalConcluido(false),2000)
  }
  
  const removerPaciente = () => {
    axios.delete(`/pacientes/${pacienteSelecionado.id}`)
    .then(() => {
      setPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== pacienteSelecionado.id))
      fecharModal()
      abrirModalConcluido()
    
    }) 
  }

  const toggleTooltip = () => {
    setTooltipAberto(!tooltipAberto)
  }

 


  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ position: "relative" }}>
        Lista de Pacientes
        <FaQuestionCircle className="tooltip-icon" onClick={toggleTooltip} />
        {
          tooltipAberto && (
            <div className="tooltip">
                Aqui você pode ver, editar ou excluir pacientes cadastrados no sistema.

            </div>
          )
        }


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
            <th>Ações:</th>
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
                <button onClick={() => abrirModal(paciente)} className="btn btn-sm btn-danger">
                    <FaTrash className="icon icon-btn"/>Excluir
                </button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        className="modal"
        overlayClassName="overlay" 
      >
        <div className="modalContent">
          <FaExclamationTriangle  className="icon"/>
          <h2>Confirmar Exclusão</h2>
          <p>Tem certeza que deseja excluir
              {pacienteSelecionado && pacienteSelecionado.nome}?
          </p>
        </div>
        <div className="modalButtons">
          <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
          <button onClick={removerPaciente}  className="btn btn-danger">Excluir</button>

        </div>

      </Modal>
      <Modal
        isOpen={modalConcluido}
        onRequestClose={() => setModalConcluido(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modalContent">
          <FaCheckCircle className="icon sucessIcon"/>
          <h2>Paciente excuido com sucesso!</h2> 

        </div>


      </Modal>
    </div>
  );
};

export default PacientesList;
