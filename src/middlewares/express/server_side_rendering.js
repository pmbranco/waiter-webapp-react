import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {createMemoryHistory, RouterContext, match} from 'react-router';
import {Provider} from 'react-redux';
import Helmet from 'react-helmet';
import {syncHistoryWithStore} from 'react-router-redux';
import {configure as configureStore} from '../../store';
import {default as routes} from '../../routes';
import config from '../../config';
import ApiCallLib from '../../libs/api_call_lib';

/**
 * middleware de gestion du rendu coté serveur
 * @param {object} manifest - le manifest contenant les urls des script js/css à inclure dans la page
 * @returns {function(*, *=)}
 */
function serverSideRendering (manifest) {
  return (req, res) => {
    const memoryHistory = createMemoryHistory(req.url);
    const store = configureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({history, routes: routes(store), location: req.url}, (err, redirectLocation, renderProps) => {
      if (err) {
        return res.status(500).end('Internal server error');
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (!renderProps) {
        return res.status(404).end('Not Found');
      }

      // first render to get component dispatch promises
      _renderView(store, renderProps, manifest);

      //get new state with promises inside
      const emptyState = store.getState();


      return Promise.all(emptyState.ssrPromises)
        .then(() => {
          // second render
          const htmlString = _renderView(store, renderProps, manifest);
          return res.status(200).end(htmlString);
        })
        .catch((err) => {
          return res.end(err.message)
        });
    });
  }
}

/**
 * effectue le rendu de la page html à renvoyer au client
 * @param {object} store - le store redux à utiliser pour effectuer le rendu
 * @param {object} renderProps - les propriétés de rendu (routes utilisé par exemple)
 * @param {object} manifest - le manifest contenant les urls des script js/css à inclure dans la page
 * @returns {string} - renvoie une html string de la page
 * @private
 */
function _renderView (store, renderProps, manifest) {
  const InitialComponent = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const state = store.getState();
  const title = 'Waiter';
  const componentHTML = ReactDOMServer.renderToString(InitialComponent);
  const head = Helmet.rewind();
  return `
      <!DOCTYPE html>
      <html style="height:100% !important">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
          <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
          ${head.title}
          ${head.meta}
          <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(state)};
          </script>
          <script src="https://js.stripe.com/v3/"></script>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAFzEEpqoJspKbTgb2vBhf3F5UP-NtLnHE"></script>
        </head>
        <body style="height:100%">
          <div id="app" style="height:100%"><div>${componentHTML}</div></div>
          <script type="application/javascript" src="/${manifest["vendor.js"]}"></script>
          <script type="application/javascript" src="/${manifest["app.js"]}"></script>
        </body>
      </html>`;
}

export default serverSideRendering;


