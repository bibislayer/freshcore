const bcrypt = require('bcryptjs');

import { apiHandler, omit } from '../../../helpers/api';
import { usersRepository } from './user.repository';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

function getById(req, res) {
    const user = usersRepository.getById(req.query.id);

    if (!user) throw 'Utilisateur non trouvé';

    return res.status(200).json(omit(user, 'password'));
}

function update(req, res) {
    const user = usersRepository.getById(req.query.id);

    if (!user) throw 'Utilisateur non trouvé';

    // split out password from user details 
    const { password, ...params } = req.body;

    // validate
    if (user.email !== params.email && usersRepository.find(x => x.email === params.email))
        throw `Un utilisateur avec cet email "${params.email}" existe déjà`;

    // only update hashed password if entered
    if (password) {
        user.password = bcrypt.hashSync(password, 10);
    }

    usersRepository.update(req.query.id, params);
    return res.status(200).json(omit(user, 'password'));
}

function _delete(req, res) {
    usersRepository.delete(req.query.id);
    return res.status(200).json({});
}
