// pages/pricing/page.js

export default function Pricing() {
    return (
        <div className="min-h-screen bg-white">
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Heading */}
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Choose Your Plan</h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Flexible pricing options to suit your needs.
                        </p>
                    </div>

                    {/* Pricing Plans */}
                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Basic Plan */}
                        <div className="border border-gray-200 rounded-lg shadow-sm p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Basic</h3>
                            <p className="mt-4 text-sm text-gray-500">For individuals just getting started.</p>
                            <div className="mt-8">
                                <span className="text-4xl font-extrabold text-gray-900">$9</span>
                                <span className="text-base font-medium text-gray-500">/month</span>
                            </div>
                            <ul className="mt-6 space-y-4">
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <p className="ml-3 text-sm text-gray-700">Feature A</p>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <p className="ml-3 text-sm text-gray-700">Feature B</p>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <p className="ml-3 text-sm text-gray-700">Feature C</p>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <a
                                    href="#"
                                    className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700"
                                >
                                    Get Started
                                </a>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="border border-indigo-600 rounded-lg shadow-sm p-6 bg-indigo-50">
                            <h3 className="text-lg leading-6 font-medium text-indigo-600">Pro</h3>
                            <p className="mt-4 text-sm text-indigo-600">Best for professionals and small teams.</p>
                            <div className="mt-8">
                                <span className="text-4xl font-extrabold text-indigo-600">$29</span>
                                <span className="text-base font-medium text-indigo-600">/month</span>
                            </div>
                            <ul className="mt-6 space-y-4">
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <p className="ml-3 text-sm text-indigo-600">Feature A</p>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <p className="ml-3 text-sm text-indigo-600">Feature B</p>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 h-6 w-6 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <p className="ml-3 text-sm text-indigo-600">Feature C</p>
                                </li>
                            </ul>
                            <div className="mt-8">
                                <a
                                    href="#"
                                    className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700"
                                >
                                    Get Started
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
