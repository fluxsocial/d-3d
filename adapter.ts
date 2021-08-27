import type { Address, Agent, Expression, ExpressionAdapter, PublicSharing, LanguageContext, IPFSNode, AgentService } from "@perspect3vism/ad4m";
import { existsSync, readFileSync } from "fs";

class ThreeDPutAdapter implements PublicSharing {
  #IPFS: IPFSNode;
  #agent: AgentService;

  constructor(context: LanguageContext) {
    this.#IPFS = context.IPFS;
    this.#agent = context.agent;
  }

  async createPublic(pathObject: object): Promise<Address> {
    console.log("ThreeDPutAdapter got object for createPublic", pathObject);
    //@ts-ignore
    if (!pathObject.path) {
      throw new Error("Expected to have path key/value on input for createPublic");
    }
    //@ts-ignore
    const path = pathObject.path;

    let fileData = null;
    if (path.indexOf('http://') === 0 || path.indexOf('https://') === 0) {
      throw new Error("Sorry loading from url's not supported by the language right now");
    } else {
      if (!existsSync(path)) {
        throw new Error("Could not load file at path: " + path);
      }
      fileData = readFileSync(path);
    }

    if (!fileData) {
      throw new Error("Unreachable")
    }

    const fileDatab64 = Buffer.from(fileData, "base64").toString();
    console.debug("Got base64 data", fileDatab64);
    const dataObject = {content: fileDatab64};
    const expression = this.#agent.createSignedExpression(dataObject);
    const ipfsAddress = this.#IPFS.add(expression);
    //@ts-ignore
    const hash = ipfsAddress.cid.toString();

    return hash
  }
}

export default class ThreeDAdapter implements ExpressionAdapter {
  #IPFS: IPFSNode;
  putAdapter: PublicSharing;

  constructor(context: LanguageContext) {
    this.#IPFS = context.IPFS;
    this.putAdapter = new ThreeDPutAdapter(context);
  }

  async get(address: Address): Promise<Expression> {
    const cid = address.toString();

    const chunks = [];
    // @ts-ignore
    for await (const chunk of this.#IPFS.cat(cid)) {
      chunks.push(chunk);
    }

    const stringObj = Buffer.from(uint8ArrayConcat(chunks)).toString();
    console.warn("Got string obj from IPFS", stringObj);
    return JSON.parse(stringObj);
  }

  /// Send an expression to someone privately p2p
  send_private(to: Agent, content: object) {
    throw new Error("Unimplemented")
  }

  /// Get private expressions sent to you
  async inbox(filterFrom: void | Agent[]): Promise<Expression[]> {
    return []
  }
}

const _appendBuffer = (buffer1, buffer2) => {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

const uint8ArrayConcat = (chunks) => {
  return chunks.reduce(_appendBuffer);
};