import React from 'react';
import { NavLink } from 'react-router-dom';


const isActived = (match, location) => {
  if (!match) {
    return false;
  } else {
    return true;
  }
};
const activeStyle = {
  textDecoration: 'none', //拼写出现错误
  color: 'black',
};

const Footer = () => (
  <p>
    show:
    <NavLink  // 怎么把/all设置成默认路由呢
      exact
      to="/all" // 要加'/'
      isActive={isActived}
      activeStyle={activeStyle} >
      ALL
    </NavLink>
    {', '}
    <NavLink
      to="/active"
      isActive={isActived}
      activeStyle={activeStyle} >
      Active
    </NavLink>
    {', '}

    <NavLink
      to="/completed"
      isActive={isActived}
      activeStyle={activeStyle} >
      Completed
    </NavLink>
  </p>
);

export default Footer;