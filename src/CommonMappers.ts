/**
 * Get the CDN path for a given path
 * @param storephishApi The storephish API URL (e.g. https://store.starphish.app/api)
 * @param path
 */
export const getCDNPath = (storephishApi: string, path: string) => {
  if (!path) {
    return `${storephishApi}/storage/static/404.svg`;
  }
  let foundPath: string | undefined;
  if (path.startsWith('http')) {
    foundPath = path;
  } if (path.startsWith('/storage')) {
    foundPath = `${storephishApi}${path}`;
  } if (path.startsWith('/static')) {
    foundPath = `${storephishApi}/storage${path}`;
  }
  if (path.startsWith('/')) {
    foundPath = `${storephishApi}/storage${path}`;
  }
  foundPath = `${storephishApi}/storage/${path}`;

  // replace all double slashes with single slash, with the exception of ://
  return foundPath.replace(/([^:]\/)\/+/g, '$1');
};
