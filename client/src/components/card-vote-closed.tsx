import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function CardVoteClosed() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Votar</CardTitle>
                <CardDescription>La votación aun no comenzo.</CardDescription>
            </CardHeader>
        </Card>
    );
}
