import { Row, Col } from 'react-bootstrap';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import DetailsBoldText from '../lib/DetailsBoldText';
import './Note.scss';
import messages from '../mydishNav/messages';
import ModalRx from '../lib/Modal/ModalRx';

const FullCommentModal = ({ opinion, intl }) => {
  const [show, setShow] = React.useState(false);
  const classNamesModal={
    title:"title-wrapper"
  }
  const customerModalBody = ( <Col lg={12} md={12} xs={12}>
                            <Row>
                              <br/>
                              <Col><span className="pull-right comment-popup">{opinion.comment}</span></Col>
                              <Col md={{ span:5, offset: 2 }} className="rate-value-wrapper" >
                                <Row><DetailsBoldText size="16px" mt='0'>{opinion.globalRating}</DetailsBoldText ><span style={{'font-size':'14px', 'margin-top': '4px'}}>/10</span></Row></Col>
                            </Row>
                            <Row>
                              <Col> <span className="resto-desc">  {opinion.detail} </span>  </Col>
                            </Row>
                          <Row>
                            <br/>
                          </Row>
                            </Col>);
  return (
    <div>
      <span
        className="comment-Modal"
      >
       {opinion.detail.substr(0, 180)}{'  '}
      <span
        className="simple-link"
        onClick={() => {
          setShow(!show);
        }}
        onKeyDown={() => {
          setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
       <FormattedMessage {...messages.extendText} />
       </span>
      </span>
       <ModalRx
        show={show}
        onHide={() => setShow(false)}
        title={opinion.restaurant.name}
        isCustomerModalBody={true}
        customerModalBody={customerModalBody}
        classNames={classNamesModal}
        hiddenFooter={true} />
    </div>
  );
};



export default FullCommentModal;
