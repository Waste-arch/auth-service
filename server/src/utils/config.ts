import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    mongo_url: process.env.MONGO_URL!,
    secret_key: process.env.SECRET_KEY!,
};

export default config;
