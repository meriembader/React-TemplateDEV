import React from 'react';
import { injectIntl } from 'react-intl';
import LivraisonContainer from '../../../components/Commande/LivraisonContainer';

const CommandeContainer = () => (
  <div className="landing-body">
    <LivraisonContainer />
  </div>
);
export default injectIntl(CommandeContainer);
