import { defineMessages } from 'react-intl';

export const scope = 'app.components.registration';

export default defineMessages({

  errorPutSMSCode:{
    id: `${scope}.errorPutSMSCode`,
    defaultMessage: 'Merci de vérifier votre code SMS!'
  },
  successPutSMSCode:{
    id: `${scope}.errorPutSMSCode`,
    defaultMessage: 'SMS est confirmé'
  },
  errorMsgPwdLogin:{
    id: `${scope}.errorMsgPwdLogin`,
    defaultMessage: 'Vérifiez votre login/mot de passe!'
  },
  suucessMsgUpdatePsw:{
    id: `${scope}.suucessMsgUpdatePsw`,
    defaultMessage: 'Votre Mot de pass a été bien mis à jour!'
  },
  errorSendSMSCode:{
    id: `${scope}.errorSendSMSCode`,
    defaultMessage: 'Merci de renvoyer votre code SMS!'
  },
  successSendSMSCode:{
    id: `${scope}.successSendSMSCode`,
    defaultMessage: 'SMS est bien envoyé!'
  },
  alertForm: {
    id: `${scope}.alertForm`,
    defaultMessage: 'Le formulaire contient des erreurs',
  },
  successForm: {
    id: `${scope}.alertForm`,
    defaultMessage: 'Le profil a été mis jour avec succès',
  },
  deleteSuccess: {
    id: `${scope}.deleteSuccess`,
    defaultMessage: 'l avis a été supprimé avec succés.',
  },
  bienvenueTitle: {
    id: `${scope}.bienvenuTitle`,
    defaultMessage: 'Bienvenue sur mydish',
  },
  bienvenueTitle1: {
    id: `${scope}.bienvenuTitle1`,
    defaultMessage: 'Bienvenue à nouveau',
  },
  forgetPassword: {
    id: `${scope}.forgetPassword`,
    defaultMessage: 'Mot de passe oublié',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'Nouveau Mot de passe',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'Ancien Mot de passe',
  },

  forgetPassword1: {
    id: `${scope}.forgetPassword`,
    defaultMessage: 'Mot de passe oublié?',
  },
  verifyCode: {
    id: `${scope}.verifyCode`,
    defaultMessage: 'Vérification par SMS',
  },

  mydishTitle: {
    id: `${scope}.input.mydishTitle`,
    defaultMessage: 'mydish',
  },
  phoneNumberPlaceholder: {
    id: `${scope}.input.number.placeholder`,
    defaultMessage: 'Numéro de téléphone portable',
  },
  emailPlaceholder: {
    id: `${scope}.input.email.placeholder`,
    defaultMessage: 'Adresse e-mail',
  },
  emailPlaceholder1: {
    id: `${scope}.input.email1.placeholder`,
    defaultMessage: 'E-mail ou numéro de télephone portable.',
  },

 passwordIncorrect: {
    id: `${scope}.input.password.error`,
    defaultMessage: 'Mot de passe doit contenir entre 8 et 15 caractères dont une lettre miniscule, une lettre majuscule, un chiffre et un caratère spéciale ',
  },
  fieldRequire: {id: "core.forms.validation.field.require", defaultMessage: 'Obligatoire'},
  verifyPassword: {id: "core.forms.validation.verifyPassword", defaultMessage: 'Les deux mots de passe ne sont pas identiques'},
  invalidEmail: {id: "core.forms.validation.invalidEmail", defaultMessage: 'Adresse e-mail invalide'},

  loginFailed:{
    id: `${scope}.input.login.failed`,
    defaultMessage: 'Mot de passe incorrect',
  },

  codePlaceholder: {
    id: `${scope}.input.code.placeholder`,
    defaultMessage: 'Code de confirmation à 4 chiffres',
  },
  phoneMessage: {
    id: `${scope}.number.message`,
    defaultMessage:
      'Saisissez votre numéro de téléphone portable, et nous vous enverrons',
  },
  passwordPlaceholder: {
    id: `${scope}.pswd.placeholder`,
    defaultMessage: 'Saisissez votre mot de passe',
  },
  oldPasswordPlaceholder: {
    id: `${scope}.oldpswd.placeholder`,
    defaultMessage: 'Saisissez votre ancien mot de passe',
  },
  passwordPlaceholder1: {
    id: `${scope}.pswd.placeholder`,
    defaultMessage: 'Mot de passe',
  },
  confirmedPasswordPlaceholder: {
    id: `${scope}.confirmed.pswd.placeholder`,
    defaultMessage: 'Confirmer le nouveau mot de passe',
  },
  passwordMessage: {
    id: `${scope}.pswd.message`,
    defaultMessage: 'Saisissez votre mot de passe',
  },
  newPasswordMessage: {
    id: `${scope}.newpswd.message`,
    defaultMessage:
      'Saisissez un nouveau mot de passe pour votre compte',
  },
  oldPasswordMessage: {
    id: `${scope}.oldpswd.message`,
    defaultMessage:
      'Saisissez l ancien mot de passe pour votre compte',
  },
  namePlaceholder: {
    id: `${scope}.name.placeholder`,
    defaultMessage: 'Nom',
  },
  snamePlaceholder: {
    id: `${scope}.surname.placeholder`,
    defaultMessage: 'Prénom',
  },
  nameTitle: {
    id: `${scope}.name.title`,
    defaultMessage: 'Nom',
  },
  nomMessage: {
    id: `${scope}.nom.message`,
    defaultMessage: 'Saisissez votre nom complet',
  },
  phoneMessage1: {
    id: `${scope}.number.message1`,
    defaultMessage: 'un code par SMS.',
  },
  codeMessage: {
    id: `${scope}.code.message`,
    defaultMessage: 'Saisissez le code envoyé',
  },
  codeMessage1: {
    id: `${scope}.code1.message`,
    defaultMessage: 'Saisissez le code que vous avez reçu par SMS.',
  },
  codeMessage2: {
    id: `${scope}.code2.message`,
    defaultMessage: 'Envoyer à nouveau le code par',
  },
  SMS: {
    id: `${scope}.sms.message`,
    defaultMessage: ' SMS',
  },
  emailMessage: {
    id: `${scope}.email.message`,
    defaultMessage: 'Saisissez votre adresse e-mail',
  },
  emailMessage1: {
    id: `${scope}.email.message1`,
    defaultMessage:
      'Connectez-vous avec votre e-mail ou votre numéro de télephone portable.',
  },
  nextButton: {
    id: `${scope}.next.button`,
    defaultMessage: 'Suivant',
  },
  cancelButton: {
    id: `${scope}.cancel.button`,
    defaultMessage: 'Annuler',
  },
  validateButton: {
    id: `${scope}.validate.button`,
    defaultMessage: 'Valider',
  },
  compteMessage: {
    id: `${scope}.compteMessage`,
    defaultMessage: 'Vous avez déjà un compte?',
  },
  compteMessage1: {
    id: `${scope}.compteMessage1`,
    defaultMessage: 'Vous êtes nouveau?',
  },
  seConnecter: {
    id: `${scope}.connectMessage`,
    defaultMessage: 'connectez-vous',
  },
  seConnecterGoogle: {
    id: `${scope}.seConnecterGoogle`,
    defaultMessage: 'Connectez-vous avec Google',
  },
  seConnecterFace: {
    id: `${scope}.seConnecterFace`,
    defaultMessage: 'Connectez-vous avec Facebook',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Créez un compte',
  },
  felicitationMessage: {
    id: `${scope}.felicitation.message`,
    defaultMessage: 'Félicitations {firstName}!',
  },
  registrationSucces: {
    id: `${scope}.registration.Succes`,
    defaultMessage: 'Votre compte a été créé avec succès ',
  },
  mydishButton: {
    id: `${scope}.mydish.button`,
    defaultMessage: 'Commencer l\'expérience mydish',
  },
  mydishPage: {
    id: `${scope}.mydishPage.button`,
    defaultMessage: 'Retour à l\'accueil',
  },
  retourMessage: {
    id: `${scope}.mydishPage.retourMessage`,
    defaultMessage: 'Un e-mail a été envoyé à l\'adresse {maskedEmail}.',
  },
  retourMessage1: {
    id: `${scope}.mydishPage.retourMessage1`,
    defaultMessage: 'Utilisez le lien pour réinitialiser votre mot de passe.',
  },
  codePostal: {
    id: `${scope}.profile.codePostal`,
    defaultMessage: 'Code postal',
  },
  adresse: {
    id: `${scope}.profile.adresse`,
    defaultMessage: 'Adresse',
  },
  countryLabel: {
    id: `${scope}.country.label`,
    defaultMessage: 'Pays',
  },
  emailLabel: {
    id: `${scope}.email.label`,
    defaultMessage: 'E-mail',
  },
  password: {
    id: `${scope}.password.label`,
    defaultMessage: 'Mot de passe',
  },
  carte: {
    id: `${scope}.carte.label`,
    defaultMessage: 'Carte bancaire',
  },
  nocard: {
    id: `${scope}.nocard.label`,
    defaultMessage: 'Pas-de-carte-ajouté !',
  },
});
