import React, { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheckCircle } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form reset after submission (when returning from FormSubmit)
  React.useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Check if the URL has a 'submitted' parameter
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('submitted')) {
        setFormSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        // Remove the parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Contact Us | MARS Interior Design</title>
        <meta name="description" content="Get in touch with MARS Interior Design to discuss your next project, request a consultation, or learn more about our services." />
      </Head>

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-primary text-white">
        <div className="container text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-xl">
            We're here to help you create spaces that inspire. Get in touch with our team to discuss your project.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 bg-light">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="mb-6 text-2xl font-bold">Get In Touch</h2>
              <p className="mb-6">
                We'd love to hear from you. Whether you're interested in starting a new project, have questions about our services, or want to join our team, please don't hesitate to reach out.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMapPin className="w-5 h-5 mr-3 text-secondary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Office</h3>
                    <address className="not-italic">
                      123 Design Street, Suite 100<br />
                      New York, NY 10001<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiPhone className="w-5 h-5 mr-3 text-secondary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p><a href="tel:+1234567890" className="hover:text-secondary">(123) 456-7890</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiMail className="w-5 h-5 mr-3 text-secondary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p><a href="mailto:info@marsdesign.com" className="hover:text-secondary">info@marsdesign.com</a></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiClock className="w-5 h-5 mr-3 text-secondary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: By appointment only</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 text-center bg-white rounded-lg shadow-md"
                >
                  <FiCheckCircle className="w-16 h-16 mx-auto mb-4 text-secondary" />
                  <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
                  <p className="text-lg">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <div className="p-8 bg-white rounded-lg shadow-md">
                  <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
                  <form action="https://formsubmit.co/marsturnkeyandinteriors@gmail.com" method="POST" className="space-y-6">
                    {/* FormSubmit configuration */}
                    <input type="hidden" name="_next" value="https://mars-design.vercel.app/contact?submitted=true" />
                    <input type="hidden" name="_subject" value="New Contact Form Submission" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="col-span-1">
                        <label htmlFor="name" className="block mb-2 font-medium">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md"
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label htmlFor="email" className="block mb-2 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md"
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label htmlFor="phone" className="block mb-2 font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label htmlFor="subject" className="block mb-2 font-medium">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-md"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="New Project">New Project Inquiry</option>
                          <option value="Consultation">Request Consultation</option>
                          <option value="Information">General Information</option>
                          <option value="Career">Career Opportunities</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div className="col-span-2">
                        <label htmlFor="message" className="block mb-2 font-medium">
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="5"
                          className="w-full px-4 py-2 border rounded-md"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="col-span-2">
                        <button
                          type="submit"
                          className="px-6 py-3 text-white transition-colors rounded-md bg-primary hover:bg-primary-light"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-center">Find Us</h2>
          <div className="rounded-lg overflow-hidden shadow-md h-96">
            {/* In a real application, you would replace this with a proper map integration like Google Maps */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <FiMapPin className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <p className="text-lg font-medium">
                  Interactive map would be displayed here.<br />
                  Using Google Maps or another map service API.
                </p>
                <a
                  href="https://maps.google.com/?q=New+York,NY+10001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-primary hover:text-secondary"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-light">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "What services does MARS Interior Design offer?",
                answer: "We offer a comprehensive range of interior design services including space planning, material selection, custom furniture design, project management, and full implementation. We work on residential, commercial, and hospitality projects of all sizes."
              },
              {
                question: "How does the design process work?",
                answer: "Our design process typically begins with an initial consultation to understand your needs, style preferences, and budget. We then develop a concept, create detailed design plans, select materials and furnishings, and oversee the implementation to ensure your vision comes to life."
              },
              {
                question: "Do you work on projects outside of New York?",
                answer: "Yes, we work on projects throughout the United States and internationally. Our team can travel to your location for on-site consultations and implementation oversight."
              },
              {
                question: "How much does it cost to hire an interior designer?",
                answer: "Our fees vary depending on the scope and scale of your project. We offer different service packages to accommodate various budgets and needs. Contact us for a personalized quote based on your specific requirements."
              },
              {
                question: "How long does a typical design project take?",
                answer: "Project timelines vary based on scope and complexity. A small residential redesign might take 2-3 months, while a complete renovation or commercial project could take 6-12 months or more. We'll provide you with a projected timeline during our initial consultation."
              },
              {
                question: "Can you work with my existing furniture and decor?",
                answer: "Absolutely! We're happy to incorporate existing pieces that you love into your new design. We'll help you determine what works with your new space and suggest complementary additions as needed."
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-3 text-xl font-bold">{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-primary text-white">
        <div className="container">
          <h2 className="mb-6 text-3xl font-bold">Ready to Transform Your Space?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Let's create a space that reflects your style, meets your needs, and exceeds your expectations.
          </p>
          <a
            href="#" 
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-primary rounded-md bg-secondary hover:bg-secondary-light"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </>
  )
}
