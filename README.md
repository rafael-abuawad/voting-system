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
[Token Smart-Contract](https://mumbai.polygonscan.com/address/0xFdD62CD78dc385C9273B6f6B3281bCD423ff1D4C)
[Runoff Smart-Contract](https://mumbai.polygonscan.com/address/0x653aCF9A0337706B8970Fa9B48688220D390CaB9)
