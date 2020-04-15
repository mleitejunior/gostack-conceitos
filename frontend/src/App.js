import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header'

function App() {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`);
    // setProjects([...projects, `Novo Projeto ${Date.now()}` ]);

    const response = await api.post('repositories', {
      title: "Teste",
      owner: "Marcelo",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects"/>

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar project</button>
    </>
    )
}

export default App;