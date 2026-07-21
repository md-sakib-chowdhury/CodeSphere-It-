require('dotenv').config();
const mongoose = require('mongoose');
const ContactPage = require('./models/ContactPage');

const data = {
    bannerTitle: 'Contact',
    breadcrumbCurrent: 'Contact',
    introHeading: 'Best IT Services Company in BD.\nFeel Free Contact Us Today and Get Your Solution.',
    introText: 'Reach out to us for personalized solutions tailored to your needs. Our expert team is here to help you achieve your goals.',
    phone: '+880 18 4418 5480',
    email: 'info@amanahit.com',
    addressLine1: 'House-774, Road-11, Avenue-02',
    addressLine2: 'Mirpur DOHS, Dhaka-1216',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3!2d90.3667!3d23.8245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzI4LjIiTiA5MMKwMjInMDAuMSJF!5e0!3m2!1sen!2sbd!4v1234567890',
    serviceTypes: [
        'Product',
        'IT Consultancy',
        'Managed IT',
        'Digital Marketing',
        'Brand & Promotion',
        'Domain & Hosting',
        'Technology Training',
        'Offshore Development',
        'Others',
    ],
    formLabels: {
        email: 'Email',
        companyName: 'Company Name',
        fullName: 'Full Name',
        companyAddress: 'Company Address',
        phone: 'Phone Number',
        officialWebsite: 'Official Website',
        numberOfEmployee: 'Numbers of Employee',
        communicationPreference: 'Communication Preference',
        serviceType: 'Service Type',
        iAm: 'I am...',
        message: 'Message',
        submitBtn: 'Submit',
        submittingBtn: 'Sending...',
        successMessage: '✅ Message sent! We will get back to you soon.',
    },
};

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        let existing = await ContactPage.findOne();
        if (existing) {
            Object.assign(existing, data);
            await existing.save();
            console.log('Updated existing ContactPage document with default content.');
        } else {
            await ContactPage.create(data);
            console.log('Created new ContactPage document with default content.');
        }

        console.log('\nDone!');
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

run();