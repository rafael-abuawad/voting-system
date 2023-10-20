#pragma version ^0.3.9

# @dev We import and implement our custom `ERC20Vote`
# interface, which is written using standard Vyper
# syntax.
from .interfaces.IERC20Vote import IERC20Vote
implements: IERC20Vote


# @dev We import and implement the `ERC20` interface,
# which is a built-in interface of the Vyper compiler.
from vyper.interfaces import ERC20
implements: ERC20


# @dev We import and implement the `ERC20Detailed` interface,
# which is a built-in interface of the Vyper compiler.
from vyper.interfaces import ERC20Detailed
# implements: ERC20Detailed


# @dev We import and implement the `IERC20Permit`
# interface, which is written using standard Vyper
# syntax.
import interfaces.IERC20Permit as IERC20Permit
implements: IERC20Permit


# @dev We import and implement the `IERC5267` interface,
# which is written using standard Vyper syntax.
from interfaces.IERC5267 import IERC5267
implements: IERC5267


# @dev Returns the decimals places of the token.
# The default value is 18.
# @notice If you declare a variable as `public`,
# Vyper automatically generates an `external`
# getter function for the variable. Furthermore,
# to preserve consistency with the interface for
# the optional metadata functions of the ERC-20
# standard, we use lower case letters for the
# `immutable` and `constant` variables `name`,
# `symbol`, and `decimals`.
decimals: public(constant(uint8)) = 18


# @dev Constant used as part of the ECDSA recovery function.
_MALLEABILITY_THRESHOLD: constant(bytes32) = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0


# @dev The 32-byte type hash for the EIP-712 domain separator.
_TYPE_HASH: constant(bytes32) = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")


# @dev The 32-byte type hash of the `permit` function.
_PERMIT_TYPE_HASH: constant(bytes32) = keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")


# @dev Returns the name of the token.
# @notice See comment on lower case letters
# above at `decimals`.
name: public(immutable(String[25]))


# @dev Returns the symbol of the token.
# @notice See comment on lower case letters
# above at `decimals`.
symbol: public(immutable(String[5]))


# @dev Caches the domain separator as an `immutable`
# value, but also stores the corresponding chain ID
# to invalidate the cached domain separator if the
# chain ID changes.
_CACHED_DOMAIN_SEPARATOR: immutable(bytes32)
_CACHED_CHAIN_ID: immutable(uint256)


# @dev Caches `self` to `immutable` storage to avoid
# potential issues if a vanilla contract is used in
# a `delegatecall` context.
_CACHED_SELF: immutable(address)


# @dev `immutable` variables to store the (hashed)
# name and (hashed) version during contract creation.
_NAME: immutable(String[50])
_HASHED_NAME: immutable(bytes32)
_VERSION: immutable(String[20])
_HASHED_VERSION: immutable(bytes32)


# @dev Returns the amount of tokens owned by an `address`.
balanceOf: public(HashMap[address, uint256])


# @dev Returns the remaining number of tokens that a
# `spender` will be allowed to spend on behalf of
# `owner` through `transferFrom`. This is zero by
# default. This value changes when `approve` or
# `transferFrom` are called.
allowance: public(HashMap[address, HashMap[address, uint256]])


# @dev Returns the amount of tokens in existence.
totalSupply: public(uint256)


# @dev Returns the address of the current owner.
owner: public(address)


# @dev Returns the current on-chain tracked nonce
# of `address`.
nonces: public(HashMap[address, uint256])


# @dev Emitted when `amount` tokens are moved
# from one account (`owner`) to another (`to`).
# Note that the parameter `amount` may be zero.
event Transfer:
    owner: indexed(address)
    to: indexed(address)
    amount: uint256


# @dev Emitted when the allowance of a `spender`
# for an `owner` is set by a call to `approve`.
# The parameter `amount` is the new allowance.
event Approval:
    owner: indexed(address)
    spender: indexed(address)
    amount: uint256


# @dev May be emitted to signal that the domain could
# have changed.
event EIP712DomainChanged:
    pass


# @dev Emitted when the ownership is transferred
# from `previous_owner` to `new_owner`.
event OwnershipTransferred:
    previous_owner: indexed(address)
    new_owner: indexed(address)


