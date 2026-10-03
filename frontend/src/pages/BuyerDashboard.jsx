import { useNavigate } from "react-router-dom";

function BuyerDashboard() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-white shadow-sm px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Buyer Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage your RFQs and supplier quotations
                </p>
            </header>

            <main className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Create RFQ
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Create a new request for quotation.
                        </p>

                        <button
                            onClick={() => navigate("/buyer/create-rfq")}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Create RFQ
                        </button>

                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            My RFQs
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View and manage your submitted RFQs.
                        </p>

                        <button
                            onClick={() => navigate("/buyer/my-rfqs")}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            View RFQs
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Quotations
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View quotations received from suppliers.
                        </p>

                        <button
                            onClick={() => navigate("/buyer/my-rfqs")}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            View Quotations
                        </button>
                        
                    </div>

                </div>

            </main>

        </div>
    );
}

export default BuyerDashboard;