/**
 * route de la page
 * Il est possible d'ajouter des sous routes si besoin en implémentant la méthode getChildRoutes
 * doc: https://github.com/ReactTraining/react-router/blob/master/examples/huge-apps/routes/Course/index.js
 */


export default {
  path: "signin",

  getComponent(nextState, callback) {
    callback(null, require('../../ui/pages/signin/index').default);
  }
}