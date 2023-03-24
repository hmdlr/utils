import FormData from 'form-data';
import { getInternalClient, InternalStarphishClient } from '../client/StarphishClient';
import { Microservice } from '../Microservice';

/**
 * SDK for the storephish microservice
 */
export class Storephish {
  private readonly uri = 'store';

  constructor(
    private client: InternalStarphishClient = getInternalClient()
  ) {}

  /**
   * Uploads a file to the storephish microservice<br>
   * Returns the saved paths of the uploaded files
   * @param bearer
   * @param formData
   */
  public async upload<T>({
    bearer,
    formData,
  }:
  {
    bearer: string,
    formData: FormData,
  }): Promise<Array<string> | T> {
    const result = await this.client.post<{
      savedPaths: string[]
    }>(
      Microservice.Storephish,
      `${this.uri}/storage`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${bearer}`,
        },
      }
    );
    return result.savedPaths ?? result as T;
  }
}
