import { BareClient, PagedResults, Resource } from '@hmdlr/types';

export default class Authphish {
  private readonly api = 'api';

  constructor(
    private client: BareClient
  ) {}

  public async hasPermission({
    bearer,
    resource,
  }:
  {
    bearer: string,
    resource: string,
  }): Promise<boolean> {
    try {
      const result = await this.client.get<{
        hasAccess: boolean
      }>(
        `${this.api}/groups/access/${resource}`,
        { headers: { Authorization: `Bearer ${bearer}` } }
      );
      return result.hasAccess;
    } catch (e) {
      return false;
    }
  }

  public async authenticate({
    username,
    password,
  }:
  {
    username: string,
    password: string,
  }): Promise<{ token: string }> {
    return this.client.post<{ token: string }>(
      `${this.api}/auth`,
      {
        username,
        password,
      }
    );
  }

  /* ===================== */
  /* Groups */
  public async listUserRootResources() {
    return this.client.get<PagedResults<Resource>>(
      `${this.api}/groups/root-resources`
    );
  }
}
