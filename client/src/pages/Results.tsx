import Runoff from "../abis/Runoff.json";
import { useContractReads } from "wagmi";
import { Abi } from "viem";
import { CardResult } from "../components/card-result";

export function Results() {
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
            let currentObject = { address: "", name: "", image: "" };

            for (const item of data) {
                if ((item.result as string).startsWith("0x")) {
                    currentObject.address = item.result as `0x${string}`;
                } else if (item.status === "success") {
                    currentObject.name = item.result as string;
                }

                if (currentObject.address && currentObject.name) {
                    const image =
                        "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                    reducedArray.push({ address: currentObject.address, name: currentObject.name, image });
                    currentObject = { address: "", name: "", image: "" };
                }
            }

            return reducedArray;
        },
    });

    return (
        <div className="space-y-6 p-6">
            <div>
                <h3>Resultado Generales</h3>
            </div>
            <div className="grid gid-cols-2 lg:grid-cols-3 gap-3">
                {data?.map((val, i) => (
                    <div className="flex items-center" key={i}>
                        <CardResult name={val.name} address={val.address as `0x${string}`} image={val.image} />
                    </div>
                ))}
            </div>
        </div>
    );
}
