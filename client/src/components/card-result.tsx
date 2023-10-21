import { Abi, formatUnits } from "viem";
import { useContractRead } from "wagmi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import ERC20 from "../abis/ERC20.json";

export function CardResult({ address, name, image }: { address: `0x${string}`; name: string; image: string }) {
    const { data } = useContractRead({
        address: "0xFdD62CD78dc385C9273B6f6B3281bCD423ff1D4C",
        abi: ERC20.abi as Abi,
        functionName: "balanceOf",
        args: [address],
        select: (data) => {
            return formatUnits(data as bigint, 18);
        },
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Partido Demócrata</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <img className="object-cover h-48 w-full rounded-xl" src={image} alt={name} />
                    <p className="text-muted-foreground">Votos totales: {data ? Number(data) * 10 : 0}%</p>
                    <Progress className="h-3" value={data ? Number(data) * 10 : 0} />
                </div>
            </CardContent>
        </Card>
    );
}
