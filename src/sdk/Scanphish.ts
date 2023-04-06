import { BareClient, Collection, IBrand, IBrandCreatePayload } from '@hmdlr/types';

export default class Scanphish {
  private readonly api = 'api';

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
    return this.client.get<{
      candidates: string[]
    }>(
      `${this.api}/brand/enhance/${brandId}`
    );
  }

  public async createBrand(brand: IBrandCreatePayload): Promise<IBrand> {
    return this.client.post<IBrand>(
      `${this.api}/brand`,
      brand
    );
  }
}
