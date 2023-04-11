import {
  BareClient, buildPagedRequest,
  Collection,
  IBrand,
  IBrandCreatePayload, IConfig,
  PagedRequest,
  PagedResults, Resource
} from '@hmdlr/types';

export default class Scanphish {
  private readonly api = 'api';

  private readonly configsApi = `${this.api}/config`;

  constructor(
    private client: BareClient
  ) {}

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

  public async createBrand(brand: IBrandCreatePayload): Promise<IBrand> {
    return this.client.post<IBrand>(
      `${this.api}/brand`,
      brand
    );
  }

  /* ===================== */
  /* Configs */

  /**
   * Returns a list of all the configs the user has access to
   * @param request
   * @param includeBrands
   */
  public async listConfigs(request: PagedRequest, includeBrands = false) {
    return this.client.get<PagedResults<IConfig>>(
      `${this.configsApi}/?includeBrands=${includeBrands}&${buildPagedRequest(request)}`
    ).then(PagedResults.fromPagedJson as any);
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
