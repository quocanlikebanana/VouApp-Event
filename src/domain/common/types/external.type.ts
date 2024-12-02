export type ExternalUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    facebook: string;
}

export type ExternalPartner = {
    id: string;
    name: string;
}

export type ExternalPromotion = {
    id: string;
    name: string;
    description: string;
}

export type ExternalGame = {
    id: string;
    name: string;
    description: string;
}

type ExternalPuzzle = {
    id: string;
    name: string;
}

export type ExternalPuzzleSet = {
    id: string;
    name: string;
    puzzles: ExternalPuzzle[];
}
