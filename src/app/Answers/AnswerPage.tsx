'use client'
import React, { useState } from 'react';
import { FormData } from '../Questions/SelfAssesment/page';
import { Navigation } from '../nav';
import axios from 'axios';

export default function AnswerPage({ data }: { data: FormData }) {

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      const { Document, Page, Text, pdf } = await import('@react-pdf/renderer');

      const generatePDF = () => (
        <Document>
          <Page>
            <Text>The Starting Line</Text>
            {Object.entries(data).map(([key, value]) => (
              <Text key={key}>{key}: {Array.isArray(value) ? value.join(', ') : value}</Text>
            ))}
          </Page>
        </Document>
      );

      const blob = await pdf(generatePDF()).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'self-assessment-results.pdf';
      link.click();
      URL.revokeObjectURL(url);
      setMessage('PDF downloaded successfully!');
    } catch (error) {
      setMessage('Error downloading PDF. Please try again.');
    }
    setIsLoading(false);
  };

  const sendEmail = async () => {
    console.log("sendEmail function called");
    setIsLoading(true);
    try {
      const response = await axios.post('/api/sendEmail', { email, data });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending email. Please try again.');
      console.error('Error sending email:', error);
    }
    setIsLoading(false);
  };


  const dataEntries = Object.entries(data);

  return (
    <div>
      <Navigation />
      <div className="bg-indigo-100 min-h-screen p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-4 sm:mb-6">The Starting Line</h1>

          <div className="bg-indigo-700 text-white rounded-lg shadow-lg p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">You are {data.introspective} in your career.</p>

                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Let's build on your strengths.</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.strengths}</p>

                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Core Values:</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.wkExp_values}</p>

                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Consistency is key!</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.motivation}</p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">What's next?</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.next_career}</p>

                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Celebrating your big win:</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.dream_acc}</p>

                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Challenge accepted.</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.career_concerns}</p>

                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Your Specialty.</h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.industry_pref}</p>

                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">What matters to you?</h2>
                <ul className="list-disc list-inside text-lg sm:text-xl mb-3 sm:mb-4">
                  {data.factors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col space-y-4 w-full sm:w-1/2 md:w-1/3 mt-6 sm:mt-8">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  console.log("Email input changed:", e.target.value);
                }}
                placeholder="Enter your email"
                className="border-b border-white bg-transparent w-full py-2 px-3 text-white placeholder-indigo-200 leading-tight focus:outline-none"
              />
              <div className="flex space-x-4">
                <button
                  onClick={downloadPDF}
                  disabled={isLoading}
                  className="bg-white text-indigo-700 hover:bg-indigo-200 font-bold py-2 px-3 sm:px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Download PDF
                </button>
                <button
                  onClick={sendEmail}
                  className="bg-white text-xs text-indigo-700 hover:bg-indigo-200 font-bold py-2 px-3 sm:px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Send PDF via Email
                </button>
              </div>
            </div>
            {message && <p className="text-red-300">{message}</p>}
          </div>
        </div>
      </div>





    </div>
  );
}
