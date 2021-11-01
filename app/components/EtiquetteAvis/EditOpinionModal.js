import { Button, Row, Col, Modal , FormGroup} from 'react-bootstrap';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import RangeSliderRx from  '../lib/FormInputs/RangeSliderRx';
import './Note.scss';
import messages from '../Note/messages';
import TextEntry from '../lib/FormInputs/InputTextEntry';
import ModalRx from '../lib/Modal/ModalRx';
import DetailsBoldText from '../lib/DetailsBoldText';
const EditOpinionModal = ({ opinion, onUpdate, intl, show, setShowModal }) => {

    const handleEditOpinion =  (key, value, isSubmit, obj) => {
      isSubmit && setShowModal(false);
      onUpdate(key, value, isSubmit, obj);
    };

    const  customerModalBody = (
                                <FormGroup>
                                  <Col>
                                    <Row>
                                          <DetailsBoldText size="16px"> <FormattedMessage {...messages.avisNote} /></DetailsBoldText>
                                    </Row>
                                    <Row>
                                      <RangeSliderRx

                                       onChange={changeEvent => handleEditOpinion('globalRating', changeEvent.target.value)}
                                                    />
                                    </Row>
                                    <Row>
                                      <TextEntry    value = {opinion?opinion.comment:null}
                                                    className="popup-comment"
                                                    name="comment"
                                                    title={intl.formatMessage(messages.avisTitle)}
                                                    onChange={event => handleEditOpinion('comment', event.target.value)} />
                                    </Row>
                                    <Row>
                                      <TextEntry    title={intl.formatMessage(messages.avisDescription)}
                                                    name="description"
                                                    onChange={event => handleEditOpinion('detail', event.target.value)}
                                                    value = {opinion?opinion.detail:null}
                                                    role="textarea"
                                                    rows={6} />
                                    </Row>
                                </Col>
                              </FormGroup> );

    const  customerModalFooter = (
                                        <Button onClick={()=> handleEditOpinion(null, null, true)}
                                                className="modal-sub-button">{intl.formatMessage(messages.valider)}
                                        </Button>

                                  );


    return (
          <div>

            <ModalRx
              show={show}
              onHide={() => setShowModal(false)}
              title={intl.formatMessage( messages.editOpinion)}
              isCustomerModalBody={true}
              customerModalBody={customerModalBody}
              isCustomerModalFooter={true}
              customerModalFooter={customerModalFooter} />
          </div>
        );
  };

EditOpinionModal.propTypes = {
  intl: intlShape.isRequired,
};
export default EditOpinionModal;



