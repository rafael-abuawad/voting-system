import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { Separator } from "./components/ui/separator";
import { ThemeProvider } from "./components/theme-provider";
import { Home } from "./pages/Home";
import { ModeToggle } from "./components/mode-toggle";


const ALCHEMY_ID = import.meta.env.VITE_ALCHEMY_ID || ""
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ""

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: ALCHEMY_ID, // or infuraId
    walletConnectProjectId: WALLETCONNECT_PROJECT_ID,

    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="midnight" options={{ language: "es-ES" }}>
          <main>
            <div className="p-6 flex justify-between items-center w-full">
              <div>
                <h3 className="text-lg font-bold">🗳️ Sistema De Votacion</h3>
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
            <Home />
          </main>
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

export default App
