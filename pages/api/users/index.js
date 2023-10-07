import { omit, apiHandler } from '../../../helpers/api';
import { usersRepository } from './user.repository';

export default apiHandler({
    get: getUsers
});

function getUsers(req, res) {
    // return users without hashed passwords in the response
    const response = usersRepository.getAll().map(x => omit(x, 'password'));
    return res.status(200).json(response);
}
