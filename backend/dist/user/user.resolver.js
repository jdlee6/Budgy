"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_1 = require("./entity/user");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async users() {
        return this.userService.findAll();
    }
    async createUser(newUserInput) {
        return this.userService.create(newUserInput);
    }
    async updateUser(updateUserInput) {
        return this.userService.updateUser(updateUserInput);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)(() => [user_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Mutation)(() => create_user_dto_1.CreateUserOutput),
    __param(0, (0, graphql_1.Args)('newUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => update_user_dto_1.UpdateUserOutput),
    __param(0, (0, graphql_1.Args)('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map