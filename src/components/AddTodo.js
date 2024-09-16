import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../redux/actions/todoActions';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode); // Access dark mode state

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoText.trim() === '') {
      return;
    }

    const todo = {
      id: Math.floor(Math.random() * 1000),
      todo: todoText,
      completed: false,
      userId: 1, // Assuming userId is 1 for simplicity
    };

    dispatch(addTodo(todo));
    setTodoText('');
    toast.success('Todo added'); // Clear the input field after adding the todo
  };

  return (
    
    
    <div>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          margin: '20px auto',
          maxWidth: '500px',
        }}
      >
        <TextField
          label="New Todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          sx={{
            flexGrow: 1,
            backgroundColor: darkMode ? 'black' : 'white', // White background in light mode, black in dark mode
            input: {
              color: darkMode ? 'white' : 'black', // White text in dark mode, black text in light mode
            },
            label: {
              color: darkMode ? 'white' : 'black', // White label in dark mode, black in light mode
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? 'white' : 'black', // White border in dark mode, black in light mode
              },
              '&:hover fieldset': {
                borderColor: darkMode ? 'white' : 'black', // White border on hover in dark mode, black in light mode
              },
            },
          }}
        />
        <Button
          type="submit"
          style={{
            height: '50px',
            backgroundColor: darkMode ? 'red' : '#1976d2', // Red background in dark mode, blue in light mode
            color: 'white', // Button text color
          }}
          onClick={handleAddTodo}
        >
          Add Todo
        </Button>
      </Box>
    </div>
    
  );
};

export default AddTodo;

