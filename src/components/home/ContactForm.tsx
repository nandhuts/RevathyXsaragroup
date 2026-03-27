"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { createMessage } from "@/lib/actions";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const submitAction = async (formData: FormData) => {
    setStatus("submitting");
    try {
      await createMessage(formData);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  return (
    <div className="bg-white dark:bg-brand-blue-light/50 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 relative z-10 w-full lg:mt-0 mt-8">
      <h4 className="text-2xl font-bold text-brand-blue dark:text-white mb-6">Send us a Message</h4>
      {status === "success" ? (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 px-4 py-8 rounded-xl text-center">
          <p className="font-bold text-xl mb-2">Thank you!</p>
          <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
          <button 
            onClick={() => setStatus("idle")} 
            className="mt-6 text-sm font-semibold hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form action={submitAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" placeholder="john@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
            <input required type="text" id="subject" name="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white" placeholder="How can we help?" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
            <textarea required id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-brand-blue focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all dark:text-white resize-none" placeholder="Write your message here..."></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
          >
            {status === "submitting" ? "Sending..." : (
              <>
                Send Message <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
