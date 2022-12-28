
import VisaCard from 'assets/images/creditcard/visa.svg';
import Mastercard from 'assets/images/creditcard/mastercard.svg';
import Waafi from 'assets/images/creditcard/waafi.png';
import Somtel from 'assets/images/creditcard/somtel.png';
import Discover from 'assets/images/creditcard/discover.svg';
import AmericanExpress from 'assets/images/png/wafi.png';
import PaypalExpress from 'assets/images/creditcard/paypal.svg';
import { WaafiPayment,DahabPayment,StripeOrPaypal } from 'pages/payments/paymentsComponents';
export const qaamuusPayments = [
	{
		id: 1,
		image: Waafi,
		width:40,
		name: 'WAAFI PAYMENT',
        key:"waafiP",
        desc:"Hormuud Telecom",
        content:<WaafiPayment/>,
		designation: 'Description',
	},
    {
		id: 1,
		image: Somtel,
		width:30,
		name: 'Somtel Payment',
        key:"somtelP",
        desc:"Somtel Network",
        content:<DahabPayment/>,
		designation: 'Description',
	},
    {
		id: 1,
		image: PaypalExpress,
		width:30,
		name: 'PAYPAL EXPRESS',
        key:"paypalP",
        desc:"Find that perfect color",
        content:<StripeOrPaypal/>,
		designation: 'Description',
	}
]