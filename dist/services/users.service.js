"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../users/daos/users.dao"));
class UsersService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.addUser(resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.removeUserById(id);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.getUsers();
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.patchUserById(id, resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.getUserById(id);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.putUserById(id, resource);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.getUserByEmail(email);
        });
    }
}
exports.default = new UsersService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZpY2VzL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBK0M7QUFNL0MsTUFBTSxZQUFZO0lBQ1IsTUFBTSxDQUFDLFFBQXVCOztZQUNoQyxPQUFPLG1CQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxFQUFVOztZQUN2QixPQUFPLG1CQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxLQUFhLEVBQUUsSUFBWTs7WUFDbEMsT0FBTyxtQkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxFQUFVLEVBQUUsUUFBc0I7O1lBQzlDLE9BQU8sbUJBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxFQUFVOztZQUNyQixPQUFPLG1CQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxFQUFVLEVBQUUsUUFBb0I7O1lBQzFDLE9BQU8sbUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxLQUFhOztZQUM5QixPQUFPLG1CQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyJ9