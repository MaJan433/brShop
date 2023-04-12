import {createContext} from 'react';
import * as React from "react";

export const AdminContext = createContext
({
    adminLogged: false,
    setAdminLogged: () => {},
    openAddUserPanel: false,
    setOpenAddUserPanel: () => {},
    openUpdateUserPanel: false,
    setOpenUpdateUserPanel: () => {},
    openOrderPanel: false,
    setOpenOrderPanel: () => {}
});