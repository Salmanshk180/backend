import { DataSource } from "typeorm"
import { database_name, database_password, database_port, database_schema, database_username, databse_host } from "../utils/constants/database.constants";
import { Users } from "../entities/users/users.entity";
import { Brands } from "../entities/brands/brands.entity";
import { Categories } from "../entities/categories/categories.entity";
import { Products } from "../entities/products/products.entity";
import { ProductVariants } from "../entities/products/product-variants.entity";
import { Carts } from "../entities/carts/cart.entity";
import { Reviews } from "../entities/reviews/reviews.entity";
import { Addresses } from "../entities/addresses/addresses.entity";
import { OrderHistory } from "../entities/order-history/order-history.entity";
import { Watchlist } from "../entities/watchlist/watchlist.entity";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: databse_host,
    port: database_port,
    username: database_username,
    password: database_password,
    database: database_name,
    schema: database_schema,
    entities: [Users,Brands,Categories,Products,ProductVariants,Carts,Reviews,Addresses,OrderHistory,Watchlist],
    // synchronize: true,
    // logging: true,
    migrations: ["src/migrations/*.ts"],
})