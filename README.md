# Voting System

## Setup Apeworx

```
python3 -m venv .venv
# activate
```

```
pip install eth-ape
```

```
ape plugins install vyper polygon alchemy etherscan
```

```
ape accounts generate sender
```

```
ape compile
ape test
ape run scripts/deploy.py --network polygon:mumbai:alchemy
ape console --network polygon:mumbai:alchemy
```

## Pocketbase Server

Start pocketbase server
```bash
$ cd ./ipfs
$ make run
```

Go to [http://127.0.0.1:8090/_](http://127.0.0.1:8090/_)

Use the following
```python
email=demo@mail.com
password=2L@.jQJemz:DE9!
```
[Token Smart-Contract](https://mumbai.polygonscan.com/address/0x852286113922e157719073346e99995B6E37072C)
[Runoff Smart-Contract](https://mumbai.polygonscan.com/address/0x00C79B6F4125D7516C42C8f35539505E39F9B9b3)
