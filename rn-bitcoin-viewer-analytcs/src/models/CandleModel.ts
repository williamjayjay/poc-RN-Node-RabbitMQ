
export interface ICandle {
    _id: string;
    currency?: string
    finalDateTime: Date
    open: number
    close: number
    high: number
    low: number
    color: string
}
