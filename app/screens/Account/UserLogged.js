import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from 'firebase';
import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';
import AccountOptions from '../../components/Account/AccountOptions';

export default function UserLogged() {

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [reloadUserInfo, setreloadUserInfo] = useState(false);

    const toastRef = useRef();

    useEffect(() => {

        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })();

        setreloadUserInfo(false);

    }, [reloadUserInfo])

    return (
        <View style={styles.viewUserInfo}>

            {userInfo &&
                <InfoUser
                    userInfo={userInfo}
                    toastRef={toastRef}
                    setLoading={setLoading}
                    setLoadingText={setLoadingText}
                />}


            <AccountOptions
                userInfo={userInfo}
                toastRef={toastRef}
                setreloadUserInfo={setreloadUserInfo}
            />

            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={() => firebase.auth().signOut()}
            />
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}
            />
            <Loading
                text={loadingText}
                isVisible={loading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#F2F2F2"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E3E3E3",
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText: {
        color: "#00A680"
    }
});