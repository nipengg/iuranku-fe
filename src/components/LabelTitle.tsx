import React from 'react'

interface ILabelProps {
    text: string
}

const LabelTitle: React.FunctionComponent<ILabelProps> = (props) => {

    const { text } = props;

    return (
        <>
            <p className="text-2xl">{text}</p>
        </>
    )
}

export default LabelTitle