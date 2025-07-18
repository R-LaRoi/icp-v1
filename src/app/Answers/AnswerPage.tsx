import React, { useEffect, useState } from 'react';

import { Navigation } from '../nav';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface FormData {
  introspective: string;
  strengths: string;
  wkExp_values: string;
  motivation: string;
  next_career: string;
  dream_acc: string;
  career_concerns: string;
  industry_pref: string;
}

export default function AnswerPage({ data }: { data: FormData }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Automatically save to database when email changes
  useEffect(() => {
    const saveToDatabase = async () => {
      try {
        await addDoc(collection(db, 'surveyResults'), {
          email,
          ...data,
          submittedAt: new Date(),
        });
        setMessage('Survey results saved to database!');
      } catch (error) {
        setMessage('Error saving to database. Please try again.');
        console.error('Error saving to Firestore:', error);
      }
    };

    const timeoutId = setTimeout(saveToDatabase, 1000); // Debounce save operation
    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount or email change
  }, [email, data]);

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
              Enter your email to save your results:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
            {message && (
              <p
                className={`mt-2 text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'
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