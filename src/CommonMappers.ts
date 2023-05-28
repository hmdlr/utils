/**
 * Get the CDN path for a given path
 * @param storephishBase The storephish Base URL (e.g. https://store.starphish.app)
 * @param path
 */
export const getCDNPath = (storephishBase: string, path: string) => {
  if (!path) {
    return `${storephishBase}/api/storage/static/404.svg`;
  }
  let foundPath: string | undefined;
  if (path.startsWith('http')) {
    foundPath = path;
  } else if (path.startsWith('/storage')) {
    foundPath = `${storephishBase}/api${path}`;
  } else if (path.startsWith('/static')) {
    foundPath = `${storephishBase}/api/storage${path}`;
  } else if (path.startsWith('/')) {
    foundPath = `${storephishBase}/api/storage${path}`;
  } else {
    foundPath = `${storephishBase}/api/storage/${path}`;
  }

  // replace all double slashes with single slash, with the exception of ://
  return foundPath.replace(/([^:]\/)\/+/g, '$1');
};
