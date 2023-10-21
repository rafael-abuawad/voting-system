import { useContractReads, useContractWrite } from "wagmi";
import { Abi } from "viem";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Runoff from "../abis/Runoff.json";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CardVoted } from "./card-voted";

export function CardVoteOpen() {
    const [value, setValue] = useState("");

    const { data } = useContractReads({
        contracts: [
            {
                address: "0x653aCF9A0337706B8970Fa9B48688220D390CaB9",
                abi: Runoff.abi as Abi,
                functionName: "nominees",
                args: [0],
            },
            {
                address: "0x653aCF9A0337706B8970Fa9B48688220D390CaB9",
                abi: Runoff.abi as Abi,
                functionName: "nominee_names",
                args: [0],
            },
            {
                address: "0x653aCF9A0337706B8970Fa9B48688220D390CaB9",
                abi: Runoff.abi as Abi,
                functionName: "nominees",
                args: [1],
            },
            {
                address: "0x653aCF9A0337706B8970Fa9B48688220D390CaB9",
                abi: Runoff.abi as Abi,
                functionName: "nominee_names",
                args: [1],
            },
            {
                address: "0x653aCF9A0337706B8970Fa9B48688220D390CaB9",
                abi: Runoff.abi as Abi,
                functionName: "nominees",
                args: [2],
            },
            {
                address: "0x653aCF9A0337706B8970Fa9B48688220D390CaB9",
                abi: Runoff.abi as Abi,
                functionName: "nominee_names",
                args: [2],
            },
        ],
        select: (data) => {
            const reducedArray = [];
            let currentObject = { address: "", name: "" };

            for (const item of data) {
                if ((item.result as string).startsWith("0x")) {
                    currentObject.address = item.result as string;
                } else if (item.status === "success") {
                    currentObject.name = item.result as string;
                }

                if (currentObject.address && currentObject.name) {
                    reducedArray.push({ address: currentObject.address, name: currentObject.name });
                    currentObject = { address: "", name: "" };
                }
            }
            console.log(reducedArray);
            return reducedArray;
        },
    });

    const { isLoading, isSuccess, write } = useContractWrite({
        address: "0x653aCF9A0337706B8970Fa9B48688220D390CaB9",
        abi: Runoff.abi,
        functionName: "vote",
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        write({
            args: [value],
        });
        setValue("");
    }

    if (isSuccess) {
        return <CardVoted />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold">Votar</h3>
                    <p className="text-sm text-muted-foreground">Elija a su candidato preferido.</p>
                </div>
                <div>
                    <RadioGroup
                        defaultValue={value}
                        onValueChange={(e) => setValue(e)}
                        className="grid grid-cols-2 lg:grid-cols-3"
                    >
                        {data?.map((value, i) => (
                            <div className="flex items-center space-x-2" key={i}>
                                <Card className="w-full">
                                    <CardHeader>
                                        <CardTitle>
                                            <div className="flex space-x-2">
                                                <RadioGroupItem value={value.address} id={value.address} />
                                                <Label htmlFor={value.address} className="font-bold">
                                                    {value.name}
                                                </Label>
                                            </div>
                                        </CardTitle>
                                        <CardDescription>Partido Demócrata</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <img
                                                className="object-cover h-48 w-full rounded-xl"
                                                src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                alt=""
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Votar!
                </Button>
            </div>
        </form>
    );
}
