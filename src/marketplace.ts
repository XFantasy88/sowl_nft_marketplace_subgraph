import {
  AuctionBufferUpdated as AuctionBufferUpdatedEvent,
  AuctionClosed as AuctionClosedEvent,
  ListingAdded as ListingAddedEvent,
  ListingRemoved as ListingRemovedEvent,
  ListingUpdated as ListingUpdatedEvent,
  NewOffer as NewOfferEvent,
  NewSale as NewSaleEvent,
} from "../generated/Marketplace/Marketplace";
import { Listing, Offer } from "../generated/schema";

export function handleAuctionBufferUpdated(
  event: AuctionBufferUpdatedEvent
): void {
  let entity = new AuctionBufferUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.timeBuffer = event.params.timeBuffer;
  entity.bidBufferBps = event.params.bidBufferBps;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAuctionClosed(event: AuctionClosedEvent): void {
  let entity = new AuctionClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.listingId = event.params.listingId;
  entity.closer = event.params.closer;
  entity.cancelled = event.params.cancelled;
  entity.auctionCreator = event.params.auctionCreator;
  entity.winningBidder = event.params.winningBidder;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
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
  let entity = new ListingUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.listingId = event.params.listingId;
  entity.listingCreator = event.params.listingCreator;
  entity.listing_listingId = event.params.listing.listingId;
  entity.listing_owner = event.params.listing.owner;
  entity.listing_assetAddress = event.params.listing.assetAddress;
  entity.listing_tokenId = event.params.listing.tokenId;
  entity.listing_startTime = event.params.listing.startTime;
  entity.listing_endTime = event.params.listing.endTime;
  entity.listing_quantity = event.params.listing.quantity;
  entity.listing_currency = event.params.listing.currency;
  entity.listing_reservePricePerToken =
    event.params.listing.reservePricePerToken;
  entity.listing_buyoutPricePerToken = event.params.listing.buyoutPricePerToken;
  entity.listing_tokenType = event.params.listing.tokenType;
  entity.listing_listingType = event.params.listing.listingType;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewOffer(event: NewOfferEvent): void {
  let entity = new NewOffer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.listingId = event.params.listingId;
  entity.offeror = event.params.offeror;
  entity.listingType = event.params.listingType;
  entity.quantity = event.params.quantity;
  entity.price = event.params.price;
  entity.currency = event.params.currency;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewSale(event: NewSaleEvent): void {
  let entity = new NewSale(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.listingId = event.params.listingId;
  entity.assetContract = event.params.assetContract;
  entity.lister = event.params.lister;
  entity.buyer = event.params.buyer;
  entity.quantity = event.params.quantity;
  entity.price = event.params.price;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
