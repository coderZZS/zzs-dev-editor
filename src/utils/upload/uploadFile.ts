/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-10-24 14:33:39
 * @LastEditTime: 2022-10-24 16:34:49
 */
import { getCos } from './getCos'
type UploadFile = {
    file: File
    updateProgress?: (progress: number) => any
    folderName?: string
}
export const uploadFile = async ({ file, updateProgress, folderName = '/imgs/' }: UploadFile) => {
    const cos = await getCos()
    return new Promise((resolve, reject) => {
        cos.putObject(
            {
                Bucket: 'coke-1304800772',
                Region: 'ap-chongqing' /* 存储桶所在地域，必须字段 */,
                // '/IMGs/' + new Date().getTime() + file.name,
                Key: folderName + new Date().getTime() + file.name /* 必须 */,
                StorageClass: 'STANDARD',
                Body: file, // 上传文件对象
                onProgress: (progressData: any) => {
                    
                    updateProgress && updateProgress(JSON.parse(JSON.stringify(progressData)).percent)
                },
            },
            (_err, data) => {
                // 将上传后的封面进行路径拼接保存到本地
                if (data && data.Location) {
                    const url = 'https://' + data.Location
                    resolve(url)
                }
                if (_err) {
                    console.log('err',_err);
                    reject(_err)
                }
            }
        )
    })
}
