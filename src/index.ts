let is: (a: any, b: any) => boolean = (Object as any).is || function(a, b) {
	return a === b ? a !== 0 || 1 / a == 1 / b : a != a && b != b;
};

function eq(a: any, b: any): boolean {
	if (is(a, b)) {
		return true;
	}

	if (a && typeof a.equals == 'function') {
		return a.equals(b);
	}
	if (b && typeof b.equals == 'function') {
		return b.equals(b);
	}

	if (a.length !== undefined && a.length === b.length) {
		for (var i = 0, l = a.length; i < l; i++) {
			if (!eq(a[i], b[i])) {
				return false;
			}
		}

		return true;
	}

	return false;
}

export type TMaybe<T> = Just<T> | Nothing<T>;

export class Just<T> {
	readonly _value: T;

	constructor(value: T) {
		this._value = value;
	}

	isJust(): boolean {
		return true;
	}

	isNothing(): boolean {
		return false;
	}

	forEach(f: (v: T) => void): TMaybe<T> {
		f(this._value);
		return this;
	}

	map<U>(f: (v: T) => U | null | undefined): TMaybe<U> {
		return maybe(f(this._value));
	}

	flatMap<U>(f: (v: T) => TMaybe<U>): TMaybe<U> {
		return f(this._value);
	}

	filter(p: (v: T) => boolean): TMaybe<T> {
		return p(this._value) ? this : nothing;
	}

	just(err?: any): T {
		return this._value;
	}

	orJust<U>(value: U): T | U {
		return this._value;
	}

	orElse<U>(maybe: TMaybe<U>): TMaybe<T | U> {
		return this;
	}

	orOf<U>(value: U): TMaybe<T | U> {
		return this;
	}

	equals(other: any): boolean {
		return other instanceof Just && eq(this._value, other._value);
	}

	valueOf() {
		return this._value;
	}

	toString() {
		return `Just(${ this._value })`;
	}
}

export function just<T>(value: T | null | undefined): Just<T> {
	if (value == null) {
		throw new TypeError('Cannot create Just with a null or undefined value');
	}

	return new Just(value);
}

export class Nothing<T> {
	constructor() {
		if (nothing) {
			throw new TypeError('Nothing is a singleton');
		}
	}

	isJust(): boolean {
		return false;
	}

	isNothing(): boolean {
		return true;
	}

	forEach(f: (v: T) => void): TMaybe<T> {
		return this;
	}

	map<U>(f: (v: T) => U | null | undefined): TMaybe<U> {
		return this as any;
	}

	flatMap<U>(f: (v: T) => TMaybe<U>): TMaybe<U> {
		return this as any;
	}

	filter(p: (v: T) => boolean): TMaybe<T> {
		return this;
	}

	just(err?: any): T {
		throw err || new TypeError('Cannot call "just" on a Nothing');
	}

	orJust<U>(value: U): T | U {
		return value;
	}

	orElse<U>(maybe: TMaybe<U>): TMaybe<T | U> {
		return maybe;
	}

	orOf<U>(value: U): TMaybe<T | U> {
		return maybe<U>(value);
	}

	equals(other: any): boolean {
		return other === nothing;
	}

	valueOf() {
		return null;
	}

	toString() {
		return 'Nothing';
	}
}

export let nothing = new Nothing<any>();

export function maybe<T>(value: T | null | undefined): TMaybe<T> {
	return value == null ? nothing : new Just(value);
}
