import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '../../services';
import Link from 'next/link';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        prenom: Yup.string()
            .required('Le prénom est requis'),
        nom: Yup.string()
            .required('Le nom est requis'),
        genre: Yup.string()
            .required('Le genre est requis'),
        email: Yup.string()
            .required('l\'email est requis'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Le mot de passe est requis') : null)
            .min(6, 'Le mot de passe doit contenir 6 caractères minimum')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(user.id, data);
    }

    function createUser(data) {
        return userService.register(data)
            .then(() => {
                alertService.success('Utilisateur ajouté', { keepAfterRouteChange: true });
                setTimeout(() => {
                    router.push('.');
                }, 3000);
            })
            .catch((error) => {
                alertService.error(error)
            });
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('Utilisateur modifié', { keepAfterRouteChange: true });
                setTimeout(() => {
                    router.push('..');
                }, 3000);
            })
            .catch((error) => {
                alertService.error(error)
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group col">
                    <label>Prénom</label>
                    <input name="prenom" type="text" {...register('prenom')} className={`form-control ${errors.prenom ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.prenom?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Nom</label>
                    <input name="nom" type="text" {...register('nom')} className={`form-control ${errors.nom ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.nom?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Genre</label>
                    <input name="genre" type="text" {...register('genre')} className={`form-control ${errors.genre ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.genre?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Email</label>
                    <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group col">
                    <label>
                        Mot de passe
                        {!isAddMode && <em className="ml-1">(Laisser vide pour garder le m^me mot de passe)</em>}
                    </label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
            </div>
            <br />
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} style={{marginRight: 5}} className="btn btn-success">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Sauvegarder
                </button>
                <button style={{marginRight: 5}} onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Réinitialiser</button>
                <Link href="/users" className="btn btn-light">Retour</Link>
            </div>
        </form>
    );
}
