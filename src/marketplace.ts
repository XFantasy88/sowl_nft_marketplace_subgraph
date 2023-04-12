import { Address } from "@graphprotocol/graph-ts";

import {
  AuctionClosed as AuctionClosedEvent,
  ListingAdded as ListingAddedEvent,
  ListingRemoved as ListingRemovedEvent,
  ListingUpdated as ListingUpdatedEvent,
  NewOffer as NewOfferEvent,
  NewSale as NewSaleEvent,
} from "../generated/Marketplace/Marketplace";
import { Listing, Offer } from "../generated/schema";

export function handleAuctionClosed(event: AuctionClosedEvent): void {
  let entity = Listing.load(event.params.listingId.toString());

  if (entity) {
    if (event.params.cancelled) {
      entity.status = "Closed";
    } else {
      entity.status = "Sold";
      entity.buyer = event.params.winningBidder;
    }

    entity.save();
  }
}

export function handleListingAdded(event: ListingAddedEvent): void {
  let entity = new Listing(event.params.listingId.toString());

  entity.assetAddress = event.params.assetAddress;
  entity.lister = event.params.lister;
  entity.tokenId = event.params.listing.tokenId;
  entity.startTime = event.params.listing.startTime;
  entity.endTime = event.params.listing.endTime;
  entity.quantity = event.params.listing.quantity;
  entity.currency = event.params.listing.currency;
  entity.reservePricePerToken = event.params.listing.reservePricePerToken;
  entity.buyoutPricePerToken = event.params.listing.buyoutPricePerToken;
  entity.tokenType = event.params.listing.tokenType == 0 ? "ERC1155" : "ERC721";
  entity.listingType =
    event.params.listing.listingType == 0 ? "Fixed" : "Auction";
  entity.status = "Open";

  entity.buyer = Address.fromHexString(
    "0x0000000000000000000000000000000000000000"
  );

  entity.save();
}

export function handleListingRemoved(event: ListingRemovedEvent): void {
  let entity = Listing.load(event.params.listingId.toString());

  if (entity) {
    entity.status = "Closed";
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
    event.params.listingId.toString() + ":" + event.params.offeror
  );

  entity.listingId = event.params.listingId;
  entity.offeror = event.params.offeror;
  entity.listingType = event.params.listingType == 0 ? "Fixed" : "Auction";
  entity.quantity = event.params.quantity;
  entity.price = event.params.price;
  entity.currency = event.params.currency;
  entity.status = "Open";

  entity.save();
}

export function handleNewSale(event: NewSaleEvent): void {
  let entity = Listing.load(event.params.listingId.toString());

  if (entity) {
    entity.status = "Sold";
    entity.buyer = event.params.buyer;

    entity.save();
  }
}
