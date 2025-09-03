export interface MenuItem {
    name: string;
    price?: number;
    quantity: number;
    children?: MenuItem[];
    localIndex?: number
}

export interface TicketItem {
    name: string;
    type?: string;
    price: number;
    quantity: number;
}