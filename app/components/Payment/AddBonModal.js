import { Button, Modal, Row, Col, Form, FormLabel } from 'react-bootstrap';
import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import TitleBoldText from '../lib/TitleBoldText';
import messages from './messages';
import H3 from '../lib/H3';
import MessageBox from '../MessageBox/MessageBox';
import ModalRx from '../lib/Modal/ModalRx';
export const RenderTextInputComponent = ({ id, title, placeholder, fieldDescription, type, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>
        <TitleBoldText size="16px">{title}</TitleBoldText>
      </Form.Label>
      <Form.Control
        className="form-control-custom"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      <Form.Text className="text-muted">{fieldDescription}</Form.Text>
    </Form.Group>
  );
};

const AddBonModal = ({ show, setShow, intl: { formatMessage }, noPromocodeAvailable = false }) => {
  const [promoCode, setPromocode] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const onClickNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const body = (<Col>
    {!noPromocodeAvailable && (
    <RenderTextInputComponent
      name="promoCode"
      title={formatMessage(messages.addBonLabel)}
      type="text"
      onChange={event => setPromocode(event.target.value)}
    />
  )}
  {noPromocodeAvailable && (
    <MessageBox
      name={formatMessage(messages.noPromoCodeMessage)}
    />
  )}
    </Col>
  );

  const classNamesModal={
    title:"title-wrapper"
  }
  const modalFooter = (
    <span onClick={onClickNextStep} className="TRAC-993">
            {formatMessage(messages.next)}
          </span>
  )
  return (
    <div>
      <ModalRx
        show={show}
        onHide={() => setShow(false)}
        title={formatMessage(messages.addBonTitleLabel)}
        isCustomerModalBody={true}
        customerModalBody={body}
        classNames={classNamesModal}
        customerModalFooter={modalFooter}
        isCustomerModalFooter={true} />
    </div>
  );
};

export default injectIntl(AddBonModal);
