"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is = Object.is || function (a, b) {
    return a === b ? a !== 0 || 1 / a == 1 / b : a != a && b != b;
};
function eq(a, b) {
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
var Just = (function () {
    function Just(value) {
        this._value = value;
    }
    Just.prototype.isJust = function () {
        return true;
    };
    Just.prototype.isNothing = function () {
        return false;
    };
    Just.prototype.forEach = function (f) {
        f(this._value);
        return this;
    };
    Just.prototype.map = function (f) {
        return maybe(f(this._value));
    };
    Just.prototype.flatMap = function (f) {
        return f(this._value);
    };
    Just.prototype.filter = function (p) {
        return p(this._value) ? this : exports.nothing;
    };
    Just.prototype.just = function (err) {
        return this._value;
    };
    Just.prototype.orJust = function (value) {
        return this._value;
    };
    Just.prototype.orElse = function (maybe) {
        return this;
    };
    Just.prototype.orOf = function (value) {
        return this;
    };
    Just.prototype.equals = function (other) {
        return other instanceof Just && eq(this._value, other._value);
    };
    Just.prototype.valueOf = function () {
        return this._value;
    };
    Just.prototype.toString = function () {
        return "Just(" + this._value + ")";
    };
    return Just;
}());
exports.Just = Just;
function just(value) {
    if (value == null) {
        throw new TypeError('Cannot create Just with a null or undefined value');
    }
    return new Just(value);
}
exports.just = just;
var Nothing = (function () {
    function Nothing() {
        if (exports.nothing) {
            throw new TypeError('Nothing is a singleton');
        }
    }
    Nothing.prototype.isJust = function () {
        return false;
    };
    Nothing.prototype.isNothing = function () {
        return true;
    };
    Nothing.prototype.forEach = function (f) {
        return this;
    };
    Nothing.prototype.map = function (f) {
        return this;
    };
    Nothing.prototype.flatMap = function (f) {
        return this;
    };
    Nothing.prototype.filter = function (p) {
        return this;
    };
    Nothing.prototype.just = function (err) {
        throw err || new TypeError('Cannot call "just" on a Nothing');
    };
    Nothing.prototype.orJust = function (value) {
        return value;
    };
    Nothing.prototype.orElse = function (maybe) {
        return maybe;
    };
    Nothing.prototype.orOf = function (value) {
        return maybe(value);
    };
    Nothing.prototype.equals = function (other) {
        return other === exports.nothing;
    };
    Nothing.prototype.valueOf = function () {
        return null;
    };
    Nothing.prototype.toString = function () {
        return 'Nothing';
    };
    return Nothing;
}());
exports.Nothing = Nothing;
exports.nothing = new Nothing();
function maybe(value) {
    return value == null ? exports.nothing : new Just(value);
}
exports.maybe = maybe;
