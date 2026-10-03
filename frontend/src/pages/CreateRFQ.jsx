import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateRFQ() {

    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [deadline, setDeadline] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleCreateRFQ = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        try {

            const response = await api.post("/rfq/create", {
                productName,
                description,
                quantity: Number(quantity),
                deliveryLocation,
                deadline
            });

            setSuccessMessage(response.data.message);

            setProductName("");
            setDescription("");
            setQuantity("");
            setDeliveryLocation("");
            setDeadline("");

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message || "Failed to create RFQ"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">

                <h1 className="text-2xl font-bold text-gray-800">
                    Create RFQ
                </h1>

                <p className="text-gray-500 mt-1">
                    Create a new request for quotation
                </p>

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
                    onSubmit={handleCreateRFQ}
                    className="mt-6"
                >

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Product / Service Name
                        </label>

                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            placeholder="Example: Office Chairs"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="4"
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            placeholder="Describe your requirement"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Quantity
                        </label>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            min="1"
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            placeholder="Example: 500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Delivery Location
                        </label>

                        <input
                            type="text"
                            value={deliveryLocation}
                            onChange={(e) => setDeliveryLocation(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            placeholder="Example: Hyderabad"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Deadline
                        </label>

                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Create RFQ
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateRFQ;