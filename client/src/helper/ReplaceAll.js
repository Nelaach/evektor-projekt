const ReplaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
};

export {ReplaceAll};