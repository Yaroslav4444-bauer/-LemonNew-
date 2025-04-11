import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Home from './pages/Home';
import Level from './pages/Level';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Menu />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/levels" element={<Level />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;