@external
@payable
def __init__(name_: String[25], symbol_: String[5], name_eip712_: String[50], version_eip712_: String[20]):
    """
    @dev To omit the opcodes for checking the `msg.value`
         in the creation-time EVM bytecode, the constructor
         is declared as `payable`.
    @notice The initial supply of the token as well
            as the `owner` role will be assigned to
            the `msg.sender`.
    @param name_ The maximum 25-character user-readable
           string name of the token.
    @param symbol_ The maximum 5-character user-readable
           string symbol of the token.
    @param name_eip712_ The maximum 50-character user-readable
           string name of the signing domain, i.e. the name
           of the dApp or protocol.
    @param version_eip712_ The maximum 20-character current
           main version of the signing domain. Signatures
           from different versions are not compatible.
    """
    name = name_
    symbol = symbol_

    self._transfer_ownership(msg.sender)

    _NAME = name_eip712_
    _VERSION = version_eip712_
    _HASHED_NAME = keccak256(name_eip712_)
    _HASHED_VERSION = keccak256(version_eip712_)
    _CACHED_DOMAIN_SEPARATOR = self._build_domain_separator()
    _CACHED_CHAIN_ID = chain.id
    _CACHED_SELF = self


@external
def transfer(to: address, amount: uint256) -> bool:
    """
    @dev Moves `amount` tokens from the caller's account to `to`.
    @notice ** NOT IMPLEMENTED **
    """
    return False


@external
def approve(spender: address, amount: uint256) -> bool:
    """
    @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
    @notice ** NOT IMPLEMENTED **
    """
    return False


@external
def transferFrom(owner: address, to: address, amount: uint256) -> bool:
    """
    @dev Moves `amount` tokens from `owner`
         to `to` using the allowance mechanism.
         The `amount` is then deducted from the
         caller's allowance.
    @notice Note that `owner` and `to` cannot
            be the zero address. Also, `owner`
            must have a balance of at least `amount`.
            Eventually, the caller must have allowance
            for `owner`'s tokens of at least `amount`.

            WARNING: The function does not update the
            allowance if the current allowance is the
            maximum `uint256`.
    @param owner The 20-byte owner address.
    @param to The 20-byte receiver address.
    @param amount The 32-byte token amount to be transferred.
    @return bool The verification whether the transfer succeeded
            or failed. Note that the function reverts instead
            of returning `False` on a failure.
    """
    self._spend_allowance(owner, msg.sender, amount)
    self._transfer(owner, to, amount)
    return True


@external
def mint(to: address):
    """
    @dev Mints `1` token and assigns them to `to` address.
    @notice Only the owner can access this function.
            Note that `owner` cannot be the zero address.
    @param to The 20-byte receiver address.
    """
    self._check_owner()
    self._check_balance(to)

    amount: uint256 = self._one_vote()
    self._approve(to, self.owner, amount)
    self._mint(to, amount)
    

@external
def permit(owner: address, spender: address, amount: uint256, deadline: uint256, v: uint8, r: bytes32, s: bytes32):
    """
    @dev Sets `amount` as the allowance of `spender`
         over `owner`'s tokens, given `owner`'s signed
         approval.
    @notice Note that `spender` cannot be the zero address.
            Also, `deadline` must be a block timestamp in
            the future. `v`, `r`, and `s` must be a valid
            secp256k1 signature from `owner` over the
            EIP-712-formatted function arguments. Eventually,
            the signature must use `owner`'s current nonce.
    @param owner The 20-byte owner address.
    @param spender The 20-byte spender address.
    @param amount The 32-byte token amount that is
           allowed to be spent by the `spender`.
    @param deadline The 32-byte block timestamp up
           which the `spender` is allowed to spend `amount`.
    @param v The secp256k1 1-byte signature parameter `v`.
    @param r The secp256k1 32-byte signature parameter `r`.
    @param s The secp256k1 32-byte signature parameter `s`.
    """
    assert block.timestamp <= deadline, "ERC20Permit: expired deadline"

    current_nonce: uint256 = self.nonces[owner]
    self.nonces[owner] = unsafe_add(current_nonce, 1)

    struct_hash: bytes32 = keccak256(_abi_encode(_PERMIT_TYPE_HASH, owner, spender, amount, current_nonce, deadline))
    hash: bytes32  = self._hash_typed_data_v4(struct_hash)

    signer: address = self._recover_vrs(hash, convert(v, uint256), convert(r, uint256), convert(s, uint256))
    assert signer == owner, "ERC20Permit: invalid signature"

    self._approve(owner, spender, amount)


@external
@view
def one_vote() -> uint256:
    """
    @dev Returns one vote, to be used by a voter.
    @return uint256 Returns one vote, with its
                    decimal value.
    """
    return self._one_vote()


@external
@view
def DOMAIN_SEPARATOR() -> bytes32:
    """
    @dev Returns the domain separator for the current chain.
    @return bytes32 The 32-byte domain separator.
    """
    return self._domain_separator_v4()


