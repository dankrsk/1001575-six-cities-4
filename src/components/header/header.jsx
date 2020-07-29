import React from 'react';
import {AppRoutes} from '../../const.js';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AUTH_INFO_PROP_TYPES} from '../../shared/types.js';

Header.propTypes = {
  authInfo: AUTH_INFO_PROP_TYPES.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

function Header(props) {
  const {authInfo, isAuth} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link header__logo-link--active"
              to={AppRoutes.MAIN}
            >
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={isAuth ? AppRoutes.FAVORITES : AppRoutes.LOGIN}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">
                    {isAuth
                      ? authInfo.email
                      : `Sign In`
                    }
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
