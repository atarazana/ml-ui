import React, { useState, FormEvent } from 'react';

import { PredictResponse } from '../model/PredictResponse';


const Form: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [predictResponse, setPredictResponse] = useState<PredictResponse>();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
                body: JSON.stringify({ firstName: firstName, lastName: lastName,  email: email }), // replace with your actual payload
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const predictResponse: PredictResponse = await response.json();
            setPredictResponse(predictResponse);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="firstName"
                    >
                        First Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="md:ml-2">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="lastName"
                    >
                        Last Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
           

            <div className="mb-6 text-center">
                <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register Account
                </button>
            </div>


        </form>
    );
};

export default Form;