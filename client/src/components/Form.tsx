import React, { useState, FormEvent } from 'react';

import { PredictResponse } from '../model/PredictResponse';
import Prediction from './Prediction';
import PredictionError from './PredictionError';

const Form: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [longitude, setLongitude] = useState<number>(-118.36);
    const [latitude, setLatitude] = useState<number>(34.16);
    const [housingMedianAge, setHousingMedianAge] = useState<number>(32.0);
    const [totalRooms, setTotalRooms] = useState<number>(455.0);
    const [totalBedrooms, setTotalBedrooms] = useState<number>(556.0);
    const [population, setPopulation] = useState<number>(989.0);
    const [households, setHouseholds] = useState<number>(493.0);
    const [medianIncome, setMedianIncome] = useState<number>(4.0764);
    const [oceanProximity, setOceanProximity] = useState<string>('<1H OCEAN');
    const [predictResponse, setPredictResponse] = useState<PredictResponse | undefined>(undefined);

    let componentToShow;
    switch (predictResponse) {
        case undefined:
          componentToShow = <PredictionError message={'No prediction yet'} />;
          break;
        default:
          componentToShow = <Prediction predictionId={predictResponse?.predictionId}/>;
          break;
      }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers as needed
                },
                //body: JSON.stringify({ firstName: firstName, lastName: lastName,  email: email }), // replace with your actual payload
                body: JSON.stringify({
                    "longitude": longitude,
                    "latitude": latitude,
                    "housing_median_age": housingMedianAge,
                    "total_rooms": totalRooms,
                    "total_bedrooms": totalBedrooms,
                    "population": population,
                    "households": households,
                    "median_income": medianIncome,
                    "ocean_proximity": oceanProximity
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(`data=${JSON.stringify(data)}`)

            const predictResponse: PredictResponse = data;
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
                        htmlFor="longitude"
                    >
                        Longitude
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="longitude"
                        type="number"
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(parseInt(e.target.value))}
                    />
                </div>
                <div className="md:ml-2">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="latitude"
                    >
                        Latitude
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="latitude"
                        type="number"
                        placeholder="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="totalRooms"
                    >
                        Total Rooms
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="totalRooms"
                        type="number"
                        placeholder="Total Rooms"
                        value={totalRooms}
                        onChange={(e) => setTotalRooms(parseInt(e.target.value))}
                    />
                </div>
                <div className="md:ml-2">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="totalBedrooms"
                    >
                        Total Bedrooms
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="totalBedrooms"
                        type="number"
                        placeholder="Total Bedrooms"
                        value={totalBedrooms}
                        onChange={(e) => setTotalBedrooms(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="housingMedianAge"
                    >
                        Housing Median Age
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="housingMedianAge"
                        type="number"
                        placeholder="housingMedianAge"
                        value={housingMedianAge}
                        onChange={(e) => setHousingMedianAge(parseInt(e.target.value))}
                    />
                </div>
                <div className="md:ml-2">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="medianIncome"
                    >
                        Median Income
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="medianIncome"
                        type="number"
                        placeholder="Median Income"
                        value={medianIncome}
                        onChange={(e) => setMedianIncome(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="population"
                    >
                        Population
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="population"
                        type="number"
                        placeholder="Population"
                        value={population}
                        onChange={(e) => setPopulation(parseInt(e.target.value))}
                    />
                </div>
                <div className="md:ml-2">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="households"
                    >
                        Households
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        id="households"
                        type="number"
                        placeholder="Households"
                        value={households}
                        defaultValue={493.0}
                        onChange={(e) => setHouseholds(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="oceanProximity"
                >
                    Ocean Proximity
                </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    id="oceanProximity"
                    type="text"
                    placeholder="Ocean Proximity"
                    value={oceanProximity}
                    defaultValue={"<1H OCEAN"}
                    onChange={(e) => setOceanProximity(e.target.value)}
                />
            </div>
           

            <div className="mb-6 text-center">
                <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Predict
                </button>
            </div>

           {componentToShow}

        </form>
    );
};

export default Form;