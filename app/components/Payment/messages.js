/*
 * ProductDetails Messages
 *
 * This contains all the text for the Product Details Modal .
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.payment';

export default defineMessages({
  paymentMethodTitle: {
    id: `${scope}.payment.method.title`,
    defaultMessage: 'Moyen de payment ',
  },
  paymentMethodDebitCardTitle: {
    id: `${scope}.payment.method.debit.card.title`,
    defaultMessage: 'Carte de crédit ou de débit  ',
  },
  paymentMethodCashTitle: {
    id: `${scope}.payment.method.cash.title`,
    defaultMessage: 'En espèces ',
  },
  paymentMethodBonTitle: {
    id: `${scope}.payment.method.bon.title`,
    defaultMessage: 'Bons',
  },
  validatePaymentMethodBtn: {
    id: `${scope}.validate.payment.method.btn.title`,
    defaultMessage: 'Passer au payment ',
  },
  restaurantTitleLabel: {
    id: `${scope}.restaurant.title.label`,
    defaultMessage: 'Titre-restaurant',
  },
  addCardTitleLabel: {
    id: `${scope}.add.card.title.label`,
    defaultMessage: 'Ajouter une carte',
  },
  next: {
    id: `common.next.label`,
    defaultMessage: 'Suivant',
  },
  cardNumberLabel: {
    id: `${scope}.card.number.label`,
    defaultMessage: 'Numéro de carte',
  },
  cardExpirationDateLabel: {
    id: `${scope}.card.expiration.date.label`,
    defaultMessage: 'Date d’expiration',
  },
  cardExpirationDatePlaceholder: {
    id: `${scope}.card.expiration.date.placeholder`,
    defaultMessage: 'MM/AA',
  },
  cardSecurityCodeLabel: {
    id: `${scope}.card.security.code.label`,
    defaultMessage: 'Code de sécurité',
  },
  cardSecurityCodePlaceholder: {
    id: `${scope}.card.security.code.placeholder`,
    defaultMessage: 'Code de 3 chiffres situé au dos de la carte',
  },
  countryLabel: {
    id: `common.country.label`,
    defaultMessage: 'Pays',
  },
  addBonTitleLabel: {
    id: `${scope}.add.bon.title.label`,
    defaultMessage: 'Ajouter le bon',
  },
  addBonLabel: {
    id: `${scope}.add.bon.field.label`,
    defaultMessage: 'Taper le code',
  },
  noPromoCodeMessage: {
    id: `${scope}.no.promocode.message`,
    defaultMessage: 'Vous-navez-pas-de-bon-en-ce-moment',
  },
});
