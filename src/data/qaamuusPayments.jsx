
import VisaCard from 'assets/images/creditcard/visa.svg';
import Mastercard from 'assets/images/creditcard/mastercard.svg';
import Discover from 'assets/images/creditcard/discover.svg';
import AmericanExpress from 'assets/images/png/wafi.png';
import PaypalExpress from 'assets/images/creditcard/paypal.svg';
import { WaafiPayment,DahabPayment,StripeOrPaypal } from 'pages/events/eventPaymentsComponents';
export const qaamuusPayments = [
	{
		id: 1,
		image: Mastercard,
		name: 'WAAFI PAYMENT',
        key:"waafiP",
        desc:"Find that pe",
        content:<WaafiPayment/>,
		designation: 'Description',
	},
    {
		id: 1,
		image: VisaCard,
		name: 'VISA CARD',
        key:"visaCard",
        desc:"Find that perfect color",
        content:<DahabPayment/>,
		designation: 'Description',
	},
    {
		id: 1,
		image: PaypalExpress,
		name: 'PAYPAL EXPRESS',
        key:"paypal",
        desc:"Find that perfect color",
        content:<StripeOrPaypal/>,
		designation: 'Description',
	}
]