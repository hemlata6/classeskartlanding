import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { BASE_URL } from '../network/endpoints';
import { motion, AnimatePresence } from 'framer-motion';
import Network from '../network/Network';
import instId from '../network/instituteId';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EnquiryPopup = ({ open, onClose }) => {

  const theme = useTheme();
  const param = useParams();
  const instituteSlug = param?.instituteSlug;
  const [domain, setDomain] = useState('');

  // Converts kebab-case to title case with spaces, e.g. cs-amit-vohra => CS Amit Vohra
  // Handles abbreviations and names flexibly
  const kebabToTitleCaseWithAbbreviations = (kebab) => {
    if (!kebab) return "";
    return kebab
      .split("-")
      .map(word => {
        // If word is all uppercase or length <= 3, treat as abbreviation
        if (/^[A-Z]+$/.test(word) || word.length <= 3) {
          return word.toUpperCase();
        }
        // Otherwise, capitalize first letter
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  useEffect(() => {
    const path = window.location.pathname; // e.g. "/", "/503/vg-study-hub", "/483/cs-amit-vohra"
    const pathParts = path.split("/"); // Split the path into parts
    let formattedDomain = ""; // default for home page
    // If path is like /483/cs-amit-vohra, get the second part as slug
    if (pathParts.length >= 3 && pathParts[2]) {
      const slug = pathParts[2]; // e.g. "cs-amit-vohra"
      formattedDomain = kebabToTitleCaseWithAbbreviations(slug);
      // console.log("Formatted domain from URL:", formattedDomain);
      setDomain(formattedDomain);
      // console.log("Current domain:", formattedDomain);
    } else if (path !== "/" && pathParts.length >= 2 && pathParts[1]) {
      const slug = pathParts[1]; // e.g. "vg-study-hub"
      formattedDomain = kebabToTitleCaseWithAbbreviations(slug);
      setDomain(formattedDomain);
      // console.log("Current domain:", formattedDomain);
    }
  }, []);

  const [courseId, setCourseId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    // email: '',
    phone: '',
    course: '',
    message: '',
    domain: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [courseList, setCourseList] = useState([]);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedGrandChild, setSelectedGrandChild] = useState('');
  // const [domainId, setDomainId] = useState(''); 

  const fetchTestSeriesDomainIds = async (domainNameFromURL) => {
    try {
      const response = await Network.fetchDomain(instId);
      const domains = response?.domains || [];

      // Find the main "Test Series" domain
      const testSeriesDomain = domains.find(domain =>
        domain.name && domain.name.toLowerCase().includes("test series")
      );

      if (!testSeriesDomain) {
        console.log("No 'Test Series' domain found.");
        return [];
      }

      const matchedIds = [];

      // Recursive function to find matching name and collect ID (including children)
      const collectMatchingIds = (nodes, parentMatched = false) => {
        for (const node of nodes) {
          // If parent domain matches, collect all child IDs
          const isMatched = node.name && node.name.toLowerCase().includes(domainNameFromURL?.toLowerCase());
          if (isMatched) {
            matchedIds.push(node.id);
            // If node has children, collect their IDs too
            if (node.child && node.child.length > 0) {
              node.child.forEach(child => matchedIds.push(child.id));
            }
          }
          // If parentMatched is true, collect all child IDs
          if (parentMatched && node.id) {
            matchedIds.push(node.id);
          }
          // Continue recursion
          if (node.child && node.child.length > 0) {
            collectMatchingIds(node.child, isMatched || parentMatched);
          }
        }
      };

      collectMatchingIds([testSeriesDomain]); // Start from Test Series
      // console.log("Matched IDs for domain:", domainNameFromURL, matchedIds);
      // setDomainId(matchedIds[0] || '');
      return matchedIds;
    } catch (error) {
      console.error("Error fetching Test Series domain IDs:", error);
      return [];
    }
  };

  const fetchAllCourse = async () => {
    try {
      const response = await Network.fetchCourses(instId);
      let activeCourse = response?.courses.filter(course => course.active === true);
      // If on a domain-specific page, filter courses by domainId
      // console.log("activeCourse:", activeCourse);
      if (domain && domain.length > 0) {
        const matchedIds = await fetchTestSeriesDomainIds(domain);
        if (matchedIds.length > 0) {
          activeCourse = activeCourse.filter(course => {
            if (Array.isArray(course.domain)) {
              return course.domain.some(d => matchedIds.includes(d.id));
            } else if (course.domain && typeof course.domain === 'object') {
              return matchedIds.includes(course.domain.id);
            } else if (course.domainId) {
              return matchedIds.includes(course.domainId);
            }
            return false; 
          });
        } else {
          // Fallback to name-based filtering if no matchedIds found
          const filteredByName = activeCourse.filter(course => {
            let courseDomainName = '';
            if (Array.isArray(course.domain)) {
              courseDomainName = course.domain.map(d => d.name).join(' ');
            } else if (course.domain && typeof course.domain === 'object') {
              courseDomainName = course.domain.name;
            } else {
              courseDomainName = course.domain || course.title || '';
            }
            return courseDomainName.toLowerCase().includes(domain?.toLowerCase());
          });
          // If no courses match by name, show all active courses
          activeCourse = filteredByName.length > 0 ? filteredByName : response?.courses.filter(course => course.active === true);
        }
      }
      setCourseList(activeCourse);
      // console.log('courseList after filtering:', activeCourse);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (domain) {
      fetchAllCourse();
    } else {
      fetchAllCourse();
    }
  }, [domain]);

  useEffect(() => {
    if (domain) {
      fetchTestSeriesDomainIds(domain);
    }
  }, [domain]);


  // const courses = [
  //   'CA Foundation',
  //   'CA Intermediate',
  //   'CA Final',
  //   'CS Executive',
  //   'CS Professional',
  //   'CMA Foundation',
  //   'CMA Intermediate',
  //   'CMA Final',
  // ];

  const handleInputChangeCCourse = (e, id) => {
    const { value } = e.target;
    setCourseId(value);
  };

  const handleDomainChange = (e) => {
    const { value } = e.target;
    setSelectedDomain(value);
    setSelectedChild(''); // Reset child selection
    setSelectedGrandChild(''); // Reset grandchild selection
  };

  const handleChildChange = (e) => {
    const { value } = e.target;
    setSelectedChild(value);
    setSelectedGrandChild(''); // Reset grandchild selection
  };

  const handleGrandChildChange = (e) => {
    const { value } = e.target;
    setSelectedGrandChild(value);
  };

  // Get available children based on selected domain
  const getAvailableChildren = () => {
    if (!selectedDomain || !selectedDomain.children) return [];
    return selectedDomain.children;
  };

  // Get available grandchildren based on selected child
  const getAvailableGrandChildren = () => {
    if (!selectedChild || !selectedChild.children) return [];
    return selectedChild.children;
  };

  // Filter domains to show only CS
  const getCSChildrenOnly = () => {
    if (!selectedDomain || !selectedDomain.children) return [];
    return selectedDomain.children.filter(child =>
      child.name && child.name.toLowerCase().includes('cs')
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (!formData.name || !formData.email || !formData.phone || !formData.course) {
  //     setSnackbar({
  //       open: true,
  //       message: 'Please fill in all required fields',
  //       severity: 'error',
  //     });
  //     return;
  //   }



  //   // Simulate form submission
  //   setSnackbar({
  //     open: true,
  //     message: 'Enquiry submitted successfully! We will contact you soon.',
  //     severity: 'success',
  //   });

  //   // Reset form and close popup
  //   setFormData({
  //     name: '',
  //     email: '',
  //     phone: '',
  //     course: '',
  //     message: '',
  //   });

  //   // Reset domain selections
  //   setSelectedDomain('');
  //   setSelectedChild('');
  //   setSelectedGrandChild('');
  //   setCourseId('');

  //   setTimeout(() => {
  //     onClose();
  //   }, 1500);
  // };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.course) {
      alert('Please fill all fields');
      return;
    }
    try {
      // If course is an object, send its id or title
      let courseValue = formData.course;
      if (typeof courseValue === 'object' && courseValue !== null) {
        courseValue = courseValue.id || courseValue.title || '';
      }
      const payload = {
        ...formData,
        course: courseValue,
        instId: instId,
        // domain: domain // send formatted domain
      };

      const response = await Network.createLeadFormAPI(payload, instId);
      // const response = await axios.post(`${BASE_URL}counseling-session`, payload);
      onClose();
      setFormData({ name: '', phone: '', course: '', message: '' });
      setCourseId('');
    } catch (error) {
      console.error('Error booking session:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setCourseId(value);
    setFormData(prev => ({
      ...prev,
      course: value
    }));
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                overflow: 'visible',
              },
            }}
            BackdropProps={{
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)',
              },
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Header */}
              <DialogTitle
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: 'white',
                  p: 3,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: '20px 20px 0 0',
                  mb: 2,
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <SchoolIcon sx={{ fontSize: '1.5rem' }} />
                </motion.div>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: 'white' }}>
                    Quick Enquiry
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 , color: 'white'}}>
                    Get personalized guidance for your career goals
                  </Typography>
                </Box>

                <IconButton
                  onClick={onClose}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>

              {/* Content */}
              <DialogContent sx={{ p: 4 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.9)',
                            },
                            '&.Mui-focused': {
                              background: 'rgba(255, 255, 255, 1)',
                            },
                          },
                        }}
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={6}> */}
                    {/* <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.9)',
                            },
                            '&.Mui-focused': {
                              background: 'rgba(255, 255, 255, 1)',
                            },
                          },
                        }}
                      /> */}
                    {/* </Grid> */}

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.9)',
                            },
                            '&.Mui-focused': {
                              background: 'rgba(255, 255, 255, 1)',
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.9)',
                            },
                            '&.Mui-focused': {
                              background: 'rgba(255, 255, 255, 1)',
                            },
                          },
                        }}
                      >
                        <InputLabel>Select Course</InputLabel>
                        <Select
                          name="course"
                          value={courseId}
                          onChange={handleCourseChange}
                          label="Select Course"
                        >
                          {courseList.map((course) => (
                            <MenuItem key={course.id} value={course}>
                              {course.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Child Selection - Only show CS children */}
                    {/* {selectedDomain && selectedDomain.child && selectedDomain.child.length > 0 && (
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.8)',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.9)',
                              },
                              '&.Mui-focused': {
                                background: 'rgba(255, 255, 255, 1)',
                              },
                            },
                          }}
                        >
                          <InputLabel>Select Course Type (CS Only)</InputLabel>
                          <Select
                            name="child"
                            value={selectedChild}
                            onChange={handleChildChange}
                            label="Select Course Type (CS Only)"
                          >
                            {getCSChildrenOnly().map((child) => (
                              <MenuItem key={child.id} value={child}>
                                {child.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )} */}

                    {/* Grand Child Selection */}
                    {/* {selectedChild && selectedChild.child && selectedChild.child.length > 0 && (
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.8)',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.9)',
                              },
                              '&.Mui-focused': {
                                background: 'rgba(255, 255, 255, 1)',
                              },
                            },
                          }}
                        >
                          <InputLabel>Select Specific Course</InputLabel>
                          <Select
                            name="grandchild"
                            value={selectedGrandChild}
                            onChange={handleGrandChildChange}
                            label="Select Specific Course"
                          >
                            {getAvailableGrandChildren().map((grandchild) => (
                              <MenuItem key={grandchild.id} value={grandchild}>
                                {grandchild.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )} */}

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Note (Optional)"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.9)',
                            },
                            '&.Mui-focused': {
                              background: 'rgba(255, 255, 255, 1)',
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>

              {/* Actions */}
              <DialogActions sx={{ p: 4, pt: 0 }}>
                <Grid container spacing={2}>
                  {/* <Grid item xs={6}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ width: '100%' }}
                    >
                      <Button
                        onClick={onClose}
                        variant="outlined"
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: '12px',
                          borderColor: theme.palette.grey[300],
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            borderColor: theme.palette.grey[400],
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                          fontSize: '0.650rem',
                        }}
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  </Grid> */}
                  <Grid item xs={12}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ width: '100%' }}
                    >
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                            boxShadow: `0 12px 40px ${theme.palette.primary.main}60`,
                          },
                          fontSize: '1rem',
                        }}
                      >
                        Submit Enquiry
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </DialogActions>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(103, 126, 234, 0.1)',
                  borderRadius: '50%',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(103, 126, 234, 0.2)',
                  zIndex: -1,
                }}
              />

              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  bottom: '-15px',
                  left: '-15px',
                  width: '30px',
                  height: '30px',
                  background: 'rgba(118, 75, 162, 0.1)',
                  borderRadius: '6px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(118, 75, 162, 0.2)',
                  zIndex: -1,
                }}
              />
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EnquiryPopup;
