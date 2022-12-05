export type AppConfigType = Pick<
  ImportMetaEnv,
  | 'VITE_APP_TITLE'
  | 'VITE_APP_PORT'
  | 'VITE_APP_API_URL'
  | 'VITE_APP_API_PREFIX'
  | 'VITE_APP_STATIC_URL'
  | 'MODE'
  | 'DEV'
  | 'PROD'
>;

export function useAppConfig(): AppConfigType {
  const metaEnv = import.meta.env;
  const env = {};
  for (const key in metaEnv) {
    if (Object.prototype.hasOwnProperty.call(metaEnv, key)) {
      const value = metaEnv[key];
      if (key == 'VITE_APP_PORT') {
        env[key] = Number(value) || undefined;
      }
      else if (value == undefined || value == null || value == 'undefined' || value == 'null') {
        env[key] = '';
      }
      else if (typeof value == 'string') {
        if (value.toLocaleLowerCase() == 'true')
          env[key] = true;
        else if (value.toLocaleLowerCase() == 'false')
          env[key] = false;
        else
          env[key] = value;
      }
      else {
        env[key] = value;
      }
    }
  }

  return env as AppConfigType;
}
