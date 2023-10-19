import { Label } from "@radix-ui/react-label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export function CardRegistred() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Registro</CardTitle>
                <CardDescription>
                    ✔ Usted ya esta registrado para la votación
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" defaultValue="Pedro Duarte" disabled />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="age">Edad</Label>
                    <Input type="number" id="age" defaultValue="21" disabled />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue="pedro@mail.com" disabled />
                </div>
            </CardContent>
        </Card>
    )
}