# pragma version ^0.3.10


# @dev We our custom `ERC20` interface,
from .interfaces.IERC20Vote import IERC20Vote

# @dev We import the `ERC20` interface,
# which is a built-in interface of the Vyper compiler.
from vyper.interfaces import ERC20



# @dev Constant used as part of the ECDSA recovery function.
_MALLEABILITY_THRESHOLD: constant(bytes32) = 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0


# @dev The 32-byte type hash for the EIP-712 domain separator.
_TYPE_HASH: constant(bytes32) = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")


# @dev The 32-byte type hash of the `permit` function.
_PERMIT_TYPE_HASH: constant(bytes32) = keccak256("Permit(address spender,uint256 tokenId,uint256 nonce,uint256 deadline)")


# @dev The max amount nominees the contract can store.
_MAX_NOMINEE_COUNT: constant(uint8) = 3


# @dev Stores the base URI for computing `tokenURI`.
_BASE_URI: immutable(String[80])


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


# @dev Stores the address as `immutable` of the
# voting token
_TOKEN: immutable(address)


# @dev Stores all of the nominees addresses.
nominees: public(address[_MAX_NOMINEE_COUNT])


# @dev Stores all of the nominee human-readable names.
nominee_names: public(HashMap[uint256, String[80]])


# @dev Returns the address of the current owner.
owner: public(address)


# @dev Returns the state of the current vote.
isOngoing: public(bool)


# @dev Returns the state of the current vote.
isDone: public(bool)


# @dev An `uint256` counter variable that sets
# the nominee ID for each `add_nominee` call and
# then increments
_nominee_counter: uint256


# @dev Mapping from voter ID to voter address.
_voters: HashMap[uint256, address]


# @dev Mapping from voter address to if they are
# registred or not.
_address_is_registred: HashMap[address, bool]



# @dev Mapping from voter address to if they have
# voted or not.
_address_has_voted: HashMap[address, bool]


# @dev Array with all voter IDs used for enumeration.
_all_voters: DynArray[uint256, max_value(uint64)]


# @dev Mapping from voter ID to position in the
# `_all_voters` array.
_all_voters_index: HashMap[uint256, uint256]


# @dev Mapping from voter ID to voter URI.
# @notice Since the Vyper design requires
# strings of fixed size, we arbitrarily set
# the maximum length for `_voter_uris` to 432
# characters. Since we have set the maximum
# length for `_BASE_URI` to 80 characters,
# which implies a maximum character length
# for `voterURI` of 512.
_voter_uris: HashMap[uint256, String[432]]


# @dev An `uint256` counter variable that sets
# the voter ID for each `register` call and
# then increments
_counter: uint256


# @dev Emitted when the metadata of a voter is
# changed.
event MetadataUpdate:
    voter_id: uint256
    

# @dev Emitted when `voter_id` voter is
# transferred from `owner` to `to`.
event Transfer:
    owner: indexed(address)
    to: indexed(address)
    voter_id: indexed(uint256)


# @dev Emitted when someone has voted
event Vote:
    owner: indexed(address)


# @dev Emitted when the ownership is transferred
# from `previous_owner` to `new_owner`.
event OwnershipTransferred:
    previous_owner: indexed(address)
    new_owner: indexed(address)


@external
@payable
def __init__(base_uri_: String[80], token_: address, name_eip712_: String[50], version_eip712_: String[20]):
    """
    @dev To omit the opcodes for checking the `msg.value`
         in the creation-time EVM bytecode, the constructor
         is declared as `payable`.
    @notice The `owner` role will be assigned to
            the `msg.sender`.
    @param token_ The address of the ERC20 smart-contract
           that manages voting.
    @param base_uri_ The maximum 80-character user-readable
           string base URI for computing `voterURI`.
    @param name_eip712_ The maximum 50-character user-readable
           string name of the signing domain, i.e. the name
           of the dApp or protocol.
    @param version_eip712_ The maximum 20-character current
           main version of the signing domain. Signatures
           from different versions are not compatible.
    """
    self._counter = empty(uint256)
    self._nominee_counter = empty(uint256)

    self._transfer_ownership(msg.sender)

    _BASE_URI = base_uri_
    _TOKEN = token_
    _NAME = name_eip712_
    _VERSION = version_eip712_
    _HASHED_NAME = keccak256(name_eip712_)
    _HASHED_VERSION = keccak256(version_eip712_)
    _CACHED_DOMAIN_SEPARATOR = self._build_domain_separator()
    _CACHED_CHAIN_ID = chain.id
    _CACHED_SELF = self


