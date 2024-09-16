import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchTodos, deleteTodo, toggleTodo, editTodo } from '../redux/actions/todoActions';
import { List, ListItem, ListItemText, IconButton, Checkbox, TextField, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
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
    dispatch(deleteTodo(id));
    toast.success('Todo Deleted');
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

  // Calculate counts
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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

      <List
        style={{
          maxHeight: '500px',
          overflowY: 'auto',
          margin: '0 auto',
          padding: '0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          border: '1px',
          borderRadius: '8px',
          backgroundColor: darkMode ? '' :'',
        }}
        className="ListContainer"
      >
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              gap: '10px',
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
                  style={{ marginLeft: '10px', color: darkMode ? '#fff' : '#000' }}
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
                <div style={{ display: 'flex' }}>
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
      </List>
    </div>
  );
};

export default Todo;

