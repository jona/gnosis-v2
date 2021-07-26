// GENERIC
import { Address, BigInt, log } from '@graphprotocol/graph-ts'

// GENERATED
import { ERC20Contract } from '../generated/ERC20Contract'

// UTILS
import { BIG_INT_ZERO } from './defaults'

export function getERC20Decimals(address: Address): BigInt {
  let contract = ERC20Contract.bind(address)
  let decimalValue = BIG_INT_ZERO

  let decimalResult = contract.try_decimals()

  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value as BigInt
  }

  log.warning('decimal() call (string or bytes) reverted for {}', [
    address.toHex()
  ])

  return decimalValue
}
