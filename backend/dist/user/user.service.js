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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_1 = require("./entity/user");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.users = [];
    }
    async findAll() {
        return this.users;
    }
    async create(newUserInput) {
        const user = new user_1.User();
        user.name = newUserInput.name;
        user.email = newUserInput.email;
        const savedUser = await this.userRepository.save(user);
        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
        };
    }
    async updateUser(updateUserDto) {
        const user = await this.userRepository.findOne({
            where: { id: updateUserDto.id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${updateUserDto.id} not found`);
        }
        Object.assign(user, updateUserDto);
        const updatedUser = await this.userRepository.save(user);
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        };
    }
    async deleteUser(userId) {
        const result = await this.userRepository.delete(userId);
        return result.affected > 0;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map