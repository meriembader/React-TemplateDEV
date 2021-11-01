import { Modal, Row, Col } from 'react-bootstrap';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BsGeoAlt } from 'react-icons/bs';
import { AiOutlinePhone } from 'react-icons/ai';
import TitleBoldText from '../lib/TitleBoldText';
import SubTitleText from '../lib/SubTitleText';
import messages from './messages';
import './details.scss';
// eslint-disable-next-line import/order
import PropTypes from 'prop-types';
import MapComponent from '../Restaurant/MapComponent';

const InformationsModal = ({
  show,
  handleModal,
  name,
  numTel,
  adresse,
  heureDej,
  HeureDiner,
  caracteristique,
  services,
  position,
     restaurantMarker
}) => (
  <div className="modal-container">
    <Modal
      className="modal-custom"
      size="lg"
      show={show}
      onHide={() => {
        handleModal(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="modal">
          <TitleBoldText size="26px">
            <FormattedMessage {...messages.detailsTitle} />
          </TitleBoldText>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="restaurant-details-modal">
        <Row>
          <Col lg={6} md={6} xs={6}>
            <Row>
              <h3> {name} </h3>{' '}
            </Row>
            <Row>
              <h4>
                {' '}
                <FormattedMessage {...messages.horOverture} />
              </h4>
            </Row>
            <Row> Fermé les diamanches</Row>
            <Row> <FormattedMessage {...messages.hourLunch} />{heureDej}</Row>
            <Row> <FormattedMessage {...messages.dinerTime} />{HeureDiner}</Row>
            <Row>
              <h4>
                {' '}
                <FormattedMessage {...messages.contact} />
              </h4>
            </Row>
            <Row>
              <AiOutlinePhone /> <span className="ml-1">{numTel}</span>
            </Row>
            <Row>
              <h4>
                {' '}
                <FormattedMessage {...messages.adresseRest} />
              </h4>
            </Row>
            <Row>
              {' '}
              <BsGeoAlt className="mt-1" />{' '}
              <span className="ml-1">{adresse}</span>
            </Row>
            <Row>
              <h4>
                {' '}
                <FormattedMessage {...messages.caracteristique} />
              </h4>
            </Row>
            <Row>{caracteristique}</Row>
            <Row>
              <h4>
                {' '}
                <FormattedMessage {...messages.services} />
              </h4>{' '}
            </Row>
            <Row> {services}</Row>
          </Col>
          <Col lg={6} md={6} xs={6}>
            <div className="map-container">
              <MapComponent marker={position} isList={false} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
              <MapComponent containerStyle="h-100" marker={restaurantMarker}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  </div>
);

InformationsModal.propTypes = {
  name: PropTypes.string.isRequired,
  numTel: PropTypes.string.isRequired,
  adresse: PropTypes.string.isRequired,
  heureDej: PropTypes.string.isRequired,
  HeureDiner: PropTypes.string.isRequired,
  caracteristique: PropTypes.string.isRequired,
  services: PropTypes.string.isRequired,
};
export default InformationsModal;
