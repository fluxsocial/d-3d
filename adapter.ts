import type { Address, Agent, Expression, ExpressionAdapter, PublicSharing, HolochainLanguageDelegate, LanguageContext, AgentService } from "@perspect3vism/ad4m";

class ThreeDPutAdapter implements PublicSharing {

  constructor(context: LanguageContext) {
  }

  async createPublic(shortForm: object): Promise<Address> {
    return "address"
  }
}

export default class ThreeDAdapter implements ExpressionAdapter {
  putAdapter: PublicSharing;

  constructor(context: LanguageContext) {
    this.putAdapter = new ThreeDPutAdapter(context);
  }

  async get(address: Address): Promise<Expression> {
    return new Expression
  }

  /// Send an expression to someone privately p2p
  send_private(to: Agent, content: object) {
  }

  /// Get private expressions sent to you
  async inbox(filterFrom: void | Agent[]): Promise<Expression[]> {
    return []
  }
}
