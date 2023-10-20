import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Label } from "../components/ui/label";

export function Results() {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h3>Resultado Generales</h3>
            </div>
            <div className="grid gid-cols-2 lg:grid-cols-3 space-x-3">
                <div className="flex items-center">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex space-x-2">
                                    <Label htmlFor="r1" className="font-bold">Mark Dawn</Label>
                                </div>
                            </CardTitle>
                            <CardDescription>Partido Demócrata</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <img className="object-cover h-48 w-full rounded-xl" src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div className="space-x-2">
                                <h3>Votos totales: 30%</h3>
                                <Progress value={30} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex items-center space-x-2">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex space-x-2">
                                    <Label htmlFor="r2" className="font-bold">Joe Doe</Label>
                                </div>
                            </CardTitle>
                            <CardDescription>Partido Demócrata</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <img className="object-cover h-48 w-full rounded-xl" src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div className="space-x-2">
                                <h3>Votos totales: 45%</h3>
                                <Progress value={45} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex items-center space-x-2">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex space-x-2">
                                    <Label htmlFor="r3" className="font-bold">Jane Doe</Label>
                                </div>
                            </CardTitle>
                            <CardDescription>Partido Demócrata</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <img className="object-cover h-48 w-full rounded-xl" src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg" alt="" />
                            </div>
                            <div className="space-x-2">
                                <h3>Votos totales: 25%</h3>
                                <Progress value={25} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <h2>El ganador de la contienda con el 45% de los votos es Joe Doe</h2>
            </div>
        </div>
    )

}