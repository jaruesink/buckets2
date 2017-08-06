"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const feathers = require("feathers/client");
const rest = require("feathers-rest/client");
const fetch = require("node-fetch");
const test_helper_1 = require("./test_helper");
const User = require('../server/models/user');
const Bucket = require('../server/models/bucket');
const app = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const user_service = app.service('api/user');
let UserTest = class UserTest extends test_helper_1.default {
    count_users() {
        return __awaiter(this, void 0, void 0, function* () { yield User.count({}); });
    }
    create_user(user_data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service.create(user_data, (err) => { if (err) {
                console.error(err);
            } }).save();
        });
    }
    userCreatedTest() {
        console.log('hello');
        User.count({}).then((count) => { console.log(count); });
    }
};
__decorate([
    mocha_typescript_1.test('can be created')
], UserTest.prototype, "userCreatedTest", null);
UserTest = __decorate([
    mocha_typescript_1.suite('Users')
], UserTest);
//# sourceMappingURL=test.js.map