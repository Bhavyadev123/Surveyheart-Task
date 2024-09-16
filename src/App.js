import React ,{useEffect} from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Container } from '@mui/material';
import { ThemeProvider,useTheme } from './components/ThemeContext';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';


const App = () => {
  const {darkMode} = useTheme();
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);
  return (
    <Container>
    <Provider store={store}>
    <div style={{display:'flex',justifyContent:'center'}}>
    <h1 style={{textAlign:"center" , marginTop:"70px"}}>TODO APP</h1>
    <DarkModeToggle />
    </div>
        <AddTodo />
        <TodoList /> 
        
    </Provider>
    </Container>
  );
};

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;
