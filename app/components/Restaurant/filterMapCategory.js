import React, { memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { compose } from 'redux';
import { BsChat, BsHeart, BsPerson } from 'react-icons/bs/index';
import { VscTag } from 'react-icons/vsc/index';
import { Nav, Navbar } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';


const itemMenuMetadata = [
  {
    id: 'myspace.menu.myprofil',
    order: 1,
    path: '/PrincipalPage/Profile',
    label: "rrrr",
    componentIcon: BsPerson,
    hiden: false,
  },
  {
    id: 'myspace.menu.myfavoris',
    order: 5,
    path: '/PrincipalPage/favoris',
    label: "ddd",
    componentIcon: BsHeart,
    hiden: false,
  },
  {
    id: 'myspace.menu.myreservation',
    order: 2,
    path: '/PrincipalPage/Reservation',
    label:"fffff",
    componentIcon: VscTag,
    hiden: false,
  },
  {
    id: 'myspace.menu.myopinion',
    order: 4,
    path: '/PrincipalPage/opinion',
    label: "ffff",
    componentIcon: BsChat,
    hiden: false,
  }
];

const filterMapCategory = () => {
  return (

    <Dropdown.Menu className="my-dropdown">
      {itemMenuMetadata
        .map(item => (
          <Dropdown.Item href={item.path} className="nav-link-mini" >
            {' '}
            {item.componentIcon && <item.componentIcon className="menu-icon"/>}
            {item.label}
          </Dropdown.Item>
        ))}
    </Dropdown.Menu >
  )
}


export default compose(
  memo,
  injectIntl,
)(filterMapCategory);
