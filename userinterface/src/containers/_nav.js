const _nav =  [
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-5'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Modules']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Enquiry',
    route: '/enquiry',
    icon: 'enquiry',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Enquiry',
        to: '/enquiry/enquiry-vehicle',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List Enquiry',
        to: '/enquiry/enquiry-list',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Customers',
    route: '/customer',
    icon: 'customers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Customer',
        to: '/customer/add-customer',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List Customer',
        to: '/customer/list-customer',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Masters',
    route: '/masters',
    icon: 'settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Manufactures',
        to: '/masters/manufacture',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cars',
        to: '/masters/cars',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Part Sections',
        to: '/masters/part-sections',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Parts',
        to: '/masters/parts',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
