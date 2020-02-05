import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from './components/layout/header';
import Content from './components/layout/content';
import useLocalStorage from './hooks/use-local-storage';
//import { UserChecker } from './components/user-checker';


function App() {
  // const = useContext(userContext);
  // const [isLogged, setIsLogged] = useState(false);
  const [value] = useLocalStorage('user');
  console.log(value);

  if (value.length === 0) {
    return <Redirect to='/welcome' />
  }

  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}

export default App;
