import { INavData } from '@coreui/angular';




// Nuevo tipo que extiende INavData y agrega la propiedad 'roles'
export interface INavDataWithRoles extends INavData {
    roles?: string[];
}

// Extendemos el tipo para incluir roles en elementos hijos
export interface INavDataWithRolesAndChildren extends INavDataWithRoles {
    children?: INavDataWithRoles[];
}


export const navItems: INavDataWithRolesAndChildren[] = [
    {
        name: 'Inicio',
        url: '/inicio',
        iconComponent: { name: 'cil-home' },
    },

    //SISTEMA INFORMACION PARA LA CALIDAD
    {
        title: true,
        name: 'Sistema Información Para la Calidad',
        class: 'text-decoration-underline',
        roles: ['admin', 'sic']
    },
    {
        name: 'Crear Acta - Evaluacion',
        url: '/sic/acta-evaluacion',
        iconComponent: { name: 'cil-pencil' },
        roles: ['admin', 'sic']
    },
    {
        name: 'Evaluaciones Realizadas',
        url: '/sic/evaluaciones-sic',
        iconComponent: { name: 'cil-task' },
        roles: ['admin', 'sic']
    },

    //SEGURIDAD DEL PACIENTE
    {
        name: 'Seguridad del paciente',
        title: true,
        class: 'text-decoration-underline',
        roles: ['admin', 'sp']
    },
    {
        name: 'Independientes',
        url: '/',
        iconComponent: { name: 'cil-building' },
        roles: ['admin', 'sp'],
        children: [
            {
                name: 'Crear Acta - Evaluacion',
                url: '/sp/acta-independientes',
                class: 'fw-normal',
                iconComponent: { name: 'cil-pencil' },
            },
            {
                name: 'Evaluaciones Realizadas',
                url: '/sp/evaluaciones-independientes',
                class: 'fw-normal',
                iconComponent: { name: 'cil-task' },
            },
        ]
    },
    {
        name: 'IPS',
        url: '/',
        iconComponent: { name: 'cil-hospital' },
        roles: ['admin', 'sp'],
        children: [
            {
                name: 'Crear Acta - Evaluacion',
                url: '/sp/acta-ips',
                class: 'fw-normal',
                iconComponent: { name: 'cil-pencil' },
            },
            {
                name: 'Evaluaciones Realizadas',
                url: '/sp/evaluaciones-ips',
                class: 'fw-normal',
                iconComponent: { name: 'cil-task' },
            },
        ]
    },

    //PAMEC
    {
        name: 'PAMEC',
        title: true,
        class: 'text-decoration-underline',
        roles: ['admin', 'pamec']
    },
    {
        name: 'Crear Acta - Evaluacion',
        url: '/pamec/acta-evaluacion',
        iconComponent: { name: 'cil-pencil' },
        roles: ['admin', 'pamec']
    },
    {
        name: 'Evaluaciones Realizadas',
        url: '/pamec/evaluaciones-pamec',
        iconComponent: { name: 'cil-notes' },
        roles: ['admin', 'pamec']
    },

    //RESOLUCIÓN 3100
    {
        name: 'RESOLUCIÓN 3100',
        title: true,
        class: 'text-decoration-underline',
        roles: ['admin', 'res']
    },
    {
        name: 'Visita',
        url: '/',
        roles: ['admin', 'coordinador', 'res'],
        iconComponent: { name: 'cil-hospital' },
        children: [
            {
                name: 'Crear Acta - IVC',
                url: '/resolucion-3100/acta-ivc',
                class: 'fw-normal',
                iconComponent: { name: 'cil-pencil' },
            },
            {
                name: 'Crear Acta - Verificacion',
                url: '/resolucion-3100/acta-verificacion',
                class: 'fw-normal',
                iconComponent: { name: 'cil-pencil' },
            },
        ]
    },
    {
        name: 'Evaluaciones Realizadas',
        url: '/theme/typographay',
        iconComponent: { name: 'cil-notes' },
        roles: ['admin', 'res']
    },

    //ADMIN
    {
        name: 'ADMIN',
        title: true,
        class: 'text-decoration-underline',
        roles: ['admin']
    },
    {
        name: 'Usuarios',
        url: '/usuarios',
        iconComponent: { name: 'cil-user' },
        roles: ['admin']
    },
    {
        name: 'Servicios',
        url: '/buttons',
        iconComponent: { name: 'cil-spreadsheet' },
        children: [
            {
                name: 'Prestadores',
                url: '/buttons/buttons',
                roles: ['admin']
            },
            {
                name: 'Criterios SIC',
                url: '/buttons/button-groups',
                roles: ['admin', 'sic']
            },
            {
                name: 'Criterios PAMEC',
                url: '/buttons/dropdowns',
                roles: ['admin', 'pamec']
            },
            {
                name: 'Criterios Independientes',
                url: '/buttons/dropdowns',
                roles: ['admin', 'sp']
            },
            {
                name: 'Criterios IPS',
                url: '/buttons/dropdowns',
                roles: ['admin', 'sp']
            },
            {
                name: 'Resolución 3100',
                url: '/buttons/dropdowns',
                roles: ['admin', 'res']
            }
        ]
    },

    //AUDITORIA
    {
        name: 'Auditoria',
        url: '/usuarios/auditoria',
        iconComponent: { name: 'cil-magnifying-glass' },
        roles: ['admin']
    },

];

export function filterNavItemsByRoles(allowedRoles: string[]): INavDataWithRoles[] {
    return navItems.map(item => {
        const filteredChildren = filterNavItemsByRolesForChildren(item.children, allowedRoles);

        if (!item.roles || item.roles.some(role => allowedRoles.includes(role))) {
            return {
                ...item,
                children: filteredChildren
            } as INavDataWithRoles;
        }

        return null;
    }).filter((item): item is INavDataWithRoles => !!item) as INavDataWithRoles[];
}

function filterNavItemsByRolesForChildren(children: INavDataWithRoles[] | undefined, allowedRoles: string[]): INavDataWithRoles[] | undefined {
    if (!children) {
        return undefined;
    }

    const filteredChildren: INavDataWithRoles[] = [];

    children.forEach(child => {
        if (!child.roles || child.roles.some(role => allowedRoles.includes(role))) {
            filteredChildren.push({ ...child });
        }
    });

    return filteredChildren.length > 0 ? filteredChildren : undefined;
}


