// GENERIC
import { Address, ethereum } from '@graphprotocol/graph-ts'

// GENERATED
import { Trade } from '../generated/schema'

// UTILS
import { ADDRESS_ZERO, BIG_INT_ZERO } from '../utils/defaults'

export function loadOrCreateTrade(
  address: Address,
  event: ethereum.Event
): Trade {
  let trade = Trade.load(address.toHex()) as Trade

  if (trade) {
    return trade
  }

  trade = new Trade(address.toHex())
  trade.order = ADDRESS_ZERO
  trade.settlement = ADDRESS_ZERO
  trade.txHash = event.transaction.hash
  trade.executedSellAmount = BIG_INT_ZERO
  trade.executedBuyAmount = BIG_INT_ZERO
  trade.executedFeeAmount = BIG_INT_ZERO
  trade.volumeUSD = BIG_INT_ZERO
  trade.volumeETH = BIG_INT_ZERO
  trade.feeUSD = BIG_INT_ZERO
  trade.feeETH = BIG_INT_ZERO
  trade.timestamp = event.block.timestamp
  trade.save()

  return trade
}
