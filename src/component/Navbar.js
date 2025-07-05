import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const menuList = ["날씨지도"];
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/map');
  };

  return (
    <ul className="side-nav">
      {menuList.map((menu, index) => (
        <li key={index} onClick={handleClick}>
          {menu}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;