import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BrowseRFQs() {

    const navigate = useNavigate();

    const [rfqs, setRfqs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchRFQs = async () => {

        try {

            setLoading(true);
            setErrorMessage("");

            const response = await api.get("/rfq/", {
                params: search ? { search } : {}
            });

            setRfqs(response.data.rfqs);

        } catch (error) {

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to fetch RFQs"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchRFQs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRFQs();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-2xl font-bold text-gray-800">
                    Browse RFQs
                </h1>

                <p className="text-gray-500 mt-1">
                    Find requests for quotation from buyers
                </p>

                <form
                    onSubmit={handleSearch}
                    className="mt-6 flex gap-3"
                >

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by product name"
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 bg-white"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                    >
                        Search
                    </button>

                </form>

                {loading && (
                    <p className="mt-6 text-gray-600">
                        Loading RFQs...
                    </p>
                )}

                {errorMessage && (
                    <p className="mt-6 text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!loading && !errorMessage && rfqs.length === 0 && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-500">
                            No RFQs found.
                        </p>
                    </div>
                )}

                {!loading && !errorMessage && (
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

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">

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
                                        {new Date(
                                            rfq.deadline
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate(`/supplier/rfq/${rfq._id}`)
                                    }
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    View Details
                                </button>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default BrowseRFQs;