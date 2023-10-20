import { Link, Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { useAccount } from "wagmi";
import { NoAccount } from "./components/no-account";

export function Layout() {
    return (
        <Tabs defaultValue="register" className="w-full p-6 pb-0">
            <TabsList className="grid w-full grid-cols-3 h-full">
                <Link to="/">
                    <TabsTrigger value="register" className="text-lg py-3 w-full">Registro</TabsTrigger>
                </Link>
                <Link to="/vote">
                    <TabsTrigger value="vote" className="text-lg py-3 w-full">Votar</TabsTrigger>
                </Link>
                <Link to="/results">
                    <TabsTrigger value="results" className="text-lg py-3 w-full">Resultados</TabsTrigger>
                </Link>
            </TabsList>
            <TabsContent value="register">
                <Outlet />
            </TabsContent>
            <TabsContent value="vote">
                <Outlet />
            </TabsContent>
            <TabsContent value="results">
                <Outlet />
            </TabsContent>
        </Tabs>
    )

}