import { CardVoteClosed } from "../components/card-vote-closed";
import { CardVoteOpen } from "../components/card-vote-open";
import { CardVoted } from "../components/card-voted";

export function Elections() {
    let status = "elections"
    return (
        <div className="space-y-6 p-6">
            {status === 'elections' && <CardVoteOpen />}
            {status === 'closed' && <CardVoteClosed />}
            {status === 'voted' && <CardVoted />}
        </div>
    )

}