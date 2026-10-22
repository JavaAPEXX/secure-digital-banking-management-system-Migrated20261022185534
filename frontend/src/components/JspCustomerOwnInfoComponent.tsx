import React from 'react';

type JspCustomerOwnInfoComponentProps = {
    data?: Record<string, any>;
};

export const JspCustomerOwnInfoComponent: React.FC<JspCustomerOwnInfoComponentProps> = ({ data = {} }) => {

    return (
        <>
        <div className="alert alert-warning" role="alert" data-apex-data-source="unmigrated">{"This page originally loaded data through getParameter (cname). That server-side data source has not been migrated to an API endpoint, so the page is showing the source design without that data."}</div>
        <>
<div><h3>JspCustomerOwnInfoComponent</h3><p>Modernized view component.</p></div>
        </>
        </>
    );
};

export default JspCustomerOwnInfoComponent;
