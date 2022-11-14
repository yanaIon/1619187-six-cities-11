//pages импортируем в app, что бы дальше уже сформировалась карта сайта для перехода между страницами
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {HelmetProvider} from 'react-helmet-async'; //позволяет работать с хедером. Например, задавать title

import MainScreen from '../../pages/main-screen/main-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import FavouritePrivateRoute from '../favourite-private-route/favourite-private-route';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import {Offer} from '../../types/offer';

type AppScreenProps = {
  offers: Offer[];
}

function App({offers}: AppScreenProps): JSX.Element { //принимает массив моковых данных из индекс
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <LoginPrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <LoginScreen />
              </LoginPrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <FavouritePrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesScreen offers={offers}/>
              </FavouritePrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={<PropertyScreen offers={offers}/>}
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>

      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
