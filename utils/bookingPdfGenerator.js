import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/**
 * Generates a professional and attractive booking PDF with enhanced styling
 * @param {Object} bookingDetails - The booking information
 * @returns {Promise<string>} - A promise that resolves with booking reference
 */
export const generatePDF = async (bookingDetails) => {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();

    // Load fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Enhanced color palette - more sophisticated and professional
    const primaryColor = rgb(0.13, 0.3, 0.45); // Deep navy blue
    const secondaryColor = rgb(0.85, 0.65, 0.35); // Elegant gold
    const accentColor = rgb(0.2, 0.6, 0.5); // Teal for highlights
    const darkGray = rgb(0.25, 0.25, 0.25);
    const mediumGray = rgb(0.5, 0.5, 0.5);
    const lightGray = rgb(0.95, 0.95, 0.95);
    const white = rgb(1, 1, 1);

    // Generate booking reference
    const bookingRef =
      bookingDetails.reference ||
      `VSHAA-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

    // Format dates with enhanced styling
    const formatDate = (dateStr) => {
      if (!dateStr) return "N/A";
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    // Utility function for creating rounded rectangles
    const drawRoundedRect = (
      x,
      y,
      width,
      height,
      color,
      borderColor = undefined,
      borderWidth = 0
    ) => {
      // Create options object first, so we can conditionally add properties
      const options = {
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
      };
      
      // Only add border properties if borderColor is provided
      if (borderColor !== undefined && borderColor !== null) {
        options.borderColor = borderColor;
        options.borderWidth = borderWidth;
      }
      
      // Draw rectangle with prepared options
      page.drawRectangle(options);
    };

    // ===== COMPACT HEADER SECTION =====
    // Reduced from 130px to 90px height
    page.drawRectangle({
      x: 0,
      y: height - 90,
      width: width,
      height: 90,
      color: primaryColor,
    });

    // Header accent stripe
    page.drawRectangle({
      x: 0,
      y: height - 95,
      width: width,
      height: 5,
      color: secondaryColor,
    });

    // Logo and title side by side for better space utilization
    page.drawText("VILLA SHAA", {
      x: 50,
      y: height - 35,
      size: 24, // Reduced from 32
      font: boldFont,
      color: white,
    });

    page.drawText("BOOKING CONFIRMATION", {
      x: 50,
      y: height - 60,
      size: 14, // Reduced from 18
      font: boldFont,
      color: white,
    });

    page.drawText("Your Exclusive Luxury Villa Experience", {
      x: 50,
      y: height - 75,
      size: 10, // Reduced from 14
      font: italicFont,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Move status and villa info to the right side
    page.drawText("LUXURY VILLA • HIKKADUWA", {
      x: width - 190,
      y: height - 35,
      size: 10,
      font: boldFont,
      color: white,
    });

    page.drawText(bookingDetails.status, {
      x: width - 190,
      y: height - 60,
      size: 12,
      font: boldFont,
      color: secondaryColor,
    });

    // ===== COMPACT BOOKING REFERENCE & DATE SECTION =====
    // Booking reference and date in a single line to save space
    drawRoundedRect(
      40,
      height - 125,
      width - 80,
      25, // Reduced from 40
      lightGray,
      null,
      0
    );

    page.drawText("REF:", {
      x: 50,
      y: height - 115,
      size: 9,
      font: boldFont,
      color: mediumGray,
    });

    page.drawText(bookingRef, {
      x: 80,
      y: height - 115,
      size: 12, // Reduced from 18
      font: boldFont,
      color: primaryColor,
    });

    page.drawText("ISSUED:", {
      x: 300,
      y: height - 115,
      size: 9,
      font: boldFont,
      color: mediumGray,
    });

    page.drawText(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      {
        x: 350,
        y: height - 115,
        size: 10, // Reduced from 14
        font: boldFont,
        color: darkGray,
      }
    );

    // ===== GUEST & RESERVATION SECTION (SIDE BY SIDE) =====
    // Combined these sections to save vertical space

    // Left side: Guest Info
    drawRoundedRect(40, height - 260, (width / 2) - 50, 125, white, lightGray, 1);
    
    // Guest Info header
    page.drawRectangle({
      x: 40,
      y: height - 160,
      width: (width / 2) - 50,
      height: 25,
      color: primaryColor,
    });
    
    page.drawText("GUEST INFORMATION", {
      x: 50,
      y: height - 152,
      size: 10,
      font: boldFont,
      color: white,
    });

    // Guest details
    let currentY = height - 180;
    
    // Name
    page.drawText("Guest Name:", {
      x: 50,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(bookingDetails.guest.name || "N/A", {
      x: 120,
      y: currentY,
      size: 9,
      font: boldFont,
      color: darkGray,
    });
    
    // Email
    currentY -= 18;
    page.drawText("Email:", {
      x: 50,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(bookingDetails.guest.email || "N/A", {
      x: 120,
      y: currentY,
      size: 9,
      font: font,
      color: darkGray,
    });
    
    // Phone
    currentY -= 18;
    page.drawText("Phone:", {
      x: 50,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(bookingDetails.guest.phone || "N/A", {
      x: 120,
      y: currentY,
      size: 9,
      font: font,
      color: darkGray,
    });
    
    // Guests
    currentY -= 18;
    page.drawText("Guests:", {
      x: 50,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(`${bookingDetails.guest.adults || 0} Adults, ${bookingDetails.guest.children || 0} Children`, {
      x: 120,
      y: currentY,
      size: 9,
      font: font,
      color: darkGray,
    });

    // Right side: Reservation Info
    drawRoundedRect(width/2 + 10, height - 260, (width / 2) - 50, 125, white, lightGray, 1);
    
    // Reservation header
    page.drawRectangle({
      x: width/2 + 10,
      y: height - 160,
      width: (width / 2) - 50,
      height: 25,
      color: primaryColor,
    });
    
    page.drawText("RESERVATION DETAILS", {
      x: width/2 + 20,
      y: height - 152,
      size: 10,
      font: boldFont,
      color: white,
    });

    // Reservation details
    currentY = height - 180;
    
    // Check-in
    page.drawText("Check-in:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(`${formatDate(bookingDetails.dates.checkIn)} (${bookingDetails.dates.checkInTime})`, {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: font,
      color: darkGray,
    });
    
    // Check-out
    currentY -= 18;
    page.drawText("Check-out:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(`${formatDate(bookingDetails.dates.checkOut)} (${bookingDetails.dates.checkOutTime})`, {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: font,
      color: darkGray,
    });
    
    // Duration
    currentY -= 18;
    page.drawText("Duration:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(`${bookingDetails.dates.nights || 0} Nights`, {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: boldFont,
      color: accentColor,
    });
    
    // Package
    currentY -= 18;
    page.drawText("Package:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(bookingDetails.accommodation.name || "Standard Package", {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: boldFont,
      color: darkGray,
    });

    // ===== PAYMENT SUMMARY SECTION =====
    
    // Payment header
    page.drawRectangle({
      x: 40,
      y: height - 275,
      width: width - 80,
      height: 25,
      color: primaryColor,
    });
    
    page.drawText("PAYMENT SUMMARY", {
      x: 50,
      y: height - 267,
      size: 10,
      font: boldFont,
      color: white,
    });

    // Payment content
    drawRoundedRect(40, height - 390, width - 80, 105, white, lightGray, 1);

    // Table header with compact styling
    page.drawRectangle({
      x: 50,
      y: height - 300,
      width: width - 100,
      height: 20,
      color: lightGray,
    });

    page.drawText("DESCRIPTION", {
      x: 60,
      y: height - 295,
      size: 8,
      font: boldFont,
      color: darkGray,
    });

    page.drawText("RATE", {
      x: 250,
      y: height - 295,
      size: 8,
      font: boldFont,
      color: darkGray,
    });

    page.drawText("NIGHTS", {
      x: 350,
      y: height - 295,
      size: 8,
      font: boldFont,
      color: darkGray,
    });

    page.drawText("AMOUNT", {
      x: 450,
      y: height - 295,
      size: 8,
      font: boldFont,
      color: darkGray,
    });

    // Table content
    page.drawText(bookingDetails.accommodation.name || "Luxury Villa Package", {
      x: 60,
      y: height - 320,
      size: 9,
      font: font,
      color: darkGray,
    });

    page.drawText(`$${bookingDetails.payment.rate || 0}`, {
      x: 250,
      y: height - 320,
      size: 9,
      font: font,
      color: darkGray,
    });

    page.drawText(`${bookingDetails.dates.nights || 0}`, {
      x: 350,
      y: height - 320,
      size: 9,
      font: font,
      color: darkGray,
    });

    page.drawText(`$${bookingDetails.payment.total || 0}`, {
      x: 450,
      y: height - 320,
      size: 9,
      font: font,
      color: darkGray,
    });

    // Subtotal section
    page.drawLine({
      start: { x: 50, y: height - 335 },
      end: { x: width - 50, y: height - 335 },
      thickness: 1,
      color: lightGray,
    });

    // Total with enhanced styling
    page.drawRectangle({
      x: 340,
      y: height - 365,
      width: 165,
      height: 20,
      color: primaryColor,
    });

    page.drawText("TOTAL AMOUNT", {
      x: 350,
      y: height - 357,
      size: 9,
      font: boldFont,
      color: white,
    });

    page.drawText(`$${bookingDetails.payment.total || 0}`, {
      x: 450,
      y: height - 357,
      size: 12,
      font: boldFont,
      color: secondaryColor,
    });

    // ===== POLICIES AND CONTACT PLACED SIDE BY SIDE =====
    
    // Left side: Policies
    drawRoundedRect(40, height - 570, (width / 2) - 50, 170, rgb(0.98, 0.98, 1), lightGray, 1);
    
    // Policy header
    page.drawRectangle({
      x: 40,
      y: height - 400,
      width: (width / 2) - 50,
      height: 20,
      color: primaryColor,
    });
    
    page.drawText("VILLA POLICIES", {
      x: 50,
      y: height - 392,
      size: 10,
      font: boldFont,
      color: white,
    });

    // Policy items in a more compact layout
    const policies = [
      { title: "Check-in:", detail: "2:00 PM - 8:00 PM" },
      { title: "Check-out:", detail: "11:00 AM" },
      { title: "Cancellation:", detail: "Free cancellation up to 72h before arrival" },
      { title: "House Rules:", detail: "No pets • Quiet hours 11PM-7AM" },
      { title: "Amenities:", detail: "WiFi • A/C • Kitchen • Garden • Parking" },
    ];

    currentY = height - 425;
    const policySpacing = 16; // Reduced from 20
    
    policies.forEach((policy, index) => {
      // Policy icon
      page.drawRectangle({
        x: 50,
        y: currentY - 3,
        width: 6,
        height: 6,
        color: secondaryColor,
      });

      page.drawText(policy.title, {
        x: 65,
        y: currentY,
        size: 8,
        font: boldFont,
        color: darkGray,
      });

      page.drawText(policy.detail, {
        x: 130,
        y: currentY,
        size: 8,
        font: font,
        color: mediumGray,
      });

      currentY -= policySpacing;
    });
    
    // Additional policy items
    page.drawText("• Children of all ages are welcome", {
      x: 50,
      y: height - 520,
      size: 8,
      font: font,
      color: mediumGray,
    });
    
    page.drawText("• Pets are not allowed", {
      x: 50,
      y: height - 535,
      size: 8,
      font: font,
      color: mediumGray,
    });
    
    page.drawText("• Smoking is not permitted inside", {
      x: 50,
      y: height - 550,
      size: 8,
      font: font,
      color: mediumGray,
    });

    // Right side: Contact & Location Information
    drawRoundedRect(width/2 + 10, height - 570, (width / 2) - 50, 170, white, lightGray, 1);
    
    // Contact header
    page.drawRectangle({
      x: width/2 + 10,
      y: height - 400,
      width: (width / 2) - 50,
      height: 20,
      color: accentColor,
    });
    
    page.drawText("NEED ASSISTANCE?", {
      x: width/2 + 20,
      y: height - 392,
      size: 10,
      font: boldFont,
      color: white,
    });

    // Contact information in a cleaner layout
    currentY = height - 425;
    
    page.drawText("24/7 Guest Support Available", {
      x: width/2 + 20,
      y: currentY,
      size: 9,
      font: boldFont,
      color: darkGray,
    });
    
    currentY -= 20;
    page.drawText("Phone:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(process.env.VILLA_PHONE || "+94 77 794 3393", {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: font,
      color: darkGray,
    });
    
    currentY -= 16;
    page.drawText("Email:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(process.env.VILLA_EMAIL || "leelindika75@gmail.com", {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: font,
      color: darkGray,
    });
    
    currentY -= 16;
    page.drawText("Website:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText(process.env.VILLA_WEBSITE || "https://villashaa.com", {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: font,
      color: accentColor,
    });
    
    currentY -= 16;
    page.drawText("Host:", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: boldFont,
      color: mediumGray,
    });
    
    page.drawText("Mr. Leel Indika - Villa Owner", {
      x: width/2 + 80,
      y: currentY,
      size: 9,
      font: italicFont,
      color: darkGray,
    });
    
    // Location information
    currentY -= 26;
    page.drawText("LOCATION", {
      x: width/2 + 20,
      y: currentY,
      size: 9,
      font: boldFont,
      color: accentColor,
    });
    
    currentY -= 16;
    page.drawText("Villa Shaa is located in Hikkaduwa, approximately 2 hours", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: font,
      color: darkGray,
    });
    
    currentY -= 14;
    page.drawText("drive from Colombo Airport. Detailed directions will be", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: font,
      color: darkGray,
    });
    
    currentY -= 14;
    page.drawText("sent prior to arrival.", {
      x: width/2 + 20,
      y: currentY,
      size: 8,
      font: font,
      color: darkGray,
    });

    // ===== ADDITIONAL INFO SECTION =====
    drawRoundedRect(40, height - 635, width - 80, 55, lightGray, null, 0);
    
    page.drawText("IMPORTANT INFORMATION", {
      x: 50,
      y: height - 590,
      size: 9,
      font: boldFont,
      color: darkGray,
    });
    
    page.drawText("• Deposit of $" + (bookingDetails.payment.deposit || 0) + " has been received.", {
      x: 50,
      y: height - 605,
      size: 8,
      font: font,
      color: mediumGray,
    });
    
    page.drawText("• Balance of $" + (bookingDetails.payment.balance || 0) + " is due upon arrival.", {
      x: 50,
      y: height - 620,
      size: 8,
      font: font,
      color: mediumGray,
    });
    
    page.drawText("• Please present this confirmation upon check-in.", {
      x: 300,
      y: height - 605,
      size: 8,
      font: font,
      color: mediumGray,
    });
    
    page.drawText("• Wi-Fi password will be provided upon arrival.", {
      x: 300,
      y: height - 620,
      size: 8,
      font: font,
      color: mediumGray,
    });

    // ===== FOOTER =====
    // Keep at bottom but make more compact
    page.drawLine({
      start: { x: 40, y: 30 },
      end: { x: width - 40, y: 30 },
      thickness: 1,
      color: secondaryColor,
    });

    // Footer left
    page.drawText("Villa Shaa • Luxury Villa Experience", {
      x: 40,
      y: 15,
      size: 8,
      font: italicFont,
      color: mediumGray,
    });
    
    // Footer center
    page.drawText("Hikkaduwa, Southern Province, Sri Lanka", {
      x: width/2 - 80,
      y: 15,
      size: 8,
      font: italicFont,
      color: mediumGray,
    });
    
    // Footer right
    page.drawText(`Ref: ${bookingRef} • Generated: ${new Date().toLocaleDateString()}`, {
      x: width - 220,
      y: 15,
      size: 8,
      font: font,
      color: mediumGray,
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a blob and download the PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Villa_Shaa_Booking_${bookingRef}.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    return bookingRef;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
