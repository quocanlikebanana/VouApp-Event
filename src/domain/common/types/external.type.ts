export type ExternalUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    facebook: string;
}

export type ExternalPartner = {
    id: number;
    name: string;
}

export type ExternalPromotion = {
    id: number;
    name: string;
    description: string;
}

export type ExternalGame = {
    id: number;
    name: string;
    description: string;
}

type ExternalPuzzle = {
    id: number;
    name: string;
}

export type ExternalPuzzleSet = {
    id: number;
    name: string;
    puzzles: ExternalPuzzle[];
}
