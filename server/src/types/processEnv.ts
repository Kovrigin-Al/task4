export interface IProcessEnv {
    PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
    NODE_ENV: 'development' | 'test' | 'production';
};

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv { }
    }
};