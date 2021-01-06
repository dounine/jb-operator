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
        directions: Direction[];
        contractTypes: ContractType[];
        icon?: any;
    }

    export interface PositionData {
        data: Position[];
        code: string;
    }

    export interface Config {
        min: number;
        max: number;
        disable: boolean;
        input: boolean;
        setup: number;
        marks: Map;
    }

    export interface SliderConfigData {
        online: Config;
        rebound: Config;
        scheduling: Config;
        spread: Config;
        timeout: Config;
        volumn: Config;
    }

    export interface SliderConfig {
        type: string;
        data: SliderConfigData;
    }

    export interface SliderOnlineData {
        initPrice: string;
        tradePrice: string;
        tradeValue: string;
    }

    export interface SliderOnline {
        type: string;
        data: SliderOnlineData;
    }
}