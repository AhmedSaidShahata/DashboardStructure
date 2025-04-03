import { useAuthStore } from "@/stores/auth"
export default {
  methods: {
    $dateFormat(date) {
      if (!date) return
      return new Date(date).toLocaleString(this.$i18n.locale)
    },
    $hasPermission(permissionValidate) {

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
          userPermissions?.includes(permission)
        );
      } else {
        return userPermissions?.includes(permissionValidate);
      }
    }
  }
}