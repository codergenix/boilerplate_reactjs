//----
const authToken = () => {
    try {
        const userInfo = JSON.parse(sessionStorage.getItem('webAppUser'))
        if (userInfo?.token) {
            return userInfo.token
        }
        return null
    } catch (error) {
        console.error('try catch [service.authToken] error.message :', error.message);
        return null;
    }
}
const authHeader = () => {
    try {
        const token = authToken()
        return { Authorization: `Bearer ${token}` }
    } catch (error) {
        console.error('try catch [service.authHeader] error.message :', error.message);
        return false;
    }
}

const Getlogin = async () => {
    try {
        const token = authToken()
        return !!token;
    } catch (error) {
        console.error('try catch [service.Getlogin] error.message :', error.message);
        return false;
    }
}

const getLoginData = () => {
    try {
        return JSON.parse(sessionStorage.getItem('webAppUser'))
    } catch (error) {
        console.error('try catch [service.getLoginData] error.message :', error.message);
        return {};
    }
}

const Logout = () => {
    try {
        sessionStorage.removeItem('webAppUser');
        window.location.href = "/login";
        return true;
    } catch (error) {
        console.error('try catch [service.Logout] error.message :', error.message);
        return true;
    }
}

const HtmltoText = (htmlsting) => {
    try {
        if (htmlsting) {
            return <span dangerouslySetInnerHTML={{ __html: `${htmlsting.replace(/<[^>]+>/g, '')}` }} />;
        }
    } catch (error) {
        console.error('try catch [service.HtmltoText] error.message :', error.message);
    }
}
const TextTohtml = (htmlsting) => {
    try {
        if (htmlsting) {
            return <div dangerouslySetInnerHTML={{ __html: `${htmlsting}` }} />;
        }
    } catch (error) {
        console.error('try catch [service.TextTohtml] error.message :', error.message);
    }
}
const HtmltagRemove = (htmlsting) => {
    try {
        if (htmlsting) {
            const regexhtmltag = /(<([^>]+)>)/ig;
            let tagRemove = htmlsting.replace(regexhtmltag, '');
            let tagremove2 = tagRemove.replace(/\\&nbsp;/g, '');
            return (tagremove2);
        }
    } catch (error) {
        console.error('try catch [service.TextTohtml] error.message :', error.message);
    }
}

function getImageMimeType(base64String) {
    try {
        if (base64String?.startsWith("/9j/")) return "image/jpeg";
        if (base64String?.startsWith("iVBORw0KGg")) return "image/png";
        if (base64String?.startsWith("R0lGODdh")) return "image/gif";
        if (base64String?.startsWith("UklGR")) return "image/webp";
        return "image/png";
    } catch (error) {
        console.error('try catch [service.getImageMimeType] error.message :', error.message);
        return false;
    }
}
const getImageBase64Type = (imgURLstring) => {
    try {
        // console.log("getImageBase64Type >> imgURLstring::",imgURLstring);
        if (imgURLstring == null || imgURLstring == '') {
            return "./images/user.jpg";
        }
        else if (imgURLstring?.startsWith('data:image/') || imgURLstring?.startsWith('/images/') || imgURLstring?.startsWith('http')) {
            return imgURLstring;
        } else {
            const mimeType = getImageMimeType(imgURLstring);
            return `data:${mimeType};base64,${imgURLstring}`;
        }
    } catch (error) {
        console.error('try catch [service.getImageBase64Type] error.message :', error.message);
        return imgURLstring
    }
}
const removeImageBase64Type = (imgURLstring) => {
    try {
        // console.log("removeImageBase64Type >> imgURLstring::",imgURLstring);
        if (imgURLstring?.startsWith('data:image/')) {
            return imgURLstring?.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        } else {
            return imgURLstring;
        }
    } catch (error) {
        console.error('try catch [service.removeImageBase64Type] error.message :', error.message);
        return imgURLstring;
    }
}
const filetoBase64 = (file, callback = (base64) => console.log(base64)) => {
    try {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            callback(removeImageBase64Type(fileReader.result));
        };
        fileReader.onerror = () => {
            console.log("filetoBase64 >> onerror::", fileReader);
        };
        fileReader.readAsDataURL(file);
    } catch (error) {
        console.error('try catch [service.filetoBase64] error.message :', error.message);
        callback('')
    }
}

const Service = { Getlogin, Logout, getLoginData, authHeader, authToken, HtmltoText, TextTohtml, HtmltagRemove, getImageBase64Type, removeImageBase64Type, filetoBase64 };
export default Service;