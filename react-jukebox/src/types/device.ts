export interface Device {
    id: string;
    name: string;
    type: string;
    is_active: boolean;
    is_restricted: boolean;
    volume_percent: number;
}
