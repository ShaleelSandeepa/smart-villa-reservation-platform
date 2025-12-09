import { SYS_CONFIG } from './utils';

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: { text: string; value: string }[];
}



/**
 * Validates and handles special button clicks (Yes/No, Book Now/Later)
 * Returns true if the button should trigger an API call, false if handled locally
 */
export const validateButtonValue = (
  value: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  isSettingCheckInDateRef: React.MutableRefObject<boolean>,
  isSettingCheckOutDateRef: React.MutableRefObject<boolean>
): boolean => {
  // Handle "No" button - user doesn't want to book
  if (value === SYS_CONFIG.NEW_BOOKING_NO) {
    console.log("NO button detected, adding message");
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "No problem! If you have any other questions or need assistance, feel free to ask.",
        isBot: true,
        timestamp: new Date(),
      };
      console.log("Adding NO response message:", botMessage);
      setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API
  }

  // Handle "Yes" button - user wants to book
  if (value === SYS_CONFIG.NEW_BOOKING_YES) {
    console.log("YES button detected, adding message");
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Great! I'll help you with your reservation.",
        buttons: [
          { text: "Book Now", value: SYS_CONFIG.BOOK_NOW },
          { text: "Book Later", value: SYS_CONFIG.BOOK_LATER },
        ],
        isBot: true,
        timestamp: new Date(),
      };
      console.log("Adding YES response message:", botMessage);
      setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API
  }

  // Handle "Book Now" button
  if (value === SYS_CONFIG.BOOK_NOW) {
    console.log("BOOK NOW button detected, adding message");
    isSettingCheckInDateRef.current = true;
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Fantastic! Please provide your check-in date to proceed with the booking.",
        isBot: true,
        timestamp: new Date(),
      };
      console.log("Adding BOOK NOW response message:", botMessage);
      setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API
  }

  // Handle "Book Later" button
  if (value === SYS_CONFIG.BOOK_LATER) {
    console.log("BOOK LATER button detected, adding message");
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "No problem! Please visit our booking page by clicking on the 'Booking' section in the menu, or you can call us directly at +94 77 794 3393. We look forward to hosting you at Villa Shaa!",
        isBot: true,
        timestamp: new Date(),
      };
      console.log("Adding BOOK LATER response message:", botMessage);
      setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API

  } else if (value === SYS_CONFIG.CONFIRM_CHECKIN_DATE) {
    console.log("CONFIRM CHECK-IN DATE button detected, adding message");
    isSettingCheckInDateRef.current = false;
    isSettingCheckOutDateRef.current = true;
    setTimeout(() => {
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Great! Now provide your check-out date to complete the booking.",
            isBot: true,
            timestamp: new Date(),
        };
        console.log("Adding CONFIRM CHECK-IN DATE response message:", botMessage);
        setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API

  } else if (value === SYS_CONFIG.CHANGE_CHECKIN_DATE) {
    console.log("CHANGE CHECK-IN DATE button detected, adding message");
    isSettingCheckInDateRef.current = true;
    isSettingCheckOutDateRef.current = false;
    setTimeout(() => {
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Please provide the new check-in date.",
            isBot: true,
            timestamp: new Date(),
        };
        console.log("Adding CHANGE CHECK-IN DATE response message:", botMessage);
        setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API
  } else if (value === SYS_CONFIG.CONFIRM_CHECKOUT_DATE) {
    console.log("CONFIRM CHECK-OUT DATE button detected, adding message");
    isSettingCheckOutDateRef.current = false;
    setTimeout(() => {
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Great! Now I need to check the availability for your selected dates.",
            buttons: [
                { text: "Proceed", value: SYS_CONFIG.PROCEED_CHECK_AVAILABILITY },
            ],
            isBot: true,
            timestamp: new Date(),
        };
        console.log("Adding CONFIRM CHECK-OUT DATE response message:", botMessage);
        setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API
  } else if (value === SYS_CONFIG.CHANGE_CHECKOUT_DATE) {
    console.log("CHANGE CHECK-OUT DATE button detected, adding message");
    isSettingCheckOutDateRef.current = true;
    setTimeout(() => {
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Please provide the new check-out date.",
            isBot: true,
            timestamp: new Date(),
        };
        console.log("Adding CHANGE CHECK-OUT DATE response message:", botMessage);
        setMessages((prev) => [...prev, botMessage]);
    }, 300);
    return false; // false = handled locally, don't call API
  }

  // For all other buttons, allow the API call to proceed
  console.log("Button not matched, calling API");
  return true; // true = not handled locally, call API
};
