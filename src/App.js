import { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routes from './routes';
import AppBar from './components/AppBar';
import Loader from 'react-loader-spinner';

const Homepage = lazy(() =>
import('./views/Homepage' /* webpackChunkName: "Homepage" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import('./views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */),
);
class App extends Component {
  render() {
    return (
      <>
        <AppBar />

        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={routes.home} component={Homepage} />
            <Route exact path={routes.movies} component={MoviesPage} />
            <Route
              path={routes.movieDetailsPage}
              component={MovieDetailsPage}
            />
            <Route component={Homepage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
