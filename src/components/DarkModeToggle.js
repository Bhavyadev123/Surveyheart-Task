import React from 'react';
import { useTheme } from './ThemeContext';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
      <IconButton
        onClick={toggleDarkMode}
        color="inherit"
        style={{
          fontSize: '', // Increase size
          /* Optionally add more styles here */
        }}
      > 
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  );
};

export default DarkModeToggle;
