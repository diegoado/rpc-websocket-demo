import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Client } from "rpc-websockets";
import { openWebsocket } from '../reducers/websocket/action-creators';

const rpcServerPort = process.env.RPC_SERVER_PORT || 8080;
const rpcServerHost = process.env.RPC_SERVER_HOST || 'localhost';

const LoginPage = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isConnectionOpen, setConnectionOpen] = useState(false)
    const ws = useRef();
    const dispatch = useDispatch();

    async function handleSubmit() {
        if (!isConnectionOpen) {
            console.log('Client disconnected...');
            return;
        }
        if (username && password) {
            await ws.current.login({ login: username, password })
                .then(() => {
                    dispatch(openWebsocket(ws.current)); 
                })
                .catch((e) => {
                    console.log(`Auth failed: ${e}`);
                });

            navigate(`/home/${username}`);
        }
    }

    useEffect(() => {
        ws.current = new Client(`ws://${rpcServerHost}:${rpcServerPort}`);
        ws.current.on('open', () => {
            console.log('Connection Opened');
            setConnectionOpen(true);
        });
    }, []);

    return (
        <Layout>
            <form className='w-full max-w-sm flex flex-col space-y-6'>
                <div className='flex flex-col items-center mb-6 space-y-6'>
                    <label
                        className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                        htmlFor='username'
                    >
                        Type the user and password to test this App
                    </label>
                    <input
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id="username"
                        type="text"
                        placeholder='Your login'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                        id="password"
                        type="password"
                        placeholder='Your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='md:flex md:items-center'>
                    <div className='md:w-1/3'></div>
                    <div className='md:w-2/3'></div>
                    <button
                        className='self-center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                        type='button'
                        onClick={handleSubmit}
                    >
                        Log in
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default LoginPage;
