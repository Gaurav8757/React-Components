const Mission = () => {
    return (
        <section className="container-fluid relative bg-gradient-to-r from-indigo-400 to-cyan-400">
            <div className="container-fluid h-3/4 items-center ml-2 mr-2 pb-4 bg-gradient-to-r from-indigo-400 to-cyan-400">
                <h1 className="text-3xl font-semibold pt-6 lg:mb-16">Mission &amp; Vision</h1>

                <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly text-justify shadow-2xl p-10 items-center">
                    <div className="mb-6 lg:mb-0 lg:mr-5 h-auto border border-gray-200 rounded-lg  dark:border-gray-100">
                        <img
                            src="/mission.jpg" // Add the actual image source
                            alt="company img"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                    <div className="max-w-lg lg:max-w-3xl sm:max-w-lg md:max-w-xl xl:max-w-3xl ">
                        <h1 className="text-2xl mb-4 text-white font-medium">HOW TO USE COMPANY NETWORK OF ELEEDOM IMF PRIVATE LIMITED</h1>

                        <p className="mb-4 ">
                            It helps you find out other directorships of an Indian director and where else he has business interests. The feature is available for unlimited use in Company360 platform. Here is the video showing how you can explore company networks to discover hidden relationships between companies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Mission;
