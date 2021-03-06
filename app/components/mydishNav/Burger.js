import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsSubMenu from './SettingsSubMenu';

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 1000;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#ccc' : '#333'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Burger = ({dataMenu}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav dataMenu={dataMenu} open={open}  />
            </>
  )
}


const UL = styled.ul`

  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  z-index: 900;
  @media (min-width: 769px) {
    padding-left: 20%;
  }
  @media (max-width: 768px) {
    background-color: #ffffff;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #ffc1c1;
      margin: 5% 0% 0% 0%;
    }
  }
`;
export const RightNav = ({ open, dataMenu }) => {
  return (
      <UL open={open}>
        {dataMenu
          .sort((a, b) => a.order - b.order)
          .map(item => (
            <SettingsSubMenu key={item.id} metadata={item} />
          ))}
      </UL>
  )
};


export default Burger
