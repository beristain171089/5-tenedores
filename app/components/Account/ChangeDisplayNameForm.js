import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ChangeDisplayNameForm(props) {

    const { displayName, setShowModal, toastRef, setreloadUserInfo } = props;
    
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        setError(null);
        if (!newDisplayName) {
            setError("El nombre no puede estar vacío.");
        } else if (displayName === newDisplayName) {
            setError("El nombre no puede ser igual al actual.");
        } else {

            setIsLoading(true);

            const update = {
                displayName: newDisplayName
            }

            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {
                    setIsLoading(false);
                    setreloadUserInfo(true);
                    setShowModal(false);                    
                }).catch(() => {
                    setError("Error al actualizar.");
                    setIsLoading(false);
                })
        }
    }

    return (
        <View style={styles.View}>
            <Input
                placeholder="Nombre y Apellidos"
                containerStyle={styles.Input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#C2C2C2"
                }}
                defaultValue={displayName && displayName}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button
                title="Cambiar Nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    View: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    Input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00A680"
    }
});
