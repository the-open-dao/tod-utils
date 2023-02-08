import fs from 'fs';

function replaceEnvExpressions(str: string): string {
    let result = "";
    let curStrIdx = 0;
    let envExprStartIdx = str.indexOf("ENV{{");

    do {
        let envExprEndIdx = str.indexOf("}}", envExprStartIdx);
        if (envExprEndIdx != -1) {
            result += str.substring(curStrIdx, envExprStartIdx);
            const envName = str.substring(envExprStartIdx + 5 /* "ENV{{" */, envExprEndIdx).trim();
            result += process.env[envName];
            curStrIdx = envExprEndIdx + 2; // "}}"
            envExprStartIdx = str.indexOf("ENV{{", curStrIdx);
        } else {
            break;
        }
    } while (envExprStartIdx != -1);

    if (curStrIdx < result.length) {
        result += str.substring(curStrIdx);
    }
    return result;
}

/**
 * Loads json config, replacing expressions with evaluated values:
 * - ENV{{ ENV_NAME }} => process.env.ENV_NAME
 * - More coming soon...
 * 
 * @param configPath Path to config file.
 * @param errCallback Function to be called on error.
 */
export function loadConfigWithExpressions(
    configPath: fs.PathOrFileDescriptor, errCallback?: (err: any) => void): any {
    try {
        const rawConfigJson = fs.readFileSync(configPath, {encoding:'utf8', flag:'r'});
        return JSON.parse(rawConfigJson, (key: string, value: any) => {
            if (typeof value === 'string') {
                let result = replaceEnvExpressions(value);
                // TODO: Add more possible expressions
                return result;
            }
            return value;
        });
    } catch (err) {
        if (errCallback) {
            errCallback(err);
        }
    }
}
