import { Button, Modal, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import moment from 'moment';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { injectIntl, intlShape } from 'react-intl';
import DetailsBoldText from '../lib/DetailsBoldText';
import Picker from 'react-mobile-picker-scroll';
import messages from './messages';
import H3 from '../lib/H3';
import './ReservationModal.scss';
import 'react-calendar/dist/Calendar.css';
import { OfferCardList } from '../OfferCard';
import CalendarSvg from '../../www/icons/calendar.svg';
import TimeSvg from '../../www/icons/hour.svg';
import ProfileSvg from '../../www/icons/profile.svg';
import OfferSvg from '../../www/icons/offer.svg';
import ModalRx from '../lib/Modal/ModalRx';

const initialStepsData = [
  {
    index: 0,
    title: 'date',
    icon: CalendarSvg,
    data: null,
  },
  {
    index: 1,
    title: 'reservationTime',
    icon: TimeSvg,
    data: { reservationTime: '13H 00' },
    description: 'Diner',
  },
  {
    index: 2,
    title: 'invitedNbr',
    icon: ProfileSvg,
    data: { invitedNbr: 'Selectionner' },
    description: 'pers.',
  },
  {
    index: 3,
    title: 'offer',
    icon: OfferSvg,
    data: null,
  },
];

const OFFERS_TEST_DATA = [
  {
    title: '-25% sur la carte',
    description:
    // eslint-disable-next-line no-useless-concat
      'Hors menu. hors boisson.\n' + 'Valable pour le créneau horaire réservé',
    isSelected: true,
  },
  {
    title: 'Réservation sans offre',
    description: 'La réservation à la carte standard sans promotion',
    isSelected: false,
  },
];

const TIME_OPTIONS = {
  reservationTime: ['12H: 00', '12H 30', '13H 00', '13H 30', '14H 00'],
};

const INVITED_NBR_OPTIONS = {
  invitedNbr: ['1', '2', 'Selectionner', '3', '4', '5'],
};

// eslint-disable-next-line react/prop-types
const StepSelectorItem = ({ stepData, currentStep, onClickStepHandler }) => {
  // eslint-disable-next-line no-nested-ternary
  const StepTitleBody =
    stepData.data && stepData.index === 0 && currentStep > stepData.index ?
      stepData.description : stepData.data &&
      stepData.index > 0 &&
      currentStep > stepData.index ? stepData.description :
      <img
        src={stepData.icon}
        alt={stepData.icon}/>;
  return (
    <div
      style={{
        borderBottom: 'solid 5px #fb5557',
        opacity: stepData.index > currentStep ? 0.3 : 1,
        width: '25%',
        color: '#fb5557',
        height: '60px',
        position: 'relative',
      }}
      onClick={() => onClickStepHandler(stepData.index)}
    >
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '30%',
      }}>
        {StepTitleBody}
      </div>
    </div>
  );
};

