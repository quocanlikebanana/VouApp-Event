import { ValueObject } from "src/domain/common/entity/value-object.a";

export type PuzzleProps = {
    ex_id: number;
    ex_name: string;
};

export default class PuzzleValueObject extends ValueObject<PuzzleProps> {
    protected validate(props: PuzzleProps): void {
    }
}