import React from 'react';

import NavigationItem from './NavigationItem';

function Navigation () {
  const routes = [
    { path: '/', name: 'home' },
    { path: '/quiz', name: 'quiz' },
    { path: '/write', name: 'write' },
    { path: '/bingo', name: 'bingo' },
  ];

  return (
    <nav>
      <h2 className="sr-only">네비게이션 메뉴</h2>
      <ul>
        {
          routes.map(route => <li key={route.name}>
            <NavigationItem path={route.path} name={route.name} />
          </li>)
        }
        <li>
          {localStorage.getItem('Auth') ?
            <NavigationItem path="/mypage" name="mypage" /> :
            <NavigationItem path="/login" name="login" />}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