@external
@view
def eip712Domain() -> (bytes1, String[50], String[20], uint256, address, bytes32, DynArray[uint256, 128]):
    """
    @dev Returns the fields and values that describe the domain
         separator used by this contract for EIP-712 signatures.
    @notice The bits in the 1-byte bit map are read from the least
            significant to the most significant, and fields are indexed
            in the order that is specified by EIP-712, identical to the
            order in which they are listed in the function type.
    @return bytes1 The 1-byte bit map where bit `i` is set to 1
            if and only if domain field `i` is present (`0 ≤ i ≤ 4`).
    @return String The maximum 50-character user-readable string name
            of the signing domain, i.e. the name of the dApp or protocol.
    @return String The maximum 20-character current main version of
            the signing domain. Signatures from different versions are
            not compatible.
    @return uint256 The 32-byte EIP-155 chain ID.
    @return address The 20-byte address of the verifying contract.
    @return bytes32 The 32-byte disambiguation salt for the protocol.
    @return DynArray The 32-byte array of EIP-712 extensions.
    """
    # Note that `\x0f` equals `01111`.
    return (convert(b"\x0f", bytes1), _NAME, _VERSION, chain.id, self, empty(bytes32), empty(DynArray[uint256, 128]))


@external
def transfer_ownership(new_owner: address):
    """
    @dev Transfers the ownership of the contract
         to a new account `new_owner`.
    @notice Note that this function can only be
            called by the current `owner`. Also,
            the `new_owner` cannot be the zero address.

    @param new_owner The 20-byte address of the new owner.
    """
    self._check_owner()
    assert new_owner != empty(address), "Ownable: new owner is the zero address"

    self._transfer_ownership(new_owner)


@external
def renounce_ownership():
    """
    @dev Leaves the contract without an owner.
    @notice Renouncing ownership will leave the
            contract without an owner, thereby
            removing any functionality that is
            only available to the owner.
    """
    self._check_owner()
    self._transfer_ownership(empty(address))


@internal
def _transfer(owner: address, to: address, amount: uint256):
    """
    @dev Moves `amount` tokens from the owner's
         account to `to`.
    @notice Note that `owner` and `to` cannot be
            the zero address. Also, `owner` must
            have a balance of at least `amount`.
    @param owner The 20-byte owner address.
    @param to The 20-byte receiver address.
    @param amount The 32-byte token amount to be transferred.
    """
    assert owner != empty(address), "ERC20: transfer from the zero address"
    assert to != empty(address), "ERC20: transfer to the zero address"

    self._before_token_transfer(owner, to, amount)

    owner_balanceOf: uint256 = self.balanceOf[owner]
    assert owner_balanceOf >= amount, "ERC20: transfer amount exceeds balance"
    self.balanceOf[owner] = unsafe_sub(owner_balanceOf, amount)
    self.balanceOf[to] = unsafe_add(self.balanceOf[to], amount)
    log Transfer(owner, to, amount)

    self._after_token_transfer(owner, to, amount)


@internal
def _mint(owner: address, amount: uint256):
    """
    @dev Creates `amount` tokens and assigns
         them to `owner`, increasing the
         total supply.
    @notice This is an `internal` function without
            access restriction. Note that `owner`
            cannot be the zero address.
    @param owner The 20-byte owner address.
    @param amount The 32-byte token amount to be created.
    """
    assert owner != empty(address), "ERC20: mint to the zero address"

    self._before_token_transfer(empty(address), owner, amount)

    self.totalSupply += amount
    self.balanceOf[owner] = unsafe_add(self.balanceOf[owner], amount)
    log Transfer(empty(address), owner, amount)

    self._after_token_transfer(empty(address), owner, amount)


@internal
def _approve(owner: address, spender: address, amount: uint256):
    """
    @dev Sets `amount` as the allowance of `spender`
         over the `owner`'s tokens.
    @notice Note that `owner` and `spender` cannot
            be the zero address.
    @param owner The 20-byte owner address.
    @param spender The 20-byte spender address.
    @param amount The 32-byte token amount that is
           allowed to be spent by the `spender`.
    """
    assert owner != empty(address), "ERC20: approve from the zero address"
    assert spender != empty(address), "ERC20: approve to the zero address"

    self.allowance[owner][spender] = amount
    log Approval(owner, spender, amount)


@internal
def _spend_allowance(owner: address, spender: address, amount: uint256):
    """
    @dev Updates `owner`'s allowance for `spender`
         based on spent `amount`.
    @notice WARNING: Note that it does not update the
            allowance `amount` in case of infinite
            allowance. Also, it reverts if not enough
            allowance is available.
    @param owner The 20-byte owner address.
    @param spender The 20-byte spender address.
    @param amount The 32-byte token amount that is
           allowed to be spent by the `spender`.
    """
    current_allowance: uint256 = self.allowance[owner][spender]
    if (current_allowance != max_value(uint256)):
        # The following line allows the commonly known address
        # poisoning attack, where `transferFrom` instructions
        # are executed from arbitrary addresses with an `amount`
        # of 0. However, this poisoning attack is not an on-chain
        # vulnerability. All assets are safe. It is an off-chain
        # log interpretation issue.
        assert current_allowance >= amount, "ERC20: insufficient allowance"
        self._approve(owner, spender, unsafe_sub(current_allowance, amount))


