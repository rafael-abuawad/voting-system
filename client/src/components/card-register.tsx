import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { saveVoterMetadata } from "../utils/generate-voter-metadata";
import { useAccount } from "wagmi";

export function CardRegister() {
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [email, setEmail] = useState("")
    const { address } = useAccount() 

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const id = await saveVoterMetadata({ name, age, email, address: address ? address : "" });
            console.log(id)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Registro</CardTitle>
                    <CardDescription>
                        Registrese para la votación
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" placeholder="Pedro Duarte" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="age">Edad</Label>
                        <Input type="number" min={18} max={120} id="age" placeholder="21" value={age} onChange={(e) => setAge(Number(e.target.value))} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="pedro@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Registrarse</Button>
                </CardFooter>
            </Card>
        </form>
    )
}