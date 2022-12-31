import MailsData from 'data/mail/MailsData';
import React from 'react';
export const MailContext = React.createContext({ mails: MailsData });
export const ChatContext = React.createContext();
export const TaskKanbanContext = React.createContext({
	taskColumns: [],
	tasks: []
});
