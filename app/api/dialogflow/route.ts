import { NextRequest, NextResponse } from "next/server";
import { SessionsClient } from "@google-cloud/dialogflow";
import { SYS_CONFIG } from "@/lib/utils";

// Initialize the Dialogflow client
const sessionClient = new SessionsClient({
  projectId: "shaaya-chatbot-villashaa-wxiw",
  keyFilename: "./config/shaaya-chatbot-villashaa-wxiw-4b518e31d34a.json",
});

const projectId = "shaaya-chatbot-villashaa-wxiw";

interface ChatRequest {
  message: string;
  sessionId: string;
  isSettingCheckInDate?: boolean;
  isSettingCheckOutDate?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, isSettingCheckInDate, isSettingCheckOutDate }: ChatRequest = await req.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    // Create the session path
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    // The text query request
    const dialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en-US",
        },
      },
    };

    // Send request to Dialogflow
    const [response] = await sessionClient.detectIntent(dialogflowRequest);

    const result = response.queryResult;

    console.log("DialogFlow Response:", {
      action: result?.action,
      intent: result?.intent?.displayName,
      fulfillmentText: result?.fulfillmentText,
    });

    const intentResponse = handleIntent(
      result?.action || "",
      result?.intent?.displayName || "",
      result?.parameters?.fields || {},
      result?.fulfillmentText || "",
      sessionId,
      isSettingCheckInDate || false,
      isSettingCheckOutDate || false
    );

    console.log("Intent Response:", intentResponse);

    // Handle both string and object responses
    const responseData =
      typeof intentResponse === "string"
        ? {
            fulfillmentText:
              intentResponse ||
              result?.fulfillmentText ||
              "Sorry, I didn't understand that.",
          }
        : {
            fulfillmentText:
              intentResponse.text || "Sorry, I didn't understand that.",
            buttons: intentResponse.buttons,
          };

    console.log("Response Data:", responseData);

    return NextResponse.json({
      ...responseData,
      intent: result?.intent?.displayName || "Default Fallback Intent",
      confidence: result?.intentDetectionConfidence || 0,
    });
  } catch (error) {
    console.error("Dialogflow API Error:", error);

    return NextResponse.json(
      {
        fulfillmentText:
          "I'm sorry, I'm experiencing technical difficulties. Please contact Villa Shaa directly at +94 77 794 3393 for immediate assistance.",
        intent: "Error",
        confidence: 0,
      },
      { status: 200 }
    ); // Return 200 so frontend doesn't show additional errors
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Villa Shaa Dialogflow API",
    timestamp: new Date().toISOString(),
  });
}

function handleIntent(
  action: string,
  displayName: string,
  parameters: Record<string, any>,
  fulfillmentText: string,
  sessionId: string,
  isSettingCheckInDate: boolean,
  isSettingCheckOutDate: boolean
): string | { text: string; buttons?: { text: string; value: string }[] } {
  // Custom handling for specific intents can be added here

  switch (action) {
    case "amenities.inquiry":
      switch (parameters["amenities"]?.stringValue) {
        case "pool":
          return "No, Villa Shaa does not have a private pool, but guests can enjoy nearby public pools and beaches.";
        case "wifi":
          return "Villa Shaa offers complimentary high-speed Wi-Fi throughout the property.";
        case "kitchen":
          return "Yes, Villa Shaa features a fully equipped kitchen for guest use.";
        case "air conditioning":
          return "Yes, Villa Shaa is equipped with air conditioning in all rooms for your comfort.";
        case "parking":
          return "Villa Shaa provides free private parking on-site for all guests.";
        case "garden":
          return "Yes, Villa Shaa boasts a beautiful garden area for guests to relax and enjoy.";
        case "bathroom":
          return "Villa Shaa offers modern bathrooms with complimentary toiletries and fresh towels.";
        case "security":
          return "Villa Shaa has 24/7 security surveillance and secure access to ensure guest safety.";
        default:
          return "Villa Shaa offers a variety of amenities including free Wi-Fi and complimentary breakfast.";
      }
    case "booking.create":
      return {
        text: "Do you want to make a reservation at Villa Shaa?",
        buttons: [
          { text: "Yes", value: SYS_CONFIG.NEW_BOOKING_YES },
          { text: "No", value: SYS_CONFIG.NEW_BOOKING_NO },
        ],
      };
    case "booking.create.new":
      // Extract date-time parameter (DialogFlow sends it as listValue)
      const dateTime = parameters["date-time"]?.listValue?.values?.[0]?.stringValue || 
                       parameters["date-time"]?.stringValue || 
                       null;
      
      console.log("Date-time parameter:", dateTime);
      console.log("Full parameters:", JSON.stringify(parameters, null, 2));
      
      if (dateTime) {
        // Format the date nicely
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        if (fulfillmentText && fulfillmentText.length > 0 && fulfillmentText.split(" | ")[0] === "Date") {
          console.log(`Checking date setting state - CheckIn: ${isSettingCheckInDate}, CheckOut: ${isSettingCheckOutDate}`);
          
          if(isSettingCheckInDate) {
            console.log("Setting check-in date:", formattedDate);
            return {
              text: `You have selected ${formattedDate} as your check-in date. Please confirm the check-in date.`,
              buttons: [
                { text: "Confirm", value: SYS_CONFIG.CONFIRM_CHECKIN_DATE },
                { text: "Change Date", value: SYS_CONFIG.CHANGE_CHECKIN_DATE },
              ],
            };
          } else if(isSettingCheckOutDate) {
            console.log("Setting check-out date:", formattedDate);
            return {
              text: `You have selected ${formattedDate} as your check-out date. Please confirm the check-out date.`,
              buttons: [
                { text: "Confirm", value: SYS_CONFIG.CONFIRM_CHECKOUT_DATE },
                { text: "Change Date", value: SYS_CONFIG.CHANGE_CHECKOUT_DATE },
              ],
            };
          }
        } else {
          return `You have selected ${formattedDate} as your booking date. ${fulfillmentText}`;
        }
      } else {
        return "Please confirm if you would like to make a reservation at Villa Shaa.";
      }

    default:
      return "";
  }
}
