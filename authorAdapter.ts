import type { Expression, GetByAuthorAdapter, HolochainLanguageDelegate, LanguageContext } from "@perspect3vism/ad4m";
import { DNA_NICK } from "./dna";

export default class ShortFormAuthorAdapter implements GetByAuthorAdapter {

  constructor(context: LanguageContext) {
  }

  ///Get expressions authored by a given Agent/Identity
  async getByAuthor(
    author: string,
    count: number,
    page: number
  ): Promise<Expression[]> {
    return []
  }
}
