import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const sayHello = async () => {
      const response = await fetch("/api/hello");
      const body = await response.json();
      console.log(body);
    };

    sayHello();
  }, []);

  return (
    <div className="App">
      Hello world!
    </div>
  );
}

export default App;
