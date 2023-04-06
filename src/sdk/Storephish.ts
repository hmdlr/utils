import FormData from 'form-data';
import { BareClient } from '@hmdlr/types';

/**
 * SDK for the storephish microservice
 */
export default class Storephish {
  private readonly api = 'store';

  constructor(
    private client: BareClient
  ) {}

  /**
   * Uploads a file to the storephish microservice<br>
   * Returns the saved paths of the uploaded files
   * @param bearer
   * @param formData
   */
  public async upload<T>(path: string, {
    bearer,
    formData,
  }:
  {
    bearer: string,
    formData: FormData,
  }): Promise<Array<string>> {
    formData.append('path', path);
    const result = await this.client.post<{
      savedPaths: string[]
    }>(
      `${this.api}/storage`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${bearer}`,
        },
      }
    );
    return result.savedPaths;
  }
}
