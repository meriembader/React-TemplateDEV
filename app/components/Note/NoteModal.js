import { Button, Modal, Row, Col } from 'react-bootstrap';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import RangeSlider from 'react-bootstrap-range-slider';
import DetailsBoldText from '../lib/DetailsBoldText';
import TitleBoldText from '../lib/TitleBoldText';
import messages from './messages';
import './NoteComment.scss';

const NoteModal = ({ intl }) => {
  const [value, setValue] = React.useState(5);
  const [show, setShow] = React.useState(false);

  return (
    <div>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal">
            <TitleBoldText>
              {intl.formatMessage(messages.popupAvis)}
            </TitleBoldText>
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <Col lg={12} md={12} xs={8}>
              <Row>
                <DetailsBoldText>
                  {' '}
                  {intl.formatMessage(messages.avisNote)}
                </DetailsBoldText>
              </Row>
              <Row>
                <RangeSlider
                  className="Path-972"
                  tooltipPlacement="top"
                  tooltip="on"
                  value={value}
                  onChange={changeEvent => setValue(changeEvent.target.value)}
                  min={0}
                  max={10}
                />
              </Row>
              <Row>
                <DetailsBoldText>
                  {' '}
                  {intl.formatMessage(messages.avisTitle)}
                </DetailsBoldText>
              </Row>
              <Row>
                <input type="text" className="Rectangle-83" />
              </Row>
              <Row>
                <DetailsBoldText>
                  {' '}
                  {intl.formatMessage(messages.avisDescription)}
                </DetailsBoldText>
              </Row>
              <Row>
                <textarea className="Path-975" id="avisArea" rows="3"/>
              </Row>
            </Col>
          </Modal.Body>
          <Modal.Footer className="m-0 p-0">
            <Button className="common-modal-sub-button">Submit</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

NoteModal.propTypes = {
  intl: intlShape.isRequired,
};
export default NoteModal;
