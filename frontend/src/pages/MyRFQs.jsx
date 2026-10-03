import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyRFQs() {

    const navigate = useNavigate();

    const [rfqs, setRfqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchMyRFQs = async () => {

        try {

            const response = await api.get("/rfq/my");

            setRfqs(response.data.rfqs);

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message || "Failed to fetch RFQs"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchMyRFQs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-gray-600">Loading RFQs...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-2xl font-bold text-gray-800">
                    My RFQs
                </h1>

                <p className="text-gray-500 mt-1">
                    View and manage your submitted RFQs
                </p>

                {errorMessage && (
                    <p className="mt-4 text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!errorMessage && rfqs.length === 0 && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-500">
                            You have not created any RFQs yet.
                        </p>
                    </div>
                )}

                <div className="mt-6 space-y-4">

                    {rfqs.map((rfq) => (

                        <div
                            key={rfq._id}
                            className="bg-white p-6 rounded-lg shadow-sm"
                        >

                            <h2 className="text-xl font-semibold text-gray-800">
                                {rfq.productName}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                {rfq.description}
                            </p>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">

                                <p>
                                    <span className="font-medium">
                                        Quantity:
                                    </span>{" "}
                                    {rfq.quantity}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Location:
                                    </span>{" "}
                                    {rfq.deliveryLocation}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Deadline:
                                    </span>{" "}
                                    {new Date(rfq.deadline).toLocaleDateString()}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Created:
                                    </span>{" "}
                                    {new Date(rfq.createdAt).toLocaleDateString()}
                                </p>

                                <div className="mt-4 flex gap-3">

                                <button
                                    onClick={() =>
                                        navigate(`/buyer/rfq/${rfq._id}/edit`)
                                    }
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>

                                <button
                                    onClick={() =>
                                        navigate(`/buyer/rfq/${rfq._id}/quotations`)
                                    }
                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                    >
                                        View Quotations
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default MyRFQs;