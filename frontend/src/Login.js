import { React, useEffect, useState } from "react";
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const ENDPOINT='http://127.0.0.1:8000/api';
    const[username,setUserName]=useState('');
    const[pass,setPassword]=useState('');
    const[c_pass,setConfirmPassword]=useState('');
    const[email,setEmail]=useState(''); 
    const navigate=useNavigate();

    useEffect(() => {
        const wrapper = document.querySelector('.wrapper');
        const loginLink = document.querySelector('.login-link');
        const registerLink = document.querySelector('.register-link');

        registerLink.addEventListener('click', () => {
            wrapper.classList.add("active");
        });

        loginLink.addEventListener('click', () => {
            wrapper.classList.remove("active");
        });

    }, []);

    const handleRegisterSubmit = async(e) => {
        e.preventDefault();
        
        if(pass===c_pass){
            const email_response=await axios.get(`${ENDPOINT}/get-email/`);
            var db_email=email_response.data['email'];

            const username_response=await axios.get(`${ENDPOINT}/get-username/`);
            var db_username=username_response.data['username'];


            let flag=0;
            for(let i=0;i<db_email.length;i++){
                if(email===db_email[i]){
                    flag=1;
                }
                else if(username===db_username[i]){
                    flag=2;
                }
            }

            if(flag==0){
                const data={'username':username,'email':email,'password':pass};
                const request=await axios.post(`${ENDPOINT}/register/`,data);
                alert('registration successful !!!');
            }
            else if(flag==1){
                alert('Email Already taken !!!');
            }
            else if(flag==2){
                alert('Username is already taken !!!');
            }
        }
        else{
            alert("Please enter same passwords");
        }
    }

    const handleLoginSubmit = async(e) => {
        // console.log("Working")
        e.preventDefault();

        const data={'username':username,'password':pass}
        const username_response=await axios.get(`${ENDPOINT}/get-username/`);
        var db_username=username_response.data['username'];

        var flag=false;
        for(let i=0;i<db_username.length;i++){
            if(username===db_username[i]){
                flag=true;
            }
        }

        const password_verify=await axios.post(`${ENDPOINT}/verify_password/`,data);

        if((password_verify.data['is_correct'])&&(flag)){
            alert('Login successfull...');
            localStorage.setItem('username',username);
            window.location.href=`/?user=${username}`;
            // navigate()
        }
        else{
            alert('Invalid Username or Password !!!');
        }
    }

    return (
        <div className="body-login">
            <div class="wrapper">
                <div class="form-box login">
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="person-circle-outline"></ion-icon></span>
                            <input type="text" name="username" id="username" required onChange={(e)=>setUserName(e.target.value)} />
                            <label for="username">Username</label>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" name="pass" id="pass" required onChange={(e)=>setPassword(e.target.value)} />
                            <label for="pass">Passsword</label>
                        </div>
                        <div class="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                            {/* <a href="#">Forgot password</a> */}
                        </div>
                        <button type="submit" class="btn">Login</button>
                        <div class="login-register">
                            <p>Don't have an account?
                                <a href="#" class="register-link">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
                <div class="form-box register">
                    <h2>Register</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="person-circle-outline"></ion-icon></span>
                            <input type="text" name="username" id="username" required onChange={(e)=>setUserName(e.target.value)} />
                            <label for="username">Username</label>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="mail"></ion-icon></span>
                            <input type="email" name="mail" id="mail" required onChange={(e)=>setEmail(e.target.value)} />
                            <label for="username">Email</label>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" name="pass" id="pass" required onChange={(e)=>setPassword(e.target.value)} />
                            <label for="pass">Passsword</label>
                        </div>
                        <div class="input-box">
                            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="password" name="pass" id="pass" required onChange={(e)=>setConfirmPassword(e.target.value)} />
                            <label for="pass">Confirm Passsword</label>
                        </div>
                        <div class="remember-forgot">
                            <label><input type="checkbox" />I agree to the terms and conditions</label>
                        </div>
                        <button type="submit" class="btn">Register
                        </button>
                        <div class="login-register">
                            <p>Already have an account?
                                <a href="#" class="login-link">Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;