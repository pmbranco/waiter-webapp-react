import { enums } from '../helpers';

/**
 * permet d'afficher le loader sur la page
 * @param {boolean|null} isPageLoading - permet d'afficher ou masquer le loader, peut être null mais pas undefined
 * @param {string?} message - le message à afficher sur le loader (facultatif)
 * @returns {{type: string, isPageLoading: bool|null, message: string?}}
 */
 function loader (isPageLoading, message) {
  return {
    type: enums.get,
    isPageLoading: isPageLoading,
    message: message
  };
}

export default {
  loader
};
