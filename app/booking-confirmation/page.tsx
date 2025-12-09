"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { MapPin, Calendar, Users, Home, CreditCard, FileText, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { generatePDF } from "@/utils/bookingPdfGenerator";
import { Toaster, toast as sonnerToast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// Internal components (not exported)
function BookingDetails() {
  const searchParams = useSearchParams();
  const [showAlert, setShowAlert] = useState(true);

  // Add these state variables in the BookingDetails function
  const [bookingDetails, setBookingDetails] = useState({
    reference: "VS-2025-06789", // Default fallback
    status: "Confirmed",
    guest: {
      name: "Guest",
      email: "email@example.com",
      phone: "Phone number",
      adults: 2,
      children: 0,
    },
    dates: {
      checkIn: "Check-in date",
      checkOut: "Check-out date",
      checkInTime: "2:00 PM",
      checkOutTime: "11:00 AM",
      nights: 0,
    },
    accommodation: {
      name: "Villa Shaa",
      adults: 2,
      bedrooms: 2,
      bathrooms: 2,
    },
    payment: {
      total: 0,
      rate: 0,
      currency: "USD",
      deposit: 0,
      depositPaid: true,
      balance: 0,
      dueDate: "Check-in date",
    },
    specialRequests: "",
  });

  // Helper function for toast notifications
  const toast = ({
    title,
    description,
    status,
  }: {
    title: string;
    description: string;
    status: string;
  }) => {
    switch (status) {
      case "success":
        sonnerToast.success(title, {
          description: description,
        });
        break;
      case "error":
        sonnerToast.error(title, {
          description: description,
        });
        break;
      default:
        sonnerToast(title, {
          description: description,
        });
    }
  };

  // Update the useEffect in BookingDetails component in booking-confirmation/page.tsx
  useEffect(() => {
    try {
      // Get the session ID from URL
      const sessionParam = searchParams.get("session");
      const sessionId = sessionParam ? decodeURIComponent(sessionParam) : null;

      if (sessionId) {
        // Retrieve booking data from localStorage using the session ID
        const storedData = localStorage.getItem(`villa_booking_${sessionId}`);

        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Set the booking details as before
          setBookingDetails({
            reference: parsedData.bookingRef,
            status: parsedData.status || "REQUESTED",
            guest: {
              name: parsedData.name,
              email: parsedData.email,
              phone: parsedData.phone,
              adults: parseInt(parsedData.adults),
              children: parseInt(parsedData.children),
            },
            dates: {
              checkIn: new Date(parsedData.checkIn).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ),
              checkOut: new Date(parsedData.checkOut).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ),
              checkInTime: "2:00 PM",
              checkOutTime: "11:00 AM",
              nights: parsedData.nights,
            },
            accommodation: {
              name: parsedData.packageName,
              adults: parseInt(parsedData.adults),
              bedrooms: 3,
              bathrooms: 2,
            },
            payment: {
              total: parsedData.totalAmount,
              rate: parsedData.packagePrice,
              currency: parsedData.currency || "USD",
              deposit: 0,
              depositPaid: true,
              balance: parsedData.totalAmount - 0,
              dueDate: new Date(parsedData.checkIn).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ),
            },
            specialRequests: "",
          });

          // Clean up localStorage to prevent data leakage
          // Optional: You might want to keep this for some time in case user refreshes
          // Alternatively, set a timeout to clear after some minutes
          setTimeout(() => {
            localStorage.removeItem(`villa_booking_${sessionId}`);
          }, 30 * 60 * 1000); // Clean after 30 minutes
        }
      }
    } catch (error) {
      console.error("Error retrieving booking details:", error);
    }
  }, [searchParams]);

  const pdfRef = useRef(null);

  const downloadPdf = async () => {
    try {
      // Update the bookingDetails to use the actual form values
      const generatedBookingRef = await generatePDF(bookingDetails);
      console.log("PDF downloaded with reference:", generatedBookingRef);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("Error downloading PDF. Please try again.");
    }
  };

  return (
    <main ref={pdfRef} className="relative bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 pt-10 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">VS</span>
                </div>
                <div className="text-white">
                  <h1 className="font-bold text-2xl">Villa Shaa</h1>
                  <div className="flex items-center text-sm text-white/90">
                    <MapPin className="w-4 h-4 mr-1" />
                    Hikkaduwa, Sri Lanka
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-white">
                Booking Confirmation
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              viewport={{ once: true }}
              className="flex flex-col space-y-3 mt-6 md:mt-0">
              <button
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center hover:text-blue-500 transition-colors hover:scale-105"
                onClick={() => {
                  downloadPdf();
                }}>
                <FileText className="w-5 h-5 mr-2" />
                Download Reservation PDF
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Booking Reference</p>
              <p className="text-xl font-bold">{bookingDetails.reference}</p>
            </div>
            <div className="bg-green-50 text-green-700 font-medium px-4 py-1 rounded-full text-sm">
              {bookingDetails.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Guest Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{bookingDetails.guest.name}</p>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <Mail className="w-3.5 h-3.5 mr-1" />
                        {bookingDetails.guest.email}
                      </p>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <Phone className="w-3.5 h-3.5 mr-1" />
                        {bookingDetails.guest.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Accommodation Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Home className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        {bookingDetails.accommodation.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {bookingDetails.accommodation.bedrooms} Bedrooms •{" "}
                        {bookingDetails.accommodation.bathrooms} Bathrooms
                      </p>
                      <p className="text-gray-500 text-sm">
                        {bookingDetails.guest.adults} Adults •{" "}
                        {bookingDetails.guest.children} Children
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {bookingDetails.specialRequests && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Special Requests
                  </h2>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      {bookingDetails.specialRequests}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Stay Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Check-in</p>
                        <p className="font-medium">
                          {bookingDetails.dates.checkIn}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        From {bookingDetails.dates.checkInTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Check-out</p>
                        <p className="font-medium">
                          {bookingDetails.dates.checkOut}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        Before {bookingDetails.dates.checkOutTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">
                      {bookingDetails.dates.nights} nights
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Payment Details
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Total Amount</p>
                      <p className="font-medium">
                        {bookingDetails.payment.currency}{" "}
                        {bookingDetails.payment.total}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Deposit Paid</p>
                      <p className="font-medium">
                        {bookingDetails.payment.currency}{" "}
                        {bookingDetails.payment.deposit}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <p className="text-gray-600">Balance Due</p>
                      <p className="font-medium">
                        {bookingDetails.payment.currency}{" "}
                        {bookingDetails.payment.balance}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-500">Due on arrival</p>
                      <p className="text-gray-500">
                        {bookingDetails.payment.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                Cancellation Policy
              </h3>
              <p className="text-gray-600 text-sm">
                Free cancellation up to 7 days before check-in. Cancellations
                made within 7 days of check-in will forfeit the deposit amount.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Property Rules</h3>
              <p className="text-gray-600 text-sm">
                No smoking inside the villa. Quiet hours between 10:00 PM and
                8:00 AM. Please respect neighbors and property.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-600 text-sm">
                For any queries, please contact Mr. Leel Indika at +94 777943393
                or email at info@villashaa.com
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Getting There</h3>
              <p className="text-gray-600 text-sm">
                Villa Shaa is located in Hikkaduwa, approximately 2 hours drive
                from Colombo Airport. Detailed directions will be sent prior to
                arrival.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        viewport={{ once: true }}
        className="md:fixed relative bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-6 mt-8 md:mt-0 print:static">
        {" "}
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex items-center space-x-2 mb-3 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs">VS</span>
              </div>
              <span>Villa Shaa • Hikkaduwa, Sri Lanka</span>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-8 items-center">
              <div className="flex items-center space-x-1 mb-2 md:mb-0">
                <Phone className="w-3 h-3" />
                <span>+94 777943393</span>
              </div>
              <div className="flex items-center space-x-1 mb-2 md:mb-0">
                <Mail className="w-3 h-3" />
                <span>info@villashaa.com</span>
              </div>
              <div>Reference: {bookingDetails.reference}</div>
            </div>

            <div className="text-xs mt-3 md:mt-0">
              Generated on {new Date().toLocaleDateString()} • Page 1 of 1
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
            This document serves as official confirmation of your booking. For
            inquiries, contact us directly.
          </div>
        </div>
      </motion.div>
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 animate-fade-in">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">
              Booking Confirmation
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Welcome to your booking confirmation! If you have any issues
              downloading the PDF, please take a screenshot of this page for
              your records.
            </p>
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-3 rounded-lg transition-colors"
              onClick={() => {
                setShowAlert(false);
                toast({
                  title: "Success!",
                  description: "Your booking details have been saved.",
                  status: "success",
                });
              }}>
              OK, I Understand
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" richColors closeButton />
    </main>
  );
}

function BookingDetailsLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-4 rounded-md flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700">Loading booking details...</p>
      </div>
    </div>
  );
}

function DetailedConfirmation() {
  return (
    <Suspense fallback={<BookingDetailsLoading />}>
      <BookingDetails />
    </Suspense>
  );
}

function SimpleConfirmation() {
  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Booking Confirmed!
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for choosing Villa Shaa for your stay. We've sent a
        confirmation email with all the details of your reservation.
      </p>

      <div className="p-4 bg-blue-50 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          Our host will contact you shortly to finalize your reservation
          details.
        </p>
      </div>

      <div className="space-y-4">
        <Link href="/" passHref>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
            Return to Homepage
          </Button>
        </Link>

        <Link href="/#contact" passHref>
          <Button
            variant="outline"
            className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Move all useSearchParams logic to a client component wrapper
function BookingStateInitializer({ setShowDetailed }: { setShowDetailed: (show: boolean) => void }) {
  // This component handles the useSearchParams logic and passes the result up
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if there's session data to determine which view to show
    const sessionParam = searchParams.get("session");
    if (sessionParam) {
      const sessionId = decodeURIComponent(sessionParam);
      const hasStoredData = localStorage.getItem(`villa_booking_${sessionId}`);
      setShowDetailed(!!hasStoredData);
    }
  }, [searchParams, setShowDetailed]);

  // No visible output, just side effects
  return null;
}

// The ONLY exported component
export default function BookingConfirmationPage() {
  const [showDetailed, setShowDetailed] = useState(false);
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      {/* Wrap the search params handling in Suspense */}
      <Suspense fallback={null}>
        <BookingStateInitializer setShowDetailed={setShowDetailed} />
      </Suspense>
      
      {/* Render the appropriate confirmation view */}
      {showDetailed ? (
        <DetailedConfirmation />
      ) : (
        <SimpleConfirmation />
      )}
    </main>
  );
}
