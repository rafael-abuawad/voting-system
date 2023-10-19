import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";

export function CardRegister() {
    return (
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
                    <Input id="name" placeholder="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="age">Edad</Label>
                    <Input type="number" id="age" placeholder="21" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="pedro@mail.com" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Registrarse</Button>
            </CardFooter>
        </Card>
    )
}