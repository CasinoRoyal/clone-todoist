import React, { useState } from 'react';

import Welcome from './components/welcome';
import Header from './components/layout/header';
import Content from './components/layout/content';


function App() {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) {
    return <Welcome />
  }

  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
