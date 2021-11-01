import React, { memo, useEffect } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import Select from 'react-select';
import { Row, Col, Button } from 'react-bootstrap';
import DetailsBoldText from '../lib/DetailsBoldText';
import SeparatorLine from '../lib/SeparatorLine';
import SubTitleBoldText from '../lib/SubTitleBoldText';
import HeaderBar from '../Header/HeaderBar';
import messages from './messages';
import CommentList from './CommentList';
import './NoteComment.scss';
import data from './data.json';
import { moyenneTableau } from '../../utils/tools';
import PropTypes from 'prop-types';
import { getOpinionsUser,updateOpinionsUser } from '../../containers/MainApp/Profile/Reducer/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EditOpinionModal from '../EtiquetteAvis/EditOpinionModal'

// eslint-disable-next-line react/prop-types
const NoteComponent = ({ intl, getOpinionsUser, opinions }) => {
  const note = moyenneTableau(opinions, "globalRating");
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    getOpinionsUser();
  }, []);

  const  handleAddOpinion=(key, value, submit, obj)=>{

  }
  return(
    <div>
      <HeaderBar />
      <Col md={{ span: 14, offset: 1 }} >
        <SubTitleBoldText>{data.restaurantName}</SubTitleBoldText> {'  ' }<SubTitleBoldText size="18px">{note}</SubTitleBoldText>/10
        <div className="Path-961">
          <Col lg={12} md={12} xs={12}>
            <Row>
              <DetailsBoldText ml="2%">
                <FormattedMessage {...messages.avisNumber} /> {opinions?opinions.length:0}
              </DetailsBoldText>
              <Select className="note-select" options={data.options} />
              <Button
                className="Path-960"
                onClick={() => {
                  setShow(!show);
                }}
                onKeyDown={() => {
                  setShow(!show);
                }}
                tabIndex={0} >
                <FormattedMessage {...messages.addAvis} />
              </Button>
              <EditOpinionModal intl={intl} opinion={opinions} show={show} setShowModal={(s)=>{ setShow(s)}} onUpdate={(key, value, submit, obj) => handleAddOpinion(key, value, submit, obj)}  />
            </Row>
            <SeparatorLine />
            <CommentList opinions={opinions} />
          </Col>
        </div>
      </Col>
    </div>
  );
}

NoteComponent.propTypes = {
  intl: intlShape.isRequired,
  opinions: PropTypes.array,
};

const mapStateToProps = (state, props) => {
  const profile = state.profile || {};
  const opinions = (profile && profile.opinions && profile.opinions.length>0)?profile.opinions:props.listComments;
  return {
    opinions,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getOpinionsUser: () => dispatch(getOpinionsUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(NoteComponent);
