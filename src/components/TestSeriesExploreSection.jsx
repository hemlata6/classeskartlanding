import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid2, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Network from "../network/Network";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Banners } from "./BannerSlider.js";
import { BASE_URL } from "../network/endpoints";
import instId from "../network/instituteId";
import axios from "axios";
import ContactUs from "./ContactSection";
import TestSeriesShowcaseSection from "./TestSeriesShowcaseSection";
import BannerSlider from "./BannerSlider";
import DomainBannerSlider from "./DomainBannerSlider";

export default function TestSeriesExploreSection() {

    const location = useLocation();
    const firstFilter = location?.state?.selectedLevelOne;
    const secondFilter = location?.state?.selectedLevelTwo;
    const thirdFilter = location?.state?.selectedLevelThree;
    const param = useParams();
    const selectedDomain = Number(param?.instId);
    const instituteSlug = param?.instituteSlug; // Get the instituteSlug parameter
    const [endpoints, setEndpoints] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [testSeries, setTestSeries] = useState([]);
    const timeoutRef = useRef(null);
    const hasSubmitted = localStorage.getItem('formSubmitted') === 'true';

    // console.log("Selected Domain:", instituteSlug);

    useEffect(() => {
        if (hasSubmitted) return;

        const handleUserActivity = () => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setShowModal(true);
            }, 3000); // 3 seconds
        };

        // Attach activity listeners
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);

        // Start inactivity timer initially
        handleUserActivity();

        return () => {
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
            clearTimeout(timeoutRef.current);
        };
    }, [hasSubmitted]);

    useEffect(() => {
        getInstituteDetail();
    }, [])

    const getInstituteDetail = async () => {
        try {
            let requestOptions = {
                // headers: { "X-Auth": token },
                withCredentials: false,
            };
            const response = await axios.get(
                BASE_URL + "/getMetaData/fetch-institute/" + instId,
                requestOptions
            );
            if (response?.data?.errorCode === 0) {
                setEndpoints(response?.data?.instituteTechSetting?.mediaUrl)
                // Endpoints = response?.data?.instituteTechSetting?.mediaUrl
            };
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="domain-fliter" style={{ padding: "20px" }}>
            {/* {showModal && <ContactUs handleClose={() => setShowModal(false)} testSeries={testSeries} />} */}
            {/* <Banners endpointsUrl={endpoints} thirdFilter={selectedDomain} /> */}
            {/* <BannerSlider /> */}
            {/* <DomainBannerSlider instituteSlug={instituteSlug} /> */}
            <TestSeriesShowcaseSection 
                endpointsUrl={endpoints} 
                firstFilter={firstFilter} 
                secondFilter={secondFilter} 
                thirdFilter={thirdFilter} 
                setTestSeries={setTestSeries} 
                selectedDomain={selectedDomain}
                instituteSlug={instituteSlug}
            />
        </div>
    )
}
