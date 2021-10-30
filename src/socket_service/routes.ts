export const socketRoutes = {
    user: {
        updateImps: {
            room: (user_id: string) => `/user/${user_id}`,
            event: '/user/update/imps',
            getData: (imps: string) => ({ imps }),
        },
    },
}
