import { connectDb, executeQuery } from "./dbUtils.js";
const main = async () => {
    const conn = await connectDb();
    const tbls = [
        "trs_users",
        "dim_charging_accounts",
        "dim_categories",
        "dim_payments",
        "trs_expenses",
        "trs_recur_expenses",
    ];
    for (let tbl of tbls) {
        try {
            const query = `DROP TABLE ${tbl}`;
            await executeQuery(conn, query);
            console.log(`${tbl} dropped successfully!`);
        }
        catch (err) {
            console.log(`Error in : ${tbl}`);
            console.log(err);
        }
    }
};
main();