const ReservationModal = (
  { intl: { formatMessage },
    restaurantName = 'Joayo Haussmann',
    show = false,
    setShow,
    validateReservationOptions,
    restaurant,
    offers= OFFERS_TEST_DATA}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [indexSelected, setIndexSelected] = useState(0);
  const [reservationSteps, setReservationStepsData] = useState(initialStepsData);

  const handleSelectDate = newDate => {
    const newReservationSteps = [...reservationSteps];
    const reservationDate = moment(newDate).lang('fr').format('ddd, DD/MM');
    newReservationSteps[0].data = newDate;
    newReservationSteps[0].description = reservationDate;
    setReservationStepsData(newReservationSteps);
  };

  const handleSelectReservationTime = (name, value) => {
    const newReservationSteps = [...reservationSteps];
    newReservationSteps[1].data = { [name]: value };
    newReservationSteps[1].description = 'Diner ' + value;
    setReservationStepsData(newReservationSteps);
  };

  const handleSelectInvitedNbr = (name, value) => {
    const newReservationSteps = [...reservationSteps];
    newReservationSteps[2].data = { [name]: value };
    newReservationSteps[2].description = value + ' Pers.';
    setReservationStepsData(newReservationSteps);
  };

  const handleSelectOffer = (value) => {
    const newReservationSteps = [...reservationSteps];
    newReservationSteps[3].data = { offer: value };
    newReservationSteps[3].description = value;
    setReservationStepsData(newReservationSteps);
    const foundIndex = offers && offers.findIndex((o) => o.title == value);
    setIndexSelected(foundIndex);
  };

  const onClickNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // validateReservationOptions()
      const reservationData = 'Réservation.' + restaurant.name + '.' + reservationSteps[2].description +
        reservationSteps[0].description + '.' + reservationSteps[1].description;
      validateReservationOptions(reservationSteps[0].data, reservationSteps[1].data.reservationTime,
        reservationSteps[2].data.invitedNbr, reservationSteps[3].data && reservationSteps[3].data.offer, restaurant, reservationData);
      setShow(false);
    }
  };

  const reservationBody = (<Col>
          <div className="reservation-modal mt-2">
            <Row >
              <Col lg={12} md={12} className="d-flex">
                {reservationSteps && reservationSteps.map(el => (
                  <StepSelectorItem
                    stepData={el}
                    key={el.title}
                    currentStep={currentStep}
                    onClickStepHandler={setCurrentStep}/>
                ))}
              </Col>
            </Row>

            <div className="reservation-body-box mt-3 p-4 row">
              <Col lg={12} md={12} className="justify-content-center d-flex">
                {currentStep === 0 && (
                  <Calendar
                    onChange={handleSelectDate}
                    value={reservationSteps[0].data}
                  />)}

                {currentStep === 1 && (
                  <div>
                    <div className="d-flex">
                      <DetailsBoldText>
                        {formatMessage(messages.diner)}
                      </DetailsBoldText>
                      <IconContext.Provider
                        value={{
                          size: '2em',
                          className: 'ml-2 mt-1',
                        }}
                      >
                        <RiArrowDropDownLine/>
                      </IconContext.Provider>
                    </div>
                    <Picker
                      optionGroups={TIME_OPTIONS}
                      valueGroups={reservationSteps[1].data}
                      onChange={handleSelectReservationTime}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <div className="d-flex">
                      <DetailsBoldText>
                        {formatMessage(messages.invitedNumber)}
                      </DetailsBoldText>
                      <IconContext.Provider
                        value={{
                          size: '2em',
                          className: 'ml-2 mt-1',
                        }}
                      >
                        <RiArrowDropDownLine/>
                      </IconContext.Provider>
                    </div>
                    <Picker
                      optionGroups={INVITED_NBR_OPTIONS}
                      valueGroups={reservationSteps[2].data}
                      onChange={handleSelectInvitedNbr}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <DetailsBoldText className="text-center">
                      {formatMessage(messages.offer)}
                    </DetailsBoldText>
                    <OfferCardList indexSelected = {indexSelected} handleSelectOffer={handleSelectOffer} offers={OFFERS_TEST_DATA}/>
                  </div>)}
              </Col>
            </div>
          </div>
    </Col>

  )

  const classNamesModal={
    title:"title-wrapper"
  }
  const modalFooter = (
    <span onClick={onClickNextStep} className="TRAC-993">
            {formatMessage(messages.next)}
          </span>
  )


  return (
    <div className="modal-container">
      <ModalRx
        show={show}
        onHide={() => setShow(false)}
        title={formatMessage(messages.reservationTitle)}
        isCustomerModalBody={true}
        customerModalBody={reservationBody}
        classNames={classNamesModal}
        customerModalFooter={modalFooter}
        isCustomerModalFooter={true} />
    </div>
  );
};

ReservationModal.propTypes = {
  intl: intlShape.isRequired,
  validateReservationOptions: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  restaurant: PropTypes.object.isRequired,
};
export default injectIntl(ReservationModal);
