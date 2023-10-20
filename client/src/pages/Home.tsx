import { useAccount } from "wagmi"
import { MainTabs } from "../components/main-tabs";
import { NoAccount } from "../components/no-account";

export function Home() {
    const { isConnected } = useAccount()

    if (isConnected) {
        return <MainTabs />
    }
    return <NoAccount />
}