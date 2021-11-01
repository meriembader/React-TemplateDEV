import React, {useState}  from 'react';
import {Dropdown, Button} from "react-bootstrap";


const DropdownButtonHorizontal=({title, menu})=>{
const[selected, setSelected] = useState({code:'init', label:title});
  return(
  <Dropdown>
    <Dropdown.Toggle variant="success" className="tripar align-filter3 " id="dropdown-button-h">
      {selected && selected.label}
    </Dropdown.Toggle>
    <Dropdown.Menu show={false} style={{width:'200px'}}>
      {menu && menu.map((item) => (<Button variant={ item.code ===  selected.code ? "success" : "secondary"} onClick={()=>{
        setSelected({code: item.code, label: item.label});
        Dropdown.Menu.onClose();
      }} >{item.label}</Button>)) }
    </Dropdown.Menu>
  </Dropdown>)
}

export default DropdownButtonHorizontal
