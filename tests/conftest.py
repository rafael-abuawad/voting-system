import pytest


@pytest.fixture(scope="function")
def sender(accounts):
    return accounts[0]


@pytest.fixture(scope="function")
def voters(accounts):
    return [accounts[7], accounts[8], accounts[9]]


@pytest.fixture(scope="function")
def nominees(accounts):
    return [accounts[1], accounts[2], accounts[3]]


@pytest.fixture(scope="function")
def token(project, sender):
    return project.ERC20.deploy(
        "Vote Token", "VTKN", "vote-token", "0.0.1", sender=sender
    )


@pytest.fixture(scope="function")
def runoff(project, sender, token):
    return project.Runoff.deploy(
        "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/",
        token.address,
        "runoff",
        "0.0.1",
        sender=sender,
    )
