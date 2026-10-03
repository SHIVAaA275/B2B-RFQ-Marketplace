import { useNavigate } from "react-router-dom";

function SupplierDashboard() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-white shadow-sm px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Supplier Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Find RFQs and manage your quotations
                </p>
            </header>

            <main className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        

                        <p className="text-gray-500 mt-2">
                            Find available requests for quotation.
                        </p>

                        <button
                            onClick={() => navigate("/supplier/rfqs")}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Browse RFQs
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Submit Quotation
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Submit your quotation for an RFQ.
                        </p>

                        <button
                            onClick={() => navigate("/supplier/rfqs")}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            View RFQs
                        </button>
                        
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">
                            My Quotations
                        </h2>

                        <p className="text-gray-500 mt-2">
                            View quotations you have submitted.
                        </p>

                        <button
                            onClick={() => navigate("/supplier/my-quotations")}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            My Quotations
                        </button>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default SupplierDashboard;