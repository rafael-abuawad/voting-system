import { useAccount, useContractWrite } from 'wagmi'
import { CardRegister } from "../components/card-register";
import { CardRegistred } from "../components/card-registred";
import { useEffect, useState } from "react";
import { Voter } from "../types/voter";
import { pb } from "../utils/pb";
import Runoff from "../abis/Runoff.json"

export function Register() {
    const [exists, setExists] = useState(false)
    const [voter, setVoter] = useState<Voter | any>()
    const { address } = useAccount()
    const { data, write } = useContractWrite({
        address: '0x004ede00c4cd487264ca39e10449a7e9d7b28826',
        abi: Runoff.abi,
        functionName: 'safe_register',
    })

    async function getData() {
        setExists(false)
        if (address) {
            const record = await pb
                .collection('voters')
                .getFirstListItem(`address="${address}"`, {
                    expand: 'name,email,age,address',
                });
            setVoter(record)
            setExists(true)
        }
    }

    async function createData(data: Voter) {
        const record = await pb.collection('voters').create(data);
        setExists(true)
        setVoter(data)
        write({ args: [address, record.id] })
        console.log(record)
    }

    useEffect(() => {
        if (pb) {
            getData()
        }
    }, [address, pb])

    return (
        <div className="space-y-6 p-6">
            {!exists && <CardRegister register={createData} />}
            {exists && <CardRegistred voter={voter} />}
        </div>
    )
}