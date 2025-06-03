const contactRoutes = {
  title: 'contacts',
  path: '/contacts',
  meta: {
    icon: 'dashboard.svg',
    permissions: ["contact-topics_view", "contact-messages_view"],
    hidden: false,
  },
  children: [
    {
      title: 'topics',
      path: '/',
      component: () => import('@/views/contacts/topics/index.vue'),
      meta: {
        to: '/topics',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: "topics_view",
      },
      children: [
        {
          title: 'topics',
          path: '/topics',
          component: () => import('@/views/contacts/topics/record/index.vue'),
          meta: {
            icon: 'dashboard.svg'
          }
        },
        {
          path: 'topics/create',
          component: () => import('@/views/contacts/topics/actions/index.vue'),
        },
        {
          path: 'topics/:id/edit',
          component: () => import('@/views/contacts/topics/actions/index.vue'),
        },
      ]
    },
    {
      title: 'contact-messages',
      path: '/',
      component: () => import('@/views/contacts/messages/index.vue'),
      meta: {
        to: '/messages',
        icon: 'dashboard.svg',
        showChildren: false,
        permissions: "contact-messages_view",
      },
      children: [
        {
          title: 'messages',
          path: '/messages',
          component: () => import('@/views/contacts/messages/record/index.vue'),
          meta: {
            icon: 'dashboard.svg'
          }
        },
      
      ]
    },
  ]
}
export default contactRoutes