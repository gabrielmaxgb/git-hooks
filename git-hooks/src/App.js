import React, { useEffect, useState } from 'react';
import Location from './Location';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/gabrielmaxgb/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);

    document.title = `Você tem ${filtered.length} repositórios`;
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo , favorite: !repo.favorite } : { ...repo };
    })

    setRepositories(newRepositories);
  };

  return (
    <>
      <ul>
        {
          repositories.map(repo =>
            <li key={ repo.id }>
              { repo.name }
              { repo.favorite && <span>Favorito</span> }
              <button
                onClick={ () => handleFavorite(repo.id) }
              >
                Favoritar
              </button>
            </li>
          )
        }
      </ul>
      <h5>Você possui { repositories.length } repositórios</h5>

      <Location />

    </>


  );
}

export default App;
