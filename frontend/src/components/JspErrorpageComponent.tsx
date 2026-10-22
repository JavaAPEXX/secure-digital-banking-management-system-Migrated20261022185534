import React from 'react';

interface JspErrorpageComponentData {
    error?: string;
}

type JspErrorpageComponentProps = {
    data?: Record<string, any>;
};

export const JspErrorpageComponent: React.FC<JspErrorpageComponentProps> = ({ data = {} }) => {
    const { error } = data;

    return (
        <>
<h2 style={{ color: 'red' }}>⚠️ Something went wrong</h2>
        
            <p>{error}</p>
        
            <a href="/create_account">Go Back</a>
        </>
    );
};

export default JspErrorpageComponent;
