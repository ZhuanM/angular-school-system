import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromLoader from '../../loader/store/loader.reducer';
import * as fromHeader from '../../header/store/header.reducer';
import * as fromHome from '../../home/store/home.reducer';
import * as fromPrincipals from '../../principals/store/principals.reducer';

export interface AppState {
    auth: fromAuth.State,
    loader: fromLoader.State
    header: fromHeader.State,
    home: fromHome.State,
    principals: fromPrincipals.State,
    // packages: fromPackages.State,
    // sendPackage: fromSendPackage.State,
    // company: fromCompany.State,
    // employees: fromEmployees.State,
    // offices: fromOffices.State,
};