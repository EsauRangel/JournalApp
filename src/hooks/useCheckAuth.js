import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/slices/auth';
import { FirebaseAuth } from '../firebase/config';

export const useCheckAuth = () => {
    const dispatch = useDispatch()
    const { status } = useSelector(state => state.auth);

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }))
        });

    }, []);

    return status;
    
}