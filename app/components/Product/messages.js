/*
 * ProductDetails Messages
 *
 * This contains all the text for the Product Details Modal .
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.productDetails';

export default defineMessages({
  specialInsctruction: {
    id: `${scope}.special.instruction.title`,
    defaultMessage: 'Instructions spéciales ',
  },
  addToCommand: {
    id: `${scope}.add.to.command.title`,
    defaultMessage: 'Ajouter à la commande ',
  },
});
