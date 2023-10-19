import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function CardVoted() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Votar</CardTitle>
                <CardDescription>
                    ✔ Usted ya votó! Muchas graicas
                </CardDescription>
            </CardHeader>
        </Card>
    )
}