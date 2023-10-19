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

export function MainTabs() {
    const isVotingOngoing = false
    const isRegistred = true

    return (
        <Tabs defaultValue="vote" className="w-full p-6">
            <TabsList className="grid w-full grid-cols-2 h-full">
                <TabsTrigger value="register" className="text-lg py-3">Registro</TabsTrigger>
                <TabsTrigger value="vote" className="text-lg py-3">Votar</TabsTrigger>
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
                <div className="space-y-6">
                    <CardVoteOpen />
                    <CardVoteClosed />
                    <CardVoted />
                </div>
            </TabsContent>
        </Tabs>
    )
}
