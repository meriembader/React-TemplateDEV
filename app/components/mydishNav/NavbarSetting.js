import React, { memo } from 'react';
import { injectIntl } from 'react-intl';
import { Dropdown } from 'react-bootstrap';
import { compose } from 'redux';
import '../../containers/NavbarHeader/NavbarHeader.scss';
import {itemMenuMetadata} from './SettingsMenu'
import SettingsSubMenu from './SettingsSubMenu';


const NavbarSetting = () => {
  return (

    <Dropdown.Menu className="my-dropdown">
      {itemMenuMetadata
        .sort((a, b) => a.order - b.order)
        .map(item => (
          <SettingsSubMenu key={item.id} metadata={item} />

        ))}
    </Dropdown.Menu >
  )
}


export default compose(
  memo,
  injectIntl,
)(NavbarSetting);
