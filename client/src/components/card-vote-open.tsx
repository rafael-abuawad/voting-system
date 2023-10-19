import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function CardVoteOpen() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Votar</CardTitle>
                <CardDescription>
                    Elija a su candidato preferido.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="null" id="r3" />
                        <Label htmlFor="r3">Nullo/En blanco</Label>
                    </div>
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Button>Votar!</Button>
            </CardFooter>
        </Card>
    )
}