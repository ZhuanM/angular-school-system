import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'authenticate',
  registerUrl: environment.apiBaseUrl + 'api/user/register',
  // Users
  getUserUrl: environment.apiBaseUrl + 'api/user',
  // getAllUsersUrl: environment.apiBaseUrl + 'api/user/all',
  // updateUserUrl: environment.apiBaseUrl + 'api/user/update',
  // deleteUserUrl: environment.apiBaseUrl + 'api/user/delete',
  // Principals
  principalsUrl: environment.apiBaseUrl + 'api/director',
  // // Offices
  // getAllOfficesUrl: environment.apiBaseUrl + 'api/offices/all',
  // createOfficeUrl: environment.apiBaseUrl + 'api/offices/save',
  // updateOfficeUrl: environment.apiBaseUrl + 'api/offices/update',
  // deleteOfficeUrl: environment.apiBaseUrl + 'api/offices/delete',
  // // Employees
  // getAllEmployeesUrl: environment.apiBaseUrl + 'api/users/employees',
  // // Customers
  // getAllCustomersUrl: environment.apiBaseUrl + 'api/users/customers',
  // // Company
  // getCompanyName: environment.apiBaseUrl + 'api/company/name',
  // getCompanyProfit: environment.apiBaseUrl + 'api/company/profit',
}
