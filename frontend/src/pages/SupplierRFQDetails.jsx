import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function SupplierRFQDetails() {

    const { rfqId } = useParams();
    const navigate = useNavigate();

    const [rfq, setRfq] = useState(null);

    const [price, setPrice] = useState("");
    const [deliveryValue, setDeliveryValue] = useState("");
    const [deliveryUnit, setDeliveryUnit] = useState("days");
    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchRFQ = async () => {
        try {

            const response = await api.get(`/rfq/${rfqId}`);

            setRfq(response.data.rfq);

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to fetch RFQ"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchRFQ();
    }, [rfqId]);


    const handleSubmitQuotation = async (e) => {

        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        try {

            const response = await api.post(
                `/quotation/${rfqId}`,
                {
                    price: Number(price),
                    estimatedDelivery: {
                        value: Number(deliveryValue),
                        unit: deliveryUnit
                    },
                    notes
                }
            );

            setSuccessMessage(response.data.message);

            setPrice("");
            setDeliveryValue("");
            setDeliveryUnit("days");
            setNotes("");

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to submit quotation"
            );

        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p>Loading RFQ...</p>
            </div>
        );
    }


    if (!rfq) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto">

                    <p className="text-red-600">
                        {errorMessage || "RFQ not found"}
                    </p>

                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto">

                <button
                    onClick={() => navigate("/supplier/rfqs")}
                    className="text-blue-600 hover:text-blue-800 mb-6"
                >
                    ← Back to RFQs
                </button>


                {/* RFQ Details */}

                <div className="bg-white p-6 rounded-lg shadow-sm">

                    <h1 className="text-2xl font-bold text-gray-800">
                        {rfq.productName}
                    </h1>

                    <p className="mt-3 text-gray-600">
                        {rfq.description}
                    </p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <p className="font-medium text-gray-700">
                                Quantity
                            </p>

                            <p className="text-gray-600">
                                {rfq.quantity}
                            </p>
                        </div>


                        <div>
                            <p className="font-medium text-gray-700">
                                Delivery Location
                            </p>

                            <p className="text-gray-600">
                                {rfq.deliveryLocation}
                            </p>
                        </div>


                        <div>
                            <p className="font-medium text-gray-700">
                                Deadline
                            </p>

                            <p className="text-gray-600">
                                {new Date(
                                    rfq.deadline
                                ).toLocaleDateString()}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Submit Quotation */}

                <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">

                    <h2 className="text-xl font-bold text-gray-800">
                        Submit Quotation
                    </h2>

                    {successMessage && (
                        <p className="mt-4 text-green-600">
                            {successMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p className="mt-4 text-red-600">
                            {errorMessage}
                        </p>
                    )}


                    <form
                        onSubmit={handleSubmitQuotation}
                        className="mt-6"
                    >

                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price
                            </label>

                            <input
                                type="number"
                                min="1"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter your quotation price"
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                            />

                        </div>


                        <div className="mb-4">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estimated Delivery
                            </label>

                            <div className="flex gap-3">

                                <input
                                    type="number"
                                    min="1"
                                    required
                                    value={deliveryValue}
                                    onChange={(e) =>
                                        setDeliveryValue(e.target.value)
                                    }
                                    placeholder="10"
                                    className="flex-1 border border-gray-300 rounded-md px-4 py-2"
                                />

                                <select
                                    value={deliveryUnit}
                                    onChange={(e) =>
                                        setDeliveryUnit(e.target.value)
                                    }
                                    className="border border-gray-300 rounded-md px-4 py-2"
                                >
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                </select>

                            </div>

                        </div>


                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notes
                            </label>

                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter any additional notes"
                                rows="4"
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                            />

                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            Submit Quotation
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default SupplierRFQDetails;