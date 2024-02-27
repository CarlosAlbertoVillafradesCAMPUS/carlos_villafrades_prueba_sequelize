import "dotenv/config";

export const envairoments = {
    port: process.env.PORT || 5017,
    my_conexion: JSON.parse(process.env.MY_CONEXION)
};