import React, { useEffect, useState } from 'react';
import { Navigation } from '../nav';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface SelfAssesmentData {
  introspective: string;
  strengths: string;
  wkExp_values: string;
  motivation: string;
  next_career: string;
  dream_acc: string;
  career_concerns: string;
  industry_pref: string;
}

export default function AnswerPage({ data }: { data: SelfAssesmentData }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  // Handle sending email and saving to database
  const handleSendEmail = async () => {
    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Save to database first
      await addDoc(collection(db, 'surveyResults'), {
        email,
        ...data,
        submittedAt: new Date(),
      });


      try {
        const response = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, data })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server error:', errorData);
          throw new Error(errorData.message || 'Server error');
        }

        const result = await response.json();
        console.log('Success:', result);
      } catch (error) {
        console.error('Request failed:', error);
      }

      // Send email with PDF attachment
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send email');
      }

      setMessage('Survey results saved and email sent successfully!');
    } catch (error) {
      setMessage('Error processing your request. Please try again.');
      console.error('Error saving to database or sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="bg-indigo-100 min-h-screen p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-4 sm:mb-6">
            The Starting Line
          </h1>

          <div className="bg-indigo-700 text-white rounded-lg shadow-lg p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">
                  You are {data.introspective} in your career.
                </p>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  Let's build on your strengths.
                </h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.strengths}</p>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  Core Values:
                </h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.wkExp_values}</p>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  Consistency is key!
                </h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.motivation}</p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  What's next?
                </h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.next_career}</p>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  Celebrating your big win:
                </h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.dream_acc}</p>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  Challenge accepted.
                </h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.career_concerns}</p>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  Your Specialty.
                </h2>
                <p className="text-lg sm:text-xl mb-3 sm:mb-4">{data.industry_pref}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-lg sm:text-xl font-semibold text-indigo-800 mb-2"
            >
              Enter your email to save and receive your results:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendEmail();
                  }
                }}
              />
              <button
                onClick={handleSendEmail}
                disabled={isLoading || !email.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Email'}
              </button>
            </div>
            {message && (
              <p
                className={`mt-2 text-sm ${message.includes('Error') || message.includes('Please')
                  ? 'text-red-500'
                  : 'text-green-500'
                  }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}