const baseURL = "http://localhost:3000/";

function getParams(url) {
    let paramsString = url.replace(baseURL, "");
    return paramsString.split("/");
}

export { getParams };