import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/Marketplace/Marketplace"

export function createAuctionBufferUpdatedEvent(
  timeBuffer: BigInt,
  bidBufferBps: BigInt
): AuctionBufferUpdated {
  let auctionBufferUpdatedEvent = changetype<AuctionBufferUpdated>(
    newMockEvent()
  )

  auctionBufferUpdatedEvent.parameters = new Array()

  auctionBufferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timeBuffer",
      ethereum.Value.fromUnsignedBigInt(timeBuffer)
    )
  )
  auctionBufferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "bidBufferBps",
      ethereum.Value.fromUnsignedBigInt(bidBufferBps)
    )
  )

  return auctionBufferUpdatedEvent
}

export function createAuctionClosedEvent(
  listingId: BigInt,
  closer: Address,
  cancelled: boolean,
  auctionCreator: Address,
  winningBidder: Address
): AuctionClosed {
  let auctionClosedEvent = changetype<AuctionClosed>(newMockEvent())

  auctionClosedEvent.parameters = new Array()

  auctionClosedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  auctionClosedEvent.parameters.push(
    new ethereum.EventParam("closer", ethereum.Value.fromAddress(closer))
  )
  auctionClosedEvent.parameters.push(
    new ethereum.EventParam("cancelled", ethereum.Value.fromBoolean(cancelled))
  )
  auctionClosedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionCreator",
      ethereum.Value.fromAddress(auctionCreator)
    )
  )
  auctionClosedEvent.parameters.push(
    new ethereum.EventParam(
      "winningBidder",
      ethereum.Value.fromAddress(winningBidder)
    )
  )

  return auctionClosedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createListingAddedEvent(
  listingId: BigInt,
  assetAddress: Address,
  lister: Address,
  listing: ethereum.Tuple
): ListingAdded {
  let listingAddedEvent = changetype<ListingAdded>(newMockEvent())

  listingAddedEvent.parameters = new Array()

  listingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  listingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "assetAddress",
      ethereum.Value.fromAddress(assetAddress)
    )
  )
  listingAddedEvent.parameters.push(
    new ethereum.EventParam("lister", ethereum.Value.fromAddress(lister))
  )
  listingAddedEvent.parameters.push(
    new ethereum.EventParam("listing", ethereum.Value.fromTuple(listing))
  )

  return listingAddedEvent
}

export function createListingRemovedEvent(
  listingId: BigInt,
  listingCreator: Address
): ListingRemoved {
  let listingRemovedEvent = changetype<ListingRemoved>(newMockEvent())

  listingRemovedEvent.parameters = new Array()

  listingRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  listingRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "listingCreator",
      ethereum.Value.fromAddress(listingCreator)
    )
  )

  return listingRemovedEvent
}

export function createListingUpdatedEvent(
  listingId: BigInt,
  listingCreator: Address,
  listing: ethereum.Tuple
): ListingUpdated {
  let listingUpdatedEvent = changetype<ListingUpdated>(newMockEvent())

  listingUpdatedEvent.parameters = new Array()

  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingCreator",
      ethereum.Value.fromAddress(listingCreator)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam("listing", ethereum.Value.fromTuple(listing))
  )

  return listingUpdatedEvent
}

export function createNewOfferEvent(
  listingId: BigInt,
  offeror: Address,
  listingType: i32,
  quantity: BigInt,
  price: BigInt,
  currency: Address
): NewOffer {
  let newOfferEvent = changetype<NewOffer>(newMockEvent())

  newOfferEvent.parameters = new Array()

  newOfferEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  newOfferEvent.parameters.push(
    new ethereum.EventParam("offeror", ethereum.Value.fromAddress(offeror))
  )
  newOfferEvent.parameters.push(
    new ethereum.EventParam(
      "listingType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(listingType))
    )
  )
  newOfferEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  newOfferEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  newOfferEvent.parameters.push(
    new ethereum.EventParam("currency", ethereum.Value.fromAddress(currency))
  )

  return newOfferEvent
}

export function createNewSaleEvent(
  listingId: BigInt,
  assetContract: Address,
  lister: Address,
  buyer: Address,
  quantity: BigInt,
  price: BigInt
): NewSale {
  let newSaleEvent = changetype<NewSale>(newMockEvent())

  newSaleEvent.parameters = new Array()

  newSaleEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromUnsignedBigInt(listingId)
    )
  )
  newSaleEvent.parameters.push(
    new ethereum.EventParam(
      "assetContract",
      ethereum.Value.fromAddress(assetContract)
    )
  )
  newSaleEvent.parameters.push(
    new ethereum.EventParam("lister", ethereum.Value.fromAddress(lister))
  )
  newSaleEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  newSaleEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  )
  newSaleEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return newSaleEvent
}

export function createPlatformFeeInfoUpdatedEvent(
  platformFeeWallet: Address,
  platformFeeBps: BigInt
): PlatformFeeInfoUpdated {
  let platformFeeInfoUpdatedEvent = changetype<PlatformFeeInfoUpdated>(
    newMockEvent()
  )

  platformFeeInfoUpdatedEvent.parameters = new Array()

  platformFeeInfoUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "platformFeeWallet",
      ethereum.Value.fromAddress(platformFeeWallet)
    )
  )
  platformFeeInfoUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "platformFeeBps",
      ethereum.Value.fromUnsignedBigInt(platformFeeBps)
    )
  )

  return platformFeeInfoUpdatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
