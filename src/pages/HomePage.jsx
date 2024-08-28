import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { closeWebsocket } from '../reducers/websocket/action-creators';

const HomePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ws = useSelector((state) => state.get('websocket'));

    const { username } = useParams();
    const [message, setMessage] = useState('');

    const sayhello = async () => {
        await ws.call('sayhello', { user: username })
            .then(({ message }) => {
                console.log(`Server message: ${message}`);
                setMessage(message);
            })
            .catch((e) => {
                console.log(`Auth failed: ${e}`);
            });
    };

    const closeConnection = () => {
        if (ws !== null) {
            console.log('Cleaning up connection');
            ws.close();
            dispatch(closeWebsocket());
        }
    };

    const logout = () => {
        closeConnection();
        navigate('/');
    };

    useEffect(() => {
        if (ws === null) {
            navigate('/');
        } else {
            sayhello();
        }

        return () => {
            closeConnection();
        }
    }, []);

    return (
        <Layout>
            <p>{message}</p>
            <div className='md:flex md:items-center'>
                <div className='md:w-1/3'></div>
                <div className='md:w-2/3'></div>
                <button
                    className='self-center shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                    type='button'
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </Layout>
    );
};

export default HomePage;