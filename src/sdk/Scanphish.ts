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

  public async listConfigs(request: PagedRequest, includeBrands = false) {
    return this.client.get<PagedResults<IConfig>>(
      `${this.configsApi}/?includeBrands=${includeBrands}&${buildPagedRequest(request)}`
    ).then(PagedResults.fromPagedJson as any);
  }
}
