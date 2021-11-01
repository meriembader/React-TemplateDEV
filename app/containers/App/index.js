/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NoteComponent from '../../components/Note/Loadable';
import MenuNav from '../../components/mydishNav/Loadable';
import GlobalStyle from '../../www/style/global-styles';
import '../../www/style/appstyle.scss';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/Note" component={NoteComponent} />
        <Route exact path="/Menu" component={MenuNav} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
