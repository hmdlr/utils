import FormData from 'form-data';
import { Inject, Service } from 'typedi';
import { BareClient } from '@hmdlr/types';

/**
 * SDK for the storephish microservice
 */
@Service()
export default class Storephish {
  private readonly api = 'store';

  constructor(
    @Inject() private client: BareClient
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
      `${this.api}/storage`,
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
