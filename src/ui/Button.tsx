import React, { SetStateAction } from 'react'


const Button = ({ label, style = {}, onClick }: { label: string, style?: React.CSSProperties, onClick?: () => void }) => {
    return (
        <button onClick={onClick} style={{ ...style }}>{label}</button>)
}

export default Button
