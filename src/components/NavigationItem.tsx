import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItemProp {
    path:string,
    name:string
}


function NavigationItem ({ path, name }:NavigationItemProp) {
  const location = useLocation();
  const { pathname } = location;

  const checkIsActive = (path:string) => {
    return path === pathname ? ' isActive' : null;
  };

  return (
    <Link to={path}>
      {
        <i
          className={`icon-${name}${checkIsActive(path)}`}
          aria-label={name}></i>
      }
    </Link>
  );
}

export default NavigationItem;
