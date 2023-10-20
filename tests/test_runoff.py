import ape

ONE_VOTE = 1000000000000000000  # 1 * 10^18
VOTER1_URI = "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/1"
VOTER2_URI = "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/2"
VOTER3_URI = "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/3"


def test_initial_nominees(runoff, nominees, sender):
    runoff.add_nominee(nominees[0].address, "Mark Dwane", sender=sender)
    runoff.add_nominee(nominees[1].address, "Joe Doe", sender=sender)
    runoff.add_nominee(nominees[2].address, "Jane Doe", sender=sender)

    assert nominees[0].address == runoff.nominees(0)
    assert nominees[1].address == runoff.nominees(1)
    assert nominees[2].address == runoff.nominees(2)

    assert runoff.nominee_names(0) == "Mark Dwane"
    assert runoff.nominee_names(1) == "Joe Doe"
    assert runoff.nominee_names(2) == "Jane Doe"

    with ape.reverts("Runoff: nominee already reigstred"):
        runoff.add_nominee(nominees[0].address, "Mark Dwane", sender=sender)

    with ape.reverts("Runoff: maximum amount of nominees reached"):
        runoff.add_nominee(sender.address, "The Sender", sender=sender)


def test_initial_state(
    runoff,
):
    assert runoff.isOngoing() == False
    assert runoff.isDone() == False


def test_register_voter(token, runoff, voters, nominees, sender):
    # makes the `runoff` the new owner
    token.transfer_ownership(runoff.address, sender=sender)
    assert token.owner() == runoff.address

    runoff.add_nominee(nominees[0].address, "Mark Dwane", sender=sender)

    # adds voter
    voter = voters[0]
    runoff.safe_register(voter.address, "1", sender=voter)
    assert runoff.totalVoters() == 1
    assert runoff.voterURI(0) == VOTER1_URI
    assert runoff.hasVoted(voter.address) == False

    with ape.reverts("Runoff: address has already been registred"):
        runoff.safe_register(voter.address, "1", sender=voter)

    with ape.reverts("Runoff: nominee address cannot be voter"):
        nominee = nominees[0]
        runoff.safe_register(nominee.address, "1", sender=voter)


def test_register_voter_and_voter_votes(token, runoff, voters, nominees, sender):
    # makes the `runoff` the token new owner
    token.transfer_ownership(runoff.address, sender=sender)
    assert token.owner() == runoff.address

    # register all nominees
    runoff.add_nominee(nominees[0].address, "Mark Dwane", sender=sender)
    runoff.add_nominee(nominees[1].address, "Joe Doe", sender=sender)
    runoff.add_nominee(nominees[2].address, "Jane Doe", sender=sender)

    # register multple voters
    voter1 = voters[0]
    runoff.safe_register(voter1.address, "1", sender=voter1)
    assert runoff.totalVoters() == 1
    assert runoff.voterURI(0) == VOTER1_URI

    voter2 = voters[1]
    runoff.safe_register(voter2.address, "2", sender=voter2)
    assert runoff.totalVoters() == 2
    assert runoff.voterURI(1) == VOTER2_URI

    voter3 = voters[2]
    runoff.safe_register(voter3.address, "3", sender=voter3)
    assert runoff.totalVoters() == 3
    assert runoff.voterURI(2) == VOTER3_URI

    with ape.reverts("Runoff: voting period hasn't been started yet"):
        runoff.vote(nominee.address, sender=voter2)

    # starts the voting period
    runoff.start(sender=sender)
    assert runoff.isOngoing() == True
    assert runoff.isDone() == False

    # starting balance of nominees to be 0
    assert token.balanceOf(nominees[0].address) == 0
    assert token.balanceOf(nominees[1].address) == 0
    assert token.balanceOf(nominees[2].address) == 0

    # voter tries to vote for X (not a nominee)
    with ape.reverts("Runoff: `for` address not registred as nominee"):
        runoff.vote(voter2.address, sender=voter1)

    # voters start to vote
    nominee = nominees[0]

    runoff.vote(nominee.address, sender=voter1)
    # reverts voter1 trying to vote again
    with ape.reverts():
        runoff.vote(nominee.address, sender=voter1)
    assert token.balanceOf(nominee.address) == ONE_VOTE

    runoff.vote(nominee.address, sender=voter2)
    assert token.balanceOf(nominee.address) == 2 * ONE_VOTE

    runoff.vote(nominee.address, sender=voter3)
    assert token.balanceOf(nominee.address) == 3 * ONE_VOTE

    # ends the voting period
    runoff.complete(sender=sender)
    assert runoff.isOngoing() == False
    assert runoff.isDone() == True

    # reverts on trying to vote when over
    with ape.reverts("Runoff: voting period already finished"):
        runoff.vote(nominee.address, sender=voter2)

    # reverts on re-start
    with ape.reverts("Runoff: voting period already finished"):
        runoff.start(sender=sender)
