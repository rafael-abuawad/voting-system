import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { CardRegister } from "./card-register"
import { CardRegistred } from "./card-registred"
import { CardVoteClosed } from "./card-vote-closed"
import { CardVoteOpen } from "./card-vote-open"
import { CardVoted } from "./card-voted"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./ui/tabs"

import { Progress } from "./ui/progress"
import VoteEvents from './vote-events'

export function MainTabs() {
    const { tab, eventId } = useParams();
    const location = useLocation();
    const naviagate = useNavigate();
    const isVotingOngoing = false
    const isRegistred = true

    const handleTabChange = (value: string) => {
        naviagate(`/tabs/${value}/${eventId}`);
    }

    return (
        <Tabs value={tab} onChange={handleTabChange} defaultValue="vote" className="w-full p-6">
            <TabsList className="grid w-full grid-cols-3 h-full mb-6">
                <TabsTrigger value="register" className="text-lg py-3">Registro</TabsTrigger>
                <TabsTrigger value="vote" className="text-lg py-3">Votar</TabsTrigger>
                <TabsTrigger value="results" className="text-lg py-3">Resultados</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
                {/* {isRegistred ? <CardRegistred /> : <CardRegister />} */}
                <div className="space-y-6">
                    <CardRegister />
                    <CardRegistred />
                </div>
            </TabsContent>
            <TabsContent value="vote">
                {/* {isVotingOngoing ? <CardVoteOpen /> : <CardVoteClosed />} */}
                {tab === 'vote' && eventId ? (
                    <div className="space-y-6">
                        {eventId === 'elections' && <CardVoteOpen />}
                        {eventId === 'closed' && <CardVoteClosed />}
                        {eventId === 'voted' && <CardVoted />}
                    </div>

                ): <VoteEvents />}
            </TabsContent>
            <TabsContent value="results">
                {/* {isVotingOngoing ? <CardVoteOpen /> : <CardVoteClosed />} */}
                <div className="space-y-6">
                    <Progress value={56} />
                </div>
            </TabsContent>
        </Tabs>
    )
}