@external
def add_nominee(nominee: address, name: String[80]):
    """
    @dev Safely registers `nominee` and adds it to `nominees`.
    @notice Only the owner can access this function.
            Note that `owner` cannot be the zero address.
            Also, new voters will be automatically assigned
            an incremental ID.
    @param nominee The 20-byte address of the voter.
    """
    self._check_owner()


    assert nominee not in self.nominees, "Runoff: nominee already reigstred"
    assert self._nominee_counter < convert(_MAX_NOMINEE_COUNT, uint256), "Runoff: maximum amount of nominees reached" 
    
    nominee_id: uint256 = self._nominee_counter
    self._nominee_counter = nominee_id + 1

    self.nominees[nominee_id] = nominee
    self.nominee_names[nominee_id] = name


@external
def safe_register(addr: address, uri: String[432]):
    """
    @dev Safely registers `voter_id` and assigns it to a `owner`.
    @param addr The 20-byte address of the voter.
    @param uri The maximum 432-character user-readable
           string URI for computing `voterURI`.
    """
    assert addr not in self.nominees, "Runoff: nominee address cannot be voter"
    assert not self._is_address_registred(addr), "Runoff: address has already been registred"

    # New voters will be automatically assigned an incremental ID.
    # The first voter ID will be zero.
    voter_id: uint256 = self._counter
    self._counter = voter_id + 1

    self._address_is_registred[addr] = True

    # Theoretically, the following line could overflow
    # if all 2**256 voter IDs were registred. However,
    # since we have bounded the dynamic array `_all_voters`
    # by the maximum value of `uint64` and the `_counter`
    # increments above are checked for an overflow, this is
    # no longer even theoretically possible.
    self._register(addr, voter_id)
    self._set_voter_uri(voter_id, uri)


@external
def vote(for_: address):
    """
    @dev Allows the voter to vote.
    @param for_ The addresss of the nominee the voter is voting
                for.
    """
    assert self.isOngoing == True, "Runoff: voting is not on-going"
    assert not self.isDone , "Runoff: voting period is complete"
    assert for_ in self.nominees, "Runoff: `for` address not registred as nominee"
    assert not self._address_has_voted[msg.sender], "Runoff: msg.sender has already voted"

    token: IERC20Vote = IERC20Vote(_TOKEN)
    amount: uint256 = token.one_vote()
    token.transferFrom(msg.sender, for_, amount)


@external
@view
def hasVoted(addr: address) -> bool:
    """
    @dev Returns if the user has voted or not.
    @return addr The 20-byte voter address.
    """
    return self._address_has_voted[addr]


@external
@view
def voterURI(voter_id: uint256) -> String[512]:
    """
    @dev Returns the Uniform Resource Identifier (URI)
         for the `voter_id` voter.
    @notice Throws if `voter_id` is not a valid voter
    @param voter_id The 32-byte identifier of the voter.
    @return String The maximum 512-character user-readable
            string voter URI of the `voter_id` voter.
    """
    self._require_registred(voter_id)
    voter_uri: String[432] = self._voter_uris[voter_id]

    base_uri_length: uint256 = len(_BASE_URI)
    # If there is no base URI, return the voter URI.
    if (base_uri_length == empty(uint256)):
        return voter_uri
    
    # If both are set, concatenate the base URI
    # and voter URI.
    if (len(voter_uri) != empty(uint256)):
        return concat(_BASE_URI, voter_uri)

    # If there is no voter URI but a base URI,
    # concatenate the base URI and voter ID.
    if (base_uri_length != empty(uint256)):
        return concat(_BASE_URI, uint2str(voter_id))
    else:
        return ""


