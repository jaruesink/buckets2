"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const logger = require("../server/logger");
const mocha_typescript_1 = require("mocha-typescript");
const { buckets, users } = mongoose.connection.collections;
function dropBuckets(done) {
    return Promise.all([
        buckets.drop(),
        users.drop(),
    ]).then(() => done())
        .catch(error => {
        console.error(error);
        done();
    });
}
let Suite = class Suite {
    before(done) {
        logger.debug('Truncating test database');
        dropBuckets(done);
    }
    static after(done) {
        dropBuckets(done);
    }
};
Suite = __decorate([
    mocha_typescript_1.suite
], Suite);
exports.default = Suite;
//# sourceMappingURL=test_helper.js.map