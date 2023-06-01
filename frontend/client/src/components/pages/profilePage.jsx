import React from 'react';
import FirstNav from "../firstNav";
import SecondNav from "../secondNav";
import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";


const ProfilePage = () => {
    const { isAuthenticated, user, loading } = useSelector(state => state.user );

    if (!isAuthenticated && !loading && user === null )
        return <Navigate to='/login '/>;

    return (
        <div>
            <FirstNav/>
            <SecondNav/>
            <div>
                { loading || user === null ? (
                    <p>loading...</p>
                ) : (
                    <>
                        <h1>Profile page</h1>
                        <ul>
                            <li>first name: {user.first_name}</li>
                            <li>last name: {user.last_name}</li>
                            <li>email: {user.email}</li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;