import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiDownload } from 'react-icons/fi'

// Sample job openings data
const jobOpenings = [
  {
    id: 1,
    title: 'Senior Interior Designer',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are seeking an experienced Senior Interior Designer to join our team. The ideal candidate will have a strong portfolio demonstrating expertise in residential and/or commercial design, excellent communication skills, and the ability to lead projects from concept to completion.',
    requirements: [
      'Bachelor's degree in Interior Design or related field',
      'Minimum 5 years of professional interior design experience',
      'Proficiency in AutoCAD, SketchUp, and Adobe Creative Suite',
      'Strong portfolio demonstrating diverse design capabilities',
      'Excellent client communication and presentation skills',
      'Knowledge of materials, finishes, furniture, and construction methods',
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Retirement plan with company match',
      'Generous paid time off',
      'Professional development opportunities',
      'Creative and collaborative work environment',
    ],
  },
  {
    id: 2,
    title: 'Junior Interior Designer',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for a talented Junior Interior Designer to support our design team. This role is perfect for a detail-oriented individual with a passion for interior design and a desire to grow in a collaborative environment.',
    requirements: [
      'Bachelor's degree in Interior Design or related field',
      '1-3 years of professional interior design experience',
      'Proficiency in AutoCAD and Adobe Creative Suite',
      'Strong visual communication skills',
      'Knowledge of materials, finishes, and furniture',
      'Ability to work in a fast-paced environment',
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Retirement plan with company match',
      'Generous paid time off',
      'Mentorship opportunities',
      'Creative and collaborative work environment',
    ],
  },
  {
    id: 3,
    title: 'Design Project Manager',
    location: 'Remote (with occasional travel)',
    type: 'Full-time',
    description: 'We are seeking a detail-oriented Design Project Manager to oversee the execution of our design projects. The ideal candidate will have experience in both interior design and project management, with excellent organizational and communication skills.',
    requirements: [
      'Bachelor's degree in Interior Design, Architecture, or related field',
      'Minimum 3-5 years of project management experience in design or construction',
      'Strong understanding of design processes and construction methods',
      'Excellent organizational, time management, and communication skills',
      'Experience with budgeting and resource allocation',
      'Proficiency in project management software',
    ],
    benefits: [
      'Competitive salary',
      'Health, dental, and vision insurance',
      'Retirement plan with company match',
      'Flexible remote work arrangement',
      'Professional development opportunities',
      'Travel reimbursement for project visits',
    ],
  },
]

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would handle the form submission
    // and file upload to your backend here
    console.log('Form submitted:', formData)
    setFormSubmitted(true)
    
    // Reset form after submission
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        portfolio: '',
        resume: null,
        message: '',
      })
      setSelectedJob(null)
    }, 5000)
  }

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
            <div className="relative h-80 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Team working together"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold">Why Work With Us</h2>
              <p className="mb-6 text-lg">
                At MARS Interior Design, we foster a collaborative, inclusive environment where creativity flourishes and professional growth is encouraged. We believe that our team's diverse perspectives and talents are key to our success.
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
                  <p className="mb-4 text-gray-700">{job.description}</p>
                  
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
                Thank you for your interest in joining our team. We'll review your application and contact you if there's a good match.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
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
                      name="resume"
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
