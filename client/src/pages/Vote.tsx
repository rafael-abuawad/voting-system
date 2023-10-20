import { Button } from '../components/ui/button';
import ImgBolPred from '../assets/img_port_bol.png';
import ImgLaw from '../assets/leyes.jpg';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';


export function Vote({ results = false }: { results : Boolean }) {
    return (
        <div className="p-6">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Elecciones Presidenciales</CardTitle>
                        <CardDescription>2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <img
                                src={ImgBolPred}
                                alt="Bolivia Elecciones"
                                className="object-cover h-48 w-full rounded-xl"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Link to={results ? "/vote/results" : "/vote/elections"} className="w-full">
                            <Button className="w-full" >{results ? 'Ver resultados' : 'Votar!'}</Button>
                        </Link>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Aprobación Ley 123</CardTitle>
                        <CardDescription>2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <img
                                src={ImgLaw}
                                alt="Bolivia Eleciones"
                                className="object-cover h-48 w-full rounded-xl"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button className="w-full" disabled>Aun no disponible...</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
