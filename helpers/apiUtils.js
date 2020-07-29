export const apiUrl = 'http://assafinaonline.com/wp-json/wp/v2/';
export const baseUrl = 'http://assafinaonline.com/';
export const sys_admin = {
    username: "assafinamobileapp_sysadmin@ainbz.com",
    password: "R&A#grT2sVwkeL8s$yXRW8Xb"
}

export const decodeString = (text) => {
    var resolvedText = text
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&#038;/g, '&')
        .replace(/&#8216;/g, "'")
        .replace(/&#8211;/g, "-")
        ;
    return resolvedText;
}