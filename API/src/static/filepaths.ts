import path from 'path';
import { createDirectory } from 'utils/FileUtils';

const responseFolderPath = path.join(process.cwd(), 'src', 'res')

export const setResponseFolderPath = (filename: string) => {
    createDirectory(responseFolderPath)
    return path.join(responseFolderPath, filename)
}
export const Comp_API_Request_Path = path.join(process.cwd(), 'src', 'res', 'compApiRequest.json')
export const Comp_API_Response_Path = path.join(process.cwd(), 'src', 'res', 'compApiResponse.json')
export const Comp_API_Link_Body_Path = path.join(process.cwd(), 'src', 'res', 'LinksBody.json')