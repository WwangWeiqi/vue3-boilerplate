// 压缩图片
// eslint-disable-next-line no-unused-vars
export function compressImage(file, config) {
    // console.log('file, config', file, config)
    // eslint-disable-next-line no-unused-vars
    let src
        // eslint-disable-next-line no-unused-vars
    let files
    let filename = file.name
        // let fileSize = parseFloat(parseInt(file['size']) / 1024 / 1024).toFixed(2)
    const read = new FileReader()
    read.readAsDataURL(file)
    return new Promise(function(resolve, reject) {
        read.onload = function(e) {
            let img = new Image()
            img.src = e.target.result
            img.onload = function() {
                let orig_width = img.width
                let orig_height = img.height

                if (orig_height < 435 || orig_width < 400) {
                    reject(new Error('Too small.     Minimum:     400Wx435H'))
                }

                // console.log('img', img.src)
                let image_size = parseFloat(getImgSize(img.src))
                if (image_size < 500) {
                    // console.log(file)
                    resolve(file)
                    return
                }

                let ratio = Math.sqrt(image_size / 500) * 1.3

                let w = orig_width / ratio
                let h = orig_height / ratio

                console.log('img', ratio, img.width, img.height, w, h)

                // 生成canvas
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                let base64
                    // 创建属性节点
                canvas.setAttribute('width', w)
                canvas.setAttribute('height', h)
                ctx.drawImage(this, 0, 0, w, h)


                base64 = canvas.toDataURL(file['type'], config.quality)

                image_size = getImgSize(base64)

                // 回调函数返回file的值（将base64编码转成file）
                files = dataURLtoFile(base64, filename) // 如果后台接收类型为base64的话这一步可以省略
                    // 回调函数返回file的值（将base64转为二进制）
                    // let fileBinary = dataURLtoBlob(base64)

                resolve(files)
            }
        }
    })
};

// 将base64转为二进制  此方法我也没用到
function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

// base64转码（将base64编码转回file文件）  此方法我没用到
// eslint-disable-next-line no-unused-vars
function dataURLtoFile(dataurl, filename) {
    // console.log('dataurl', dataurl, filename)
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    console.log('mime', mime)
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

function getImgSize(base64url) {
    var str = base64url.replace('data:image/png;base64,', '');
    var equalIndex = str.indexOf('=');
    if (str.indexOf('=') > 0) {
        str = str.substring(0, equalIndex);
    }
    var strLength = str.length;
    var fileLength = parseInt(strLength - (strLength / 8) * 2);
    var size = "";
    size = (fileLength / 1024).toFixed(2);
    var sizeStr = size + "";
    var index = sizeStr.indexOf(".");
    var dou = sizeStr.substr(index + 1, 2)
    if (dou == "00") {
        console.log('size', sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2) + 'KB');
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    console.log('size', size + 'KB');
    return size;
}