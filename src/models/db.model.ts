interface BaseDBInterface {
    created_on: string;
    updated_on: string;
}

export interface ExpenseInterface extends BaseDBInterface {
    exp_desc: string;
    amount: number;
    category_id: number;
    payment_id: number;
    user_id: number;
    exp_date: string | null;
    exp_month: number | null;
    exp_year: number | null;
    recurring: boolean;
    recurring_period: string | null;
    recurring_start: string | null;
}

export interface RecurExpenseInterface extends BaseDBInterface {
    exp_desc: string;
    amount: number;
    recurring_period: string;
    recurring_start: string;
    user_id: number;
    category_id: number;
    payment_id: number;
    is_active: boolean;
}

export interface CategoryInterface extends BaseDBInterface {
    discretionary: boolean;
    category: string;
    sub_category: string;
    user_id: number;
}

export interface PaymentInterface extends BaseDBInterface {
    alias: string;
    payment_type: string;
    card_provider: string;
    payment_operator: string;
    charged_to: number;
    user_id: number;
}

export interface ChargingAccountInterface extends BaseDBInterface {
    service_provider: string;
    alias: string;
    user_id: number;
}

export interface UserInterface extends BaseDBInterface {
    first_name: string;
    last_name: string;
    username: string;
    acct_type: string;
    email: string;
    pw_hash: string;
    public_key: string;
    auth_2fa: string;
}

export type AllDBInterface = ExpenseInterface | RecurExpenseInterface | CategoryInterface | PaymentInterface | ChargingAccountInterface | UserInterface




