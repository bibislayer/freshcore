import { apiHandler, omit } from '../../../helpers/api';
import { usersRepository } from './user.repository';

const bcrypt = require('bcryptjs');

export default apiHandler({
    post: register
});

function register(req, res) {
    // split out password from user details 
    const { password, ...user } = req.body;

    // validate
    if (usersRepository.find(x => x.email === user.email))
        throw `Un utilisateur avec cet email "${params.email}" existe déjà`;

    // hash password
    user.password = bcrypt.hashSync(password, 10);    

    usersRepository.create(user);
    return res.status(200).json(omit(user, 'password'));
}
