import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect( () => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  }, [] )

  async function handleAddRepository() {

    const response = await api.post( 'repositories', {
      title: `Teste de Repositorio ${Date.now()}`,
      url: "teste.com.br",
      techs: ['ReactJS', 'React Native', 'NodeJS'],
      likes: 0
    } )

    const repository = response.data;

    setRepositories([...repositories, repository]);


  }

  async function handleRemoveRepository(id) {
    const response = await api.delete( `repositories/${id}` )

    const repositoriesNew = repositories.filter((repository, index) => {
      return repository.id !== id;
    });

    setRepositories(repositoriesNew);

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map( repository =>
          <li key = {repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>

        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
