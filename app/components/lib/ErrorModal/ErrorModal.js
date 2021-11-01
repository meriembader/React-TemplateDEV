import { Button, Modal, Row, Col, Form, FormLabel } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import H3 from '../H3';
import DetailsText from '../DetailsText/DetailsText';

const ErrorModal = ({ errorTitle, errorDescription }) => {
  const [show, setShow] = useState(false);

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div>
      <Button onClick={() => setShow(true)}>Test Modal</Button>
      <Modal
        show={show}
        size="lg"
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal">
            <H3>{errorTitle}</H3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <DetailsText>{errorDescription}</DetailsText>
        </Modal.Body>

        <Modal.Footer className="m-0 p-0">
          <Button
            onClick={() => setShow(false)}
            className="common-modal-sub-button"
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
ErrorModal.propTypes = {
  errorTitle: PropTypes.element.isRequired,
  errorDescription: PropTypes.element.isRequired,
};

export default injectIntl(ErrorModal);
