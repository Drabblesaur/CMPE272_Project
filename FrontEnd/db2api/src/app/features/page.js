import { BoltIcon, ShieldCheckIcon, CloudIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      {/* Go Back Button */}
      <div className="p-4">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold">
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </Link>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Amazing Features</h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to succeed in the digital world.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <BoltIcon className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900">Lightning Fast</h3>
                <p className="mt-2 text-base text-gray-500">
                  Built for speed and optimized for performance.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900">Secure by Default</h3>
                <p className="mt-2 text-base text-gray-500">
                  Enterprise-grade security out of the box.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <CloudIcon className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900">Always Available</h3>
                <p className="mt-2 text-base text-gray-500">
                  24/7 availability with cloud infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
