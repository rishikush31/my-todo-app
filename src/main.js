// @flow
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import {FetchToken} from 'fusion-tokens';
import UniversalEventsPlugin, {UniversalEventsToken} from 'fusion-plugin-universal-events';
import UniversalLoggerPlugin from 'fusion-plugin-universal-logger';
import root from './root.js';
import fetch from 'isomorphic-fetch';

export default () => {
  const app = new App(root);

  // Provide fetch for server and client
  app.register(FetchToken, fetch);

  // Universal events for logging and events
  app.register(UniversalEventsToken, UniversalEventsPlugin);

  // Logger plugin (automatic SSR + client logging)
  app.register(UniversalLoggerPlugin);

  // Styling and routing
  app.register(Styletron);
  app.register(Router);

  return app;
};
