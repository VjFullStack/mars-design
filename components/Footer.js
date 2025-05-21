import React from 'react'
import Link from 'next/link'
import { FiInstagram, FiLinkedin, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <h3 className="mb-4 text-2xl font-bold text-secondary">MARS</h3>
            <p className="mb-4">Transforming spaces into inspiring environments through thoughtful interior design.</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram className="w-5 h-5 transition-colors hover:text-secondary" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin className="w-5 h-5 transition-colors hover:text-secondary" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook className="w-5 h-5 transition-colors hover:text-secondary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="mb-4 text-lg font-bold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="transition-colors hover:text-secondary">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/projects" legacyBehavior>
                  <a className="transition-colors hover:text-secondary">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/team" legacyBehavior>
                  <a className="transition-colors hover:text-secondary">Our Team</a>
                </Link>
              </li>
              <li>
                <Link href="/careers" legacyBehavior>
                  <a className="transition-colors hover:text-secondary">Careers</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="transition-colors hover:text-secondary">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="mb-4 text-lg font-bold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="w-5 h-5 mr-2 text-secondary" />
                <span>123 Design Street, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="w-5 h-5 mr-2 text-secondary" />
                <a href="tel:+1234567890" className="transition-colors hover:text-secondary">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="w-5 h-5 mr-2 text-secondary" />
                <a href="mailto:info@marsdesign.com" className="transition-colors hover:text-secondary">
                  info@marsdesign.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="mb-4 text-lg font-bold">Stay Updated</h4>
            <p className="mb-4">Subscribe to our newsletter for the latest updates on our projects and design insights.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 text-dark rounded"
                required
              />
              <button type="submit" className="btn btn-secondary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-700">
          <p className="text-sm text-center">
            &copy; {currentYear} MARS Interior Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
