import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

import {
  AuctionBuffersUpdated as AuctionBufferUpdatedEvent,
  AuctionClosed as AuctionClosedEvent,
  ListingAdded as ListingAddedEvent,
  ListingRemoved as ListingRemovedEvent,
  ListingUpdated as ListingUpdatedEvent,
  NewOffer as NewOfferEvent,
  NewSale as NewSaleEvent,
  NewCollection as NewCollectionEvent,
  CollectionRemoved as CollectionRemovedEvent,
} from "../generated/Marketplace/Marketplace";
import {
  Listing,
  Offer,
  AuctionBufferInfo,
  Collection,
} from "../generated/schema";
import { getUser } from "./utils/getUser";
import { getAuctionBuffer } from "./utils/getAuctionBuffer";

export function handleAuctionBufferUpdated(
  event: AuctionBufferUpdatedEvent
): void {
  let entity = AuctionBufferInfo.load("sowl");

  if (!entity) {
    entity = new AuctionBufferInfo("sowl");
  }

  entity.timeBuffer = event.params.timeBuffer;
  entity.bpBuffer = event.params.bidBufferBps;

  entity.save();
}

export function handleAuctionClosed(event: AuctionClosedEvent): void {
  let entity = Listing.load(event.params.listingId.toString());

  if (entity) {
    if (event.params.cancelled) {
      entity.status = "Cancelled";
    } else {
      if (event.params.closeFor == entity.lister) {
        entity.listingAccepted = true;
      } else {
        entity.bidAccepted = true;
      }
      entity.endTime = event.block.timestamp;

      if (entity.listingAccepted && entity.bidAccepted) {
        entity.status = "Accepted";
      }
    }

    entity.save();
  }
}

export function handleListingAdded(event: ListingAddedEvent): void {
  let entity = new Listing(event.params.listingId.toString());

  let lister = getUser(event.params.lister);

  entity.assetAddress = event.params.assetContract;
  entity.lister = lister.id;
  entity.tokenId = event.params.listing.tokenId;
  entity.startTime = event.params.listing.startTime;
  entity.endTime = event.params.listing.endTime;
  entity.quantity = event.params.listing.quantity;
  entity.currency = event.params.listing.currency;
  entity.reservePricePerToken = event.params.listing.reservePricePerToken;
  entity.buyoutPricePerToken = event.params.listing.buyoutPricePerToken;
  entity.tokenType = event.params.listing.tokenType == 0 ? "ERC1155" : "ERC721";
  entity.bidAccepted = false;
  entity.listingAccepted = false;
  entity.listingType =
    event.params.listing.listingType == 0 ? "Fixed" : "Auction";
  entity.status = "Open";
  entity.createdAt = event.block.timestamp;

  entity.save();
}

export function handleListingRemoved(event: ListingRemovedEvent): void {
  let entity = Listing.load(event.params.listingId.toString());

  if (entity) {
    entity.status = "Cancelled";
    entity.save();
  }
}

export function handleListingUpdated(event: ListingUpdatedEvent): void {
  let entity = Listing.load(event.params.listingId.toString());

  if (entity) {
    entity.startTime = event.params.listing.startTime;
    entity.endTime = event.params.listing.endTime;
    entity.quantity = event.params.listing.quantity;
    entity.currency = event.params.listing.currency;
    entity.reservePricePerToken = event.params.listing.reservePricePerToken;
    entity.buyoutPricePerToken = event.params.listing.buyoutPricePerToken;
    entity.listingType =
      event.params.listing.listingType == 0 ? "Fixed" : "Auction";

    entity.save();
  }
}

export function handleNewOffer(event: NewOfferEvent): void {
  let entity = new Offer(
    event.params.listingId.toString() + ":" + event.params.offeror.toHexString()
  );

  let buffers = getAuctionBuffer();

  let listing = Listing.load(event.params.listingId.toString());

  let offeror = getUser(event.params.offeror);

  if (listing) {
    if (
      !(
        listing.buyoutPricePerToken.gt(BigInt.fromI32(0)) &&
        event.params.totalOfferAmount.ge(
          listing.buyoutPricePerToken.times(listing.quantity)
        )
      )
    ) {
      if (listing.endTime.minus(event.block.timestamp).le(buffers.timeBuffer)) {
        listing.endTime = listing.endTime.plus(buffers.timeBuffer);
        listing.save();
      }
    }

    entity.listingId = listing.id;
    entity.offeror = offeror.id;
    entity.listingType = event.params.listingType == 0 ? "Fixed" : "Auction";
    entity.quantity = event.params.quantityWanted;
    entity.price = event.params.totalOfferAmount;
    entity.currency = event.params.currency;

    entity.createdAt = event.block.timestamp;

    entity.save();
  }
}

export function handleNewSale(event: NewSaleEvent): void {
  let entity = Listing.load(event.params.listingId.toString());

  if (entity) {
    entity.status = "Accepted";

    entity.save();
  }
}

export function handleNewCollection(event: NewCollectionEvent): void {
  let entity = Collection.load(event.params.collection);

  let lister = getUser(event.params.lister);

  if (!entity) {
    entity = new Collection(event.params.collection);
  }

  entity.lister = lister.id;
  entity.image = event.params.metadata;
  entity.disabled = true;

  entity.save();
}

export function handleRemoveCollection(event: CollectionRemovedEvent): void {
  let entity = Collection.load(event.params.collection);

  if (entity) {
    entity.disabled = false;
    entity.save();
  }
}
