import React from 'react';
import Main from '../main/main.jsx';
import {Switch, Route, Router, Redirect} from 'react-router-dom';
import {AppRoutes} from '../../const.js';
import SignIn from '../sign-in/sign-in.jsx';
import customHistory from '../../history.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {connect} from 'react-redux';
import {getAuthorizationStatus, getAuthInfo} from '../../reducer/user/selectors.js';
import PropTypes from 'prop-types';
import Offer from '../offer/offer.jsx';
import {getOffers, getStatus, getComments, getNearPlaces, getFavoriteOffers} from '../../reducer/data/selectors.js';
import {getScreen} from '../../utils/common.js';
import {checkAuth} from '../../utils/common.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {OFFER_PROP_TYPES, AUTH_INFO_PROP_TYPES, COMMENTS_PROP_TYPES} from '../../shared/types.js';
import ScrollToTop from 'react-router-scroll-top';
import Favorites from '../favorites/favorites.jsx';

App.propTypes = {
  onLoginFormSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  nearPlaces: PropTypes.arrayOf(OFFER_PROP_TYPES).isRequired,
  status: PropTypes.string.isRequired,
  authInfo: AUTH_INFO_PROP_TYPES.isRequired,
  comments: PropTypes.arrayOf(COMMENTS_PROP_TYPES).isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  loadNearPlaces: PropTypes.func.isRequired,
  uploadComment: PropTypes.func.isRequired,
  favoriteOffers: PropTypes.shape().isRequired,
};

const MainWrapped = withActiveItem(Main);

function App(props) {
  const {
    onLoginFormSubmit,
    authorizationStatus,
    offers,
    status,
    authInfo,
    comments,
    onFavoriteButtonClick,
    loadComments,
    loadNearPlaces,
    nearPlaces,
    uploadComment,
    favoriteOffers,
  } = props;

  return (
    <Router history={customHistory}>
      <Switch>
        <Route exact path={AppRoutes.MAIN}>
          {getScreen(status, <MainWrapped onFavoriteButtonClick={onFavoriteButtonClick} />)}
        </Route>
        <Route exact path={AppRoutes.LOGIN}>
          {checkAuth(authorizationStatus)
            ? <Redirect to={AppRoutes.MAIN} />
            : <SignIn onLoginFormSubmit={onLoginFormSubmit} />
          }
        </Route>
        <Route
          exact path={`${AppRoutes.OFFER}/:id`}
          render={(routerProps) => getScreen(
              status,
              <ScrollToTop>
                <Offer
                  key={routerProps.match.params.id}
                  comments={comments}
                  nearPlaces={nearPlaces}
                  offers={offers}
                  authInfo={authInfo}
                  isAuth={checkAuth(authorizationStatus)}
                  onFavoriteButtonClick={onFavoriteButtonClick}
                  loadComments={loadComments}
                  loadNearPlaces={loadNearPlaces}
                  onReviewFormSubmit={uploadComment}
                  {...routerProps}
                />
              </ScrollToTop>
          )}
        >
        </Route>
        <Route exact path={AppRoutes.FAVORITES}>
          {getScreen(
              status,
              () => {
                if (checkAuth(authorizationStatus)) {
                  return <Favorites
                    authInfo={authInfo}
                    authorizationStatus={authorizationStatus}
                    offers={favoriteOffers}
                    onFavoriteButtonClick={onFavoriteButtonClick}
                  />;
                } else {
                  return <Redirect to={AppRoutes.LOGIN} />;
                }
              }
          )}
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
    authInfo: getAuthInfo(state),
    offers: getOffers(state),
    status: getStatus(state),
    comments: getComments(state),
    nearPlaces: getNearPlaces(state),
    favoriteOffers: getFavoriteOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginFormSubmit(authData) {
      dispatch(UserOperation.login(authData))
        .then(() => {
          dispatch(DataOperation.loadOffers())
            .then(() => {
              customHistory.push(AppRoutes.MAIN);
            });
        });
    },
    loadComments(offerId) {
      dispatch(DataOperation.loadComments(offerId));
    },
    uploadComment(offerId, commentData, onSuccess, onError) {
      dispatch(DataOperation.uploadComment(offerId, commentData))
        .then(() => onSuccess())
        .catch(() => onError());
    },
    loadNearPlaces(offerId) {
      dispatch(DataOperation.loadNearPlaces(offerId));
    },
    onFavoriteButtonClick(offerId) {
      dispatch(DataOperation.updateFavoriteField(offerId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
