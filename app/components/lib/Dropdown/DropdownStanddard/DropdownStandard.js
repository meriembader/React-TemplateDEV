import React, {useEffect, useState} from 'react';
import {Dropdown, Button, FormGroup, FormCheck, Col, Row} from "react-bootstrap";

/**
 *
 * @param title
 * @param toggleIcon
 * @param menu listItem=[{icon: prefixIcon, code: codeItem, label: labelItem}]
 * @param itemType => button, checkbox...
 * @param style V | H => V : vertical items; H : horizontal tems
 * @param onClick event onClick
 * @param classNames className={Toggle: className, Menu: className, Item: className}
 * @returns {JSX.Element}
 * @constructor
 */
const DropdownStandard=({title, toggleIcon, menu, itemType, role, onClick, className, clearFilter})=>{
  const[selected, setSelected] = useState([{code:'init', label:title}]);

  useEffect(() => {
    if(clearFilter){
      setSelected([{code:'init', label:title}]);
    }
  }, [clearFilter]);
  const _item_component = (component) => {
    switch (component) {
      case 'button':
        return (
          <Dropdown.Menu  style={{width:'220px'}} className='pl-2'>
            {menu && menu.map((item) => (
              <Button variant={ item.code ===  selected.code ? "dark" : "light"} onClick={()=>{
                onClick &&  onClick(item.code, role);
                setSelected([{code: item.code, label: item.label}]);
              }} className='mr-1'>{item.label}</Button>)) }
          </Dropdown.Menu>);
      case 'checkbox':
      case 'radio':
        return (
          <Dropdown.Menu style={{width:'240px'}} className='pl-2 pr-2'>
            {menu && menu.map((item) => (<li><Row className="mt-2">{ item.icon && <Col lg={2} md={2} xs={2}>
              <item.icon inline className="icon-menu" /></Col>}
              <Col><span>{item.label}</span></Col>
              <Col lg={2} md={2} xs={2}><FormCheck inline name={item.group? item.group: component} checked={selected && selected.find((e)=> e.code === item.code)} type={component} onClick={(e)=>{
                let selectedCopy = selected;
                if(e.target.checked){
                    onClick && ( component === 'checkbox' ? onClick(item.code, role,'+') : onClick(item.code));
                    selectedCopy = selectedCopy.filter((select)=>(select.code !== 'init'));
                    selectedCopy.push({code: item.code, label: item.label});

                }else{
                    onClick && onClick(item.code, role,'-');
                  selectedCopy = selectedCopy.filter((select)=>(select.code !== item.code));
                }
                setSelected(selectedCopy);
              }} /></Col></Row></li>)) }
          </Dropdown.Menu>);
      default:
        return (
          <Dropdown.Menu>
            {menu && menu.map((item) => (
              <FormGroup>
              {item.icon && <item.icon className="icon-menu" />}
              <Dropdown.Item onClick={()=>{
                setSelected({code: item.code, label: item.label});
              }} >{item.label}</Dropdown.Item></FormGroup>)) }
          </Dropdown.Menu>);
    }

  }
  return(
    <Dropdown>
      <Dropdown.Toggle variant="success" className={className} id="dropdown-button-h">
        {selected && selected.length > 0 && selected[0].label}
        {' '}
        {toggleIcon && <toggleIcon.icon className="icon-menu" />}
      </Dropdown.Toggle>
        {_item_component(itemType) }
    </Dropdown>)
}

export default DropdownStandard