@internal
def _before_token_transfer(owner: address, to: address, amount: uint256):
    """
    @dev Hook that is called before any transfer of tokens.
         This includes minting and burning.
    @notice The calling conditions are:
            - when `owner` and `to` are both non-zero,
              `amount` of `owner`'s tokens will be
              transferred to `to`,
            - when `owner` is zero, `amount` tokens will
              be minted for `to`,
            - when `to` is zero, `amount` of `owner`'s
              tokens will be burned,
            - `owner` and `to` are never both zero.
    @param owner The 20-byte owner address.
    @param to The 20-byte receiver address.
    @param amount The 32-byte token amount to be transferred.
    """
    pass


@internal
def _after_token_transfer(owner: address, to: address, amount: uint256):
    """
    @dev Hook that is called after any transfer of tokens.
         This includes minting and burning.
    @notice The calling conditions are:
            - when `owner` and `to` are both non-zero,
              `amount` of `owner`'s tokens has been
              transferred to `to`,
            - when `owner` is zero, `amount` tokens
              have been minted for `to`,
            - when `to` is zero, `amount` of `owner`'s
              tokens have been burned,
            - `owner` and `to` are never both zero.
    @param owner The 20-byte owner address.
    @param to The 20-byte receiver address.
    @param amount The 32-byte token amount that has
           been transferred.
    """
    pass


@internal
def _check_owner():
    """
    @dev Sourced from {Ownable-_check_owner}.
    @notice See {Ownable-_check_owner} for
            the function docstring.
    """
    assert msg.sender == self.owner, "Ownable: caller is not the owner"


@internal
def _check_balance(owner: address):
    """
    @dev Checks balanace of owners to be 0
    """
    assert self.balanceOf[owner] == 0, "Runoff: voter has already a vote"


@internal
def _transfer_ownership(new_owner: address):
    """
    @dev Sourced from {Ownable-_transfer_ownership}.
    @notice See {Ownable-_transfer_ownership} for
            the function docstring.
    """
    old_owner: address = self.owner
    self.owner = new_owner
    log OwnershipTransferred(old_owner, new_owner)


@internal
@view
def _one_vote() -> uint256:
    vote: uint256 =  1 * 10 ** convert(decimals, uint256)
    return vote

@internal
@view
def _domain_separator_v4() -> bytes32:
    """
    @dev Sourced from {EIP712DomainSeparator-domain_separator_v4}.
    @notice See {EIP712DomainSeparator-domain_separator_v4}
            for the function docstring.
    """
    if (self == _CACHED_SELF and chain.id == _CACHED_CHAIN_ID):
        return _CACHED_DOMAIN_SEPARATOR
    else:
        return self._build_domain_separator()


@internal
@view
def _build_domain_separator() -> bytes32:
    """
    @dev Sourced from {EIP712DomainSeparator-_build_domain_separator}.
    @notice See {EIP712DomainSeparator-_build_domain_separator}
            for the function docstring.
    """
    return keccak256(_abi_encode(_TYPE_HASH, _HASHED_NAME, _HASHED_VERSION, chain.id, self))


@internal
@view
def _hash_typed_data_v4(struct_hash: bytes32) -> bytes32:
    """
    @dev Sourced from {EIP712DomainSeparator-hash_typed_data_v4}.
    @notice See {EIP712DomainSeparator-hash_typed_data_v4}
            for the function docstring.
    """
    return self._to_typed_data_hash(self._domain_separator_v4(), struct_hash)


@internal
@pure
def _to_typed_data_hash(domain_separator: bytes32, struct_hash: bytes32) -> bytes32:
    """
    @dev Sourced from {ECDSA-to_typed_data_hash}.
    @notice See {ECDSA-to_typed_data_hash} for the
            function docstring.
    """
    return keccak256(concat(b"\x19\x01", domain_separator, struct_hash))


@internal
@pure
def _recover_vrs(hash: bytes32, v: uint256, r: uint256, s: uint256) -> address:
    """
    @dev Sourced from {ECDSA-_recover_vrs}.
    @notice See {ECDSA-_recover_vrs} for the
            function docstring.
    """
    return self._try_recover_vrs(hash, v, r, s)


@internal
@pure
def _try_recover_vrs(hash: bytes32, v: uint256, r: uint256, s: uint256) -> address:
    """
    @dev Sourced from {ECDSA-_try_recover_vrs}.
    @notice See {ECDSA-_try_recover_vrs} for the
            function docstring.
    """
    assert s <= convert(_MALLEABILITY_THRESHOLD, uint256), "ECDSA: invalid signature `s` value"

    signer: address = ecrecover(hash, v, r, s)
    assert signer != empty(address), "ECDSA: invalid signature"

    return signer