export const DashboardMenu = [
	{
		id: 1,
		title: 'Edit Profile',
		link: '/user/edit-profile/',
		icon: 'edit'
	},
	{
		id: 2,
		title: 'Koorasyadada',
		link: '/user/enrolled-courses/',
		icon: 'book'
	},
	{
		id: 3,
		title: 'Lacag Bixinta',
		link: '/marketing/user/student-payment/',
		icon: 'star'
	},
	{
		id: 4,
		title: 'Invoice',
		link: '/marketing/user/student-invoice/',
		icon: 'pie-chart'
	}
];

export const AccountSettingsMenu = [
	{
		id: 1,
		title: 'Doodda Casharka',
		link: '/user/discussion topics/',
		icon: 'settings'
	},
	{
		id: 2,
		title: 'Jawaab celin',
		link: '/marketing/user/student-security/',
		icon: 'user'
	},
	{
		id: 4,
		title: 'Ogeysiisyada',
		link: '/user/notifications/',
		icon: 'bell'
	},
	// {
	// 	id: 5,
	// 	title: 'Profile Privacy',
	// 	link: '/marketing/user/student-profile-privacy/',
	// 	icon: 'lock'
	// },
	{
		id: 6,
		title: 'Delete Account',
		link: '/user/delete-account/',
		icon: 'trash'
	},
	
	{
		id: 6,
		title: 'Sign Out',
		link: '/',
		icon: 'power'
	}
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
