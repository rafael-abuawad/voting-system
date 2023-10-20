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

    nominees = [
        {"address": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", "name": "Don Duck"},
        {"address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", "name": "Joe Doe"},
        {"address": "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3", "name": "Jane Dane"},
    ]
    for nominee in nominees:
        runoff.add_nominee(nominee["address"], nominee["name"], sender=sender)
