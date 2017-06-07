export declare type Maybe<T> = Just<T> | Nothing<T>;
export declare class Just<T> {
    readonly _value: T;
    constructor(value: T);
    isJust(): boolean;
    isNothing(): boolean;
    forEach(f: (v: T) => void): void;
    map<U>(f: (v: T) => U): Maybe<U>;
    flatMap<U>(f: (v: T) => Maybe<U>): Maybe<U>;
    filter(p: (v: T) => boolean): Maybe<T>;
    just(err?: any): T;
    orJust<U>(value: U): T | U;
    orElse<U>(maybe: Maybe<U>): Maybe<T | U>;
    orOf<U>(value: U): Maybe<T | U>;
    equals(other: any): boolean;
    valueOf(): T;
    toString(): string;
}
export declare function just<T>(value: T | null | undefined): Just<T>;
export declare class Nothing<T> {
    constructor();
    isJust(): boolean;
    isNothing(): boolean;
    forEach(f: (v: T) => void): void;
    map<U>(f: (v: T) => U): Maybe<U>;
    flatMap<U>(f: (v: T) => Maybe<U>): Maybe<U>;
    filter(p: (v: T) => boolean): Maybe<T>;
    just(err?: any): T;
    orJust<U>(value: U): T | U;
    orElse<U>(maybe: Maybe<U>): Maybe<T | U>;
    orOf<U>(value: U): Maybe<T | U>;
    equals(other: any): boolean;
    valueOf(): null;
    toString(): string;
}
export declare let nothing: Nothing<any>;
export declare function maybe<T>(value: T | null | undefined): Maybe<T>;
