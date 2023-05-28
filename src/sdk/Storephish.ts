import FormData from 'form-data';
import { BareClient } from '@hmdlr/types';

/**
 * SDK for the storephish microservice
 */
export default class Storephish {
  private readonly api = 'api';

  constructor(
    private client: BareClient
  ) {}

  /**
   * Uploads a file to the storephish microservice<br>
   * Returns the saved paths of the uploaded files in the form of a map
   * where the key is the name of the file provided in "filename" and the
   * value is the path
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
  }): Promise<Record<string, string>> {
    formData.append('path', path);
    const result = await this.client.post<Record<string, string>>(
      `${this.api}/storage`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${bearer}`,
        },
      }
    );
    return result;
  }

  get(id: string): Promise<any> {
    return this.client.get<any>(
      `${this.api}/storage/${id}`,
      { responseType: 'arraybuffer' }
    );
  }
}
