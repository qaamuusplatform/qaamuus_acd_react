
import VisaCard from 'assets/images/creditcard/visa.svg';
import Mastercard from 'assets/images/creditcard/mastercard.svg';
import Waafi from 'assets/images/creditcard/waafi.png';
import Somtel from 'assets/images/creditcard/somtel.png';
import CashOnd from 'assets/images/creditcard/cashond.jpg';
import AmericanExpress from 'assets/images/png/wafi.png';
import PaypalExpress from 'assets/images/creditcard/paypal.svg';
import { WaafiPayment,DahabPayment,StripeOrPaypal, CashOnDelivery } from 'pages/payments/paymentsComponents';
export const qaamuusPayments = [
	{
		id: 1,
		image: Waafi,
		width:40,
		name: 'WAAFI',
        key:"waafiP",
        desc:"Hormuud-T",
        content:<WaafiPayment/>,
		designation: 'Description',
	},
    {
		id: 2,
		image: Somtel,
		width:30,
		name: 'Somtel',
        key:"somtelP",
        desc:"Somtel N",
        content:<DahabPayment/>,
		designation: 'Description',
	},
    {
		id: 4,
		image: CashOnd,
		width:60,
		name: 'BY-CASH',
        key:"othersp",
        desc:"Credit ",
        content:<CashOnDelivery/>,
		designation: 'Description',
	},
	
    {
		id: 3,
		image: PaypalExpress,
		width:30,
		name: 'PAYPAL-CC',
        key:"paypalP",
        desc:"Credit-P",
        content:<StripeOrPaypal/>,
		designation: 'Description',
	}
]