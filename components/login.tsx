const Login = () => {
    return (
        <div className="flex items-center  justify-center absolute top-0 left-0 h-full w-full">
            <div className="flex flex-col bg-blue-100 shadow-md px-20 py-10 rounded">

                <h1 className='capitalize text-lg font-medium py-5 text-center'>Authentication</h1>
                <div className="flex my-2">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        @
                    </span>
                    <input name="username" type="password" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />

                </div>

                <div className="flex my-2">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        ⁂
                    </span>
                    <input name="username" type="password" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="key" />

                </div>

                <button className='bg-blue-200 mt-5 py-2 px-10 rounded font-medium text-blue-500'>Continue</button>
            </div>


        </div>
    )
}
export default Login