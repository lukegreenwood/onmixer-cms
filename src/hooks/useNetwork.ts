import { NetworkContext } from "@/contexts";
import { useContext } from "react";

export function useNetwork() {
	const context = useContext(NetworkContext);
	if (context === undefined) {
		throw new Error("useNetwork must be used within a NetworkProvider");
	}
	return context;
}
