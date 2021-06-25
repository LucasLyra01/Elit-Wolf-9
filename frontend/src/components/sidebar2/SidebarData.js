import React from 'react';
import * as GrIcons from 'react-icons/gr';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs' 


export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <BsIcons.BsFillBarChartFill />,
        cName: 'nav-text'
    },
    {
        title: "Perfil",
        path: '/profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Segurança',
        path: '/security',
        icon: <MdIcons.MdSecurity />,
        cName: 'nav-text'
    },
    {
        title: 'Sair',
        path: '/logout',
        icon: <GrIcons.GrLogout />,
        cName: 'nav-text',
    },
    {
        title: 'Sobre',
        path: '/about',
        icon: <BsIcons.BsInfoCircle />,
        cName: 'nav-text'
    }
];