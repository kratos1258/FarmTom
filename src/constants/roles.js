export const ROLES = {
    ADMIN: "admin",

    FARMER: "farmer",

    BUYER: "buyer",

    LOGISTICS_PROVIDER: "logistics_provider",

    WAREHOUSE_OPERATOR: "warehouse_operator",
};

export const SELF_ASSIGNABLE_ROLES = [
    ROLES.FARMER,
    ROLES.BUYER,
    ROLES.WAREHOUSE_OPERATOR,
    ROLES.LOGISTICS_PROVIDER,
];