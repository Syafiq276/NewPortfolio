import{a as x,j as e,H as b,L as n}from"./app-CtOA9CbY.js";import{I as i}from"./InputError-DyrcL17G.js";function h({status:s,canResetPassword:l}){const{data:o,setData:t,post:c,processing:d,errors:a,reset:p}=x({email:"",password:"",remember:!1}),m=r=>{r.preventDefault(),c(route("login"),{onFinish:()=>p("password")})};return e.jsxs("div",{className:"min-h-screen flex items-center justify-center relative overflow-hidden px-4 font-sans select-none",children:[e.jsx(b,{title:"Admin Log In"}),e.jsx("style",{children:`
                .login-form-card {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 2.5rem 2rem 2rem;
                    background-color: #0b132b;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    border-radius: 24px;
                    transition: all 0.4s ease-in-out;
                    width: 100%;
                    max-w: 390px;
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
                }

                .login-form-card:hover {
                    transform: scale(1.015);
                    border-color: rgba(212, 175, 55, 0.35);
                    box-shadow: 0 20px 50px -15px rgba(212, 175, 55, 0.12);
                }

                .heading-title {
                    text-align: center;
                    color: #fff;
                    font-size: 1.5rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    margin-bottom: 1.5rem;
                }

                .input-field-group {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    border-radius: 50px;
                    padding: 0.75rem 1.25rem;
                    background-color: #050b18;
                    box-shadow: inset 1px 3px 8px rgba(0, 0, 0, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.03);
                    transition: border-color 0.3s;
                }

                .input-field-group:focus-within {
                    border-color: rgba(212, 175, 55, 0.4);
                }

                .input-icon-svg {
                    height: 1.15rem;
                    width: 1.15rem;
                    fill: rgba(212, 175, 55, 0.85);
                }

                .input-text-elem {
                    background: none;
                    border: none;
                    outline: none !important;
                    width: 100%;
                    color: #e2e8f0;
                    font-size: 0.875rem;
                }

                .input-text-elem::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }

                .btn-layout-row {
                    display: flex;
                    justify-content: space-between;
                    gap: 12px;
                    margin-top: 1.5rem;
                }

                .btn-primary-action {
                    flex: 1;
                    padding: 0.75rem 1.25rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border: none;
                    outline: none;
                    transition: all 0.3s ease-in-out;
                    background-color: #D4AF37;
                    color: #0b132b;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
                }

                .btn-primary-action:hover:not(:disabled) {
                    background-color: #fff;
                    color: #0b132b;
                    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.25);
                }

                .btn-primary-action:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .btn-secondary-action {
                    padding: 0.75rem 1.25rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    outline: none;
                    transition: all 0.3s ease-in-out;
                    background-color: transparent;
                    color: #fff;
                    cursor: pointer;
                }

                .btn-secondary-action:hover {
                    background-color: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.25);
                }

                .btn-link-action {
                    text-align: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: none;
                    outline: none;
                    transition: color 0.2s;
                    background-color: transparent;
                    color: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    margin-top: 1rem;
                    text-decoration: underline;
                }

                .btn-link-action:hover {
                    color: #D4AF37;
                }
            `}),e.jsxs("form",{onSubmit:m,className:"login-form-card relative z-10",children:[e.jsxs("p",{className:"heading-title flex flex-col gap-1",children:[e.jsx("span",{children:"ADMIN CORE"}),e.jsx("span",{className:"text-[9px] uppercase font-bold tracking-[3px] text-gold-base/50",children:"Secure Log In"})]}),s&&e.jsx("div",{className:"mb-4 text-xs font-semibold text-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-lg",children:s}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"input-field-group",children:[e.jsx("svg",{className:"input-icon-svg",xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"currentColor",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"})}),e.jsx("input",{autoComplete:"off",placeholder:"Email Address",className:"input-text-elem",type:"email",value:o.email,onChange:r=>t("email",r.target.value),required:!0})]}),e.jsx(i,{message:a.email,className:"text-[11px] px-3 mt-1 text-rose-400"})]}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"input-field-group",children:[e.jsx("svg",{className:"input-icon-svg",xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"currentColor",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"})}),e.jsx("input",{placeholder:"Password",className:"input-text-elem",type:"password",value:o.password,onChange:r=>t("password",r.target.value),required:!0})]}),e.jsx(i,{message:a.password,className:"text-[11px] px-3 mt-1 text-rose-400"})]}),e.jsx("div",{className:"flex items-center px-1",children:e.jsxs("label",{className:"flex items-center cursor-pointer select-none",children:[e.jsx("input",{type:"checkbox",name:"remember",checked:o.remember,onChange:r=>t("remember",r.target.checked),className:"rounded bg-[#050b18] border-white/10 text-gold-base focus:ring-gold-base/50"}),e.jsx("span",{className:"ms-2 text-xs text-slate-400 font-semibold",children:"Remember session"})]})}),e.jsxs("div",{className:"btn-layout-row",children:[e.jsx(n,{href:"/",className:"btn-secondary-action flex items-center justify-center",children:"Back"}),e.jsx("button",{type:"submit",className:"btn-primary-action",disabled:d,children:"Log In"})]}),l&&e.jsx(n,{href:route("password.request"),className:"btn-link-action",children:"Forgot Password?"})]})]})}export{h as default};
