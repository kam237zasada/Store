import React from 'react';

export default function Options({select, options}) {
    if(options) {
        if(typeof options[0]==='string' ) {
            return(
                options.map(option => {
                    return <option onClick={select.bind(null, option)}value={option}>{option}</option>
                })
            )
        } else {
    return(
        options.map(option => {
            return <option onClick={select.bind(null, option)}value={option._id}>{option.name}</option>
        })
    )
    }
  }  else {
        return null
    }
}