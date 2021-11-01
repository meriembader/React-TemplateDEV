import { defineMessages } from 'react-intl';

export const scope = 'app.components.commande';

export default defineMessages({
  addCommandeTitle: {
    id: `${scope}.commandes.link.add`,
    defaultMessage: 'Ajouter des articles ',
  },
  livraisonTitle: {
    id: `${scope}.commandes.livraison.title`,
    defaultMessage: 'Détails de la livraison',
  },
  adresseTitle: {
    id: `${scope}.commandes.livraison.adresse`,
    defaultMessage: 'Adresse',
  },
  nextButton: {
    id: `${scope}.commandes.livraison.next.button`,
    defaultMessage: 'Valider et continuer',
  },
  instructionTitle: {
    id: `${scope}.commandes.livraison.instruction`,
    defaultMessage: 'Instruction de la livraison',
  },
  deleteCommandeTitle: {
    id: `${scope}.commandes.link.delete`,
    defaultMessage: 'Supprimer ',
  },
  totalTitle: {
    id: `${scope}.commandes.total`,
    defaultMessage: 'Total ',
  },
  subTotalTitle: {
    id: `${scope}.commandes.subTotal`,
    defaultMessage: 'Sous-total ',
  },
  reduceTitle: {
    id: `${scope}.commandes.reduce`,
    defaultMessage: '-25% de réduction',
  },
});
