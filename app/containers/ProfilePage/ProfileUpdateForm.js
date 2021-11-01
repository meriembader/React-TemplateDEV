import React, { Component } from 'react'
import ProfileForm  from './ProfileForm';
import AddPaymentCardForm from './AddPaymentCardForm';
import { injectIntl } from 'react-intl';

class ProfileUpdateForm extends Component {

  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit, disabled } = this.props;
    const { page } = this.state;
    return (
      <div className= "profil-section">
        {page === 1 && <ProfileForm onAddNewCard={this.nextPage} onSubmit={this.nextPage} disabled={disabled}/>}
        {page === 2 && <AddPaymentCardForm path = {'user'} onSubmit={this.previousPage}/>}
      </div>
    )
  }
}

ProfileUpdateForm.propTypes = {
}

export default injectIntl(ProfileUpdateForm);
