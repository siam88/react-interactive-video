

export const CheckIOS = () => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        return true
    }
}

