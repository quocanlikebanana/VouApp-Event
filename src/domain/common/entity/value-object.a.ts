import { shallowEqual } from 'shallow-equal-object';
import { removeNullValues } from '../helpers';

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    public readonly props: T;

    constructor(props: T) {
        this.validate(props);
        this.props = Object.freeze(props);
    }

    protected abstract validate(props: T): void;

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return shallowEqual(this.props, vo.props)
    }

    public clone(): this {
        const deepCopyProps = JSON.parse(JSON.stringify(this.props));
        return new (this.constructor as { new(props: T) })(deepCopyProps);
    }

    public update(updatedProps: Partial<T>): this {
        const notNullEvent = removeNullValues(updatedProps);
        const newProps = { ...this.props, ...notNullEvent };
        return new (this.constructor as { new(props: T) })(newProps);
    }
}