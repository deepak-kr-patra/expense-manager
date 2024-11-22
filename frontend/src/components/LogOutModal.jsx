import useLogout from "../hooks/auth/useLogout";


const LogOutModal = ({ toggleLogoutModal }) => {

    const { loading, logout } = useLogout();

    return (
        <div className='modal-container' id='logout-modal-container'>
            <div className="modal-box max-sm:p-4 bg-[#F4F5F7]">
                <h3 className="font-bold text-lg max-sm:text-[16px]">LOG OUT FROM YOUR ACCOUNT?</h3>
                <div className='flex justify-end mt-6 gap-2'>
                    <button
                        className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-gray-300"
                        onClick={() => toggleLogoutModal()}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn max-sm:min-h-10 max-sm:h-10 max-sm:px-2 bg-[#cb2727] hover:bg-[#a82e2e] text-white"
                        onClick={() => logout()}
                        disabled={loading}
                    >
                        {loading ? <span className='loading loading-spinner'></span> : "Logout"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogOutModal