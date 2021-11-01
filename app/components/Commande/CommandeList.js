import React from 'react';
import PropTypes from 'prop-types';
import Commande from './Commande';
import './commande.css';

const CommandeList = ({ listCommande, productTotal, setProductTotal }) => {
  const commandeList = listCommande.map(command => (
    <Commande commandeData={command} productTotal={productTotal} setProductTotal={setProductTotal}/>
  ));

  return <div>{commandeList}</div>;
};

CommandeList.propTypes = {
  listCommande: PropTypes.array,
};
export default CommandeList;
