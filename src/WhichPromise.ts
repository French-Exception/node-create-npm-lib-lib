import * as _which from "which";

export async function which(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
        _which(name, (err, resolvedPath) => {
            if (err) return reject(err);
            resolve(resolvedPath);
        })
    })
}
