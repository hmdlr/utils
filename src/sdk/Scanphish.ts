import {
  BareClient,
  buildPagedRequest,
  Collection,
  IBrand,
  IBrandCreatePayload, IBrandUpdatePayload,
  IConfig,
  IConfigCreatePayload,
  PagedRequest,
  PagedResults, WebsiteInfo
} from '@hmdlr/types';
import FormData from 'form-data';

export default class Scanphish {
  private readonly api = 'api';

  private readonly configsApi = `${this.api}/config`;

  private readonly scanApi = `${this.api}/scan`;

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
      `${this.scanApi}`,
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

  public async updateBrand(
    brandId: string,
    payload: IBrandUpdatePayload
  ): Promise<{ brand: IBrand }> {
    return this.client.put<{ brand: IBrand }>(
      `${this.api}/brand/${brandId}`,
      payload
    );
  }

  /**
   * Deletes a brand
   */
  public async deleteBrand(
    brandId: string
  ): Promise<void> {
    return this.client.delete<any>(
      `${this.api}/brand/${brandId}`
    );
  }

  /**
   * Returns a list of all the brands the user has access to
   * @param request
   * @param fromGroup
   */
  public async listBrands(
    request: PagedRequest,
    fromGroup?: string
  ) {
    return this.client.get<PagedResults<IBrand>>(
      `${this.api}/brand?${buildPagedRequest(request)}&fromGroup=${fromGroup}`
    )
      .then(PagedResults.fromPagedJson as any);
  }

  /**
   * Search among brands, with possiblity of filtering with groups
   * @param request
   * @param query The search string
   * @param fromGroup the group you want paged results from
   */
  public async searchBrands(
    request: PagedRequest,
    query: string,
    fromGroup?: string
  ) {
    return this.client.get<PagedResults<IBrand>>(
      `${this.api}/brand/search?${buildPagedRequest(request)}&query=${query}&fromGroup=${fromGroup}`
    )
      .then(PagedResults.fromPagedJson as any);
  }

  /* ===================== */

  /* Configs */

  /**
   * Returns a list of all the configs the user has access to
   * If `forGroup` is provided, it will return the configs for that group if the user has access
   * @param request
   * @param includeBrands
   * @param forGroup
   */
  public async listConfigs(
    request: PagedRequest,
    includeBrands = false,
    forGroup?: string
  ) {
    return this.client.get<PagedResults<IConfig>>(
      // eslint-disable-next-line max-len
      `${this.configsApi}/?includeBrands=${includeBrands}&fromGroup=${forGroup}&${buildPagedRequest(request)}`
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

  /**
   * Retrieves the info for a given website
   * @param websiteDomain
   */
  public async info(websiteDomain: string): Promise<WebsiteInfo> {
    return this.client.get<WebsiteInfo>(
      `${this.scanApi}/info/${websiteDomain}`
    );
  }
}
