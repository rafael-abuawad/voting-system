import { collection, addDoc } from "firebase/firestore";
import { db } from "./firestore";

interface Voter {
    name: string;
    age: number;
    email: string;
    address: string;
}

export async function saveVoterMetadata(voter: Voter): Promise<string> {
    try {
        const voterRef = await addDoc(collection(db, "voters"), voter);
        return voterRef.id
    } catch (error) {
        throw new Error(`Failed to save to IPFS: ${error}`);
    }
}