import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import ReactFlagsSelect from 'react-flags-select';
import TitleBoldText from '../lib/TitleBoldText';
import messages from './messages';
import H3 from '../lib/H3';
import 'react-flags-select/css/react-flags-select.css';
import TextField from '../lib/FormInputs/TextField';
import ModalRx from '../lib/Modal/ModalRx';
import { Row, Col } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const renderCountriesSelectFieldField = field => {
  const { id, title, fieldDescription } = field;
  return (
    <Form.Group controlId={id}>
      <Form.Label>
        <TitleBoldText size="16px">{title}</TitleBoldText>
      </Form.Label>
      <ReactFlagsSelect
        className="form-control-custom form-control"
        countries={['FR', 'GB', 'BE', 'DE', 'IT', 'NG']}
      />
      <Form.Text className="text-muted">{fieldDescription}</Form.Text>
    </Form.Group>
  );
};

let AddCardModal = ({
                      intl: { formatMessage },
                      show,
                      setShow
                    }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onClickNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  const classNamesModal={
    title:"title-wrapper"
  }

  const customerBody = (
      <Col lg={12} md={12} xs={12}>
        <Field
          name="cardNumber"
          title={formatMessage(messages.cardNumberLabel)}
          type="text"
          placeholder={formatMessage(messages.cardNumberLabel)}
          component={TextField}
          className="form-control-custom"
        />

        <Field
          name="expirationDate"
          title={formatMessage(messages.cardExpirationDateLabel)}
          type="text"
          placeholder={formatMessage(messages.cardExpirationDatePlaceholder)}
          component={TextField}
          className="form-control-custom"
        />

        <Field
          name="code"
          title={formatMessage(messages.cardSecurityCodeLabel)}
          type="password"
          placeholder={formatMessage(messages.cardSecurityCodePlaceholder)}
          component={TextField}
          className="form-control-custom"
        />

        <Field
          name="code"
          title={formatMessage(messages.cardSecurityCodeLabel)}
          type="password"
          placeholder={formatMessage(messages.cardSecurityCodePlaceholder)}
          component={TextField}
          className="form-control-custom"
        />

        <Field
          name="country"
          title={formatMessage(messages.countryLabel)}
          type="text"
          component={renderCountriesSelectFieldField}
        />
      </Col>)

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
        title={formatMessage(messages.addCardTitleLabel)}
        isCustomerModalBody={true}
        customerModalBody={customerBody}
        classNames={classNamesModal}
        customerModalFooter={modalFooter}
        isCustomerModalFooter={true} />
    </div>
  );
};

AddCardModal.propTypes = {
  intl: intlShape.isRequired,
};

AddCardModal = reduxForm({
  // a unique name for the form
  form: 'cardForm',
})(AddCardModal);

export default injectIntl(AddCardModal);
