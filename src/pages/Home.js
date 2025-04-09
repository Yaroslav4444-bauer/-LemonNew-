import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h2>Добро пожаловать в мир русских приключений!</h2>
      <p>Погрузитесь в комедийные ситуации из повседневной жизни России.</p>
      <Link to="/levels">
        <button>Начать игру</button>
      </Link>
    </div>
  );
}

export default Home;