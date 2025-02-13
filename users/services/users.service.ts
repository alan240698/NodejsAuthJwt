import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';

class UsersService implements CRUD {
    async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page);
    }

    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource);
    }

    async patchById(id: string, resource: PatchUserDto): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async putById(id: string, resource: PutUserDto): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async deleteById(id: string): Promise<string> {
        const result = await UsersDao.removeUserById(id);
        return result ? 'User deleted successfully' : 'User not found';
    }

    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: string) {
        return UsersDao.getUserByEmailWithPassword(email);
    }
}

export default new UsersService();