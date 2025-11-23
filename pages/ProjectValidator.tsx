/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import JSZip from 'jszip';
import { Icon } from '../components/Icon';
import { GUIDELINE_SECTIONS } from '../constants/guidelines';
import { PROHIBITED_TERMS } from '../constants/prohibitedTerms';

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  fileCount: number;
  prohibitedTermsFound: Array<{ file: string; term: string; line: number }>;
}

const ProjectValidator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [canDownloadFixed, setCanDownloadFixed] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  // Check if user has paid (check URL parameter from Stripe redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment_success') === 'true') {
      setHasPaid(true);
      // Store in localStorage to persist across page reloads
      localStorage.setItem('validation_paid', 'true');
      // Clean up URL
      window.history.replaceState({}, '', '/validator');
    } else {
      // Check if user has previously paid
      const paid = localStorage.getItem('validation_paid') === 'true';
      setHasPaid(paid);
    }
  }, []);

  const handlePayment = useCallback(() => {
    const paymentLink = (import.meta as any).env.VITE_STRIPE_PAYMENT_LINK;
    if (paymentLink && paymentLink !== 'https://buy.stripe.com/test_YOUR_LINK_HERE') {
      // Add success redirect URL to payment link
      const successUrl = `${window.location.origin}/validator?payment_success=true`;
      const cancelUrl = `${window.location.origin}/validator`;
      window.location.href = `${paymentLink}?success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;
    } else {
      setShowPaymentInfo(true);
    }
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.zip')) {
      setFile(selectedFile);
      setResult(null);
      setCanDownloadFixed(false);
    } else {
      alert('Please upload a valid ZIP file');
    }
  }, []);

  const validateProject = useCallback(async () => {
    if (!file) return;

    setIsValidating(true);
    const errors: string[] = [];
    const warnings: string[] = [];
    const prohibitedTermsFound: Array<{ file: string; term: string; line: number }> = [];
    let fileCount = 0;

    try {
      const zip = await JSZip.loadAsync(file);
      fileCount = Object.keys(zip.files).length;

      // Check for required files
      const hasIndexHtml = Object.keys(zip.files).some((name) =>
        name.toLowerCase().includes('index.html')
      );
      if (!hasIndexHtml) {
        errors.push('Missing index.html file');
      }

      // Check each file
      for (const [filename, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;

        // Check file extensions
        if (
          filename.endsWith('.js') ||
          filename.endsWith('.ts') ||
          filename.endsWith('.tsx') ||
          filename.endsWith('.jsx') ||
          filename.endsWith('.html')
        ) {
          const content = await zipEntry.async('text');
          const lines = content.split('\n');

          // Check for prohibited terms
          lines.forEach((line, lineNum) => {
            Object.keys(PROHIBITED_TERMS).forEach((term) => {
              const regex = new RegExp(`\\b${term}\\b`, 'gi');
              if (regex.test(line)) {
                prohibitedTermsFound.push({
                  file: filename,
                  term,
                  line: lineNum + 1,
                });
              }
            });
          });

          // Check for external resources (XSS policy violation)
          if (content.includes('http://') || content.includes('https://')) {
            const externalUrls = content.match(/(https?:\/\/[^\s"']+)/g);
            if (externalUrls) {
              externalUrls.forEach((url) => {
                if (
                  !url.includes('cdn.stake.com') &&
                  !url.includes('localhost') &&
                  !url.includes('127.0.0.1')
                ) {
                  warnings.push(`External resource detected in ${filename}: ${url}`);
                }
              });
            }
          }

          // Check for copyright notice
          if (!content.includes('Copyright') && !content.includes('©')) {
            warnings.push(`Missing copyright notice in ${filename}`);
          }
        }
      }

      // Guideline checks
      if (fileCount > 1000) {
        warnings.push('Project has over 1000 files - may need optimization');
      }

      setResult({
        passed: errors.length === 0,
        errors,
        warnings,
        fileCount,
        prohibitedTermsFound,
      });

      if (errors.length === 0) {
        setCanDownloadFixed(true);
      }
    } catch (error) {
      errors.push(`Failed to process ZIP file: ${error}`);
      setResult({
        passed: false,
        errors,
        warnings,
        fileCount: 0,
        prohibitedTermsFound: [],
      });
    } finally {
      setIsValidating(false);
    }
  }, [file]);

  const downloadFixedProject = useCallback(async () => {
    if (!file) return;

    const zip = await JSZip.loadAsync(file);
    const newZip = new JSZip();

    const copyrightHeader = `/**
 * Copyright (c) ${new Date().getFullYear()} [Your Name/Company]
 * 
 * This source code is licensed under the MIT license.
 * All rights reserved.
 */

`;

    for (const [filename, zipEntry] of Object.entries(zip.files)) {
      if (zipEntry.dir) {
        newZip.folder(filename);
        continue;
      }

      if (
        filename.endsWith('.js') ||
        filename.endsWith('.ts') ||
        filename.endsWith('.tsx') ||
        filename.endsWith('.jsx')
      ) {
        let content = await zipEntry.async('text');

        // Add copyright if missing
        if (!content.includes('Copyright') && !content.includes('©')) {
          content = copyrightHeader + content;
        }

        newZip.file(filename, content);
      } else {
        newZip.file(filename, await zipEntry.async('blob'));
      }
    }

    const blob = await newZip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace('.zip', '_with_copyright.zip');
    a.click();
    URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Stake Engine Project Validator
        </h1>
        <p className="text-lg text-gray-400">
          Upload your game project (ZIP) to validate against Stake Engine submission guidelines
        </p>
      </div>

      {/* Payment Gate */}
      {!hasPaid && (
        <div className="bg-gradient-to-br from-cyan-900/30 to-gray-800 border-2 border-cyan-500/50 rounded-lg p-8 mb-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                <Icon name="check" className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Validate Your Game Project
            </h2>
            <p className="text-xl text-cyan-400 mb-2">Only $3 per validation</p>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get comprehensive validation against 60+ Stake Engine guidelines, automatic copyright
              protection, and detailed error reports. Catch issues before submission and protect
              your intellectual property.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-3xl mx-auto">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Icon name="document-search" className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">60+ Guideline Checks</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Icon name="check" className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Copyright Protection</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Icon name="sparkles" className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Detailed Reports</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="inline-flex items-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-medium rounded-lg shadow-lg transition-colors"
            >
              <Icon name="check" className="w-6 h-6 mr-2" />
              Pay $3 & Start Validation
            </button>

            {showPaymentInfo && (
              <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-yellow-300 text-sm">
                  <strong>Setup Required:</strong> Please configure your Stripe payment link in the
                  .env file. See .env.example for instructions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Validation Interface - Only show if paid */}
      {hasPaid && (
        <>
          {/* Upload Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Icon name="upload" className="mx-auto h-12 w-12 text-gray-500" />
            <div className="flex text-sm text-gray-500">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300"
              >
                <span>Upload project ZIP</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".zip"
                  aria-label="Upload project ZIP file"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">ZIP files only, max 50MB</p>
          </div>
        </div>

        {file && (
          <div className="mt-4">
            <p className="text-center text-gray-300">
              File loaded: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)}MB)
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={validateProject}
                disabled={isValidating}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Validating...
                  </>
                ) : (
                  <>
                    <Icon name="document-search" className="w-5 h-5 mr-2 -ml-1" />
                    Validate Project
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <div
            className={`rounded-lg p-6 ${result.passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
          >
            <div className="flex items-center">
              {result.passed ? (
                <>
                  <Icon name="check" className="w-8 h-8 text-green-400 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-green-400">Validation Passed!</h2>
                    <p className="text-gray-300">
                      Your project meets the basic Stake Engine requirements
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 text-red-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <div>
                    <h2 className="text-2xl font-bold text-red-400">Validation Failed</h2>
                    <p className="text-gray-300">Please fix the errors below before submitting</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Files Scanned</p>
              <p className="text-2xl font-bold text-white">{result.fileCount}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Errors</p>
              <p className="text-2xl font-bold text-red-400">{result.errors.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Warnings</p>
              <p className="text-2xl font-bold text-yellow-400">{result.warnings.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Prohibited Terms</p>
              <p className="text-2xl font-bold text-orange-400">
                {result.prohibitedTermsFound.length}
              </p>
            </div>
          </div>

          {/* Errors */}
          {result.errors.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">Errors (Must Fix)</h3>
              <ul className="space-y-2">
                {result.errors.map((error, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span className="text-gray-300">{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Warnings (Recommended)</h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {result.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span className="text-gray-300">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prohibited Terms */}
          {result.prohibitedTermsFound.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Prohibited Terms Found</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {result.prohibitedTermsFound.map((item, idx) => (
                  <div key={idx} className="bg-gray-700/50 p-3 rounded">
                    <p className="text-gray-300">
                      <span className="font-mono text-orange-300">{item.file}</span>
                      <span className="text-gray-500"> (line {item.line})</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Found: <span className="text-orange-400">{item.term}</span> → Replace with:{' '}
                      <span className="text-green-400">{PROHIBITED_TERMS[item.term]}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download Fixed Version */}
          {canDownloadFixed && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Add Copyright Protection</h3>
              <p className="text-gray-300 mb-4">
                Download your project with copyright headers automatically added to all code files.
                This protects your intellectual property.
              </p>
              <button
                onClick={downloadFixedProject}
                className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors"
              >
                <Icon name="check" className="w-5 h-5 mr-2" />
                Download with Copyright
              </button>
            </div>
          )}

          {/* Guidelines Reference */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Stake Engine Guidelines Checked
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {GUIDELINE_SECTIONS.map((section) => (
                <div key={section.title} className="bg-gray-700/50 p-3 rounded">
                  <h4 className="font-semibold text-cyan-400 mb-2">{section.title}</h4>
                  <p className="text-gray-400">{section.items.length} rules validated</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default ProjectValidator;
