import { Inject, Service } from 'typedi';
import { BareClient } from '@hmdlr/types';

@Service()
export default class Scanphish {
  private readonly api = 'api';

  constructor(
    @Inject() private client: BareClient
  ) {}

  // public async hasPermission({
  //   bearer,
  //   resource,
  // }:
  // {
  //   bearer: string,
  //   resource: string,
  // }): Promise<boolean> {
  //   try {
  //     const result = await this.client.get<{
  //       hasAccess: boolean
  //     }>(
  //       `${this.api}/groups/access/${resource}`,
  //       { headers: { Authorization: `Bearer ${bearer}` } }
  //     );
  //     return result.hasAccess;
  //   } catch (e) {
  //     return false;
  //   }
  // }
}
