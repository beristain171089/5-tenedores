import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { size } from 'lodash';
import * as firebase from 'firebase';
import { reauthenticate } from '../../utils/api';

export default function ChangePasswordForm(props) {

    const { setShowModal, toastRef } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const onSubmit = async () => {

        let isSetErrors = true;
        let errorsTemp = {};

        setErrors({});

        if (!formData.password || !formData.newpassword || !formData.repeatNewpassword) {
            errorsTemp = {
                password: !formData.password ? "La contraseña no puede estar vacia." : "",
                newpassword: !formData.newpassword ? "La contraseña no puede estar vacia." : "",
                repeatNewpassword: !formData.repeatNewpassword ? "La contraseña no puede estar vacia." : ""
            }
        } else if (formData.newpassword !== formData.repeatNewpassword) {
            errorsTemp = {
                newpassword: "Las contraseñas no son iguales.",
                repeatNewpassword: "Las contraseñas no son iguales."
            }
        } else if (size(formData.newpassword) < 6) {
            errorsTemp = {
                newpassword: "La contraseña tiene que tener al menos 6 caracteres.",
                repeatNewpassword: "La contraseña tiene que tener al menos 6 caracteres."
            }
        } else {

            setIsLoading(true);

            await reauthenticate(formData.password)
                .then(async () => {

                    await firebase
                        .auth()
                        .currentUser
                        .updatePassword(formData.newpassword)
                        .then(() => {
                            isSetErrors = false;
                            setIsLoading(false);
                            setShowPassword(false);
                            firebase.auth().signOut();
                        }).catch(() => {

                            errorsTemp = {
                                other: "Error al actualizar la contraseña."
                            }

                            setIsLoading(false);
                        })

                }).catch(() => {

                    errorsTemp = {
                        password: "La contraseña no es correcta."
                    }

                    setIsLoading(false);
                })
        }

        isSetErrors && setErrors(errorsTemp);
    }

    function defaultValue() {
        return {
            password: "",
            newpassword: "",
            repeatNewpassword: ""
        };
    }

    return (
        <View style={styles.View}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.Input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#C2C2C2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={e => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.Input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#C2C2C2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={e => onChange(e, "newpassword")}
                errorMessage={errors.newpassword}
            />
            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.Input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#C2C2C2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={e => onChange(e, "repeatNewpassword")}
                errorMessage={errors.repeatNewpassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
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