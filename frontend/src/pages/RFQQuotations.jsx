import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function RFQQuotations() {

    const { rfqId } = useParams();

    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchQuotations = async () => {
        try {

            const response = await api.get(
                `/quotation/rfq/${rfqId}`
            );

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
        fetchQuotations();
    }, [rfqId]);

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
                    Supplier Quotations
                </h1>

                {errorMessage && (
                    <p className="mt-4 text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!errorMessage && quotations.length === 0 && (
                    <div className="mt-6 bg-white p-6 rounded-lg">
                        <p className="text-gray-500">
                            No quotations received yet.
                        </p>
                    </div>
                )}

                <div className="mt-6 space-y-4">

                    {quotations.map((quotation) => (

                        <div
                            key={quotation._id}
                            className="bg-white p-6 rounded-lg shadow-sm"
                        >

                            <h2 className="text-lg font-semibold">
                                {quotation.supplier?.name}
                            </h2>

                            <p className="text-gray-500">
                                {quotation.supplier?.email}
                            </p>

                            <div className="mt-4 space-y-2">

                                <p>
                                    <span className="font-medium">
                                        Price:
                                    </span>{" "}
                                    ₹{quotation.price}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Delivery:
                                    </span>{" "}
                                    {quotation.estimatedDelivery.value}{" "}
                                    {quotation.estimatedDelivery.unit}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Notes:
                                    </span>{" "}
                                    {quotation.notes || "No notes"}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default RFQQuotations;