import IPuzzleSetRepository from "src/domain/common/repositories/puzzle-set.repository.i";
import { ExternalPuzzleSet } from "src/domain/common/types/external.type";
import { EventAggregate } from "src/domain/event/event.agg";
import PuzzleEntity from "src/domain/puzzle/puzzle.entity";
import PuzzleSetAggregate from "src/domain/puzzle/puzzleset.agg";
import { PrismaDatabaseService } from "../common/database/database.service";
import PuzzleSetPrizeValueObject from "src/domain/puzzle/puzzle-set-prize.vo";
import { Injectable } from "@nestjs/common";
import { DomainError } from "src/domain/common/errors/domain.err";

type PuzzleSetDataModel = {
    Puzzle_Of_Events: {
        id: string;
        puzzleId: string;
        puzzleName: string;
        puzzleSetOfEventId: string;
    }[];
    PromotionOfEvent_For_PuzzleSetOfEvents: {
        id: string;
        puzzleSetOfEventId: string;
        quantity: number;
        promotionOfEventId: string;
    }[];
} & {
    id: string;
    puzzleSetId: string;
    puzzleSetName: string;
    eventId: string;
};

function toEntity(puzzleSet: PuzzleSetDataModel): PuzzleSetAggregate {
    return PuzzleSetAggregate.create({
        ex_puzzleSet: {
            id: puzzleSet.puzzleSetId,
            name: puzzleSet.puzzleSetName,
        },
        puzzles: puzzleSet.Puzzle_Of_Events.map(puzzle => {
            return PuzzleEntity.create({
                ex: {
                    id: puzzle.puzzleId,
                    name: puzzle.puzzleName,
                    puzzleSetId: puzzle.puzzleSetOfEventId
                },
                puzzleSetId: puzzleSet.id
            });
        }),
        puzzleSetPrize: puzzleSet.PromotionOfEvent_For_PuzzleSetOfEvents.map(prize => {
            return new PuzzleSetPrizeValueObject({
                quantity: prize.quantity,
                promotionOfEventId: prize.promotionOfEventId
            });
        }),
    }, puzzleSet.id);
}

@Injectable()
export default class PuzzleSetRepository implements IPuzzleSetRepository {
    constructor(
        private readonly databaseService: PrismaDatabaseService
    ) { }

    async getById(puzzleSetId: string): Promise<PuzzleSetAggregate> {
        const puzzleSet = await this.databaseService.puzzleSet_Of_Event.findUnique({
            where: {
                id: puzzleSetId
            },
            include: {
                Puzzle_Of_Events: true,
                PromotionOfEvent_For_PuzzleSetOfEvents: true
            }
        });
        if (!puzzleSet) {
            throw new DomainError('Puzzle set not found');
        }
        return toEntity(puzzleSet);
    }

    async getPuzzleById(puzzleId: string): Promise<PuzzleEntity> {
        const puzzle = await this.databaseService.puzzle_Of_Event.findUnique({
            where: {
                id: puzzleId
            }
        });
        return PuzzleEntity.create({
            ex: {
                id: puzzle.puzzleId,
                name: puzzle.puzzleName,
                puzzleSetId: puzzle.puzzleSetOfEventId
            },
            puzzleSetId: puzzle.puzzleSetOfEventId
        }, puzzle.id);
    }

    async addPuzzleSetsOfEvent(event: EventAggregate, puzzleSets: PuzzleSetAggregate[]): Promise<void> {
        for (const puzzleSet of puzzleSets) {
            await this.databaseService.puzzleSet_Of_Event.create({
                data: {
                    id: puzzleSet.id,
                    puzzleSetId: puzzleSet.props.ex_puzzleSet.id,
                    puzzleSetName: puzzleSet.props.ex_puzzleSet.name,
                    eventId: event.id,
                    Puzzle_Of_Events: {
                        createMany: {
                            data: puzzleSet.props.puzzles.map(puzzle => {
                                return {
                                    id: puzzle.id,
                                    puzzleId: puzzle.props.ex.id,
                                    puzzleName: puzzle.props.ex.name,
                                    puzzleSetOfEventId: puzzleSet.id
                                };
                            })
                        }
                    },
                    PromotionOfEvent_For_PuzzleSetOfEvents: {
                        createMany: {
                            data: puzzleSet.props.puzzleSetPrize.map(prize => {
                                return {
                                    quantity: prize.props.quantity,
                                    promotionOfEventId: prize.props.promotionOfEventId,
                                    puzzleSetOfEventId: puzzleSet.id
                                };
                            })
                        }
                    }
                }
            });
        }
    }

    async removePuzzleSetsOfEvent(event: EventAggregate): Promise<void> {
        await this.databaseService.puzzleSet_Of_Event.deleteMany({
            where: {
                eventId: event.id
            }
        });
    }

    async updateExternal(exPuzzleSet: ExternalPuzzleSet): Promise<void> {
        await this.databaseService.puzzle_Of_Event.deleteMany({
            where: {
                puzzleSetOfEventId: exPuzzleSet.id
            }
        });
        await this.databaseService.puzzle_Of_Event.createMany({
            data: exPuzzleSet.puzzles.map(puzzle => {
                return {
                    id: puzzle.id,
                    puzzleId: puzzle.id,
                    puzzleName: puzzle.name,
                    puzzleSetOfEventId: exPuzzleSet.id
                };
            })
        });
        await this.databaseService.puzzleSet_Of_Event.updateMany({
            where: {
                puzzleSetId: exPuzzleSet.id
            },
            data: {
                puzzleSetName: exPuzzleSet.name,
            }
        });
    }
}
