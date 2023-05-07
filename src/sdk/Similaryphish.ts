import { BareClient, ComputedCollection, SimilarityPayload, SimilarityResult } from '@hmdlr/types';

export default class Similaryphish {
  private readonly api = 'api';

  private readonly layoutApi = `${this.api}/layout`;

  constructor(
    private client: BareClient
  ) {
  }

  /* ===================== */

  /* Layouts */

  /**
   * Will return the highest similarity percentage between the layout the user provided and the rulesets
   * @param payload
   * UserProvidedLayout: The layout the user provided, in base64
   */
  public async getHighest(
    payload: {
      similarityPayload: SimilarityPayload,
      userProvidedLayout: string,
    }
  ): Promise<SimilarityResult> {
    return this.client.post<SimilarityResult>(
      `${this.layoutApi}`,
      payload
    );
  }

  public async predict(payload: ComputedCollection): Promise<{
    prediction: any,
  }> {
    return this.client.post<{
      prediction: any,
    }>(
      `${this.api}/predict`,
      payload
    );
  }
}
