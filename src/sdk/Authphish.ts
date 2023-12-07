import { BareClient, buildPagedRequest, IGroup, PagedRequest, PagedResults, Resource } from '@hmdlr/types';

export default class Authphish {
  private readonly api = 'api';

  private readonly groupsApi = `${this.api}/groups`;

  constructor(
    private client: BareClient
  ) {
  }

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
  public async listGroups(request: PagedRequest) {
    return this.client.get<PagedResults<IGroup>>(
      `${this.groupsApi}?${buildPagedRequest(request)}`
    ).then(PagedResults.fromPagedJson as any);
  }

  public async listUserRootResources(request: PagedRequest) {
    return this.client.get<PagedResults<Resource>>(
      `${this.groupsApi}/root-resources?${buildPagedRequest(request)}`
    ).then(PagedResults.fromPagedJson as any);
  }

  public async listPublicRootResources(request: PagedRequest) {
    return this.client.get<PagedResults<Resource>>(
      `${this.groupsApi}/public-root-resources?${buildPagedRequest(request)}`
    ).then(PagedResults.fromPagedJson as any);
  }

  public async listResourcesByType(request: PagedRequest, type: string, groupId?: string) {
    return this.client.get<PagedResults<Resource>>(
      // eslint-disable-next-line max-len
      `${this.groupsApi}/resources?type=${type}&${buildPagedRequest(request)}${groupId ? `&groupId=${groupId}` : ''}`
    ).then(PagedResults.fromPagedJson as any);
  }

  public async userBelongsToGroup(userId: string, groupId: string): Promise<boolean> {
    const result = await this.client.get<{ belongs: boolean }>(
      `${this.groupsApi}/${groupId}/belongs/${userId}`
    );
    return result.belongs;
  }

  public async hasEditAccess(resourceId: string): Promise<boolean> {
    const result = await this.client.get<{ hasAccess: boolean }>(
      `${this.groupsApi}/edit/${resourceId}/`
    );
    return result.hasAccess;
  }
}
