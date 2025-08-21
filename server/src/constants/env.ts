const getenv = (key: string, defaultVal?: string) => {
  const value = process.env[key] || defaultVal;

  if (!value) {
    throw new Error(`${key} is not an environment variable`);
  }

  return value;
};

export const NODE_ENV = getenv("NODE_ENV");
export const PORT = getenv("PORT", "3001");
export const MONGO_URI = getenv("MONGO_URI");
export const JWT_SECRET = getenv("JWT_SECRET");
export const APP_ORIGIN = getenv("APP_ORIGIN");
export const CLOUDINARY_CLOUD_NAME = getenv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getenv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getenv("CLOUDINARY_API_SECRET");
