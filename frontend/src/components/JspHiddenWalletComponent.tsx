import React, { useState, useEffect } from 'react';

type JspHiddenWalletComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspHiddenWalletComponent: React.FC<JspHiddenWalletComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'pinInput': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            let mode = "LOGIN";
            let step = 1;
            let firstPin = "";
            
            const input = document.getElementById("pinInput") /* TODO: useRef */;
            const error = document.getElementById("error") /* TODO: useRef */;
            
            // focus always
            document.body.addEventListener("click", () => input.focus());
            
            // typing
            input.addEventListener("input", () => {
            
                let value = input.value;
                updateDots(value.length);
            
                if (value.length === 4) {
                    handlePin(value);
                }
            });
            
            // backspace fix
            input.addEventListener("keydown", () => {
                setTimeout(() => updateDots(input.value.length), 0);
            });
            
            // dots
            function updateDots(count) {
                let dots = document.querySelectorAll(".dot");
                dots.forEach((d, i) => {
                    d.classList.toggle("active", i < count);
                });
            }
            
            // switch
            function switchMode() {
            
                mode = (mode === "LOGIN") ? "CREATE" : "LOGIN";
                step = 1;
                firstPin = "";
            
                reset();
                error.innerText = "";
            
                if (mode === "LOGIN") {
                    title.innerText = "Enter PIN";
                    subtitle.innerText = "Access hidden wallet";
                    switchText.innerText = "Create new PIN";
                } else {
                    title.innerText = "Create PIN";
                    subtitle.innerText = "Enter new PIN";
                    switchText.innerText = "Back to Login";
                }
            }
            
            // handle pin
            function handlePin(pin) {
            
                error.innerText = "";
            
                if (mode === "CREATE") {
            
                    if (step === 1) {
                        firstPin = pin;
                        step = 2;
                        reset();
            
                        title.innerText = "Confirm PIN";
                        subtitle.innerText = "Re-enter your PIN";
            
                    } else {
            
                        if (pin === firstPin) {
                            savePin(pin);
                        } else {
                            error.innerText = "PIN not matched ❌";
                            reset();
                        }
                    }
            
                } else {
                    verifyPin(pin);
                }
            }
            
            // save
            function savePin(pin) {
            
                fetch("/setHiddenPin", {
                    method: "POST",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: "pin=" + pin
                })
                .then(() => {
                    error.classList.add("success");
                    error.innerText = "PIN created successfully ✅";
                    reset();
                });
            }
            
            // verify
            function verifyPin(pin) {
            
                fetch("/verifyHiddenPin", {
                    method: "POST",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: "pin=" + pin
                })
                .then(res => res.text())
                .then(data => {
            
                    if (data === "SUCCESS") {
                        window.location.href = "/hidden_home";
                    } else {
                        error.innerText = "Wrong PIN ❌";
                        reset();
                    }
            
                });
            }
            
            // reset
            function reset() {
                input.value = "";
                updateDots(0);
            }
            
            /* =========================
               🔐 FINGERPRINT (FIXED)
            ========================= */
            
            // REGISTER
            async function registerFingerprint() {
            
                let res = await fetch("/fingerprint/register/options");
                let options = await res.json();
            
                options.challenge = Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0));
                options.user.id = new TextEncoder().encode(options.user.id);
            
                let cred = await navigator.credentials.create({ publicKey: options });
            
                await fetch("/fingerprint/register/verify", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: btoa(String.fromCharCode(...new Uint8Array(cred.rawId))),
                        publicKey: "demo"
                    })
                });
            
                alert("Fingerprint Registered ✅");
            }
            
            // LOGIN
            async function loginFingerprint() {
                try {
            
                    let res = await fetch("/fingerprint/login/options");
                    let options = await res.json();
            
                    options.challenge = Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0));
            
                    let credential = await navigator.credentials.get({ publicKey: options });
            
                    // ✅ Send response to backend
                    let verify = await fetch("/fingerprint/login/verify", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            id: btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
                        })
                    });
            
                    let result = await verify.text();
            
                    if (result === "SUCCESS") {
                        window.location.href = "/hidden_home";
                    } else {
                        alert("Fingerprint failed ❌");
                    }
            
                } catch (err) {
                    alert("Fingerprint cancelled or failed ❌");
                }
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
<div className="wrapper">
        
            <div id="title" className="title">Enter PIN</div>
            <div id="subtitle" className="subtitle">Access hidden wallet</div>
        
            <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        
            <input onChange={handleInputChange} type="password" maxlength="4" id="pinInput" className="hidden-input" autofocus />
        
            <div id="error" className="error"></div>
        
            <div id="switchText" className="switch" onclick="switchMode()">
                Create new PIN
            </div>
        
            
            <div className="fp-btn" onclick="registerFingerprint()">Enable Fingerprint</div>
            <div className="fp-btn" onclick="loginFingerprint()">Use Fingerprint</div>
        
        </div>
        </>
    );
};

export default JspHiddenWalletComponent;
