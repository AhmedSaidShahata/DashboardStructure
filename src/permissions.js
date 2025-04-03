import { useAuthStore } from "@/stores/auth"

export default {
    install(app) {
        app.config.globalProperties.$hasPermission = function (permissionValidate) {
            const userData = useAuthStore().user

            const userPermissions = userData?.user?.role?.permissions
                .map((permission) =>
                    permission.sub_permissions.map(
                        (subPermission) =>
                            subPermission.name.replaceAll(/[/ ]+/g, "-").toLowerCase()
                    )
                )
                .flat();
    
            if (Array.isArray(permissionValidate)) {
                return permissionValidate.some(permission =>
                    userPermissions.includes(permission)
                );
            } else {
                return userPermissions.includes(permissionValidate);
            }
        };
    }
};
