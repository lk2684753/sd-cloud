import { setElectronLocalStorage } from './utils/common';

export function render(oldRender: any) {
  return oldRender();
}

export function patchRoutes(routes: any) {
  return routes;
}

export async function onRouteChange(arg: any) {
  let { routes, matchedRoutes, location, action } = arg;
  setElectronLocalStorage();
  if (matchedRoutes.length) {
    let pageTitle = matchedRoutes[matchedRoutes.length - 1].route.title;
    if (pageTitle) {
      document.title = pageTitle;
    }
  }
}
