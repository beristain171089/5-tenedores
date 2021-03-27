import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions(props) {

    const { userInfo, toastRef, setreloadUserInfo } = props;

    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setrenderComponent] = useState(null);

    const selectedComponent = (key) => {

        switch (key) {
            case "displayName":
                setrenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setreloadUserInfo={setreloadUserInfo}
                    />
                )
                setShowModal(true);
                break;

            case "email":
                setrenderComponent(
                    <ChangeEmailForm
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setreloadUserInfo={setreloadUserInfo}
                    />
                )
                setShowModal(true);
                break;

            case "password":
                setrenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                setShowModal(true);
                break;

            default:
                setrenderComponent(null);
                setShowModal(false);
                break;
        }

    }

    const menuOptions = generateOptions(selectedComponent);

    function generateOptions(selectedComponent) {
        return [
            {
                title: "Cambiar Nombre y Apellidos",
                iconType: "material-community",
                iconNameLeft: "account-circle",
                iconColorLeft: "#CCC",
                iconNameRight: "chevron-right",
                iconColorRigth: "#CCC",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambiar Email",
                iconType: "material-community",
                iconNameLeft: "at",
                iconColorLeft: "#CCC",
                iconNameRight: "chevron-right",
                iconColorRigth: "#CCC",
                onPress: () => selectedComponent("email")
            },
            {
                title: "Cambiar Contraseña",
                iconType: "material-community",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#CCC",
                iconNameRight: "chevron-right",
                iconColorRigth: "#CCC",
                onPress: () => selectedComponent("password")
            }
        ]
    }

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}

            {renderComponent &&
                <Modal
                    isVisible={showModal}
                    setIsVisible={setShowModal}
                >
                    {renderComponent}
                </Modal>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3"
    }
});