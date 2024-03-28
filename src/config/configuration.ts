
export const configuration = () => ({
    SERVER:{
        PORT: process.env.SERVER_PORT
    },
    JWT:{
        KEY_SECRET: process.env.JWT_SECRET
    }
})