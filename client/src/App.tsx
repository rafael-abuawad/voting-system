import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { Separator } from "./components/ui/separator";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Layout } from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Vote } from "./pages/Vote";
import { Results } from "./pages/Results";
import { Elections } from "./pages/Elections";
import { polygon, polygonMumbai } from "viem/chains";

const ALCHEMY_ID = import.meta.env.VITE_ALCHEMY_ID || "";
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "";

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: ALCHEMY_ID, // or infuraId
        walletConnectProjectId: WALLETCONNECT_PROJECT_ID,

        // Required
        appName: "Voting System",
        chains: [polygonMumbai, polygon],

        // Optional
        appDescription: "Your App Description",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <WagmiConfig config={config}>
                    <ConnectKitProvider options={{ language: "es-ES" }}>
                        <main className="lg:px-96">
                            <div className="p-6 flex justify-between items-center w-full">
                                <div>
                                    <h3 className="text-lg font-bold">🗳️ Sistema De Votación</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Una nueva forma de hacer democracia, completamente decentralizada.
                                    </p>
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <ConnectKitButton />
                                    <ModeToggle />
                                </div>
                            </div>
                            <Separator />

                            {/* Views */}
                            <Layout />

                            {/* Router */}
                            <Routes>
                                <Route index element={<Register />} />
                                <Route path="vote" element={<Vote results={false} />} />
                                <Route path="vote/elections" element={<Elections />} />
                                <Route path="results" element={<Vote results={true} />} />
                                <Route path="vote/results" element={<Results />} />
                            </Routes>
                        </main>
                    </ConnectKitProvider>
                </WagmiConfig>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
