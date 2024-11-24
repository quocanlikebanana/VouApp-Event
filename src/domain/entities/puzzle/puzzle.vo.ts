import { ValueObject } from "src/domain/common/entity/value-object.a";

export type PuzzleProps = {
    puzzleId: number;
    puzzleName: string;
};

export default class PuzzleValueObject extends ValueObject<PuzzleProps> {
    protected validate(props: PuzzleProps): void {
    }
}