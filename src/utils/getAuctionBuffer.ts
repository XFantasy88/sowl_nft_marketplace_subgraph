import { BigInt } from "@graphprotocol/graph-ts";
import { AuctionBufferInfo } from "../../generated/schema";

export function getAuctionBuffer(): AuctionBufferInfo {
  let entity = AuctionBufferInfo.load("sowl");

  if (!entity) {
    entity = new AuctionBufferInfo("sowl");
    entity.timeBuffer = BigInt.fromI32(900);
    entity.bpBuffer = BigInt.fromI32(500);
    entity.save();
  }

  return entity;
}
