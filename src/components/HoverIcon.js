import { useState } from 'react';

const HoverIcon = ({ icon, hoverIcon, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const mouseEnterHandler = () => setHovered(true);
  const mouseLeaveHandler = () => setHovered(false);

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={onClick}
    >
      {hovered ? hoverIcon : icon}
    </div>
  );
};

export default HoverIcon;
