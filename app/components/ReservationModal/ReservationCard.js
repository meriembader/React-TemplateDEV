import React, { memo, useEffect } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import ReservationItem from "./ReservationItem";
import { getReservationsUser } from "../../containers/MainApp/Profile/Reducer/actions";
import messages from "./messages";
import "./ReservationCard.scss";

const ReservationCard = ({
  reservationData,
  getReservationsUser,
  intl: { formatMessage },
}) => {
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    getReservationsUser();
  }, []);
  const [value, setValue] = React.useState(1);
  const ancienneList = [];
  const avenirList = [];
  const ToDate = new Date();

  const getReservationList = (list) =>
    list &&
    list.map((el) => (
      <Row>
        <Col lg={6} md={12} xs={16}>
          <ReservationItem {...el} />
        </Col>
      </Row>
    ));
  reservationData.forEach((el) => {
    if (new Date(el.orderedForDate).getTime() < ToDate.getTime()) {
      ancienneList.push(el);
    } else avenirList.push(el);
  });

  return (
    <div className="pl-3">
      <div className="reservation-container">
        <Row className="reservations-list">
          <div
            onClick={() => setValue(2)}
            className={value === 2 ? "active" : "item"}
          >
            <span className="mx-auto">
              <FormattedMessage {...messages.newBookingTitle} />
            </span>
          </div>
          &nbsp;&nbsp;
          <div
            onClick={() => setValue(1)}
            className={value === 1 ? "active" : "item"}
          >
            <span className="mx-auto">
              <FormattedMessage {...messages.oldBookingTitle} />
            </span>
          </div>
        </Row>
      </div>
      {value === 2 && (
        <div className="mt-3">{getReservationList(avenirList)}</div>
      )}
      {value === 1 && (
        <div className="mt-3">{getReservationList(ancienneList)}</div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  const profile = state.profile || {};
  const reservationData = (profile && profile.reservations) || [];
  return {
    reservationData,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getReservationsUser: () => dispatch(getReservationsUser()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectIntl)(ReservationCard);
