import fs from 'fs';

/**
 * Loads json config, replacing expressions with evaluated values:
 * - ENV{{ ENV_NAME }} => process.env.ENV_NAME
 * - More coming soon...
 * 
 * @param configPath Path to config file.
 * @param errCallback Function to be called on error.
 */
export function loadConfigWithExperssions(
    configPath: fs.PathOrFileDescriptor, errCallback?: (err: any) => void): any {
    try {
        const rawConfigJson = fs.readFileSync(configPath, {encoding:'utf8', flag:'r'});
        return JSON.parse(rawConfigJson, (key: string, value: any) => {
            if (typeof value === 'string' || value instanceof String) {
                if (value.startsWith("ENV{{") && value.endsWith("}}")) {  // ENV variable
                    const env_name = value.substring(5, value.length - 2).trim();
                    return process.env[env_name];
                }
            }
            return value;
        });
    } catch (err) {
        if (errCallback) {
            errCallback(err);
        }
    }
}
