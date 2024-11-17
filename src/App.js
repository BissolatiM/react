import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '', dateOfBirth: '' });

  useEffect(() => {
    async function fetchPatients() {
      setPatients((await axios.get('http://localhost:5000/patients')).data);
    }
    fetchPatients();
  }, []);

  async function addPatient() {
    const response = await axios.post('http://localhost:5000/patients', newPatient);
    setPatients([...patients, response.data]);
    setNewPatient({ name: '', email: '', phone: '', dateOfBirth: '' });
  }

  return (
    <div>
      <h1>Bem-vindo ao Sublima</h1>
      <h2>Cadastro de Pacientes</h2>
      <input placeholder="Nome" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
      <input placeholder="Email" value={newPatient.email} onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} />
      <input placeholder="Telefone" value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} />
      <input type="date" value={newPatient.dateOfBirth} onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })} />
      <button onClick={addPatient}>Adicionar Paciente</button>
      <h2>Lista de Pacientes</h2>
            <ul>
        {patients.map(patient => (
          <li key={patient._id}>{patient.name} - {patient.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;