export const config = ()=> {
  return {
    mongodb_uri:process.env.MONGODB_URI,
    jwt_secret_key:process.env.JWT_SECRET_KEY,
    PORT:process.env.PORT,
    ORIGIN:process.env.ORIGIN
  }
}