import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from '../components/index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'



function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, seterror] = useState("");

    const login = async(data) => {
        seterror("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                    navigate("/")
            }
        } catch (error) {
            seterror(error.message)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            {error && 
            <p className='text-red-600 mt-8 text-center'>
                {error}
            </p>}
            <form
            className='mt-8'
            onSubmit={handleSubmit(login)}
            >
                <div className='space-y-5'>
                    <Input
                    label="Email"
                    placeholder="Enter Email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
                            .test(value) || "Enter a valid Email address"
                        }
                    })}
                    />
                    <Input 
                    label="Password"
                    placeholder="Enter Password"
                    type="password"
                    {...register("password", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
                            .test(value) || "Enter a valid Password"
                        }
                    })}
                    />
                    <Button
                    type='submit'
                    className='w-full'
                    >
                        Sign in
                    </Button>
                </div>
            </form>
            
            </div>
    </div>
  )
}

export default Login