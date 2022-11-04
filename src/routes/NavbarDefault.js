import { v4 as uuid } from 'uuid';

const NavbarDefault = [
	{
		id: uuid(),
		menuitem: 'COURSES',
		link: '/courses',
		
	},
	{
		id: uuid(),
		menuitem: 'EVENTS',
		link: '/events',
	
	},

	{
		id: uuid(),
		menuitem: 'MEMBERS',
		link: '#',
		children: [	
			{
				id: uuid(),
				menuitem: 'Notifications',
				link: '/marketing/student/student-notifications/'
			},
			{
				id: uuid(),
				menuitem: 'Privacy Settings',
				link: '/marketing/student/student-profile-privacy/'
			},
			{
				id: uuid(),
				menuitem: 'Delete Profile',
				link: '/marketing/student/student-delete-profile/'
			},
			{
				id: uuid(),
				menuitem: 'Linked Accounts',
				link: '/marketing/student/student-linked-accounts/'
			}
		]
	}
];

export default NavbarDefault;
