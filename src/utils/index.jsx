

export const CheckIOS = () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        return true
    }
}

export const ResponseMsgFormatter = (obj) => {

    let errorMsg = "";

    Object.values(obj).map((value, index) => {
        errorMsg = `${errorMsg} ${value[0]}`
    })

    return errorMsg
}