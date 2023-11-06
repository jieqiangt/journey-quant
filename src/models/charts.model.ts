import { ColumnObject, ComponentBaseProps } from "./base.model";


export interface ChartProps extends ComponentBaseProps {
    data: ColumnObject[];
}

export interface NeccessityData {
    label: string;
    total: number;
    color: string;
}

export interface CategoryData {
    label: string;
    total: number;
    color: string;
}

export interface StackedBarCategoryData {
    date: string;
    necessities: number;
    healthcare: number;
    allowance: number;
    transport: number;
    education: number;
    entertainment: number;
    food: number;
    travel: number;
}

export interface NecessityCumData {
    date: string;
    essential: number;
    discretionary: number;
    cum_essential: number;
    cum_discretionary: number;
}

export interface PieChartProps extends ComponentBaseProps {
    data: CategoryData[] | NeccessityData[];
    total?: number;
}

export interface StackedBarProps extends ComponentBaseProps {
    data: StackedBarCategoryData[];
}

export interface GaugeChartProps extends ComponentBaseProps {
    data: CategoryData[] | NeccessityData[];
    outerData: CategoryData[] | NeccessityData[];
    total?: number;
}

export interface StackedAreaProps extends ComponentBaseProps {
    data: NecessityCumData[];
}