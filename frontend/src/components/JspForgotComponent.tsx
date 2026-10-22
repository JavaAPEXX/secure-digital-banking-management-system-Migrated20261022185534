import React, { useState } from 'react';

interface JspForgotComponentData {
    msg?: string;
}

type JspForgotComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspForgotComponent: React.FC<JspForgotComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'email': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { msg } = data;

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
        setBackendActionNotice("This form originally submitted to '/send-reset' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/send-reset' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="forgot-card">
                <div className="title">Forgot Password &#128272;</div>
                <div className="subtitle">Enter your registered email</div>
        
                <form onSubmit={handleSubmit} action="/send-reset" method="post">
                    <input onChange={handleInputChange} type="email" name="email" className="input-box" placeholder="Enter your email" required />
                    <button type="submit" className="btn">Send OTP</button>
                </form>
        
                <div className="msg">{msg}</div>
        
                <a href="/login" className="back">&#8592; Back to Login</a>
            </div>
        </>
    );
};

export default JspForgotComponent;
