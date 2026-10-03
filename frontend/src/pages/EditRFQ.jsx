import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditRFQ() {

    const { rfqId } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchRFQ = async () => {
        try {
            const response = await api.get(`/rfq/buyer/${rfqId}`);

            const rfq = response.data.rfq;

            setProductName(rfq.productName);
            setDescription(rfq.description);
            setQuantity(rfq.quantity);
            setDeliveryLocation(rfq.deliveryLocation);

            setDeadline(
                new Date(rfq.deadline).toISOString().split("T")[0]
            );

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Failed to fetch RFQ"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRFQ();
    }, [rfqId]);

    const handleUpdateRFQ = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await api.put(`/rfq/${rfqId}`, {
                productName,
                description,
                quantity: Number(quantity),
                deliveryLocation,
                deadline
            });

            setSuccessMessage(response.data.message);

            setTimeout(() => {
                navigate("/buyer/my-rfqs");
            }, 1000);

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Failed to update RFQ"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading RFQ...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">

                <h1 className="text-2xl font-bold text-gray-800">
                    Edit RFQ
                </h1>

                <p className="text-gray-500 mt-1 mb-6">
                    Update your request for quotation
                </p>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleUpdateRFQ} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product / Service Name
                        </label>

                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Requirement Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="4"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delivery Location
                        </label>

                        <input
                            type="text"
                            value={deliveryLocation}
                            onChange={(e) => setDeliveryLocation(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deadline
                        </label>

                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                        >
                            Update RFQ
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/buyer/my-rfqs")}
                            className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditRFQ;