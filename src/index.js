import invariant from 'invariant';
import Promise from 'bluebird';
import WinChan from 'winchan';

const SUPPORTED_PROVIDERS = {
  facebook: {
    windowFeatures: { width: 500, height: 467 },
  },
  github: {
    windowFeatures: { width: 1000, height: 600 },
  },
  google: {
    windowFeatures: { width: 500, height: 467 },
  },
  twitter: {
    windowFeatures: { width: 450, height: 635 },
  },
};

function stringifyWindowFeatures(windowFeatures) {
  return Object.keys(windowFeatures)
    .map((key) => `${key}=${windowFeatures[key]}`)
    .join(',');
}

class Reindex {
  /**
   * Constructs a new `Reindex` instance from a Reindex app URL.
   */
  constructor(url) {
    this._url = url;
  }

  /**
   * Login via given `providerName`.
   */
  login(providerName) {
    const provider = SUPPORTED_PROVIDERS[providerName];
    invariant(
      provider,
      'Reindex.login(...): unknown provider "%s"',
      providerName
    );
    return new Promise((resolve, reject) => {
      WinChan.open({
        url: `${this._url}/auth/${providerName}`,
        relay_url: `${this._url}/auth/channel`,
        window_features: stringifyWindowFeatures(provider.windowFeatures),
      }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}

export default Reindex;
