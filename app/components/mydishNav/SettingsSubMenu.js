import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SettingsMenu.scss';
import useReactRouter from 'use-react-router';

const SettingsSubMenu = ({ metadata }) => {
    if(metadata.hidden){
        return null;
    }else{
        const { location } = useReactRouter();
        const pathname = location? location.pathname : "";
        return (
          <li>
            <Link to={metadata.path} className={pathname===metadata.path?"nav-link-selected":"nav-link"} >
              {metadata.componentIcon && <metadata.componentIcon className="icon-menu" />}
              <span className={metadata.className?metadata.className:"title-menu"}>{metadata.label}</span>
            </Link>
          </li>);
    }
  };
SettingsSubMenu.propTypes = {
  metadata: PropTypes.object,
};
export default SettingsSubMenu;
