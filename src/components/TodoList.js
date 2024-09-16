import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchTodos, deleteTodo, toggleTodo, editTodo } from '../redux/actions/todoActions';
import { ListItem, ListItemText, IconButton, Checkbox, TextField, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; // Import VolumeUpIcon
import { toast } from 'react-toastify';

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoList?.todos || []);
  const darkMode = useSelector((state) => state.darkMode); // Access dark mode state

  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://dummyjson.com/todos');
      const data = res.data.todos;
      dispatch(fetchTodos(data));
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      dispatch(deleteTodo(id));
      toast.success('Todo Deleted');
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (todo) => {
    setEditMode(todo.id);
    setEditText(todo.todo); // Set current todo text into the input field
  };

  const handleSave = (id) => {
    dispatch(editTodo(id, editText)); // Dispatch the updated todo
    setEditMode(null); // Exit edit mode after saving
    setEditText(''); // Clear the input field
  };

  const handleTextToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Calculate counts
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Counts Display */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          color: darkMode ? '#fff' : '#000',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Pending Todos: {pendingTodos}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Completed Todos: {completedTodos}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Total Todos: {totalTodos}
        </Typography>
      </Box>

      {/* Todo List Displayed in Card Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns in a row
          gap: '20px',
        }}
      >
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              position: 'relative',
              border: `1px solid ${darkMode ? '#fff' : '#000'}`,
              backgroundColor: darkMode ? '#444' : '#fff',
              color: darkMode ? '#fff' : '#000',
            }}
          >
            {editMode === todo.id ? (
              <>
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  size="small"
                  style={{ flexGrow: 1, color: darkMode ? '#fff' : '#000' }}
                  InputProps={{ style: { color: darkMode ? '#fff' : '#000' } }}
                />
                <IconButton
                  onClick={() => handleSave(todo.id)}
                  style={{ marginTop: '10px', color: darkMode ? '#fff' : '#000' }}
                >
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    style={{ color: darkMode ? '#fff' : '#000' }}
                  />
                  <ListItemText
                    primary={todo.todo}
                    secondary={todo.completed ? 'Completed' : 'Not Completed'}
                    primaryTypographyProps={{ style: { fontWeight: 'bold', color: darkMode ? '#fff' : '#000' } }}
                    secondaryTypographyProps={{ style: { color: darkMode ? '#ccc' : '#555' } }}
                  />
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <IconButton
                    onClick={() => handleTextToSpeech(todo.todo)} // Add text-to-speech functionality
                    style={{ marginLeft: '10px', color: darkMode ? '#fff' : '#000' }}
                  >
                    <VolumeUpIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEdit(todo)}
                    disabled={todo.completed}
                    style={{ marginLeft: '10px', color: darkMode ? '#fff' : '#000' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(todo.id)}
                    style={{ marginLeft: '10px', color: darkMode ? '#fff' : '#000' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </>
            )}
          </ListItem>
        ))}
      </Box>
    </div>
  );
};

export default Todo;
