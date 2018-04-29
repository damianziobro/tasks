export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const isValid = (value, validationRules) => {
    let isValid = true;

    if (!validationRules) {
        return true;
    };
    
    if (validationRules.required) {
        isValid = value.trim() !== '' && isValid;
    };

    if (validationRules.minLength) {
        isValid = value.length >= validationRules.minLength && isValid;
    };

    return isValid;
};
