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

      <div className="grid grid-cols-[35%_65%] h-screen ">
        <div className='bg-[#3B28CC] p-8 overflow-y-auto'>  <h1 className="text-4xl font-bold text-blue-100 mb-6">The Starting Line</h1></div>
        <div >

          <div className="overflow-y-auto p-8">
            <div>


              <p className="text-2xl pt-4">You are {data.introspective} in your career.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Let's build on your strengths.</h2>
              <p className="text-xl pb-3">{data.strengths}</p>
            </div>
            <div><h2 className="text-2xl font-semibold">Core Values:</h2>
              <p className="text-xl pb-3">{data.wkExp_values}</p></div>

          </div>
          <div className=" p-8">
            <div>
              <h2 className="text-2xl font-semibold">Consistency is key! </h2>
              <p className="text-xl">{data.motivation}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">What's next?</h2>
              <p className="text-xl">{data.next_career}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Celebrating your big win:</h2>
              <p className="text-xl">{data.dream_acc}</p>

            </div>
          </div>
          <div className=" p-8">
            <div>
              <h2 className="text-2xl font-semibold">Challenge accepted.</h2>
              <p className="text-xl">{data.career_concerns}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Your Specialty.</h2>
              <p className="text-2xl">{data.industry_pref}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">What matters to you?</h2>
              <ul className="list-disc list-inside text-2xl">
                {data.factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" p-8">
            <div className="mt-8 space-y-4">
              <div className="flex flex-col space-y-4 w-full sm:w-1/2 md:w-1/3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    console.log("Email input changed:", e.target.value); // Add this line
                  }}
                  placeholder="Enter your email"
                  className="border-b border-[#3B28CC] bg-transparent w-full py-2 px-3 text-[#3B28CC] placeholder-stone-600 leading-tight focus:outline-none"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={downloadPDF}
                    disabled={isLoading}
                    className="bg-white text-[#3B28CC] hover:bg-indigo-200 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={sendEmail}
                    // disabled={isLoading || !email}
                    className="bg-white text-xs text-[#3B28CC] hover:bg-indigo-200 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                  >
                    Send PDF via Email
                  </button>
                </div>
              </div>
              {message && <p className="text-red-500">{message}</p>}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
