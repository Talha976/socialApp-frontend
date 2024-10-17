import React from 'react';

const Modal = ({ show, handleClose, handleSave, title, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-2xl w-full max-w-lg p-8 mx-4"
                style={{ maxHeight: '90vh', marginTop: '5vh', marginBottom: '5vh' }}>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-6 max-h-[60vh] overflow-y-auto text-gray-700">
                    {children}
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={handleClose}
                        className="bg-gray-100 text-gray-800 rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-200 focus:outline-none"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white rounded-md px-4 py-2 transition-colors duration-200 hover:bg-blue-700 focus:outline-none"
                    >
                        Save Changes
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Modal;



// import React from 'react';

// const Modal = ({ show, handleClose, title, children }) => {
//     if (!show) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
//             <div className="bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-2xl w-full max-w-lg p-8 mx-4"
//                  style={{ maxHeight: '90vh', marginTop: '5vh', marginBottom: '5vh' }}>
//                 <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//                     <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
//                     <button
//                         onClick={handleClose}
//                         className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>
//                 <div className="mt-6 max-h-[60vh] overflow-y-auto text-gray-700">
//                     {children}
//                 </div>
//                 <div className="mt-8 flex justify-end space-x-4">
//                     <button
//                         onClick={handleClose}
//                         className="bg-gray-100 text-gray-800 rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-200 focus:outline-none"
//                     >
//                         Close
//                     </button>
//                     <button
//                         onClick={handleClose}
//                         className="bg-blue-600 text-white rounded-md px-4 py-2 transition-colors duration-200 hover:bg-blue-700 focus:outline-none"
//                     >
//                         Save Changes
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;
