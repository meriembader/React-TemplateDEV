import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dropdown,  Row} from 'react-bootstrap';
import useReactRouter from 'use-react-router';
import { BsPerson, BsHeart, BsChat } from 'react-icons/bs';
import { VscTag } from 'react-icons/vsc';
import espaceDesac from '../../www/icons/menu/espaceDesac.svg';
import panierDesac from '../../www/icons/menu/panierDesac.svg';
import './MainLanding.scss';
import DetailsBoldText from '../../components/lib/DetailsBoldText';
import DetailsText from '../../components/lib/DetailsText/DetailsText';
import data from '../../components/Users/data.json';
import MyDishLogo from '../../www/icons/myDish_logo.svg';
import messages from '../../components/mydishNav/messages';


const DropDownNavbar = ({
  intl: { formatMessage },
  firstName,
  step
}) => {
  const { history } = useReactRouter();
  return(
    <Row>
      <div className="ml-5">
        <img
          src={MyDishLogo}
          width="164.2"
          height="50"
          className="d-inline-block align-top"
          alt="My Dish Logo"
        />
      </div>
      <div className="pr-5 ml-auto mr-5">
        <Row className="row-menu">
          <Dropdown alignLeft drop="left">
            <Dropdown.Toggle
              variant="light"
              className="bg-white border-0 p-0"
              id="dropdown-basic"
            >
              <img alt="user_image" src={espaceDesac} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="my-dropdown">
              <Dropdown.Item href="/PrincipalPage/profile">
                {' '}
                <BsPerson />
                <FormattedMessage
                  {...messages.profileTitle}
                  className="title-menu"
                />
              </Dropdown.Item>
              <Dropdown.Item href="/PrincipalPage/favoris">
                {' '}
                <BsHeart />
                <FormattedMessage
                  {...messages.favorisTitle}
                  className="title-menu"
                />{' '}
              </Dropdown.Item>
              <Dropdown.Item href="/PrincipalPage/Reservation">
                {' '}
                <VscTag />
                <FormattedMessage
                  {...messages.reservationTitle}
                  className="title-menu"
                />{' '}
              </Dropdown.Item>
              <Dropdown.Item href="/PrincipalPage/opinion">
                {' '}
                <BsChat />
                <FormattedMessage
                  {...messages.opinionTitle}
                  className="title-menu"
                />{' '}
              </Dropdown.Item>
              <Dropdown.Item href="/PrincipalPage/opinion">
                {' '}
                <FormattedMessage
                  {...messages.spaceTitle}
                  className="title-menu"
                />{' '}
              </Dropdown.Item>
              <Dropdown.Item href="/Login">
                {' '}
                <DetailsText className="disconnect-menu">
                  <FormattedMessage {...messages.disconnect} />
                </DetailsText>{' '}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <DetailsBoldText className="name">{firstName}</DetailsBoldText>
          <img
            alt="user_image"
            className="image-menu"
            src={panierDesac}
            onClick={() => history.push('/Commande')}
          />
        </Row>
      </div>
    </Row>
  );
}
export default injectIntl(DropDownNavbar);
