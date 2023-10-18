export type Card = {
    id: number
    title: string
    description: string
    type: string
    image: {
        url : string
    }
    is_new: boolean
};

export type SetOfCards = {
    character: Card
    spot: Card
    universe: Card
    quest: Card
};