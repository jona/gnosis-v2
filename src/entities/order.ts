// GENERIC
import { Address, ethereum } from '@graphprotocol/graph-ts'

// GENERATED
import { Order } from '../generated/schema'

// UTILS
import { ADDRESS_ZERO } from '../utils/defaults'

export function loadOrCreateOrder(
  address: Address,
  event: ethereum.Event
): Order {
  let order = Order.load(address.toHex()) as Order

  if (order) {
    return order
  }

  order = new Order(address.toHex())

  order.owner = ADDRESS_ZERO
  order.trades = []
  order.timestamp = event.block.timestamp
  order.save()

  return order
}
