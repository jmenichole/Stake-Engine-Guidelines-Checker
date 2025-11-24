/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback, ChangeEvent } from 'react';
import DOMPurify from 'dompurify';
import { Icon } from '../components/Icon';
import { analyzeGameFile } from '../services/geminiService';

const GameAnalyzer: React.FC = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === 'text/html' || file.name.endsWith('.html') || file.name.endsWith('.htm'))
    ) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target?.result as string);
        setAnalysisResult(null); // Clear previous results
        setError(null);
      };
      reader.readAsText(file);
    } else {
      setFileName(null);
      setFileContent(null);
      setError('Please upload a valid HTML file (.html, .htm).');
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!fileContent) return;
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeGameFile(fileContent);
      setAnalysisResult(result);
    } catch (e) {
      setError('Failed to analyze the game file. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [fileContent]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">AI Game Analyzer</h1>
        <p className="text-lg text-gray-400">
          Upload your game's HTML file to get an AI-powered compliance analysis against Stake Engine
          guidelines.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Icon name="upload" className="mx-auto h-12 w-12 text-gray-500" />
            <div className="flex text-sm text-gray-500">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-cyan-500"
              >
                <span>Upload an HTML file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".html,.htm"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">.html or .htm files only</p>
          </div>
        </div>

        {fileName && (
          <p className="text-center mt-4 text-gray-300">
            File loaded: <strong>{fileName}</strong>
          </p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleAnalyze}
            disabled={!fileContent || isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
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
                Analyzing...
              </>
            ) : (
              <>
                <Icon name="sparkles" className="w-5 h-5 mr-2 -ml-1" />
                Analyze Game
              </>
            )}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-500/10 text-red-400 p-4 rounded-md mb-6">{error}</div>}

      {isLoading && !analysisResult && (
        <div className="text-center py-10">
          <p className="text-gray-400">AI is analyzing your file. This may take a moment...</p>
        </div>
      )}

      {analysisResult && (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Analysis Report</h2>
          <div
            className="text-gray-300 space-y-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(analysisResult) }}
          />
        </div>
      )}
    </div>
  );
};

export default GameAnalyzer;
