import { Service } from 'typedi';
import { getInternalClient, InternalStarphishClient } from '../client/StarphishClient';
import { Microservice } from '../Microservice';

@Service()
export default class Authphish {
  private readonly uri = 'api';

  constructor(
    private client: InternalStarphishClient = getInternalClient()
  ) {}

  public async hasPermission({
    bearer,
    resource,
  }:
  {
    bearer: string,
    resource: string,
  }): Promise<boolean> {
    const result = await this.client.get<{
      hasAccess: boolean
    }>(
      Microservice.Authphish,
      `${this.uri}/groups/access/${resource}`,
      { headers: { Authorization: `Bearer ${bearer}` } }
    );
    return result.hasAccess;
  }
}
