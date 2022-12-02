export const DashboardMenu = [
	{
		id: 1,
		title: 'Edit Profile',
		link: '/student/edit-profile/',
		icon: 'edit'
	},
	{
		id: 2,
		title: 'Koorasyadada',
		link: '/student/enrolled-courses/',
		icon: 'book'
	},
	{
		id: 3,
		title: 'Lacag Bixinta',
		link: '/marketing/student/student-payment/',
		icon: 'star'
	},
	{
		id: 4,
		title: 'Invoice',
		link: '/marketing/student/student-invoice/',
		icon: 'pie-chart'
	}
];

export const AccountSettingsMenu = [
	{
		id: 1,
		title: 'Doodda Casharka',
		link: '/student/discussion topics/',
		icon: 'settings'
	},
	{
		id: 2,
		title: 'Jawaab celin',
		link: '/marketing/student/student-security/',
		icon: 'user'
	},
	{
		id: 4,
		title: 'Ogeysiisyada',
		link: '/student/n-notification/',
		icon: 'bell'
	},
	// {
	// 	id: 5,
	// 	title: 'Profile Privacy',
	// 	link: '/marketing/student/student-profile-privacy/',
	// 	icon: 'lock'
	// },
	{
		id: 6,
		title: 'Delete Profile',
		link: '/student/delete-profile/',
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
