import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiDownload } from 'react-icons/fi'
import { getJobOpenings } from '../lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function Careers({ jobOpenings }) {
  const [selectedJob, setSelectedJob] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    portfolio: '',
    resume: null,
    message: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    })
  }

  const handleSelectJob = (jobId) => {
    if (selectedJob === jobId) {
      setSelectedJob(null)
      setFormData({
        ...formData,
        position: '',
      })
    } else {
      setSelectedJob(jobId)
      const job = jobOpenings.find((job) => job.id === jobId)
      setFormData({
        ...formData,
        position: job.title,
      })
    }
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
          fullName: '',
          email: '',
          phone: '',
          position: '',
          portfolio: '',
          resume: null,
          message: '',
        });
        
        // Clear selected job
        setSelectedJob(null);
        
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
        <title>Careers | MARS Interior Design</title>
        <meta name="description" content="Join our team of talented designers and professionals at MARS Interior Design." />
      </Head>

      {/* Page Header */}
      <section className="pt-36 pb-16 bg-primary text-white">
        <div className="container text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Join Our Team</h1>
          <p className="max-w-2xl mx-auto text-xl">
            We're looking for passionate, creative individuals to help us transform spaces and elevate experiences.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-light">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div className="relative h-80 md:h-auto w-full overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team working together"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold">Why Work With Us</h2>
              <p className="mb-6 text-lg">
                At MARS Interior Design, we foster a collaborative, inclusive environment where creativity flourishes and professional growth is encouraged. We believe that our team\'s diverse perspectives and talents are key to our success.
              </p>
              <ul className="space-y-3">
                {[
                  'Collaborative, supportive work environment',
                  'Opportunity to work on diverse, challenging projects',
                  'Professional development and growth opportunities',
                  'Competitive compensation and benefits',
                  'Work-life balance and flexible arrangements',
                  'Chance to make a real impact through design',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="w-5 h-5 mr-2 text-secondary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold text-center">Current Openings</h2>
          
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="overflow-hidden bg-light rounded-lg shadow-md">
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="flex flex-wrap items-center mt-2 space-x-4 sm:mt-0">
                      <span className="text-gray-600">{job.location}</span>
                      <span className="px-3 py-1 text-sm text-primary bg-secondary bg-opacity-20 rounded-full">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 text-gray-700">
                    {typeof job.description === 'string' 
                      ? job.description 
                      : job.description && documentToReactComponents(job.description)}
                  </div>
                  
                  <button
                    className="text-primary hover:text-secondary"
                    onClick={() => handleSelectJob(job.id)}
                  >
                    {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                  </button>
                  
                  {selectedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="p-4 rounded-lg bg-gray-50">
                        <h4 className="mb-3 font-semibold">Requirements:</h4>
                        <ul className="pl-5 mb-4 space-y-1 list-disc">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                        
                        <h4 className="mb-3 font-semibold">Benefits:</h4>
                        <ul className="pl-5 space-y-1 list-disc">
                          {job.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <button
                          className="inline-flex items-center px-4 py-2 text-white transition-colors rounded-md bg-primary hover:bg-primary-light"
                          onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
                        >
                          Apply for this position
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-light">
        <div className="container">
          <h2 className="mb-12 text-3xl font-bold text-center">Apply Now</h2>
          
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 text-center bg-white rounded-lg shadow-md"
            >
              <FiCheckCircle className="w-16 h-16 mx-auto mb-4 text-secondary" />
              <h3 className="mb-2 text-2xl font-bold">Application Submitted!</h3>
              <p className="text-lg">
                Thank you for your interest in joining our team. We\'ll review your application and contact you if there\'s a good match.
              </p>
            </motion.div>
          ) : (
            <form action="https://formsubmit.co/marsturnkeyandinteriors@gmail.com" method="POST" enctype="multipart/form-data" className="p-6 bg-white rounded-lg shadow-md">
              {/* FormSubmit configuration */}
              <input type="hidden" name="_next" value="https://mars-design.vercel.app/careers?submitted=true" />
              <input type="hidden" name="_subject" value="New Job Application" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Full Name */}
                <div className="col-span-1">
                  <label htmlFor="fullName" className="block mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                
                {/* Email */}
                <div className="col-span-1">
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email *
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
                
                {/* Phone */}
                <div className="col-span-1">
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    Phone
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
                
                {/* Position */}
                <div className="col-span-1">
                  <label htmlFor="position" className="block mb-2 font-medium">
                    Position *
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select a position</option>
                    {jobOpenings.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                    <option value="Other">Other/Not Listed</option>
                  </select>
                </div>
                
                {/* Portfolio URL */}
                <div className="col-span-1">
                  <label htmlFor="portfolio" className="block mb-2 font-medium">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="https://your-portfolio.com"
                  />
                </div>
                
                {/* Resume */}
                <div className="col-span-1">
                  <label htmlFor="resume" className="block mb-2 font-medium">
                    Resume/CV *
                  </label>
                  <div className="flex items-center w-full px-4 py-2 border rounded-md">
                    <input
                      type="file"
                      id="resume"
                      name="attachment"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <label
                      htmlFor="resume"
                      className="flex items-center cursor-pointer text-primary hover:text-secondary"
                    >
                      <FiDownload className="w-5 h-5 mr-2" />
                      {formData.resume ? formData.resume.name : 'Upload Resume (PDF, DOC)'}
                    </label>
                  </div>
                </div>
                
                {/* Message */}
                <div className="col-span-2">
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Cover Letter/Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-2 border rounded-md"
                  ></textarea>
                </div>
                
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="px-6 py-3 text-white transition-colors rounded-md bg-primary hover:bg-primary-light"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* General Applications */}
      <section className="py-16 text-center bg-white">
        <div className="container">
          <h2 className="mb-6 text-3xl font-bold">Don't See a Perfect Fit?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            We're always interested in connecting with talented designers and professionals.
            Submit a general application and we'll keep your information on file for future opportunities.
          </p>
          <button
            onClick={() => {
              document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })
              setFormData({
                ...formData,
                position: 'General Application',
              })
            }}
            className="inline-flex items-center px-6 py-3 transition-colors border rounded-md text-primary border-primary hover:bg-primary hover:bg-opacity-10"
          >
            Submit General Application
          </button>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const jobOpenings = await getJobOpenings();
  
  return {
    props: {
      jobOpenings,
    },
    // Re-generate at most once per hour
    revalidate: 3600,
  };
}
