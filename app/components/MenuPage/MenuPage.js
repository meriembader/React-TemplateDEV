import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import {useDispatch} from 'react-redux';
import { Col, Row, FormGroup, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import SettingsMenu from '../mydishNav/SettingsMenu';
import ReservationPage from '../../containers/ReservationPage';
import ProfileUpdateForm from '../../containers/ProfilePage/ProfileUpdateForm';
import FidelityPage from '../../containers/FidelityPage';
import AvisPage from '../../containers/AvisPage';
import favorisPage from '../../containers/favorisPage';
import './menu.scss';
import {updateFormProfile} from '../../containers/MainApp/Profile/Reducer/actions';
import SeparatorLineVertical from '../lib/SeparatorLineVertical';
import Footer from '../Footer/Footer';
import HeaderBar from '../Header/HeaderBar';
import TitleBoldText from '../lib/TitleBoldText';
import messages from '../mydishNav/messages';
import SeparatorLine from '../lib/SeparatorLine';



const MenuPage = ({ intl }) => {
  const dispatch = useDispatch();

  return (<div>
    <HeaderBar />
      <Row>
        <Col lg={3} md={1} xs={1}>
          <SettingsMenu />
        </Col>
          <SeparatorLineVertical left="23%" />
        <Col lg={9} md={9} xs={9}>
          <ContainerProfil intl={intl} dispatch={dispatch}/>
        </Col>
      </Row>
    <Footer />
  </div>
)};


const ContainerProfil =({ intl, dispatch }) =>{

  return(
      <div className="container-menu">
        <HeaderContainerProfil intl={intl} dispatch={dispatch}/>

         <Switch>
              <Route path="/PrincipalPage/profile"   component={ProfileUpdateForm} />
              <Route path="/PrincipalPage/fidelity" component={FidelityPage} />
              <Route
                path="/PrincipalPage/reservation"
                component={ReservationPage}
              />
              <Route path="/PrincipalPage/opinion" component={AvisPage} />
              <Route path="/PrincipalPage/favoris" component={favorisPage} />
         </Switch>
      </div>

  )
}

const HeaderContainerProfil=({ intl, dispatch })=>{
  const { location } = useReactRouter();

  const pathname = location? location.pathname : "";
  const message={
    "/PrincipalPage/profile": intl.formatMessage(messages.profileTitle),
    "/PrincipalPage/fidelity": intl.formatMessage(messages.fidelityComponentTitle),
    "/PrincipalPage/reservation": intl.formatMessage(messages.mesReservationTitle),
    "/PrincipalPage/opinion": intl.formatMessage(messages.opinionTitle),
    "/PrincipalPage/favoris": intl.formatMessage(messages.favorisComponentTitle),
  }
  const enableUpdateProfile = () => {
    dispatch(updateFormProfile(false));
  }
  return(
    <FormGroup>
      <Row>
        <Col>
          <TitleBoldText size="30px">
            {message[pathname]}
          </TitleBoldText>
        </Col>
        { (pathname === "/PrincipalPage/profile") && <Col className="edit-profile pull-right">
              <span className="update-button">
                 <Button  className="edit-profile-label" onClick={enableUpdateProfile} variant="link"> <FormattedMessage {...messages.editProfile} /></Button>
              </span>
        </Col>}
      </Row>
      <Row>
        <SeparatorLine width='90%'/>
      </Row>
    </FormGroup>
  );
}
export default injectIntl(MenuPage);
