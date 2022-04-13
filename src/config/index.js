export const env = {
  dev: 'dev',
  production: 'production',
};
export const currentEnv = process.env.REACT_APP_ENV || env.dev;

export const API_URL = {
  dev: 'https://dev-api-talents03.hblab.dev/api/v1',
  production: 'https://api-talents03.hblab.dev/api/v1',
};
export const KEY_ID = {
  dev: "657985657763-60p4mat8nf6njvqtasbgltfs0itmp74q.apps.googleusercontent.com",
  production: "729356747066-c78jtcmtnommebva57mkvvrtlpoks3q9.apps.googleusercontent.com"
}

export const KEY_GOOGLE = KEY_ID[currentEnv]; 

export const BASE_API_URL = API_URL[currentEnv];
