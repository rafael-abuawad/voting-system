import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function CardVoteIsNotRegistred() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Votar</CardTitle>
                <CardDescription>
                    Aun no se a registrado para votar!<br></br>
                    <Button variant="link">
                        <Link to={"/"}>Register</Link>
                    </Button>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
