"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  Check,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Toaster, toast as sonnerToast } from "sonner";
import { isGeneratorFunction } from "node:util/types";

const Booking = () => {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedPackage, setSelectedPackage] = useState<
    "standard" | "premium"
  >("standard");
  const [nights, setNights] = useState(0);
  const [validationError, setValidationError] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRef, setGeneratedRef] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [bookingSaved, setBookingSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

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

  // Set minimum stay requirements for each package
  const minStayRequirements = {
    standard: 7,
    premium: 60,
  };

  // Add this function to check if all required fields are filled
  const isFormValid = () => {
    return (
      checkIn !== "" &&
      checkOut !== "" &&
      adults !== "" &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== ""
    );
  };

  // Handle check-in date change
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    setAvailabilityChecked(false);
    setIsAvailable(false);

    // Only auto-set checkout on initial selection or when checkout not set
    if (!checkOut || isInitialLoad) {
      const startDate = new Date(newCheckIn);
      const minStay = minStayRequirements[selectedPackage];

      const autoCheckout = new Date(startDate);
      autoCheckout.setDate(startDate.getDate() + minStay);
      const formattedCheckout = autoCheckout.toISOString().split("T")[0];

      setCheckOut(formattedCheckout);
      setIsInitialLoad(false);

      // Calculate nights immediately for the UI to update correctly
      const calculatedNights = minStay; // Since we're setting exactly the minimum stay
      setNights(calculatedNights);
      setValidationError(""); // Clear any validation errors

      // No need to call validateDates here as we're manually setting everything correctly
      return;
    }

    // Re-validate with existing checkout if it exists
    validateDates(newCheckIn, checkOut);
  };

  // Handle checkout date change with validation
  const handleCheckoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckout = e.target.value;
    setCheckOut(newCheckout);
    setAvailabilityChecked(false);
    setIsAvailable(false);
    validateDates(checkIn, newCheckout);
  };

  // Validate date selection
  const validateDates = (checkInDate: string, checkOutDate: string) => {
    if (!checkInDate || !checkOutDate) return;

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const calculatedNights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    setNights(calculatedNights);

    // Check if selected dates meet minimum requirements
    if (calculatedNights < minStayRequirements[selectedPackage]) {
      setValidationError(
        `${
          selectedPackage === "standard"
            ? "Standard Stay"
            : "Premium Experience"
        } requires a minimum of ${minStayRequirements[selectedPackage]} nights.`
      );

      // If premium is selected but doesn't meet requirements, switch to standard
      if (
        selectedPackage === "premium" &&
        calculatedNights < minStayRequirements.premium
      ) {
        setSelectedPackage("standard");

        // Check if the nights satisfy standard requirements
        if (calculatedNights >= minStayRequirements.standard) {
          setValidationError("");
        } else {
          setValidationError(
            `Standard Stay requires a minimum of ${minStayRequirements.standard} nights.`
          );
        }
      }
    } else {
      setValidationError("");
    }
  };

  // Handle package selection with validation
  const handlePackageSelect = (packageId: "standard" | "premium") => {
    // Don't allow selecting premium if nights < 60
    if (packageId === "premium" && nights < minStayRequirements.premium) {
      return;
    }

    setSelectedPackage(packageId);

    // Revalidate with the new package type
    if (checkIn && checkOut) {
      const currentNights = Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      // Only adjust checkout if nights don't meet minimum
      if (currentNights < minStayRequirements[packageId]) {
        const startDate = new Date(checkIn);
        const autoCheckout = new Date(startDate);
        autoCheckout.setDate(
          startDate.getDate() + minStayRequirements[packageId]
        );
        setCheckOut(autoCheckout.toISOString().split("T")[0]);
        setNights(minStayRequirements[packageId]);
        setValidationError("");
      }
    }
  };

  // Calculate total cost
  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);
    return nights * (selectedPkg?.price || 0);
  };

  const packages = [
    {
      id: "standard" as const,
      name: "Standard Stay",
      price: 30,
      duration: "per night",
      features: [
        "Minimum 7 nights stay",
        "Full villa access",
        "Free WiFi (Limited)",
        "Garden access",
        "Basic amenities",
      ],
      popular: false,
    },
    {
      id: "premium" as const,
      name: "Premium Experience",
      price: 27,
      duration: "per night",
      features: [
        "Minimum 60 nights stay",
        "Discount for long stays",
        "Everything in Standard",
        "Weekly housekeeping",
        "Airport transfer",
      ],
      popular: true,
    },
  ];

  // Modify the goToDownloadPage function in Booking.tsx
  const goToDownloadPage = (bookingDetails: any) => {
    try {
      // Generate a unique ID for this booking session
      const sessionId = `booking_${Math.random()
        .toString(36)
        .substring(2, 10)}`;

      // Store full booking details in localStorage with this ID
      localStorage.setItem(
        `villa_booking_${sessionId}`,
        JSON.stringify(bookingDetails)
      );

      // Navigate with just the session ID - no sensitive data in URL
      router.push(
        `/booking-confirmation?session=${encodeURIComponent(sessionId)}`
      );
    } catch (error) {
      console.error("Error navigating to booking page:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleBooking = async () => {
    setIsGenerating(true);
    try {
      // Update the bookingDetails to use the actual form values
      const bookingDetails = {
        bookingRef: generatedRef,
        status: "REQUESTED",
        name: name,
        email: email,
        phone: phone,
        adults: adults,
        children: children,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        currency: "USD",
        packageName:
          packages.find((pkg) => pkg.id === selectedPackage)?.name || "",
        packagePrice:
          packages.find((pkg) => pkg.id === selectedPackage)?.price || 0,
        totalAmount: calculateTotal(),
      };

      const isSaved = await saveToGoogleSheet(bookingDetails);
      if (isSaved) {
        goToDownloadPage(bookingDetails);
      }

      setStatus("Booking confirmed! PDF generated successfully.");
      setShowConfirmation(false); // Close confirmation dialog after booking
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const confirmBooking = () => {
    if (calculateTotal() > 0) {
      // Generate booking reference with format: VS-YYYYMMDDHHMMSS
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(now.getMinutes()).padStart(2, '0');
      const second = String(now.getSeconds()).padStart(2, '0');
      const bookingRef: string = `VS-${year}${month}${day}${hour}${minute}${second}`;
      console.log("Generated Booking Reference:", bookingRef);
      setGeneratedRef(bookingRef.trim());

      // setShowConfirmation(true);
    } else {
      setStatus("Please select valid dates to book.");
    }
  };

  const saveToGoogleSheet = async (bookingDetails: any) => {
    try {
      // Show saving indicator
      setIsSaving(true);

      const submissionData = {
        BOOKING_REFERENCE: bookingDetails.bookingRef,
        STATUS: bookingDetails.status,
        NAME: bookingDetails.name,
        EMAIL: bookingDetails.email,
        PHONE: bookingDetails.phone,
        ADULTS: bookingDetails.adults,
        CHILDREN: bookingDetails.children,
        CHECK_IN: bookingDetails.checkIn,
        CHECK_OUT: bookingDetails.checkOut,
        PACKAGE: bookingDetails.packageName,
        RATE: bookingDetails.packagePrice,
        NIGHTS: bookingDetails.nights,
        DEPOSIT: 0,
        CURRENCY: bookingDetails.currency,
        TOTAL: bookingDetails.totalAmount,
        TIME: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      };

      const scriptURL = process.env.GOOGLE_SHEETS_SCRIPT_URL || "your-google-apps-script-web-app-url-here";

      const response = await fetch(scriptURL, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(submissionData),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setBookingSaved(true);
        console.log("Response", response);

        // Use toast instead of alert for better UX
        // toast({
        //   title: "Success!",
        //   description: "Your booking details have been saved.",
        //   status: "success",
        // });
        return true;
      }
    } catch (error) {
      setBookingSaved(false);
      console.error("Error saving booking to Google Sheets:", error);

      // Show error message
      toast({
        title: "Error saving booking details!",
        description: "Please try again or contact support.",
        status: "error",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates first.",
        status: "error",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const scriptURL = process.env.GOOGLE_AVAILABILITY_SCRIPT_URL || "https://script.google.com/macros/s/AKfycby9pyOgKa52TZ5C5kEWN9KrifIyTP0wmqMcwjk5HoVBIauGqdbnpGdJVf-oQVuMX5rZAg/exec";

      // Add query parameters for date filtering
      const url = `${scriptURL}?checkIn=${encodeURIComponent(
        checkIn
      )}&checkOut=${encodeURIComponent(checkOut)}`;

      console.log("Checking availability for:", { checkIn, checkOut, url });

      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        mode: "cors",
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text();
      console.log("Response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid response format from server. Make sure you've added the doGet function to your Google Apps Script.");
      }

      console.log("Parsed data:", data);

      if (data.success === false) {
        // Server returned an error
        toast({
          title: "Error",
          description: data.error || data.message || "Failed to check availability",
          status: "error",
        });
        return;
      }

      if (data.success && data.hasOwnProperty('available')) {
        setAvailabilityChecked(true);
        setIsAvailable(data.available);
        
        if (data.available) {
          toast({
            title: "✅ Dates Available!",
            description: data.message || `Villa Shaa is available from ${new Date(
              checkIn
            ).toLocaleDateString()} to ${new Date(
              checkOut
            ).toLocaleDateString()}`,
            status: "success",
          });
        } else {
          toast({
            title: "⚠️ Dates Not Available",
            description: data.message || `There ${
              data.conflictingBookings === 1 ? "is" : "are"
            } ${data.conflictingBookings || 0} booking${
              (data.conflictingBookings || 0) > 1 ? "s" : ""
            } conflicting with your selected dates.`,
            status: "error",
          });
        }
      } else {
        // Response format is unexpected
        throw new Error("Unexpected response format. Please ensure doGet function is properly configured in Google Apps Script.");
      }
    } catch (error: any) {
      console.error("Error checking availability:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      let errorMessage = "Unable to check availability. ";
      
      if (error.message.includes("doGet")) {
        errorMessage = "Please add the doGet function to your Google Apps Script first. Check the README.md for instructions.";
      } else if (error.message.includes("CORS") || error.message.includes("fetch")) {
        errorMessage = "Connection error. Make sure your Google Apps Script is deployed as a web app accessible to 'Anyone'.";
      } else if (error.message.includes("JSON")) {
        errorMessage = "Invalid response from server. Please verify your Google Apps Script setup.";
      } else {
        errorMessage += error.message || "Please try again or contact us directly.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <section id="booking" className="py-20 bg-white">
      {/* Section heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Book Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Dream Stay
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated packages and secure your dates at
            Villa Shaa
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8">
          {/* Package Selection - Top Row */}
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-8 mb-10">
              {packages.map((pkg, index) => {
                const isPremiumDisabled =
                  pkg.id === "premium" && nights < minStayRequirements.premium;

                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative">
                    <Card
                      className={`transition-all duration-300 h-full px-4 ${
                        selectedPackage === pkg.id
                          ? "ring-2 ring-blue-500 shadow-xl"
                          : "hover:shadow-lg"
                      } ${pkg.popular ? "border-green-500" : ""} ${
                        isPremiumDisabled
                          ? "opacity-60 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={() =>
                        !isPremiumDisabled && handlePackageSelect(pkg.id)
                      }>
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </div>
                      )}
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl font-bold">
                          {pkg.name}
                        </CardTitle>
                        <div className="text-3xl font-bold text-blue-600">
                          ${pkg.price}
                          <span className="text-sm text-gray-500 font-normal">
                            /{pkg.duration}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {pkg.id === "standard" && (
                          <div
                            className={`mb-3 flex items-center ${
                              nights >= minStayRequirements.standard &&
                              nights > 0
                                ? "text-blue-600 bg-blue-50"
                                : "text-amber-600 bg-amber-50"
                            } p-2 rounded-md text-sm`}>
                            {nights >= minStayRequirements.standard &&
                            nights > 0 ? (
                              <Check className="w-4 h-4 mr-2" />
                            ) : (
                              <AlertCircle className="w-4 h-4 mr-2" />
                            )}
                            {nights >= minStayRequirements.standard &&
                            nights > 0
                              ? `${nights} nights selected`
                              : "Minimum stay of 7 nights required"}
                          </div>
                        )}
                        {pkg.id === "premium" && (
                          <div
                            className={`mb-3 flex items-center ${
                              nights >= minStayRequirements.premium &&
                              nights > 0
                                ? "text-blue-600 bg-blue-50"
                                : "text-amber-600 bg-amber-50"
                            } p-2 rounded-md text-sm`}>
                            {nights >= minStayRequirements.premium &&
                            nights > 0 ? (
                              <Check className="w-4 h-4 mr-2" />
                            ) : (
                              <AlertCircle className="w-4 h-4 mr-2" />
                            )}
                            {nights >= minStayRequirements.premium && nights > 0
                              ? `${nights} nights selected`
                              : "Available for stays of 60+ nights only"}
                          </div>
                        )}
                        <ul className="space-y-3">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Booking Form and Booking Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Select Your Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {validationError && (
                    <div className="bg-amber-50 text-amber-600 p-3 rounded-md flex items-start">
                      <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="checkin">
                        Check-in Date
                        <span className="text-sm text-amber-600 ml-1 mb-2">
                          *
                        </span>
                      </Label>
                      <Input
                        id="checkin"
                        type="date"
                        value={checkIn}
                        onChange={handleCheckInChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkout">
                        Check-out Date
                        <span className="text-sm text-amber-600 ml-1 mb-2">
                          *
                        </span>
                      </Label>
                      <Input
                        id="checkout"
                        type="date"
                        value={checkOut}
                        onChange={handleCheckoutChange}
                        min={
                          checkIn
                            ? new Date(
                                new Date(checkIn).getTime() +
                                  minStayRequirements[selectedPackage] *
                                    24 *
                                    60 *
                                    60 *
                                    1000
                              )
                                .toISOString()
                                .split("T")[0]
                            : new Date().toISOString().split("T")[0]
                        }
                        className="flex-1"
                      />                 
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedPackage === "standard"
                          ? "Minimum 7 nights stay required"
                          : "Minimum 60 nights stay required"}
                      </p>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        className={`whitespace-nowrap mt-6 w-full ${
                          availabilityChecked && !isAvailable
                            ? 'border-red-500 text-red-600 hover:bg-red-50'
                            : availabilityChecked && isAvailable
                            ? 'border-green-500 text-green-600 hover:bg-green-50'
                            : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                        }`}
                        disabled={!checkIn || !checkOut || isLoading}
                        onClick={checkAvailability}>
                        {isLoading ? (
                          <span className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            Checking...
                          </span>
                        ) : availabilityChecked ? (
                          isAvailable ? (
                            <span className="flex items-center">
                              <Check className="w-4 h-4 mr-1 text-green-500" />
                              Available
                            </span>
                          ) : (
                            <span className="flex items-center text-red-500">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              Not Available
                            </span>
                          )
                        ) : (
                          "Check Availability"
                        )}
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        {!availabilityChecked
                          ? "Please check availability before booking."
                          : isAvailable
                          ? "Great! Your selected dates are available."
                          : "Selected dates are not available. Please choose different dates. or contact us directly."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guests">
                      Number of Adults
                      <span className="text-sm text-amber-600 ml-1 mb-2">
                        *
                      </span>
                    </Label>
                    <Select value={adults} onValueChange={setAdults}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map(
                          (num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} Adult{num > 1 ? "s" : ""}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="children">
                      Number of Children
                      <span className="text-sm text-gray-500 ml-1">
                        (Ages 0-12)
                      </span>
                    </Label>
                    <Select value={children} onValueChange={setChildren}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => i).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Child" : "Children"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        Full Name
                        <span className="text-sm text-amber-600 ml-1 mb-2">
                          *
                        </span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">
                        Phone Number
                        <span className="text-sm text-amber-600 ml-1 mb-2">
                          *
                        </span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email Address
                      <span className="text-sm text-amber-600 ml-1 mb-2">
                        *
                      </span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package:</span>
                      <span className="font-semibold">
                        {
                          packages.find((pkg) => pkg.id === selectedPackage)
                            ?.name
                        }
                      </span>
                    </div>

                    {/* Add Check-in Date */}
                    {checkIn && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-semibold">
                          {new Date(checkIn).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    {/* Add Check-out Date */}
                    {checkOut && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-semibold">
                          {new Date(checkOut).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate per night:</span>
                      <span className="font-semibold">
                        $
                        {
                          packages.find((pkg) => pkg.id === selectedPackage)
                            ?.price
                        }
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-semibold">
                        {Math.ceil(
                          (new Date(checkOut).getTime() -
                            new Date(checkIn).getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) || 0}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="font-semibold">
                        {adults} Adults, {children} Children
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        ${calculateTotal()}
                      </span>
                    </div>
                    {calculateTotal() > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Includes all taxes and fees
                      </p>
                    )}
                  </div>

                  {!isFormValid() && (
                    <p className="text-xs text-amber-600 text-center mt-1">
                      Please fill out all required fields
                    </p>
                  )}

                  {/* Loading and Success States */}
                  {isGenerating ? (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4 flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700">Generating PDF...</span>
                    </div>
                  ) : generatedRef ? (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4 flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <h4 className="font-bold text-green-800">
                          Reference ID Generated Successfully!
                        </h4>
                        <p className="text-green-700">
                          Booking Reference: <br />
                          {generatedRef}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg py-3"
                    disabled={!isFormValid() || !availabilityChecked || !isAvailable}
                    onClick={() =>
                      generatedRef ? handleBooking() : setShowConfirmation(true)
                    }>
                    {!isFormValid()
                      ? "Complete All Fields"
                      : !availabilityChecked
                      ? "Check Availability First"
                      : !isAvailable
                      ? "Dates Not Available"
                      : generatedRef
                      ? `Click to Download`
                      : `Book Now - $${calculateTotal()}`}
                  </Button>

                  <div className="text-center space-y-2 pt-4 border-t">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      Free cancellation up to 48 hours
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Check className="w-4 h-4 mr-1 text-green-500" />
                      Instant confirmation
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[80vh] overflow-y-auto rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Please review the booking details before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 xs:grid-cols-2 gap-2 text-sm">
                {/* Key-value pairs with better mobile spacing */}
                {/* <div className="font-medium">Reference:</div>
                <div className="break-all">{generatedRef}</div> */}

                <div className="font-medium">Name:</div>
                <div className="break-words">{name}</div>

                <div className="font-medium">Email:</div>
                <div className="break-all">{email}</div>

                <div className="font-medium">Phone:</div>
                <div className="break-all">{phone}</div>

                <div className="font-medium">Package:</div>
                <div>
                  {packages.find((pkg) => pkg.id === selectedPackage)?.name}
                </div>

                <div className="font-medium">Check-in:</div>
                <div>{new Date(checkIn).toLocaleDateString()}</div>

                <div className="font-medium">Check-out:</div>
                <div>{new Date(checkOut).toLocaleDateString()}</div>

                <div className="font-medium">Nights:</div>
                <div>{nights}</div>

                <div className="font-medium">Guests:</div>
                <div>
                  {adults} Adults, {children} Children
                </div>
              </div>
            </div>
          </div>

          {/* Loading and Success States */}
          {isGenerating ? (
            <div className="mt-2 bg-blue-50 border border-blue-200 rounded-md p-4 flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Generating PDF...</span>
            </div>
          ) : generatedRef ? (
            <div className="mt-0 bg-green-50 border border-green-200 rounded-md p-4 flex items-center space-x-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <h4 className="font-bold text-green-800">
                  Reference ID Generated Successfully!
                </h4>
                <p className="text-green-700">
                  Booking Reference: <br />
                  {generatedRef}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-3 rounded-md">
              <div className="flex items-start mb-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-medium text-amber-800">Important</span>
              </div>
              <p className="text-sm text-amber-700">
                By confirming this booking, you agree to our terms and
                conditions. Free cancellation is available up to 7 days before
                check-in.
              </p>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <Button
              variant="outline"
              disabled={isGenerating}
              onClick={() => setShowConfirmation(false)}
              className="w-full sm:w-auto">
              Cancel
            </Button>

            {/* <Button
              onClick={() => {
                setShowConfirmation(false);
                confirmBooking();
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Confirm Booking - ${calculateTotal()}
            </Button> */}

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg py-3"
              disabled={!isFormValid() || isGenerating}
              onClick={() => {
                confirmBooking();
                generatedRef ? handleBooking() : setShowConfirmation(true);
              }}>
              {!isFormValid()
                ? "Complete All Fields"
                : generatedRef
                ? `Click to Download`
                : `Confirm Booking - $${calculateTotal()}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" richColors closeButton />
    </section>
  );
};

export default Booking;
