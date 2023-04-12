import React, { useState } from "react";
import {Card, CardContent, Typography, TextField, Button, Tooltip, useMediaQuery} from "@mui/material";
import {useCookies} from "react-cookie";
import "@fontsource/akaya-telivigala"
import {apiUrl} from "../../api";


const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        padding: 16,
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    card: {
        width: '40%',
    },
    title: {
        marginBottom: 16,
    },
    textField: {
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
    },
};

export const LoginPanel = () => {

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

    // Modify the styles object based on screen size
    const updatedStyles = {
        ...styles,
        card: {
            ...styles.card,
            width: isSmallScreen ? '100%' : '40%',
        },
    };

    const [cookies, setCookies] = useCookies(['userCookie', 'basketCookie'])

    const [registerUserName, setRegisterUserName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const initialLoginUser = cookies.userCookie ? cookies.userCookie.user : ''
    const initialLoginPassword = cookies.userCookie ? cookies.userCookie.password : ''
    const [loginPassword, setLoginPassword] = useState(initialLoginPassword);
    const [loginUserName, setLoginUserName] = useState(initialLoginUser);
    const [registerLocation, setRegisterLocation] = useState('')
    let initialLoggedIn = false
    if (initialLoginUser && initialLoginPassword) {
        initialLoggedIn = true
    }
    const [loggedIn, setLoggedIn] = useState(initialLoggedIn)

    const handleLogin = async () => {

        console.log({loginUserName,loginPassword})
        const res = await fetch(`${apiUrl}/User/login`, {
            method: 'POST',
            body: JSON.stringify({
                user: loginUserName,
                password: loginPassword
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (res.status === 200){
            alert(`Welcome ${loginUserName}`)
            setLoggedIn(true)
            const userObject = {user: loginUserName, password:loginPassword}
            setCookies('userCookie', userObject)
        }
        if (res.status === 203) {
            alert('Given user does not exist')
        }

    };
    const handleRegister = async () => {
        const res = await fetch(`${apiUrl}/User`, {
            method: 'POST',
            body: JSON.stringify({
                user: registerUserName,
                password: registerPassword
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        switch (res.status) {
            case 203:
                alert('User with given username already created')
                break;
            case 200:
                alert(`User ${registerUserName} registered`);
                break;
            case 206:
                alert('Username/password does not fulfill requirements ')
                break;
        }
    };
    const loggingOut= () => {
        setCookies('userCookie', {})
        setLoggedIn(false)
        alert('You have logged out')
    };

    const sendOrderToDatabase = async () => {

        const user = cookies.userCookie.user
        const password = cookies.userCookie.password
        const location = 'abc'
        const orderObject = {}
        orderObject.orders = cookies.basketCookie
        console.log(cookies.basketCookie)
        orderObject.user = user
        orderObject.location = location


        const res = await fetch(`${apiUrl}/addOrder`, {
            method: 'POST',
            body: JSON.stringify(orderObject),
            headers: {
                "Content-Type": "application/json"
            },
        });
        setCookies('basketCookie', {})
        alert('Thank you for your order!')
    }

    if (!loggedIn) {
        return (
            <div style={styles.root}>
                <Card style={styles.card}>
                    <CardContent>
                        {/*//login panel*/}
                        <Typography variant="h5" style={styles.title}>
                            Are you our customer? Please log in.
                        </Typography>
                        <form style={styles.form}>
                            <TextField
                                label="Username"
                                value={loginUserName}
                                onChange={(event) => {
                                    setLoginUserName(event.target.value)
                                }}
                                style={styles.textField}
                            />
                            <TextField
                                label="Password"
                                value={loginPassword}
                                onChange={(event) => {
                                    setLoginPassword(event.target.value)
                                }}
                                type="password"
                                style={styles.textField}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                style={styles.button}
                            >
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography variant="h5" style={styles.title}>
                            New to our site? Register now.
                        </Typography>
                        <form style={styles.form}>
                            <TextField
                                label="Username"
                                value={registerUserName}
                                onChange={(event) => {
                                    setRegisterUserName(event.target.value)
                                }}
                                style={styles.textField}
                            />
                            <TextField
                                label="Password"
                                value={registerPassword}
                                onChange={(event) => {
                                    setRegisterPassword(event.target.value)
                                }}
                                type="password"
                                style={styles.textField}
                            />
                            <TextField
                                label="Location"
                                onChange={(event) => {
                                    setRegisterLocation(event.target.value)
                                }}
                                type="text"
                                style={styles.textField}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}
                                style={styles.button}
                            >
                                Register
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    } else {
        return (
            <>
                <Card>
                <Typography
                    style={{ fontFamily: "Akaya Telivigala", fontSize:'30px', color:'darkblue'}}
                    textAlign={"center"}

                >
                    You are logged as {loginUserName}
                </Typography>
                    <div style={{display:"flex", justifyContent: "space-around", margin:"20px"}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={loggingOut}>

                        Log out
                    </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={sendOrderToDatabase}>

                            Make Order
                        </Button>
                    </div>
                </Card>
            </>
        )

    }
};
