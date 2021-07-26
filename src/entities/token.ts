// GENERIC
import { Address, ethereum } from '@graphprotocol/graph-ts'

// GENERATED
import { Token } from '../generated/schema'

// UTILS
import { ADDRESS_ZERO, BIG_INT_ZERO } from '../utils/defaults'
import { getERC20Name } from '../utils/getERC20Name'
import { getERC20Symbol } from '../utils/getERC20Symbol'
import { getERC20Decimals } from '../utils/getERC20Decimals'

export function loadOrCreateToken(
  address: Address,
  event: ethereum.Event
): Token {
  let token = Token.load(address.toHex()) as Token

  if (token) {
    return token
  }

  token = new Token(address.toHex())
  token.address = ADDRESS_ZERO
  token.name = getERC20Name(address)
  token.symbol = getERC20Symbol(address)
  token.decimals = getERC20Decimals(address)
  token.totalTradeVolumneUSD = BIG_INT_ZERO
  token.totalTradeVolumneETH = BIG_INT_ZERO
  token.timestamp = event.block.timestamp
  token.save()

  return token
}
