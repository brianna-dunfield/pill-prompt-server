import schedule from 'node-schedule';
import nodeMailer from 'nodemailer';
import {getUserMedications} from '../models/medications.js';


const transporter = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD
    },
})

const sendEmail = async (to, subject, text)=>{
    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to,
            subject,
            text,
        }
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    }catch (error){
        console.error(error);
    }
}

const scheduleJob = (userEmail, medicationName, doseTime, userId) =>{
    const [hour, minute, second] = doseTime.split(':');


    const job = schedule.scheduleJob({hour: parseInt(hour), minute: parseInt(minute)}, async () =>{
        try{
            await sendEmail(
                userEmail,
                `This is a reminder to take the following medications: ${medicationName.join(", ")}. Please follow this link: http://localhost:5173/prompt/${userId}?medications=${medicationName.join(',')}`
            )
        }catch(error){
            console.error(error);
        }
    })
    return job;
}

const scheduleAllMedications = async () => {
    try {
        const medications = await getUserMedications(1);

        medications.forEach((medication) => {
            const { medication_name, medication_dose_time } = medication;
            scheduleJob(
                process.env.USER_EMAIL,
                medication_name,
                medication_dose_time
            );
        });
    } catch (error) {
        console.error('Error scheduling medications:', error);
    }
};

export {
    scheduleAllMedications
}