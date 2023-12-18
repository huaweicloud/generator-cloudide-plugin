/* This is a class just for mocha test */
export class Example {
    private _value: Number;

    constructor(value: Number = 0) {
        this._value = value;
    }

    customisedMathAdd(a: number, b: number): number {
        return a + b;
    }

    customisedArrayBubbleSort(arr: Array<number>): Array<number> {
        for (let i = 0; i < arr.length - 1; i++) {
            let flag = true;
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                    flag = false;
                }
            }
            if (flag) {
                break;
            }
        }
        return arr;
    }

    getValue() {
        return this._value;
    }

    setValue(value: Number) {
        this._value = value;
    }
}