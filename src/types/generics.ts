export type GenericItem = {
    id: number,
    name: string,
    checked: boolean,
}

export type GenericList = {
    name: string,
    items: GenericItem[],
}

export type FilterType = {
    filters: GenericList[]
}