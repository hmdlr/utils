import {
  BareClient,
  buildPagedRequest,
  Collection,
  IBrand,
  IBrandCreatePayload,
  IConfig,
  IConfigCreatePayload,
  PagedRequest,
  PagedResults
} from '@hmdlr/types';
import FormData from 'form-data';

export default class Scanphish {
  private readonly api = 'api';

  private readonly configsApi = `${this.api}/config`;

  constructor(
    private client: BareClient
  ) {
  }

  /* ===================== */

  /* Scans */
  public async scan(
    collection: Collection
  ): Promise<any> {
    return this.client.post<any>(
      `${this.api}/scan`,
      collection
    );
  }

  /* ===================== */

  /* Brands */

  /**
   * Sends a crawler to the auth page and extract page layout, favicon and possible logos
   * @param brandId
   * @returns {Promise<{candidates: string[]}>} A list of possible logos
   */
  public async enhanceBrand(brandId: string): Promise<{
    candidates: string[]
  }> {
    return this.client.post<{
      candidates: string[]
    }>(
      `${this.api}/brand/enhance/${brandId}`,
      {}
    );
  }

  /**
   * Creates a new brand
   * @param brand
   */
  public async createBrand(brand: IBrandCreatePayload): Promise<{ brand: IBrand }> {
    return this.client.post<{ brand: IBrand }>(
      `${this.api}/brand`,
      brand
    );
  }

  /**
   * Returns a list of all the brands the user has access to
   * @param request
   */
  public async listBrands(request: PagedRequest) {
    return this.client.get<PagedResults<IBrand>>(
      `${this.api}/brand?${buildPagedRequest(request)}`
    )
      .then(PagedResults.fromPagedJson as any);
  }

  /* ===================== */

  /* Configs */

  /**
   * Returns a list of all the configs the user has access to
   * @param request
   * @param includeBrands
   * @param publicOnly
   */
  public async listConfigs(
    request: PagedRequest,
    includeBrands = false,
    publicOnly = false
  ) {
    return this.client.get<PagedResults<IConfig>>(
      // eslint-disable-next-line max-len
      `${this.configsApi}/?includeBrands=${includeBrands}&publicOnly=${publicOnly}&${buildPagedRequest(request)}`
    )
      .then(PagedResults.fromPagedJson as any);
  }

  /**
   * Creates a new config
   * @param config
   */
  public async createConfig(config: IConfigCreatePayload): Promise<IConfig> {
    // form data containing logo and name
    const formData = new FormData();
    formData.append('name', config.name);
    if (config.logo) {
      formData.append('logo', config.logo.buffer, 'logo');
    }

    return this.client.post<IConfig>(
      `${this.configsApi}`,
      formData
    );
  }

  /**
   * Will replace the current config's rulesets with the provided ones
   * @param configId
   * @param rulesets
   */
  public async addRulesetsToConfig(configId: string, rulesets: string[]) {
    return this.client.put<void>(
      `${this.configsApi}/${configId}/brands`,
      { brands: rulesets }
    );
  }

  /**
   * Returns a config
   * @param configId
   */
  public async getConfig(configId: string) {
    return this.client.get<IConfig>(
      `${this.configsApi}/${configId}`
    );
  }

  /**
   * Returns a list of all the active configs the user has access to
   */
  public async listPresets() {
    return this.client.get<IConfig[]>(
      `${this.configsApi}/preset`
    );
  }

  /**
   * Adds a config to the list of active configs
   * @param configId
   */
  public async savePreset(configId: string) {
    return this.client.post<void>(
      `${this.configsApi}/preset`,
      { configId }
    );
  }

  /**
   * Removes a config from the list of active configs
   * @param configId
   */
  public async deletePreset(configId: string) {
    return this.client.delete<void>(
      `${this.configsApi}/preset/${configId}`
    );
  }
}
