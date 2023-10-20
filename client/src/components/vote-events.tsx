import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import ImgBolPred from '../assets/img_port_bol.png';
import ImgLaw from '../assets/leyes.jpg';
import { useNavigate } from 'react-router-dom';

const VoteEvents = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/tabs/vote/elections');
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Elecciones Presidenciales</CardTitle>
                    <CardDescription>2025</CardDescription>
                </CardHeader>
                <CardContent>
                    <img
                        src={ImgBolPred}
                        alt="bol"
                        className="w-[40%] h-25 object-cover mb-2 rounded"
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleNavigate}>Votar!</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Aprobacion Ley 123</CardTitle>
                    <CardDescription>2023</CardDescription>
                </CardHeader>
                <CardContent>
                    <img
                        src={ImgLaw}
                        alt="bol"
                        className="w-[40%] h-25 object-cover mb-2 rounded"
                    />
                </CardContent>
                <CardFooter>
                    <Button>Votar!</Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default VoteEvents;