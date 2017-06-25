import { browserHistory } from "react-router";
import BaseComponent from "./base_component";
import urlLib from "../libs/url_lib";

class RoutingComponent extends BaseComponent {

  constructor(props) {
    super(props);
  }

  /**
   * redirige l'utilisateur vers une page de l'application
   * @param {string} route - la route ou rediriger
   * @param {object?} queryParams - les paramètres d'url à ajouter sous forme d'un objet clé/valeur
   * @param {number?} delay - le délais avant de lancer la redirection
   */
  redirect(route, queryParams, delay) {
    if (typeof (queryParams) === "number") {
      delay = queryParams;
      queryParams = undefined;
    }

    const queryString = urlLib.createQueryString(queryParams);
    setTimeout(() => {
      browserHistory.push(route + queryString);
    }, delay);
  }

  /**
   * renvoie la valeur d'un paramtère de l'url
   * @param {string} name - la nom du param à rechercher
   * @param {string} url - l'url dans laquelle rechercher
   */
  getParameterByName(name, url) {
    if (!process.env.BROWSER)
      return;
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /**
   * Permet d'ajouter des paramètres dans l'url
   * @param {object} queryParams - les paramètres d'url à ajouter sous forme d'un objet clé/valeur
   */
  pushUrlState(queryParams) {
    let queryString = urlLib.createQueryString(queryParams);
    browserHistory.push({ ...location, search: queryString });
  }

  getUrlState() {
    if (process.env.BROWSER)
      return urlLib.queryStringToObj(window.location.search);
  }

  /**
   * Permet de récuperer la query string de l'url
   * @param {string} url - l'url dans laquelle rechercher
   */
  getRawQueryString(url) {
    if (!process.env.BROWSER)
      return;
    if (!url) url = window.location.href;
    let query = url;
    query = query.split("?");
    if (query.length === 1)
      return ("");
    return (query[1]);
  }
}

export default RoutingComponent;