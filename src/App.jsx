import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import axios from 'axios';
import './App.css';
import Partebaixa from './components/Partebaixa';

function App() {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.cartola.globo.com/clubes')
      .then((response) => {
        const clubesData = Object.values(response.data);
        setClubes(clubesData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div><Header/>

    <div className="App">
      <div className="clubes-container">
        {clubes.map(clube => (
          <div key={clube.id} className="clube">
            <img src={clube.escudos['60x60']} alt={`${clube.nome} logo`} />
            <p>{clube.nome}</p>
            <p>{clube.apelido}</p>
          </div>
        ))}
      </div>
    </div>
    <div/>
    <Partebaixa/>
    </div>
  );
}

export default App;