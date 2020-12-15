declare namespace API {
    export interface Direction {
        name: string;
        value: string;
    }
    export interface ContractType {
        name: string;
        value: string;
    }
    export interface Position {
        name: string;
        status: string;
        directions: array<Direction>;
        contractTypes: array<ContractType>;
        icon?: any;
    }
    export interface PositionData {
        data: array<Position>;
        code: string;
    }
}