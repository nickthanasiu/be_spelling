import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './components/Input';
import Hive from './components/Hive';

function App() {
  useEffect(() => {
    const sayHello = async () => {
      const response = await fetch("/api/hello");
      const body = await response.json();
      console.log(body);
    };

    //sayHello();
  }, []);

  return (
    <div className="App">
      <Input />
      <Hive />
    </div>
  );
}

export default App;
