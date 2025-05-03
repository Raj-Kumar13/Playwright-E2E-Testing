import fs from 'fs';
import { setResponseFolderPath } from 'static/filepaths';
import supertest from 'supertest';

export const exportResponseInFile = (filename: string, response: supertest.Response) => {
    fs.writeFileSync(setResponseFolderPath(filename), JSON.stringify(response.body, null, 4))
}
export const exportRequestInFile = (filename: string, request: any) => {
    fs.writeFileSync(setResponseFolderPath(filename), JSON.stringify(request, null, 4))
}

export const exportTextResponseInFile = (filename: string, response: supertest.Response) => {
    fs.writeFileSync(setResponseFolderPath(filename), response.text)
}

export const createDirectory = (dirpath: string) => {
    try {
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, { recursive: true });
            console.log("Directory created !!!");
        }
    } catch (err) {
        console.log(err);
    }
}

export const deleteDirctory = (dirpath: string) => {
    try {
        if (fs.existsSync(dirpath)) {
            fs.rmdirSync(dirpath);
            console.log("Directory deleted !!!");
        }
    } catch (err) {
        console.log(err);
    }
}

export const readJsonFile = (path: string) => {
    return JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
}