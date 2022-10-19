const refresh = ()=>{
    window.location.href = "about:blank";
    window.opener.location.reload();
    window.close();
}

export default refresh;