import { FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import './styles.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FormContext } from "../../Providers/FormContext";

const images = [
    { id: 1, name: "Resume1", url: "/resume-images/Resume1.png" },
    { id: 2, name: "Resume2", url: "/resume-images/Resume2.png" },
    { id: 3, name: "Resume3", url: "/resume-images/Resume3.png" },
    { id: 4, name: "Resume4", url: "/resume-images/Resume4.png" },
    { id: 5, name: "Resume5", url: "/resume-images/Resume5.png" },
    { id: 6, name: "Resume6", url: "/resume-images/Resume6.png" },
    { id: 7, name: "Resume7", url: "/resume-images/Resume7.png" },
    { id: 8, name: "Resume8", url: "/resume-images/Resume8.png" },
    { id: 9, name: "Resume9", url: "/resume-images/Resume9.png" },
    { id: 10, name: "Resume10", url: "/resume-images/Resume10.png" },
    { id: 11, name: "Resume11", url: "/resume-images/Resume11.png" },
    { id: 12, name: "Resume12", url: "/resume-images/Resume12.png" }
];

const Resume_Templates = () => {
    const navigate = useNavigate();
    const { setTemplateId } = useContext(FormContext);
    const { resumeId } = useContext(AuthContext);
    console.log(resumeId);
    
    const handleImageClick = (resumeType, r) => {
        setTemplateId(r);
        navigate('/resume-templates/personal-info-form', { state: { resumeType } });
    };

    return (
        <div className="shadow-md border-b-4 mt-12 border-b-green-500 border-r-2 border-r-green-500 p-5 lg:p-10 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <h1 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent text-center mb-4 lg:mb-6">
                Get Your Dream Job with Our Resume Builder
            </h1>
            <div className="flex items-center gap-2 mb-3 lg:mb-4 justify-center">
                <FaRegStar className="text-green-500 text-xl lg:text-2xl" />
                <h2 className="text-xl lg:text-3xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    Popular Templates
                </h2>
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                initialSlide={Math.floor(images.length / 2)}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {images.map((image) => (
                    <SwiperSlide key={image.id} className="relative">
                        <div className="flex flex-col items-center justify-center p-2 lg:p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            <img
                                src={image.url}
                                className="w-full h-auto mb-2 rounded-lg"
                                alt={image.name}
                            />
                            <a
                                href="#_"
                                className="relative inline-block text-sm lg:text-lg group mt-4"
                                onClick={(e) => { e.preventDefault(); handleImageClick(image.name.toLowerCase(), image.id); }}
                            >
                                <span className="relative z-10 block px-4 lg:px-5 py-2 lg:py-3 overflow-hidden font-medium leading-tight text-gray-800 dark:text-gray-300 transition-colors duration-300 ease-out border-2 border-green-500 rounded-lg group-hover:text-white">
                                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50 dark:bg-gray-700"></span>
                                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-green-500 group-hover:-rotate-180 ease"></span>
                                    <span className="relative">Use</span>
                                </span>
                                <span className="absolute bottom-0 right-0 w-full h-10 lg:h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-green-500 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Outlet />
        </div>
    );
};

export default Resume_Templates;
