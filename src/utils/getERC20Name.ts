import { Address, log } from '@graphprotocol/graph-ts'
import { ERC20Contract } from '../generated/ERC20Contract'
import { ERC20NameBytesContract } from '../generated/ERC20NameBytesContract'

export function getERC20Name(address: Address): string {
  let contract = ERC20Contract.bind(address)

  let nameCall = contract.try_name()
  let name = 'Unknown'

  if (!nameCall.reverted) {
    return nameCall.value
  }

  let bytesContract = ERC20NameBytesContract.bind(address)

  let nameBytesCall = bytesContract.try_name()
  if (!nameBytesCall.reverted) {
    return nameBytesCall.value.toString()
  }

  log.warning('name() call (string or bytes) reverted for {}', [
    address.toHex()
  ])

  return name
}
