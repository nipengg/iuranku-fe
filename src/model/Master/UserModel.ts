// Model
export interface User {
    id: number | null;
    name: string;
    email: string;
    gender: string;
    address: string;
    phone: string;
    role: string;
    created_at: Date | null;
    update_at: Date | null;
}

// Init
export const UserInitial: User = {
    id: null,
    name: "",
    email: "",
    role: "",
    address: "",
    phone: "",
    gender: "",
    created_at: null,
    update_at: null,
}