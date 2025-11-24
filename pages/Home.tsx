/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:jmenichole007@outlook.com?subject=${subject}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Show success message
    setFormStatus('success');

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormStatus('idle');
    }, 2000);
  };

  const faqs = [
    {
      question: 'What is the Stake Engine Guidelines Checker?',
      answer:
        'This tool helps game developers validate their game projects against Stake Engine submission guidelines before submission. It checks for compliance with 60+ rules covering technical requirements, UI components, asset guidelines, and more.',
    },
    {
      question: 'What files can I upload?',
      answer:
        'You can upload a ZIP file containing your complete game project. The tool will scan JavaScript, TypeScript, JSX, TSX, and HTML files for guideline compliance.',
    },
    {
      question: 'What does the validation check for?',
      answer:
        'The validator checks for: required files (index.html), prohibited terms, external resources that violate XSS policy, copyright notices, Stake Engine branding compliance, and other technical requirements specified in the Stake Engine guidelines.',
    },
    {
      question: 'How long does validation take?',
      answer:
        'Validation typically takes a few seconds to a minute, depending on the size of your project. Larger projects with more files may take longer.',
    },
    {
      question: 'What happens if my project fails validation?',
      answer:
        'If validation fails, you will receive a detailed report showing all errors and warnings. Each issue includes the file name, line number (for code issues), and a description of what needs to be fixed.',
    },
    {
      question: 'Can I download a corrected version of my project?',
      answer:
        'Yes! After validation, you can download a version of your project with copyright headers automatically added and flagged comments indicating areas that need attention.',
    },
    {
      question: 'Is my project data secure?',
      answer:
        'Yes. All validation is performed client-side in your browser. Your project files are never uploaded to any server and remain completely private.',
    },
    {
      question: 'Do I need to pay for validation?',
      answer:
        'The validation service requires a one-time payment of $3 via Ko-fi. After payment, you can validate your project and receive detailed reports.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
          Stake Engine Guidelines Checker
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Validate your game project against 60+ Stake Engine submission guidelines. Catch issues
          before submission and ensure your game meets all technical requirements.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/validator"
            className="inline-flex items-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-medium rounded-lg shadow-lg transition-colors"
          >
            <Icon name="upload" className="w-6 h-6 mr-2" />
            Upload & Validate
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white text-lg font-medium rounded-lg shadow-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
            <Icon name="document-search" className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Validation</h3>
          <p className="text-gray-400">
            Checks against 60+ Stake Engine guidelines including technical requirements, UI
            components, asset specifications, and more.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
            <Icon name="check" className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Detailed Reports</h3>
          <p className="text-gray-400">
            Get detailed error and warning reports with file names, line numbers, and clear
            explanations of what needs to be fixed.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
            <Icon name="sparkles" className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Automated Fixes</h3>
          <p className="text-gray-400">
            Download a version of your project with copyright headers and flagged comments
            automatically added to guide your fixes.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
              <span className="text-2xl font-bold text-cyan-400">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Upload Your Project</h4>
            <p className="text-gray-400 text-sm">
              Upload your game project as a ZIP file through our secure interface.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
              <span className="text-2xl font-bold text-cyan-400">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Automatic Validation</h4>
            <p className="text-gray-400 text-sm">
              Our tool scans your project against all Stake Engine guidelines.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
              <span className="text-2xl font-bold text-cyan-400">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Review Results</h4>
            <p className="text-gray-400 text-sm">
              Get a detailed report of errors, warnings, and compliance issues.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
              <span className="text-2xl font-bold text-cyan-400">4</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Download Fixed Version</h4>
            <p className="text-gray-400 text-sm">
              Get your project with flagged comments and copyright headers added.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg group">
              <summary className="font-semibold text-lg text-white cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <Icon
                  name="chevron-down"
                  className="w-5 h-5 text-gray-400 transform group-open:rotate-180 transition-transform"
                />
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>
        <p className="text-gray-400 text-center mb-8">
          Have questions or need help? Send us a message and we'll get back to you as soon as
          possible.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              placeholder="Your message..."
            />
          </div>

          {formStatus === 'success' && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 text-center">
                Opening your email client... Please send the email to complete your message.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-medium rounded-lg shadow-lg transition-colors"
          >
            <Icon name="check" className="w-6 h-6 mr-2" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
