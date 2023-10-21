import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { useAccount } from "wagmi";
import { Voter } from "../types/voter";

export function CardRegister({ register }: { register: (v: Voter) => void }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(false);
    const { address } = useAccount();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let addr = address ? address : "";
        register({ name, age, email, address: addr });
    }

    useEffect(() => {
        setIsValid(true);
        if (email == "") {
            setIsValid(false);
        }
        if (name == "") {
            setIsValid(false);
        }
        if (age == 0) {
            setIsValid(false);
        }
    }, [name, age, email]);

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Registro</CardTitle>
                    <CardDescription>Registrese para la votación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            placeholder="Pedro Duarte"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="age">Edad</Label>
                        <Input
                            type="number"
                            min={18}
                            max={120}
                            id="age"
                            placeholder="21"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="pedro@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={!isValid} type="submit">
                        Registrarse
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
