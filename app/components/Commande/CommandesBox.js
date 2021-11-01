import { Row, Col } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Field, reduxForm, Form } from 'redux-form';
import { BsPlus } from 'react-icons/bs';
import messages from './messages';
import TitleBoldText from '../lib/TitleBoldText';
import SeparatorLine from '../lib/SeparatorLine';
import CommandeList from './CommandeList';
import data from './data.json';
import './commande.css';
import { CgEuro } from 'react-icons/cg';
import TextField from '../lib/FormInputs/TextField';
import '../../www/style/appstyle.scss';

let CommandesBox = ({ order = {} }) => {

  const [productTotal, setProductTotal] = useState(0);
  useEffect(() => {
    let subTotal=0;
    order && order.orderDetails.forEach(command => {
      subTotal += command.quantity * command.price;
      });
    if(!productTotal) setProductTotal(subTotal);
    }
  );
  return(
  <div className="box-with-border-radius">
    <Row className="ml-0 mr-0">
      <TitleBoldText size="22px" className="link-color">
        <BsPlus className="link-color" />
        <FormattedMessage {...messages.addCommandeTitle} />
      </TitleBoldText>
    </Row>{' '}
    <SeparatorLine />
    <CommandeList productTotal={productTotal} setProductTotal = {(v) => setProductTotal(v)} listCommande={order.orderDetails} />
    <SeparatorLine />
    <Row className="ml-0 mr-0">
      <div>
        <TitleBoldText size="18px">
          <FormattedMessage {...messages.subTotalTitle} />
        </TitleBoldText>
      </div>
      <div className="ml-auto">
        <TitleBoldText size="18px">
          {productTotal}
          <CgEuro />
        </TitleBoldText>
      </div>
    </Row>
    <Row className="ml-0 mr-0 mt-2">
      <div>
        <TitleBoldText className="link-color" size="18px">
          <FormattedMessage {...messages.reduceTitle} />
        </TitleBoldText>
      </div>
      <div className="ml-auto">
        <TitleBoldText size="19px">
          {productTotal / 4}
          <CgEuro />
        </TitleBoldText>
      </div>
    </Row>
    <SeparatorLine />
    <Row className="ml-0 mr-0">
      <div>
        <TitleBoldText size="18px">
          <FormattedMessage {...messages.totalTitle} />
        </TitleBoldText>
      </div>
      <div className="ml-auto">
        <TitleBoldText size="18px">
          {productTotal - (productTotal / 4)}
          <CgEuro />
        </TitleBoldText>
      </div>
    </Row>
    <Form className="mt-5">
      <Field
        name="codePromo"
        type="text"
        placeholder="Utiliser le code promo"
        component={TextField}
        className="form-control-custom"
      />
    </Form>
    <SeparatorLine className="mt-0" />
  </div>
)};

// eslint-disable-next-line no-const-assign
CommandesBox = reduxForm({
  // a unique name for the form
  form: 'commandeForm',
})(CommandesBox);

export default injectIntl(CommandesBox);