@external
@view
def totalVoters() -> uint256:
    """
    @dev Returns the amount of voters in existence.
    @return uint256 The 32-byte voter supply.
    """
    return self._total_supply()


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


@external
def start():
    """
    @dev Completes the voting period.
    """
    assert not self.isDone, "Runoff: voting period already finished" 
    self.isOngoing = True


@external
def complete():
    """
    @dev Completes the voting period.
    """
    self.isDone = True
    self.isOngoing = False


@internal
def _add_voter_to_all_voters_enumeration(voter_id: uint256):
    """
    @dev This is an `internal` function that adds a voter
         to the voter tracking data structures.
    @param voter_id The 32-byte identifier of the voter.
    """
    self._all_voters_index[voter_id] = len(self._all_voters)
    self._all_voters.append(voter_id)


@internal
def _set_voter_uri(voter_id: uint256, voter_uri: String[432]):
    """
    @dev Sets `voter_uri` as the voter URI of `voter_id`.
    @notice Note that `voter_id` must exist.
    @param voter_id The 32-byte identifier of the voter.
    @param voter_uri The maximum 432-character user-readable
           string URI for computing `voterURI`.
    """
    assert self._exists(voter_id), "Runoff: URI set of nonexistent voter"
    self._voter_uris[voter_id] = voter_uri
    log MetadataUpdate(voter_id)


@internal
def _register(addr: address, voter_id: uint256):
    """
    @dev Mints `voter_id` and assigns it to `addr`.
    @notice Note that `voter_id` must not exist and
            `owner` cannot be the zero address.
    
    @param owner The 20-byte owner address.
    @param voter_id The 32-byte identifier of the voter.
    """
    assert addr != empty(address), "Runoff: mint to the zero address"
    assert not(self._exists(voter_id)), "Runoff: voter already registred"

    if addr != empty(address):
        self._add_voter_to_all_voters_enumeration(voter_id)

    # Theoretically, the following line could overflow
    # if all 2**256 voter IDs were minted to the same owner.
    # However, since we have bounded the dynamic array
    # `_all_voters` by the maximum value of `uint64`,
    # this is no longer even theoretically possible.
    self._voters[voter_id] = addr
    log Transfer(empty(address), addr, voter_id)

    # Mint the new gister a vote
    IERC20Vote(_TOKEN).mint(addr)


@internal
def _check_owner():
    """
    @dev Sourced from {Ownable-_check_owner}.
    @notice See {Ownable-_check_owner} for
            the function docstring.
    """
    assert msg.sender == self.owner, "Ownable: caller is not the owner"


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
def _total_supply() -> uint256:
    """
    @dev An `internal` helper function that returns the amount
         of voters in existence.
    @return uint256 The 32-byte voter supply.
    """
    return len(self._all_voters)


@internal
@view
def _is_address_registred(owner: address) -> bool:
    """
    @dev Returns if the `owner` has been registred or not.
    @param voter_id The 20-byte address of the voter.
    @return bool The verification whether `onwer` is registred
            or not.
    """
    return self._address_is_registred[owner]


@internal
@view
def _require_registred(voter_id: uint256):
    """
    @dev Reverts if the `voter_id` has not yet been registred.
    @param voter_id The 32-byte identifier of the voter.
    """
    assert self._exists(voter_id), "Runoff: invalid voter ID"


@internal
@view
def _exists(voter_id: uint256) -> bool:
    """
    @dev Returns whether `voter_id` exists.
    @param voter_id The 32-byte identifier of the voter.
    @return bool The verification whether `voter_id` exists
            or not.
    """
    return self._voters[voter_id] != empty(address)


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