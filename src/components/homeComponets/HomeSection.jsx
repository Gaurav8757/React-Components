/* eslint-disable react/prop-types */

const HomeSection = ({ homesection }) => {
    return (
        <section className="container-fluid bg-gray-500">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 justify-items-center pt-10 ml-2 mr-2 bg-slate-100">
                {
                    homesection.map((home, idx) => (
                        <div className="grid w-40" key={idx}>
                            <div className="p-2 bg-slate-300 rounded-lg flex justify-items-center justify-center">
                                <img src={`${home.images}`} className="items-center w-20" alt="img" />
                            </div>
                            <div className="text-center">{home.title}</div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default HomeSection;
