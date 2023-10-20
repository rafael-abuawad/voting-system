import { useAccount } from "wagmi"
import { MainTabs } from "../components/main-tabs";
import { NoAccount } from "../components/no-account";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Elections from "../components/elections";

export function Home() {
    const { isConnected } = useAccount()

    if (isConnected) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainTabs />} />
                    <Route path="/tabs/:tab/:eventId?" element={
                        (
                            <>
                                <MainTabs />
                            </>
                        )
                    }/>
                </Routes>
            </BrowserRouter>
        )
    }
    return <NoAccount />
}