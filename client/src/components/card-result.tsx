import { Abi } from "viem";
import { useContractRead } from "wagmi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import ERC20 from "../abis/ERC20.json"


export function CardResult({ address, name, image }: { address: `0x${string}`, name: string, image: string }) {
    const { data } = useContractRead({
        address: '0xcD2Da9dB2Fd2c6e17adAe4B55D1AFa29a089A0fd',
        abi: ERC20.abi as Abi,
        functionName: "balanceOf",
        args: [address],
        select: (data) => {
            console.log(Number(data))
            return Number(data)
        }
    })

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Partido Demócrata</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <img className="object-cover h-48 w-full rounded-xl" src={image} alt={name} />
                    <p className="text-muted-foreground">Votos totales: {data ? data * 10 : 0}%</p>
                    <Progress max={10} value={data} />
                </div>
            </CardContent>
        </Card>
    )
}