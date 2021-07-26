// GENERIC
import { Address, ethereum } from '@graphprotocol/graph-ts'

// GENERATED
import { User } from '../generated/schema'

// UTILS
import { ADDRESS_ZERO, BIG_INT_ZERO } from '../utils/defaults'

export function loadOrCreateUser(address: Address): User {
  let user = User.load(address.toHex()) as User

  if (user) {
    return user
  }

  user = new User(address.toHex())
  user.address = ADDRESS_ZERO
  user.firstTradeTimestamp = BIG_INT_ZERO
  user.totalTradeVolumeUSD = BIG_INT_ZERO
  user.totalTradeVolumeETH = BIG_INT_ZERO
  user.isSolver = false
  user.save()

  return user
}
