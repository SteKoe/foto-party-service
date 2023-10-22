import {describe, expect, it} from "vitest";
import {makeid} from "@/utils/makeId";

describe('MakeId', () => {
    it('returns id', () => {
        const size = 50;
        const ids = [...new Array(size)].map(() => makeid(16));
        console.log(ids.join("\n"))
        expect(new Set(ids).size).toEqual(size);
    });
});