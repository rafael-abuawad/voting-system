from ape import project, accounts


def main():
    sender = accounts.load("sender")
    token = sender.deploy(
        project.ERC20,
        "Vote Token",
        "VTKN",
        "vote-token",
        "0.0.1",
    )
    runoff = sender.deploy(
        project.Runoff,
        "http://127.0.0.1:8090/api/collections/voters/records/",
        token.address,
        "runoff",
        "0.0.1",
    )

    token.transfer_ownership(runoff.address, sender=sender)
