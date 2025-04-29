const ROUTES = {
  AUTH: {
    PATH: "/auth", NAME: "Auth",
    LOGIN: { PATH: "/auth/login", NAME: "Login" },
    REGISTER: { PATH: "/auth/register", NAME: "Register" },
  },
  TEMPLATE: {
    LIST: { PATH: "/template", NAME: "Templates" },
    CREATE: { PATH: "/template/create", NAME: "Create Template" },
    VIEW: { PATH: "/template/view/:id", NAME: "View Template" },
  },
  DOCUMENT: {
    LIST: { PATH: "/document", NAME: "Documents" },
    VIEW: { PATH: "/document/view/:id", NAME: "View Document" },
    LIST_TEMPLATE: { PATH: "/document/list/:templateId", NAME: "List Document" },
    CREATE: { PATH: "/document/create", NAME: "Create Document" },
  },
  INETGARATION: {
    LIST: { PATH: "/integration", NAME: "Integrations" },
    CREATE: { PATH: "/integration/create", NAME: "Create Integrations" },
  },
  AUTOMATION: {
    LIST: { PATH: "/automation", NAME: "Automations" },
    LIST_TEMPLATE: { PATH: "/automation/:templateId", NAME: "Template Automations" },
    CREATE: { PATH: "/automation/create", NAME: "Create Automation" },
  },
  DASHBOARD: { PATH: "/", NAME: "Dashboard" },
  UPLOAD: { PATH: "/upload", NAME: "Upload Document" },
  ANALYZE: (id: string) => ({ PATH: `/analyze/${id}`, NAME: `Analyze ${id}` }),
  ADMIN: { PATH: "/admin", NAME: "Admin" },
  ADMIN_USERS: { PATH: "/admin/users", NAME: "Users" },
  ADMIN_USER_ROLES: { PATH: "/admin/users/roles", NAME: "User Roles" },
};

export default ROUTES;
