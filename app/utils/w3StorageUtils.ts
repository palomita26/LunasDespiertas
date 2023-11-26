import * as Client from "@web3-storage/w3up-client";
import * as Signer from "@ucanto/principal/ed25519";
import { CarReader } from "@ipld/car";
import { importDAG } from "@ucanto/core/delegation";

export async function initW3Client() {
  const principal = Signer.parse(process.env.W3_KEY ?? "");
  const client = await Client.create({ principal });
  // Add proof that this agent has been delegated capabilities on the space
  const proof = await parseProof(process.env.W3_PROOF ?? "");
  const space = await client.addSpace(proof);
  await client.setCurrentSpace(space.did());
}

/** @param {string} data Base64 encoded CAR file \*/
async function parseProof(data: string) {
  const blocks = [];
  const reader = await CarReader.fromBytes(Buffer.from(data, "base64"));
  for await (const block of reader.blocks()) {
    blocks.push(block);
  }
  // @ts-ignore
  return importDAG(blocks);
}
