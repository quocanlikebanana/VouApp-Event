import { checkAllPropertiesNotNull } from '../common/helpers';
import { EventAggregate } from '../event/event.agg';

describe('[Domain][helpers]', () => {
    describe('>> f() checkAllPropertiesNotNull', () => {
        it('should return true for an object with all non-null properties', () => {
            const obj = {
                a: 1,
                b: 'string',
                c: true,
                d: {
                    e: 2,
                    f: 'another string',
                },
            };
            expect(checkAllPropertiesNotNull(obj)).toBe(true);
        });

        it('should return false for an object with some null properties', () => {
            const obj = {
                a: 1,
                b: null,
                c: true,
                d: {
                    e: 2,
                    f: null,
                },
            };
            expect(checkAllPropertiesNotNull(obj)).toBe(false);
        });

        it('should return true for an empty object', () => {
            const obj = {};
            expect(checkAllPropertiesNotNull(obj)).toBe(true);
        });

        it('should return true for an object with nested empty objects', () => {
            const obj = {
                a: {},
                b: {
                    c: {},
                },
            };
            expect(checkAllPropertiesNotNull(obj)).toBe(true);
        });

        it('should return false for an object with nested null properties', () => {
            const obj = {
                a: {
                    b: null,
                },
            };
            expect(checkAllPropertiesNotNull(obj)).toBe(false);
        });

        it('should return true for an object with array properties', () => {
            const obj = {
                a: [1, 2, 3],
                b: 'string',
            };
            expect(checkAllPropertiesNotNull(obj)).toBe(true);
        });

        it('should not consider Date as object', () => {
            const obj = {
                a: new Date(),
                b: 'string',
            };
            expect(checkAllPropertiesNotNull(obj)).toBe(true);
        });
    });
});