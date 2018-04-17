import React from 'react';

const todoInput = (props) => {
    return (
        <input type="text" value="props.value" placeholder="Wpisz todo..." />
    );
};

export default todoInput;