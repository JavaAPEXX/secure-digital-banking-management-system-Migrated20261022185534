import React, { useState, useEffect } from 'react';

interface JspPaymentPageComponentData {
    amount?: number;
}

type JspPaymentPageComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspPaymentPageComponent: React.FC<JspPaymentPageComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'amountValue': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { amount } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            function payNow() {
            
                var amount = document.getElementById("amountValue") /* TODO: useRef */.value;
            
                fetch("/create_order?amount=" + amount, {
                    method: "POST"
                })
                .then(res => res.json())
                .then(order => {
            
                    var options = {
                        "key": "rzp_test_SYtIERyTrzDaL2",
            
                        "amount": order.amount,
                        "currency": "INR",
            
                        "order_id": order.id, // 🔥 VERY IMPORTANT
            
                        "name": "My Bank",
                        "description": "Deposit Money",
            
                        "handler": function (response) {
            
                            var form = document.createElement("form");
                            form.method = "POST";
                            form.action = "/payment_success";
            
                         var p1 = document.createElement("input");
            p1.type = "hidden";   // ✅ FIX
            p1.name = "razorpay_payment_id";
            p1.value = response.razorpay_payment_id;
            
            var p2 = document.createElement("input");
            p2.type = "hidden";   // ✅ FIX
            p2.name = "razorpay_order_id";
            p2.value = response.razorpay_order_id;
            
            var p3 = document.createElement("input");
            p3.type = "hidden";   // ✅ FIX
            p3.name = "razorpay_signature";
            p3.value = response.razorpay_signature;
            
                            form.appendChild(p1);
                            form.appendChild(p2);
                            form.appendChild(p3);
            
                            document.body.appendChild(form);
                            form.submit();
                        }
                    };
            
                    var rzp = new Razorpay(options);
                    rzp.open();
                });
            }
        } catch(e) {}
    }, []);

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
        setBackendActionNotice("This form's original backend action has not been connected to a migrated API endpoint, so the form was not submitted.");
    
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
                : "This form's original backend action has not been connected to a migrated API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
<div className="card">
        
            <div className="bank-logo">&#x1F3E6; My Bank</div>
        
            <div className="title">Secure Payment</div>
        
            
            <div className="amount">&#8377;{amount}</div>
        
            <div className="divider"></div>
        
            <div className="secure-text">&#128274; 100% Secure Payment via Razorpay</div>
        
            <input name="amount" type="hidden" id="amountValue" value={amount} />
        
            <button onclick="payNow()" className="btn">
                &#128179; Pay Now
            </button>
        
            <div className="razorpay">Powered by Razorpay</div>
        
        </div>
        </>
    );
};

export default JspPaymentPageComponent;
