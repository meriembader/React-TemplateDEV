

import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DetailsText from '../lib/DetailsText/DetailsText';
import './Note.scss';
import moment from 'moment';
import FullCommentModal from './FullCommentModal';
import EditOpinionModal from './EditOpinionModal';
import { IcoRxRemove, IcoRxUpdate } from '../lib/BsCustomerIcon/BsGenerateIcon';

export const Comment=(props)=>{

  const [show, setShow] = React.useState(false);
  let extendText = props.opinion.detail.substr(0, 180);
  if(props.opinion && props.opinion.restaurant && props.opinion.detail && props.opinion.detail.length > 180 ) {
    extendText = (<FullCommentModal opinion={props.opinion} />);
  }
  const  handleRemoveOpinion=(clean)=>{
    props.onRemove(props.opinion._id)
  }

 const  handleUpdateOpinion=(key, value, submit, obj)=>{
    props.onUpdate(props.opinion._id, key, value, submit, obj)
  }



    return (<div className="card-box">
      <Row className="h-100">
        <Col className="card-img"
          lg={6}
          md={6}
          sd={6}
          style={{
            backgroundImage: `url(${props.opinion.restaurant.imageUrl})`,
            backgroundSize: 'cover',
            borderRadius: '15px'
          }}
        />
        <Col lg={6} md={6} sd={6} className="p-4">

          <Row>
            <Col lg={10} md={10} xs={10}>
              <span className="resto-name">{props.opinion.restaurant.name}</span>
            </Col>

            <Col className="col-auto">
              <Row lg={4} md={4} xs={4} className="pull-right">
                <Button  bsPrefix="update-button" onClick = {(clean) => handleRemoveOpinion(clean)} >
                  <IcoRxRemove  />
                </Button>
                <Button
                  bsPrefix="update-button"
                  onClick={() => {
                    setShow(!show);
                  }}
                  onKeyDown={() => {
                    setShow(!show);
                  }}
                  variant={'outline-light'}
                  tabIndex={0} >
                  <IcoRxUpdate />
                </Button>
              </Row>
              <EditOpinionModal intl={props.intl} opinion={props.opinion} show={show} setShowModal={(s)=>{ setShow(s)}} onUpdate={(key, value, submit, obj) => handleUpdateOpinion(key, value, submit, obj)}  />
            </Col>
            </Row>
          <Row>
            <Col lg={8} md={8} xs={8}>
              <span className="resto-type">{props.opinion.restaurant.type}</span>
            </Col>
          </Row>
          <Row className="comment-content">
            <Col lg={4} md={4} xs={4}>
              <span className="pull-left comment">{props.opinion.comment}</span>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <DetailsText>
                {moment(props.opinion.createdAt)
                  .locale('fr')
                  .format('DD/MM/YYYY')}
              </DetailsText>
            </Col>
            <Col lg={2} md={2} xs={2} className="pull-right">
              <DetailsText mt="0px" mr="3%">
                <span className=" pull-right rate-value" >{props.opinion.globalRating}</span>/10
              </DetailsText>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="resto-desc">{extendText}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
Comment.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  ratePerService: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  globalRating: PropTypes.string.isRequired,
};
export default Comment;
