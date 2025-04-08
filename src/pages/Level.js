import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Level() {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');

  const checkAnswer = () => {
    if (answer.toLowerCase() === 'дядя ваня') {
      setResult('Правильно! Переходите на следующий уровень.');
    } else {
      setResult('Неверно. Попробуйте еще раз!');
    }
  };

  return (
    <div className="level">
      <h2>Уровень 1: Загадка про дядю Ваню</h2>
      <p>Кто ездит на самокате и всегда опаздывает на работу?</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Введите ответ"
      />
      <button onClick={checkAnswer}>Проверить</button>
      <p>{result}</p>
      <Link to="/">
        <button>Вернуться на главную</button>
      </Link>
    </div>
  );
}

export default Level;