// import context file
import MailsData from 'data/mail/MailsData';
import { MailContext } from '../Context';

// import data files

const MailProvider = ({ children }) => {
	const [mailContextValue] = [
		{
			mails: MailsData,
			filters: ['None', 'All', 'Read', 'Unread', 'Starred', 'Unstarred'],
			activeFilter: 'None'
		}
	];
	return (
		<MailContext.Provider value={{ mailContextValue }}>
			{children}
		</MailContext.Provider>
	);
};

export default MailProvider;
