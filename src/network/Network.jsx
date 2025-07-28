import axios from "axios";
import Endpoints from "./endpoints";

export default class Network {

  static BANNER_URL = Endpoints.baseURL + "/admin/banner/fetch-public-banner/";
  static FETCH_PUBLIC_EMPLOYEE = Endpoints.baseURL + "/admin/employee/fetch-public-employee/";
  static COURSES_URL = Endpoints.baseURL + "admin/course/fetch-public/";
  static FETCH_TAGS_URL = Endpoints.baseURL + "admin/course/fetch-tags-public/";
  static FETCH_COURSE_SCHEDULR_URL = Endpoints.baseURL + "admin/course/fetchContent-public/";
  static GET_SHORTS_URL = Endpoints.baseURL + "/student/shortVideo/fetch-public/";
  static FETCH_BANNERS_URL = Endpoints.baseURL + "admin/banner/fetch-public-banner/";
  static FETCH_PUBLIC_COURSE_BY_ID_URL = Endpoints.baseURL + 'admin/course/fetch/';
  static BUY_COURSE_SECOND_URL = Endpoints.baseURL + "/admin/course/fetch";
  static FETCH_DOMAIN_URL = Endpoints.baseURL + 'domain/fetch-public?instId=';
  static FETCH_INSTITUTE_URL = Endpoints.baseURL + '/getMetaData/fetch-institute/';
  static FETCH_ACTIVE_ANNOUNCEMENTS_URL = Endpoints.baseURL + '/admin/announcement/fetch-active-announcement/';
  static CREATE_LEAD_FORM_URL = Endpoints.baseURL + 'leadManagement/create-lead-form';

  static async fetchDomain(instId) {
    // console.log("instId", instId);
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_DOMAIN_URL + instId, requestOptions);
    return response.data;
  };

  static async fetchAnnouncements(instId) {
    // console.log("instId", instId);
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_ACTIVE_ANNOUNCEMENTS_URL + instId, requestOptions);
    return response.data;
  };

  static async fetchInstitute(instId) {
    // console.log("instId", instId);
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_INSTITUTE_URL + instId, requestOptions);
    return response.data;
  };

  static async fetchBannerss(instId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.BANNER_URL + "/" + instId,
      requestOptions
    );
    return response.data;
  }

  static async fetchEmployee(instId) {
    const response = await axios.get(this.FETCH_PUBLIC_EMPLOYEE + instId,);
    return response.data;
  }
  static async fetchCourses(instId) {
    let requestOptions = {
      withCredentials: false,
    };
    const response = await axios.get(this.COURSES_URL + instId, requestOptions);
    return response.data;
  };
  static async fetchTags(instId) {
    let requestOptions = {
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_TAGS_URL + instId, requestOptions);
    return response.data;
  };

  static async getShortsApi(body, instId) {
    let requestOptions = {
      withCredentials: false,
    };
    const response = await axios.post(this.GET_SHORTS_URL + instId, body, requestOptions);
    return response.data;
  };

  static async createLeadFormAPI(body, instId) {
    let requestOptions = {
      withCredentials: false,
    };
    const response = await axios.post(this.CREATE_LEAD_FORM_URL, body, requestOptions);
    return response.data;
  };

  static async fetchStudentShorts(instId) {
    let requestOptions = {
      withCredentials: false,
    };
    const response = await axios.get(this.GET_SHORTS_URL + instId, requestOptions);
    return response.data;
  };


  static async fetchCheduleApi(courseId, contentId) {
    let requestOptions = {
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_COURSE_SCHEDULR_URL + courseId + '/' + contentId, requestOptions);

    return response.data;
  };

  static async getBannersApi(instId) {
    let requestOptions = {
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_BANNERS_URL + instId, requestOptions);
    return response.data;
  };

  static async fetchCourseById(courseId) {
    // console.log("instId", instId);
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(this.FETCH_PUBLIC_COURSE_BY_ID_URL + courseId, requestOptions);
    return response.data;
  };

  static async getBuyCourseDetailsSecond(courseId) {
    let requestOptions = {
      // headers: { "X-Auth": token },
      withCredentials: false,
    };
    const response = await axios.get(
      this.BUY_COURSE_SECOND_URL + "/" + courseId,
      requestOptions
    );
    return response.data;
  }

}
