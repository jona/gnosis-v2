// GENERIC
import { Address, ethereum } from '@graphprotocol/graph-ts'

// GENERATED
import { Settlement } from '../generated/schema'

// UTILS
import { ADDRESS_ZERO, BIG_INT_ZERO } from '../utils/defaults'

export function loadOrCreateSettlement(
  address: Address,
  event: ethereum.Event
): Settlement {
  let settlement = Settlement.load(address.toHex()) as Settlement

  if (settlement) {
    return settlement
  }

  settlement = new Settlement(address.toHex())
  settlement.solver = ADDRESS_ZERO
  settlement.trades = []
  settlement.totalFeesUSD = BIG_INT_ZERO
  settlement.totalVolumeUSD = BIG_INT_ZERO
  settlement.totalFeesETH = BIG_INT_ZERO
  settlement.totalVolumeETH = BIG_INT_ZERO
  settlement.timestamp = event.block.timestamp
  settlement.save()

  return settlement
}
