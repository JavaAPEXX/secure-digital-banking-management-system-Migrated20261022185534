import React, { useState } from 'react';

type JspUpdateprofileComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspUpdateprofileComponent: React.FC<JspUpdateprofileComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'name': '',
        'email': '',
        'mobile_no': '',
        'city': '',
        'state': '',
        'pin': '',
        'address': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { user } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice("This form originally submitted to '/updateprofiledata' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
    };

    const handleBackendAction = async (
        e: React.MouseEvent<HTMLElement>,
        action: string = "",
    ) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice(
            action
                ? `The original backend action '${action}' has not been migrated to an API endpoint, so the action was not sent.`
                : "This form originally submitted to '/updateprofiledata' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="form-container">
            <h2>&#9999; Update Profile</h2>
        
            <form onSubmit={handleSubmit} action="/updateprofiledata" method="post">
        
                <div className="input-group">
                    <label>Name</label>
                    <input onChange={handleInputChange} type="text" name="name" value={user?.name} />
                </div>
        
                <div className="input-group">
                    <label>Email</label>
                    <input onChange={handleInputChange} type="email" name="email" value={user?.email} />
                </div>
        
                <div className="input-group">
                    <label>Mobile</label>
                    <input onChange={handleInputChange} type="text" name="mobile_no" value={user?.mobile_no} />
                </div>
        
                <div className="input-group">
                    <label>City</label>
                    <input onChange={handleInputChange} type="text" name="city" value={user?.city} />
                </div>
        
                <div className="input-group">
                    <label>State</label>
                    <input onChange={handleInputChange} type="text" name="state" value={user?.state} />
                </div>
        
                <div className="input-group">
                    <label>PIN</label>
                    <input onChange={handleInputChange} type="text" name="pin" value={user?.pin} />
                </div>
        
                <div className="input-group">
                    <label>Address</label>
                    <textarea onChange={handleInputChange} name="address">{user?.address}</textarea>
                </div>
        
                <button type="submit">Update Profile</button>
        
            </form>
        </div>
        </>
    );
};

export default JspUpdateprofileComponent;
