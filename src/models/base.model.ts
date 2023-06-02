export type Row = Record<string, any> | { [colName: string]: string }; // copied from planetscale codebase

export interface ComponentBaseProps {
    classes: { [cssClassName: string]: string };
    baseClass: string;
}


export interface ResponseInterface {
    title: string;
    status: number;
    err?: string;
    notification?: string;
    className?: string;
    rows?: Row[];
}