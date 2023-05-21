import { useState } from 'react';
import IconButton from '@mui/material/IconButton';

const HoverIcon = ({ icon, hoverIcon, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <IconButton
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {hovered ? hoverIcon : icon}
    </IconButton>
  );
};

export default HoverIcon;
