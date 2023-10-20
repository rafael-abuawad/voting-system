import { ConnectKitButton } from "connectkit";

export function NoAccount() {
    return (
        <main className="fixed top-0 left-0 bg-white z-50 h-screen w-screen flex flex-col space-y-6 items-center justify-center">
            <p className="text-sm text-muted-foreground">
                No conectaste ninguna billetera web3.
            </p>
            
                  <ConnectKitButton />
        </main>
    )
}