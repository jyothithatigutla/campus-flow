"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
    user: {
        name: string;
        role: "student" | "faculty";
        id: string;
        dept: string;
    } | null;
    isDarkMode: boolean;
    notificationsEnabled: boolean;
    notices: Array<{ id: number; title: string; content: string; date: string; category: string }>;
    systemAlert: { message: string; type: "info" | "warning" | "error" } | null;
    resultsPublished: boolean;
}

interface AppContextType {
    state: AppState;
    setUser: (user: AppState["user"]) => void;
    toggleDarkMode: () => void;
    setNotifications: (enabled: boolean) => void;
    addNotice: (notice: Omit<AppState["notices"][0], "id" | "date">) => void;
    setSystemAlert: (alert: AppState["systemAlert"]) => void;
    publishResults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>({
        user: {
            name: "Jyothic H",
            role: "student",
            id: "STU-2024-001",
            dept: "Computer Science"
        },
        isDarkMode: false,
        notificationsEnabled: true,
        notices: [
            { id: 1, title: "Mid-Term Examination Schedule", content: "The mid-term exams will start from next Monday.", date: "Today", category: "Academic" },
        ],
        systemAlert: null,
        resultsPublished: false
    });

    const setUser = (user: AppState["user"]) => setState(prev => ({ ...prev, user }));
    const toggleDarkMode = () => setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
    const setNotifications = (enabled: boolean) => setState(prev => ({ ...prev, notificationsEnabled: enabled }));
    const addNotice = (notice: Omit<AppState["notices"][0], "id" | "date">) => {
        const newNotice = {
            ...notice,
            id: Date.now(),
            date: "Just now"
        };
        setState(prev => ({ ...prev, notices: [newNotice, ...prev.notices] }));
    };
    const setSystemAlert = (alert: AppState["systemAlert"]) => setState(prev => ({ ...prev, systemAlert: alert }));
    const publishResults = () => setState(prev => ({ ...prev, resultsPublished: true }));

    return (
        <AppContext.Provider value={{ state, setUser, toggleDarkMode, setNotifications, addNotice, setSystemAlert, publishResults }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within a GlobalProvider");
    }
    return context;
}
