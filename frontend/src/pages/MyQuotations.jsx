import { useEffect, useState } from "react";
import api from "../services/api";

function MyQuotations() {

    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchMyQuotations = async () => {

        try {

            const response = await api.get("/quotation/my");

            setQuotations(response.data.quotations);

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to fetch quotations"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchMyQuotations();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p>Loading quotations...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-2xl font-bold text-gray-800">
                    My Quotations
                </h1>

                <p className="text-gray-500 mt-1">
                    View quotations you have submitted
                </p>

                {errorMessage && (
                    <p className="mt-6 text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!errorMessage && quotations.length === 0 && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-500">
                            You have not submitted any quotations yet.
                        </p>
                    </div>
                )}

                {!errorMessage && quotations.length > 0 && (
                    <div className="mt-6 space-y-4">

                        {quotations.map((quotation) => (

                            <div
                                key={quotation._id}
                                className="bg-white p-6 rounded-lg shadow-sm"
                            >

                                <h2 className="text-xl font-semibold text-gray-800">
                                    {quotation.rfq?.productName}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {quotation.rfq?.description}
                                </p>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                                    <div>
                                        <p className="font-medium text-gray-700">
                                            Price
                                        </p>

                                        <p className="text-gray-600">
                                            ₹{quotation.price}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-700">
                                            Estimated Delivery
                                        </p>

                                        <p className="text-gray-600">
                                            {quotation.estimatedDelivery.value}{" "}
                                            {quotation.estimatedDelivery.unit}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-700">
                                            RFQ Deadline
                                        </p>

                                        <p className="text-gray-600">
                                            {new Date(
                                                quotation.rfq.deadline
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-4">

                                    <p className="font-medium text-gray-700">
                                        Notes
                                    </p>

                                    <p className="text-gray-600">
                                        {quotation.notes || "No notes"}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default MyQuotations;