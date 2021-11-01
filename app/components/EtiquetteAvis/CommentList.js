import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Row, Col, Button } from "react-bootstrap";
import DetailsText from "../lib/DetailsText/DetailsText";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import Comment from "./Comment";
import "./Note.scss";
import pizza from "www/img/pizza.png";
import editIcon from "www/icons/modifier.png";
import deliteIcon from "www/icons/supprimer.png";
import DetailsBoldText from "../lib/DetailsBoldText";
import SeparatorLine from "../lib/SeparatorLine";
const TEXT_COLOR = "#b0b3bc";
const TEXT_COLOR2 = "#000000";
import {
  getOpinionsUser,
  removeOpinionsUser,
  refreshOpinionsUser,
  updateOpinionsUser,
  data,
} from "../../containers/MainApp/Profile/Reducer/actions";
import messages from "../mydishNav/messages";
import check from "../../www/icons/check.png";

const CommentList = ({
  opinions,
  getOpinionsUser,
  removeOpinionsUser,
  deletedSuccess,
  refreshOpinions,
  updateOpinions,
  intl,
}) => {
  const handleDeleteOpinion = async (id) => {
    const promises = [];
    await promises.push(removeOpinionsUser(id));
  };
  const handleUpdateOpinion = async (id, key, value, submit, obj) => {
    opinions = opinions.map((e, index) => {
      if (e._id == id) {
        if (obj) {
          e[obj][key] = value;
        } else {
          e[key] = value;
        }
      }
      return e;
    });
    let o = opinions && opinions.find((e) => (e._id = id));
    submit && updateOpinions(o);

    refreshOpinions(opinions);
  };

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    getOpinionsUser();
  }, []);
  const [value, setValue] = React.useState();
  const commentNodes =
    opinions &&
    opinions.map((comment) => (
      <Comment
        opinion={comment}
        intl={intl}
        onRemove={(id) => handleDeleteOpinion(id)}
        onUpdate={(id, key, value, submit, obj) =>
          handleUpdateOpinion(id, key, value, submit, obj)
        }
      />
    ));

  return (
    // <div>
    //   {deletedSuccess && (
    //     <Row className="box-success">
    //       <img className="check-icon" src={check} />
    //       <span className="margin-check-text ">
    //         {" "}
    //         <FormattedMessage {...messages.deleteSuccess} />
    //       </span>
    //     </Row>
    //   )}
    //   {commentNodes}
    // </div>
    <div className="card-box">
      <Row className="h-100">
        <Col
          lg={6}
          md={6}
          sd={6}
          xs={5}
          style={{
            backgroundImage: pizza,
            backgroundSize: "cover",
            borderRadius: "15px",
          }}
        >
          {" "}
          <img src={pizza} />
        </Col>
        <Col className="painding-card">
          <Row>
            <Col lg={9} md={4} xs={4} style={{ padding: "0px" }}>
              <DetailsBoldText>Joayo Haussmann</DetailsBoldText>
            </Col>
            <Col lg={1} md={1} xs={1} style={{ padding: "0px" }}>
              <button>
                <img
                  src={editIcon}
                  style={{ paddingLeft: "10+px", paddingTop: "5px" }}
                />
              </button>
            </Col>
            <Col lg={1} md={1} xs={1} style={{ padding: "0px" }}>
              <button>
                <img
                  src={deliteIcon}
                  style={{ paddingLeft: "10px", paddingTop: "5px" }}
                />
              </button>
            </Col>
          </Row>
          <Row>
            <DetailsText color={TEXT_COLOR}>Italien</DetailsText>
          </Row>
          <Row>
            <Col lg={3} md={4} xs={4} style={{ padding: "0px" }}>
              {/* <img alt="user_image" src={isOld ? calendarGrey: calendar} fill="red" className="icon-style"/> */}
              <DetailsBoldText>Délicieux!</DetailsBoldText>
            </Col>
            <Col
              lg={6}
              md={4}
              xs={4}
              style={{ paddingLeft: "0px", paddingTop: "3px" }}
            >
              <DetailsText color={TEXT_COLOR}>22/07/2020</DetailsText>
            </Col>
            <Col lg={3} md={3} xs={3}>
              {/* <img
                src={PROFILE_GREY_ICON}
                className="icon-profile"
                alt="profile-icon"
              /> */}
              <DetailsText>9.5 / 10</DetailsText>
            </Col>
          </Row>
          <Row>
            <SeparatorLine width="90%" />
          </Row>
          <Row>
            <DetailsText
              size="14px"
              color={TEXT_COLOR}
              style={{ paddingRight: "5px" }}
            >
              Belle découverte et joli cadre. Raviolis excellents et barbecue de
              canard et porc épicés super. Bon cheesecake au yuzu et belle
              présentation. Apéritif vin de mûre original.
            </DetailsText>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

CommentList.propTypes = {
  opinions: PropTypes.array,
};
const mapStateToProps = (state) => {
  const profile = state.profile || {};
  const opinions = (profile && profile.opinions) || [];
  const deletedSuccess =
    (state.form.comment &&
      state.form.comment.values &&
      state.form.comment.values.deletedSuccess) ||
    false;
  return {
    opinions,
    deletedSuccess,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getOpinionsUser: () => dispatch(getOpinionsUser()),
    removeOpinionsUser: (id) => dispatch(removeOpinionsUser(id)),
    refreshOpinions: (list) => dispatch(refreshOpinionsUser(list)),
    updateOpinions: (data) => dispatch(updateOpinionsUser(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectIntl)(CommentList);
