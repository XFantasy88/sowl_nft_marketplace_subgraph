import {
  AuctionBufferUpdated as AuctionBufferUpdatedEvent,
  AuctionClosed as AuctionClosedEvent,
  Initialized as InitializedEvent,
  ListingAdded as ListingAddedEvent,
  ListingRemoved as ListingRemovedEvent,
  ListingUpdated as ListingUpdatedEvent,
  NewOffer as NewOfferEvent,
  NewSale as NewSaleEvent,
  PlatformFeeInfoUpdated as PlatformFeeInfoUpdatedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent
} from "../generated/Marketplace/Marketplace"
import {
  AuctionBufferUpdated,
  AuctionClosed,
  Initialized,
  ListingAdded,
  ListingRemoved,
  ListingUpdated,
  NewOffer,
  NewSale,
  PlatformFeeInfoUpdated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/schema"

export function handleAuctionBufferUpdated(
  event: AuctionBufferUpdatedEvent
): void {
  let entity = new AuctionBufferUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.timeBuffer = event.params.timeBuffer
  entity.bidBufferBps = event.params.bidBufferBps

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionClosed(event: AuctionClosedEvent): void {
  let entity = new AuctionClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.closer = event.params.closer
  entity.cancelled = event.params.cancelled
  entity.auctionCreator = event.params.auctionCreator
  entity.winningBidder = event.params.winningBidder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingAdded(event: ListingAddedEvent): void {
  let entity = new ListingAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.assetAddress = event.params.assetAddress
  entity.lister = event.params.lister
  entity.listing_listingId = event.params.listing.listingId
  entity.listing_owner = event.params.listing.owner
  entity.listing_assetAddress = event.params.listing.assetAddress
  entity.listing_tokenId = event.params.listing.tokenId
  entity.listing_startTime = event.params.listing.startTime
  entity.listing_endTime = event.params.listing.endTime
  entity.listing_quantity = event.params.listing.quantity
  entity.listing_currency = event.params.listing.currency
  entity.listing_reservePricePerToken =
    event.params.listing.reservePricePerToken
  entity.listing_buyoutPricePerToken = event.params.listing.buyoutPricePerToken
  entity.listing_tokenType = event.params.listing.tokenType
  entity.listing_listingType = event.params.listing.listingType

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingRemoved(event: ListingRemovedEvent): void {
  let entity = new ListingRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.listingCreator = event.params.listingCreator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingUpdated(event: ListingUpdatedEvent): void {
  let entity = new ListingUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.listingCreator = event.params.listingCreator
  entity.listing_listingId = event.params.listing.listingId
  entity.listing_owner = event.params.listing.owner
  entity.listing_assetAddress = event.params.listing.assetAddress
  entity.listing_tokenId = event.params.listing.tokenId
  entity.listing_startTime = event.params.listing.startTime
  entity.listing_endTime = event.params.listing.endTime
  entity.listing_quantity = event.params.listing.quantity
  entity.listing_currency = event.params.listing.currency
  entity.listing_reservePricePerToken =
    event.params.listing.reservePricePerToken
  entity.listing_buyoutPricePerToken = event.params.listing.buyoutPricePerToken
  entity.listing_tokenType = event.params.listing.tokenType
  entity.listing_listingType = event.params.listing.listingType

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewOffer(event: NewOfferEvent): void {
  let entity = new NewOffer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.offeror = event.params.offeror
  entity.listingType = event.params.listingType
  entity.quantity = event.params.quantity
  entity.price = event.params.price
  entity.currency = event.params.currency

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewSale(event: NewSaleEvent): void {
  let entity = new NewSale(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.assetContract = event.params.assetContract
  entity.lister = event.params.lister
  entity.buyer = event.params.buyer
  entity.quantity = event.params.quantity
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformFeeInfoUpdated(
  event: PlatformFeeInfoUpdatedEvent
): void {
  let entity = new PlatformFeeInfoUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.platformFeeWallet = event.params.platformFeeWallet
  entity.platformFeeBps = event.params.platformFeeBps

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
