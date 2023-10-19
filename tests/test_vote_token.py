import ape

ONE_VOTE = 1000000000000000000  # 1 * 10^18


def test_initial_values(token):
    assert token.name() == "Vote Token"
    assert token.symbol() == "VTKN"
    assert token.one_vote() == ONE_VOTE


def test_mint(token, voters, sender):
    voter = voters[0]
    token.mint(voter.address, sender=sender)
    assert token.balanceOf(voter.address) == ONE_VOTE

    with ape.reverts("Runoff: voter has already a vote"):
        token.mint(voter.address, sender=sender)
