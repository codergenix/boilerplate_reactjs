import moment from 'moment';

const loginexpire = () => {
    let currentday = moment().format('YYYY-MM-DD');
    let logintime = localStorage.getItem('ReactloginTime');
    if (moment(logintime).isBefore(currentday)) {
        logout();
    }
    return true;
}
const getlogin = () => {
    if(localStorage.ReactisLogin){
      loginexpire();    
    }
    return localStorage.getItem('ReactisLogin');
}
const getUserid = () => {
    return localStorage.getItem('ReactuserId');
}
const getUserData = () => {
    let getdata = localStorage.getItem('ReactuserData');
    if (getdata) {
        return JSON.parse(getdata);
    }
}

const logout = async () => {
    //await localStorage.clear();
    await localStorage.setItem('ReactloginTime', '');
    await localStorage.setItem('ReactisLogin', '');
    await localStorage.setItem('Reactstatus', 'logout');
    await localStorage.setItem('Reacttoken', '');
    await localStorage.setItem('ReactuserData', '');
    await localStorage.setItem('ReactuserId', '');
    await window.location.reload(false);
    return true;
}

const htmltoText = (htmlsting) => {
    if (htmlsting)
        return <span dangerouslySetInnerHTML={{ __html: `${htmlsting.replace(/<[^>]+>/g, '')}` }}></span>;
}
const texttohtml = (htmlsting) => {
    if (htmlsting)
        return <div dangerouslySetInnerHTML={{ __html: `${htmlsting}` }}></div>;
}

const Service = { getUserid, getlogin, logout, getUserData, htmltoText, texttohtml };
export default Service;