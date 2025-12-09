"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast as sonnerToast } from "sonner";

const Contact = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [messageSaved, setMessageSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      // Handle form submission here
      const messageDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      // Save to Google Sheets or handle as needed
      const isMessageSent = await saveToGoogleSheet(messageDetails);

      if (isMessageSent) {
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        // Optionally show a success message or redirect
        sonnerToast.success("Your message has been sent successfully!");
        // For demonstration, log the form data
        console.log("Form submitted:", formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      sonnerToast.error("Failed to send message. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveToGoogleSheet = async (messageDetails: any) => {
    try {
      // Show saving indicator
      setIsSaving(true);

      const submissionData = {
        NAME: messageDetails.name,
        EMAIL: messageDetails.email,
        PHONE: messageDetails.phone,
        SUBJECT: messageDetails.subject,
        MESSAGE: messageDetails.message,
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

      // const scriptURL = "https://script.google.com/macros/s/AKfycbx3-7ldpN99P1sEsMbxebG1EznUNu4t-VGgNOgS_cCtGBO2odjTq1rJ88_hCKRbQIPMuw/exec";
      // const scriptURL = "https://script.google.com/macros/s/AKfycbxQeUFl2mDOKhlIn00RPuSVCaTY8Zvl3-urBWd29rZxbDD9nLfzVMQVI7CVBXZ4vL_gXg/exec";
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbzRVtDZGmDe5Br44C62Opi6gOFt3lI9Zp99R5xano6-RGUjQx_GvtTP_XjkWHT8q2_xrw/exec";

      const response = await fetch(scriptURL, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(submissionData),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });

      // Since 'no-cors' returns an opaque response, we can't check status
      // Instead, we'll just assume it worked if no error was thrown
      setMessageSaved(true);
      console.log("Response", response);

      // Use toast instead of alert for better UX
      toast({
        title: "Success!",
        description: "Your message sent successfully.",
        status: "success",
      });
    } catch (error) {
      console.error("Error saving message to Google Sheets:", error);

      // Show error message
      toast({
        title: "Error sending message",
        description: "Please try again or contact support.",
        status: "error",
      });
    } finally {
      setIsSaving(false);
      return messageSaved;
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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: ["Villa Shaa, Hikkaduwa", "Southern Province, Sri Lanka"],
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Phone",
      details: [process.env.VILLA_PHONE || "+94 77 794 3393", process.env.VILLA_SECONDARY_PHONE || "+94 91 226 7107"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email",
      details: [process.env.VILLA_EMAIL || "leelindika75@gmail.com", process.env.VILLA_SECONDARY_EMAIL || "shaleelsandeepa@gmail.com"],
      action: "Send Email",
    },
    {
      icon: Clock,
      title: "Availability",
      details: ["24/7 Guest Support", "Instant Response"],
      action: "Chat Now",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience luxury at Villa Shaa? Contact Mr. Leel Indika
            and our team for bookings, inquiries, or personalized assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600">
                We're here to help make your Villa Shaa experience
                unforgettable. Reach out to us through any of the following
                channels.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true }}
                className="transform transition-all duration-300">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 mb-1">
                            {detail}
                          </p>
                        ))}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold mt-2">
                          {info.action} →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Owner Information */}
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white"
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">LI</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold">Mr. Leel Indika</h4>
                  <p className="text-blue-100">Villa Owner & Host</p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed">
                "I personally ensure every guest has an exceptional experience
                at Villa Shaa. Feel free to reach out directly for any special
                requests or personalized services."
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Booking inquiry, questions, etc."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your inquiry, preferred dates, group size, or any special requests..."
                      rows={6}
                      required
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                    viewport={{ once: true }}>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className={`w-full bg-gradient-to-r ${
                        isSaving
                          ? "from-blue-400 to-green-400 cursor-not-allowed"
                          : "from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                      } text-lg py-3 transition-all`}>
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-sm text-gray-600 text-center">
                    We typically respond within 1 hour during business hours.
                    For urgent inquiries, please call us directly.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Map Section */}
            <motion.div
              className="lg:col-span-2 mt-16"
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              <Card className="overflow-hidden shadow-sm">
                <CardContent className="p-0">
                  <div className="relative h-96">
                    {/* Google Maps Embed with Villa Shaa Marker */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9587892010995!2d80.10912897404356!3d6.136239527544384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1770045e02283%3A0x9abbb694521bb3a4!2sVilla%20Shaa%20Hikkaduwa!5e0!3m2!1sen!2slk!4v1752770694656!5m2!1sen!2slk"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Villa Shaa Location"
                      className="absolute inset-0"></iframe>

                    {/* Overlay with button */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 flex items-center justify-center">
                      <div className="text-center text-white mt-32">
                        {/* <h3 className="text-2xl font-bold mb-2">
                          Villa Shaa Location
                        </h3>
                        <p className="text-blue-100 mb-4">
                          Hikkaduwa, Southern Province, Sri Lanka
                        </p> */}
                        <Button
                          variant="outline"
                          className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 mt-12"
                          asChild>
                          <a
                            href="https://maps.app.goo.gl/hHJH5tSAWt4DxgvR6"
                            target="_blank"
                            rel="noopener noreferrer">
                            View on Google Maps
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="relative h-96 bg-gradient-to-r from-blue-500 to-green-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      Villa Shaa Location
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Hikkaduwa, Southern Province, Sri Lanka
                    </p>
                    <Button
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                      asChild>
                      <a
                        href="https://maps.app.goo.gl/hHJH5tSAWt4DxgvR6"
                        target="_blank"
                        rel="noopener noreferrer">
                        View on Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
