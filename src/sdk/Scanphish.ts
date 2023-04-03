import { BareClient, Collection } from '@hmdlr/types';

export default class Scanphish {
  private readonly api = 'api';

  constructor(
    private client: BareClient
  ) {}

  public async scan(
    collection: Collection
  ): Promise<any> {
    return this.client.post<any>(
      `${this.api}/scan`,
      collection
    );
  }
}
