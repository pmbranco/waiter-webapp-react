/**
 * transforme un objet en chaine de carractère sous la forme d'une query string
 * les propriétés avec des valeurs null/undefined/"" ne sont pas ajoutées
 * @param {object} obj - l'objet à transformer
 * @returns {string} - la query string
 * @private
 */
function createQueryString (obj) {
  let result = '';
  if (!obj) {
    return result;
  }

  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      let currentPropValue = obj[k];
      if (currentPropValue || currentPropValue === 0 || currentPropValue === false) {

        if (!result) {
          result += '?';
        } else {
          result += '&';
        }

        result += `${k}=${currentPropValue}`;
      }
    }
  }

  return result;
}

/**
 * Convertie la query string d'une url en objet
 * @param {string} urlQueryString - la query string e l'url sous la forme: ?paramName=Value&param2=value2
 * @returns {{}}
 */
function queryStringToObj (urlQueryString) {
  if (!urlQueryString) {
    return {};
  }

  if (urlQueryString && urlQueryString.charAt(0) === "?") {
    urlQueryString = urlQueryString.substr(1);
  }

  let result = {};
  let urlParams = urlQueryString.split("&");
  urlParams.forEach((urlParam)=> {
    let param = (urlParam || "").split("=");
    if (param && param.length > 0) {
      result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
    }
  });

  return result;
}

/**
 * renvoie la valeur d'un paramètre de query string à partir de son nom
 * @param {string} name - le nom du paramètre dont on veut la valeur
 * @param {string?} url - l'url à parser. Si undefined recherche dans l'url de la page
 * @returns {string} - la valeur trouvée
 */
function getParameterByName (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default {
  createQueryString,
  getParameterByName,
  queryStringToObj
};