import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function CardVoteOpen() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold">Votar</h3>
                <p className="text-sm text-muted-foreground">
                    Elija a su candidato preferido.
                </p>
            </div>
            <div>
                <RadioGroup defaultValue="comfortable" className="grid grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center space-x-2">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex space-x-2">
                                        <RadioGroupItem value="r1" id="r1" />
                                        <Label htmlFor="r1" className="font-bold">Mark Dawn</Label>
                                    </div>
                                </CardTitle>
                                <CardDescription>Partido Demócrata</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <img className="object-cover h-48 w-full rounded-xl" src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex space-x-2">
                                        <RadioGroupItem value="r2" id="r2" />
                                        <Label htmlFor="r2" className="font-bold">Joe Doe</Label>
                                    </div>
                                </CardTitle>
                                <CardDescription>Partido Demócrata</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <img className="object-cover h-48 w-full rounded-xl" src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex space-x-2">
                                        <RadioGroupItem value="r3" id="r3" />
                                        <Label htmlFor="r3" className="font-bold">Jane Doe</Label>
                                    </div>
                                </CardTitle>
                                <CardDescription>Partido Demócrata</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <img className="object-cover h-48 w-full rounded-xl" src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg" alt="" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </RadioGroup>
            </div>
            <Button className="w-full">Votar!</Button>
        </div>
    )
}