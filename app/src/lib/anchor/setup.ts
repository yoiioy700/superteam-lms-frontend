import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

// Replace with your actual program ID from `declare_id!` in lib.rs
export const PROGRAM_ID = new PublicKey("ACADBRCB3zGvo1KSCbkztS33ZNzeBv2d7bqGceti3ucf");

// Minimal IDL matching the required frontend interactions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IDL: any = {
    version: "0.1.0",
    name: "onchain_academy",
    instructions: [
        {
            name: "enroll",
            accounts: [
                { name: "enrollment", isMut: true, isSigner: false },
                { name: "user", isMut: true, isSigner: true },
                { name: "systemProgram", isMut: false, isSigner: false },
            ],
            args: [{ name: "courseId", type: "string" }],
        },
        {
            name: "completeLesson",
            accounts: [
                { name: "enrollment", isMut: true, isSigner: false },
                { name: "user", isMut: false, isSigner: true },
            ],
            args: [{ name: "lessonIndex", type: "u8" }],
        }
    ],
    accounts: [
        {
            name: "Enrollment",
            type: {
                kind: "struct",
                fields: [
                    { name: "courseId", type: "string" },
                    { name: "student", type: "publicKey" },
                    { name: "completedLessons", type: "bytes" },
                    { name: "isCompleted", type: "bool" }
                ]
            }
        }
    ]
};

export function useAcademyProgram() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const provider = useMemo(() => {
        if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
            return null;
        }

        // Wrap the wallet adapter to match Anchor's expected Wallet interface
        const anchorWallet = {
            publicKey: wallet.publicKey,
            signTransaction: wallet.signTransaction,
            signAllTransactions: wallet.signAllTransactions,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new AnchorProvider(connection, anchorWallet as any, { commitment: "confirmed" });
    }, [connection, wallet]);

    const program = useMemo(() => {
        if (!provider) return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Program(IDL as Idl, provider as any);
    }, [provider]);

    return { program, provider };
}

// Utility to derive the PDA for a user's enrollment
export const getEnrollmentPDA = (courseId: string, userPubkey: PublicKey): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from("enrollment"),
            Buffer.from(courseId),
            userPubkey.toBuffer(),
        ],
        PROGRAM_ID
    );
};
