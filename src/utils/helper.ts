export const getImgDimensions = (url: string) => {
    return new Promise<{width: number; height: number}>((resolve, reject) => {
        const img = new Image()
        img.src = url
        img.addEventListener('load', () => {
            const { naturalWidth: width, naturalHeight: height } = img
            resolve({width, height})
        })
        img.addEventListener('error', (e) => {
            reject(e)
        })
    })
}