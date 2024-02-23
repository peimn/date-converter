import { expect, it, describe } from 'vitest'
import {Converter} from "../src";


class ConverterSpec {
    testHijriToGregorian(): void {
        const asserted: string = "2023-04-13";
        const actual: string = Converter.HijriToGregorian("1444-09-22", "YYYY-MM-DD");
        expect(actual).toBe(asserted);
    }

    testGregorianToHijri(): void {
        const asserted: string = "1444-09-22";
        const actual: string = Converter.GregorianToHijri("2023-4-13", "YYYY-MM-DD");
        expect(actual).toBe(asserted);
    }

    testGregorianToJalali(): void {
        const asserted: string = "1402-01-24";
        const actual: string = Converter.GregorianToJalali("2023-04-13", "YYYY-MM-DD");
        expect(actual).toBe(asserted);
    }

    testJalaliToGregorian(): void {
        const asserted: string = "2023-04-13";
        const actual: string = Converter.JalaliToGregorian("1402-01-24", "YYYY-MM-DD");
        expect(actual).toBe(asserted);
    }

    testJulianToHijri(): void {
        const asserted: string = "1443-12-15";
        const actual: string = Converter.JulianToHijri(2459776);
        expect(actual).toBe(asserted);
    }

    testHijriToJulian(): void {
        const asserted: number = 2459776;
        const actual: number = Converter.HijriToJulian("1443-12-15");
        expect(actual).toBe(asserted);
    }

    testJalaliToHijri(): void {
        const asserted: string = "1444-09-23";
        const actual: string = Converter.JalaliToHijri("1402-01-25", "YYYY-MM-DD");
        expect(actual).toBe(asserted);
    }

    testHijriToJalali(): void {
        const asserted: string = "1402-01-25";
        const actual: string = Converter.HijriToJalali("1444-09-23", "YYYY-MM-DD");
        expect(actual).toBe(asserted);
    }
}

const testConverter = new ConverterSpec();

describe("it should convert", () => {
    it("Hijri to Gregorian", () => {
        testConverter.testHijriToGregorian();
    });
    it("Gregorian to Jalali", () => {
        testConverter.testGregorianToJalali();
    });
    it("Hijri to Jalali", () => {
        testConverter.testHijriToJalali();
    });
    it("Jalali to Gregorian", () => {
        testConverter.testJalaliToGregorian();
    });
    it("Jalali to Hijri", () => {
        testConverter.testJalaliToHijri();
    });
    it("Hijri to Julian", () => {
        testConverter.testHijriToJulian();
    });
    it("Gregorian to Hijri", () => {
        testConverter.testGregorianToHijri();
    });
    it("Julian to Hijri", () => {
        testConverter.testJulianToHijri();
    });
});

