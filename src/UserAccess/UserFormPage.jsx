import UserCreateForm  from '../ui-components/UserCreateForm.jsx';
import { DataStore } from 'aws-amplify/datastore';
import { User } from '../models';

export default function UserFormPage() {
    return (
        <UserCreateForm
            onSubmit={(fields) => {
                console.log("Dati inseriti:", fields);
                // fields = { nome: "Mario", cognome: "Rossi", email: "...", ecc. }
                saveUser(fields)
                return fields
            }}
            onSuccess={() => alert('Utente creato con successo')}
            onError={(fields, error) => console.error('Errore', error)}
        />
    );
}

async function saveUser(fields){

    await DataStore.save(
        new User({
            "Name": fields.Name.trim(),
            "Surname": fields.Surname.trim(),
            "Email": fields.Email.trim(),
            "Password": fields.Password.trim(),
            "TelephoneNumber": fields.TelephoneNumber.trim()
        })
    );
}
