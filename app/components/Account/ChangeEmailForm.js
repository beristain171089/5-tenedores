import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { validateEmail } from '../../utils/validations';
import { reauthenticate } from '../../utils/api';

export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setreloadUserInfo } = props;

    const [formData, setFormData] = useState(defaultValue);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    function defaultValue() {
        return {
            email: "",
            password: ""
        }
    }

    const onSubmit = () => {
        setErrors({});

        if (!formData.email || email === formData.email) {
            setErrors({
                email: "El email no ha cambiado."
            })
        } else if (!validateEmail(formData.email)) {
            setErrors({
                email: "Email incorrecto."
            })
        } else if (!formData.password) {
            setErrors({
                password: "Inserte contraseña."
            })
        } else {

            setIsLoading(true);

            reauthenticate(formData.password).then(() => {

                firebase
                    .auth()
                    .currentUser
                    .updateEmail(formData.email)
                    .then(() => {

                        setIsLoading(false);
                        setreloadUserInfo(true);
                        toastRef.current.show("Email actualizado correctamente");
                        setShowModal(false);

                    }).catch(() => {

                        setIsLoading(false);
                        setErrors({ password: "Error al actualizar el email" });

                    })


            }).catch(() => {
                setIsLoading(false);
                setErrors({ password: "La contraseña no es correcta" });
            })
        }
    }

    return (
        <View style={styles.View}>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.Input}
                defaultValue={email || ""}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#C2C2C2"
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.Input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#C2C2C2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
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