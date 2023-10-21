import { useAccount, useContractRead } from "wagmi";
import { CardVoteClosed } from "../components/card-vote-closed";
import { CardVoteOpen } from "../components/card-vote-open";
import { CardVoted } from "../components/card-voted";
import Runoff from "../abis/Runoff.json";
import { CardVoteIsNotRegistred } from "../components/card-vote-is-not-registred";
import { CardVoteComplete } from "../components/card-vote-complete";

export function Elections() {
    const { address } = useAccount();

    const { data: isRegistred } = useContractRead({
        address: "0xb5a1F2218a49B78ff855d9caE8E01e179E353ffc",
        abi: Runoff.abi,
        functionName: "isRegistred",
        args: [address],
        select(data) {
            return Boolean(data);
        },
    });

    const { data: isOngoing } = useContractRead({
        address: "0xb5a1F2218a49B78ff855d9caE8E01e179E353ffc",
        abi: Runoff.abi,
        functionName: "isOngoing",
        select(data) {
            return Boolean(data);
        },
    });

    const { data: isDone } = useContractRead({
        address: "0xb5a1F2218a49B78ff855d9caE8E01e179E353ffc",
        abi: Runoff.abi,
        functionName: "isDone",
        select(data) {
            return Boolean(data);
        },
    });

    const { data: hasVoted } = useContractRead({
        address: "0xb5a1F2218a49B78ff855d9caE8E01e179E353ffc",
        abi: Runoff.abi,
        functionName: "hasVoted",
        args: [address],
        select(data) {
            return Boolean(data);
        },
    });

    if (!isRegistred) {
        return (
            <div className="p-6">
                <CardVoteIsNotRegistred />
            </div>
        );
    }

    if (hasVoted) {
        return (
            <div className="p-6">
                <CardVoted />
            </div>
        );
    }

    if (!isOngoing && !isDone) {
        return (
            <div className="p-6">
                <CardVoteClosed />
            </div>
        );
    }

    if (!isOngoing && isDone) {
        return (
            <div className="p-6">
                <CardVoteComplete />
            </div>
        );
    }

    return (
        <div className="p-6">
            <CardVoteOpen />
        </div>
    );
}
