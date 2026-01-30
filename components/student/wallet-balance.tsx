"use client";

import { Button } from "@/components/ui/button";
import { useOptimistic, useTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import { payFee, addMoney, getWalletBalance } from "@/app/student/actions";

export function WalletBalanceDisplay() {
    const [balance, setBalance] = useState(0.00);
    const [optimisticBalance, addOptimisticBalance] = useOptimistic(
        balance,
        (state, amount: number) => state - amount
    );
    const [isPending, startTransition] = useTransition();

    // Fetch initial balance
    useEffect(() => {
        const fetchBalance = async () => {
            const bal = await getWalletBalance("current"); // arg ignored by secure action
            startTransition(() => {
                setBalance(bal);
                // Reset optimistic state to match fetched? 
                // Actually useOptimistic takes the base state.
                // We can't update optimistic base directly easily here without re-render loop if not careful.
                // But simply setting state triggers re-render.
            });
        };
        fetchBalance();
    }, []);

    const handlePayFee = () => {
        const amountToPay = 500;
        startTransition(async () => {
            addOptimisticBalance(amountToPay); // Deduct (positive arg to logic which does state - amount)
            const result = await payFee("current", amountToPay);
            if (result && result.success) {
                toast.success("Fee Paid Successfully!", { description: `New Balance: $${result.new_balance}` });
                setBalance(result.new_balance);
            } else {
                toast.error("Payment Failed", { description: result?.message || "Please try again." });
            }
        });
    };

    const handleAddMoney = () => {
        const amountToAdd = 500;
        startTransition(async () => {
            // Optimistic update: Add local balance
            addOptimisticBalance(-amountToAdd); // Negative amount to subtract = Add

            const result = await addMoney(amountToAdd);

            if (result && result.success) {
                toast.success("Money Added!", { description: `$${amountToAdd} added to wallet.` });
                setBalance(result.new_balance);
            } else {
                toast.error("Top-up Failed", { description: result?.message || "Please try again." });
            }
        });
    };

    return (
        <>
            <h4 className="text-3xl font-black text-white tracking-tight leading-none mb-4">
                ${optimisticBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h4>
            <div className="flex gap-2">
                <Button
                    onClick={handleAddMoney}
                    className="h-8 text-[10px] px-4 rounded-lg bg-[#0047AB] hover:bg-[#003087] text-white font-bold uppercase tracking-wide transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                    Add
                </Button>
                <Button
                    onClick={handlePayFee}
                    disabled={isPending}
                    variant="outline"
                    className="h-8 text-[10px] px-4 rounded-lg bg-white/10 border-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wide transition-all active:scale-95"
                >
                    {isPending ? "Paying..." : "Pay Fee"}
                </Button>
            </div>
        </>
    );
}
