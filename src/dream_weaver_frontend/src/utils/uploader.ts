import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../settings/firebase-setting";

export async function UploadFile(folder:string,file : File) : Promise<string>{
    const storageRef = ref(storage, folder+file.name)
    await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(storageRef)
    return downloadUrl
}