export class ApiRoute {
    static readonly auth = "/users/login";
    static readonly update_user = "/users/update/:id";
    static readonly create_user = "/users/create";

    static readonly update_payment = "/payments/update/:id";
    static readonly get_payment = "/payment/:id";
    static readonly get_payments = "/payments";
    static readonly get_number_payment = "/payment-number";
    static readonly create_payment = "/payments/create";
    static readonly delete_payment = "/payments/delete/:id";

    static readonly update_client = "/clients/update/:id";
    static readonly get_client = "/client/:id";
    static readonly get_clients = "/clients";
    static readonly create_client = "/clients/create";
    static readonly delete_client = "/clients/delete/:id";

    static readonly update_debt = "/debts/update/:id";
    static readonly get_debt = "/debt/:id";
    static readonly get_debts = "/debts";
    static readonly create_debt = "/debt/create";
    static readonly get_debt_client = "/debts/clients/:id";
    static readonly delete_debt = "/debt/delete/:id";
}