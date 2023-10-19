# pragma version ^0.3.10


@external
@view
def one_vote() -> uint256:
    """
    @dev Returns one vote, to be used by a voter.
    @return uint256 Returns one vote, with its
                    decimal value.
    """
    return empty(uint256)


@external
def mint(to: address):
    """
    @dev Mints `1` token and assigns them to `to` address.
    @notice Only the owner can access this function.
            Note that `owner` cannot be the zero address.
    @param to The 20-byte receiver address.
    """
    pass


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
    return empty(bool)


