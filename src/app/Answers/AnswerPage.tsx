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
            <Text>Your Self-Assessment Results:</Text>
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
    setIsLoading(true);
    try {
      const response = await axios.post('/api/sendEmail', { email, data });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending email. Please try again.');
    }
    setIsLoading(false);
  };



  const dataEntries = Object.entries(data);

  return (
    <div>
      <Navigation />

      <div className="grid grid-cols-[35%_65%] h-screen ">
        <div className='bg-[#3B28CC] p-8 overflow-y-auto'>  <h1 className="text-4xl font-bold text-blue-100 mb-6">Your Career Introspective</h1></div>
        <div >

          <div className="overflow-y-auto">
            <div>

              <h2 className="text-lg font-semibold">Level</h2>
              <p className="text-lg">{data.introspective}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Strengths</h2>
              <p className="text-lg">{data.strengths}</p>
            </div>
            <div><h2 className="text-lg font-semibold">Work Experience Values</h2>
              <p className="text-lg">{data.wkExp_values}</p></div>

          </div>
          <div className=" p-8">
            <div>
              <h2 className="text-lg font-semibold">Motivation</h2>
              <p className="text-lg">{data.motivation}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Next Career</h2>
              <p className="text-lg">{data.next_career}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Dream Accomplishment</h2>
              <p className="text-lg">{data.dream_acc}</p>

            </div>
          </div>
          <div className=" p-8">
            <div>
              <h2 className="text-lg font-semibold">Career Concerns</h2>
              <p className="text-lg">{data.career_concerns}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Industry Preference</h2>
              <p className="text-lg">{data.industry_pref}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Factors</h2>
              <ul className="list-disc list-inside text-lg">
                {data.factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" p-8">
            <div className="mt-8 space-y-4">
              <button
                onClick={downloadPDF}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Download PDF
              </button>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border p-2 mr-2"
                />
                <button
                  onClick={sendEmail}
                  disabled={isLoading || !email}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send PDF via Email
                </button>
              </div>
              {message && <p className="text-red-500">{message}</p>}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
