import React from 'react';
import {Modal, Button} from  'react-bootstrap';
import TitleBoldText from '../TitleBoldText';
import  './modalRx.scss'


const ModalRx=(props)=> {
  const  { title, isCustomerModalBody, customerModalBody, isCustomerModalFooter, customerModalFooter, hiddenFooter, classNames, onHide}=props;

  return (
    <Modal
      {...props}
      className="modalPosition"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"  className={classNames&&classNames.title} >
          <TitleBoldText>
            {title}
          </TitleBoldText>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isCustomerModalBody &&  customerModalBody}
      </Modal.Body>
      {(!hiddenFooter || hiddenFooter !== true) &&  <Modal.Footer className="m-0 p-0 edit-modal-sub">
       {isCustomerModalFooter?customerModalFooter:
        ( <Button onClick={onHide}>Close</Button>)}
      </Modal.Footer>}
    </Modal>
  );
}

export default ModalRx;
