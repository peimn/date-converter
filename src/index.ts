export class Converter {
    public static Day: string;
    public static Month: string;
    public static Year: string;

    public static HijriToGregorian(date: string, format: string = "YYYY-MM-DD"): string {
        this.ConstructDayMonthYear(date, format);
        let day: number = parseInt(this.Day, 10);
        let month: number = parseInt(this.Month, 10);
        let year: number = parseInt(this.Year, 10);
        let lp: number = 0;
        let ip: number = 0;
        let np: number = 0;
        let jp: number = 0;
        let jDay: number = 0;
        let kp: number = 0;
        if (year < 1700) {
            jDay = this.intPart((11 * year + 3) / 30) + 354 * year + 30 * month - this.intPart((month - 1) / 2) + day + 1948440 - 385;
            if (jDay > 2299160) {
                lp = jDay + 68569;
                np = this.intPart((4 * lp) / 146097);
                lp = lp - this.intPart((146097 * np + 3) / 4);
                ip = this.intPart((4000 * (lp + 1)) / 1461001);
                lp = lp - this.intPart((1461 * ip) / 4) + 31;
                jp = this.intPart((80 * lp) / 2447);
                day = lp - this.intPart((2447 * jp) / 80);
                lp = this.intPart(jp / 11);
                month = jp + 2 - 12 * lp;
                year = 100 * (np - 49) + ip + lp;
            } else {
                jp = jDay + 1402;
                kp = this.intPart((jp - 1) / 1461);
                lp = jp - 1461 * kp;
                np = this.intPart((lp - 1) / 365) - this.intPart(lp / 1461);
                ip = lp - 365 * np + 30;
                jp = this.intPart((80 * ip) / 2447);
                day = ip - this.intPart((2447 * jp) / 80);
                ip = this.intPart(jp / 11);
                month = jp + 2 - 12 * ip;
                year = 4 * kp + np + ip - 4716;
            }
            return `${year}-${String("00" + month).slice(-2)}-${String("00" + day).slice(-2)}`;
        } else
            return "";
    }

    public static intPart(floatNum: number): number {
        if (floatNum < -0.0000001) {
            return Math.ceil(floatNum - 0.0000001);
        }
        return Math.floor(floatNum + 0.0000001);
    }

    public static ConstructDayMonthYear(date: string, format: string): void {
        this.Day = "";
        this.Month = "";
        this.Year = "";
        if (date !== null) {
            format = format.toUpperCase();
            const formatAr: string[] = format.split('');
            const srcDateAr: string[] = date.split('');
            for (let i = 0; i < formatAr.length; i++) {
                if (srcDateAr[i] !== undefined) {
                    switch (formatAr[i]) {
                        case "D":
                            this.Day += srcDateAr[i];
                            break;
                        case "M":
                            this.Month += srcDateAr[i];
                            break;
                        case "Y":
                            this.Year += srcDateAr[i];
                            break;
                    }
                }
            }
        }
    }

    public static GregorianToHijri(date: string, format: string = "YYYY-MM-DD"): string {
        this.ConstructDayMonthYear(date, format);
        let dday: number = parseInt(this.Day, 10);
        let mmonth: number = parseInt(this.Month, 10);
        let yyear: number = parseInt(this.Year, 10);
        let jday: number = 0;
        let ld:number = 0;
        let nd:number = 0;
        let jdd:number = 0;
        if (yyear > 1700) {
            if ((yyear > 1582) || ((yyear === 1582) && (mmonth > 10)) || ((yyear === 1582) && (mmonth === 10) && (dday > 14))) {
                jday = this.intPart((1461 * (yyear + 4800 + this.intPart((mmonth - 14) / 12))) / 4) + this.intPart((367 * (mmonth - 2 - 12 * (this.intPart((mmonth - 14) / 12)))) / 12) - this.intPart((3 * (this.intPart((yyear + 4900 + this.intPart((mmonth - 14) / 12)) / 100))) / 4) + dday - 32075;
            } else {
                jday = 367 * yyear - this.intPart((7 * (yyear + 5001 + this.intPart((mmonth - 9) / 7))) / 4) + this.intPart((275 * mmonth) / 9) + dday + 1729777;
            }
            ld = jday - 1948440 + 10632;
            nd = this.intPart((ld - 1) / 10631);
            ld = ld - 10631 * nd + 354;
            jdd = (this.intPart((10985 - ld) / 5316)) * (this.intPart((50 * ld) / 17719)) + (this.intPart(ld / 5670)) * (this.intPart((43 * ld) / 15238));
            ld = ld - (this.intPart((30 - jdd) / 15)) * (this.intPart((17719 * jdd) / 50)) - (this.intPart(jdd / 16)) * (this.intPart((15238 * jdd) / 43)) + 29;
            mmonth = this.intPart((24 * ld) / 709);
            dday = ld - this.intPart((709 * mmonth) / 24);
            yyear = 30 * nd + jdd - 30;
            return `${yyear}-${String("00" + mmonth).slice(-2)}-${String("00" + dday).slice(-2)}`;
        } else
            return "";
    }

    public static JulianToHijri(jdN: number): string {
        jdN= jdN- 1948440 + 10632;
        const n: number = this.intPart((jdN- 1) / 10631);
        jdN= jdN- 10631 * n + 354;
        const j: number = ((this.intPart((10985 - jdN) / 5316)) * (this.intPart((50 * jdN) / 17719))) + ((this.intPart(jdN / 5670)) * (this.intPart((43 * jdN) / 15238)));
        jdN= jdN- ((this.intPart((30 - j) / 15)) * (this.intPart((17719 * j) / 50))) - ((this.intPart(j / 16)) * (this.intPart((15238 * j) / 43))) + 29;
        const mM: number = this.intPart((24 * jdN) / 709);
        const dD: number = jdN- (this.intPart((709 * mM) / 24));
        const yY: number = 30 * n + j - 30;
        return `${yY}-${String("00" + mM).slice(-2)}-${String("00" + dD).slice(-2)}`;
    }

    public static HijriToJulian(date: string): number {
        const array: string[] = date.split('-');
        const yy: number = parseInt(array[0], 10);
        const mm: number = parseInt(array[1], 10);
        const dd: number = parseInt(array[2], 10);
        return this.intPart((11 * yy + 3) / 30) + 354 * yy + 30 * mm - this.intPart((mm - 1) / 2) + dd + 1948440 - 385;
    }

    public static Division(a: number, b: number): number {
        return parseInt((a / b).toString(), 10);
    }

    public static GregorianToJalali(date: string, format: string = "YYYY-MM-DD"): string {
        this.ConstructDayMonthYear(date, format);
        const gD: number = parseInt(this.Day, 10);
        const gM: number = parseInt(this.Month, 10);
        const gY: number = parseInt(this.Year, 10);
        const gDaysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const jDaysInMonth: number[] = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        const gy: number = gY - 1600;
        const gm: number = gM - 1;
        const gd: number = gD - 1;
        let gDayNo: number = 365 * gy + this.Division(gy + 3, 4) - this.Division(gy + 99, 100) + this.Division(gy + 399, 400);
        for (let i = 0; i < gm; ++i)
            gDayNo += gDaysInMonth[i];
        if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
            gDayNo++;
        gDayNo += gd;
        let jDayNo: number = gDayNo - 79;
        const jNp: number = this.Division(jDayNo, 12053);
        jDayNo = jDayNo % 12053;
        let jy: number = 979 + 33 * jNp + 4 * this.Division(jDayNo, 1461);
        jDayNo %= 1461;
        if (jDayNo >= 366) {
            jy += this.Division(jDayNo - 1, 365);
            jDayNo = (jDayNo - 1) % 365;
        }

        let i: number = 0;
        for (i = 0; i < 11 && jDayNo >= jDaysInMonth[i]; ++i)
            jDayNo -= jDaysInMonth[i];

        let jm: number = i + 1;

        if (jm < 10)
            jm = parseInt("0" + jm, 10);
        let jd: number = jDayNo + 1;
        if (jd < 10)
            jd = parseInt("0" + jd, 10);
        return `${jy}-${String("00" + jm).slice(-2)}-${String("00" + jd).slice(-2)}`;
    }

    public static JalaliToGregorian(date: string, format: string = "YYYY-MM-DD"): string {
        this.ConstructDayMonthYear(date, format);
        const jD: number = parseInt(this.Day, 10);
        const jM: number = parseInt(this.Month, 10);
        const jY: number = parseInt(this.Year, 10);
        const gDaysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const jDaysInMonth: number[] = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        const jy: number = jY - 979;
        const jm: number = jM - 1;
        const jd: number = jD - 1;
        let jDayNo: number = 365 * jy + this.Division(jy, 33) * 8 + this.Division(jy % 33 + 3, 4);
        let i: number = 0;
        for (i = 0; i < jm; ++i)
            jDayNo += jDaysInMonth[i];
        jDayNo += jd;
        let gDayNo: number = jDayNo + 79;
        let gy: number = 1600 + 400 * this.Division(gDayNo, 146097);
        gDayNo = gDayNo % 146097;
        let leap: boolean = true;
        if (gDayNo >= 36525) {
            gDayNo--;
            gy += 100 * this.Division(gDayNo, 36524);
            gDayNo = gDayNo % 36524;
            if (gDayNo >= 365)
                gDayNo++;
            else
                leap = false;
        }
        gy += 4 * this.Division(gDayNo, 1461);
        gDayNo %= 1461;
        if (gDayNo >= 366) {
            leap = false;
            gDayNo--;
            gy += this.Division(gDayNo, 365);
            gDayNo = gDayNo % 365;
        }

        for (i = 0; gDayNo >= gDaysInMonth[i] + (i === 1 && leap ? 1 : 0); i++)
            gDayNo -= gDaysInMonth[i] + (i === 1 && leap ? 1 : 0);
        let gm: number = i + 1;
        if (gm < 10)
            gm = parseInt("0" + gm, 10);
        let gd: number = gDayNo + 1;
        if (gd < 10)
            gd = parseInt("0" + gd, 10);
        return `${gy}-${String("00" + gm).slice(-2)}-${String("00" + gd).slice(-2)}`;
    }

    public static HijriToJalali(date: string, format: string = "YYYY-MM-DD"): string {
        const gregorianDate: string = this.HijriToGregorian(date);
        return this.GregorianToJalali(gregorianDate);
    }

    public static JalaliToHijri(date: string, format: string = "YYYY-MM-DD"): string {
        const gregorianDate: string = this.JalaliToGregorian(date);
        return this.GregorianToHijri(gregorianDate);
    }
}

