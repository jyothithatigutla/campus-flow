"use client";

// Types
export type Period = {
    id: string;
    subject: string;
    code: string;
    faculty: string;
    room: string;
    type: "Lecture" | "Lab" | "Break" | "Activity" | "Research";
    time: string;
};

export type DaySchedule = {
    day: string;
    periods: Period[];
};

export type TimetableData = {
    [year: string]: {
        [section: string]: DaySchedule[];
    };
};

// Mock Data based on images & prompt requirements
export const TIMETABLE_DATA: TimetableData = {
    "1st Year": {
        "Section A": [
            {
                day: "Monday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "Basic Electrical & Electronics Engg", code: "23AES0201", faculty: "M.L.Dwarakanath/S.Bhavani", room: "E-205", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "Engineering Physics", code: "23ABS9903", faculty: "K.Kusumalatha", room: "E-205", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "Engineering Physics", code: "23ABS9903", faculty: "K.Kusumalatha", room: "E-205", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "Intro to Programming (CLC)", code: "23AES0501", faculty: "D.Sireesha", room: "E-205", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:40", subject: "Engineering Graphics", code: "23AES0301", faculty: "Dr. K.Kumar/K.Vinay", room: "Drawing Hall", type: "Lab" },
                    { id: "6", time: "01:40 - 02:30", subject: "Engineering Graphics", code: "23AES0301", faculty: "Dr. K.Kumar/K.Vinay", room: "Drawing Hall", type: "Lab" },
                    { id: "7", time: "02:30 - 03:20", subject: "Engineering Graphics", code: "23AES0301", faculty: "Dr. K.Kumar/K.Vinay", room: "Drawing Hall", type: "Lab" },
                ]
            },
            {
                day: "Tuesday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "Intro to Programming", code: "23AES0501", faculty: "D.Sireesha", room: "E-205", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "Linear Algebra & Calculus", code: "23ABS9904", faculty: "K.Shanmugam", room: "E-205", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "Linear Algebra & Calculus", code: "23ABS9904", faculty: "K.Shanmugam", room: "E-205", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "BEEE (CLC)", code: "23AES0201", faculty: "M.L.Dwarakanath", room: "E-205", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:40", subject: "Intro to Programming", code: "23AES0501", faculty: "D.Sireesha", room: "E-205", type: "Lecture" },
                    { id: "6", time: "01:40 - 02:30", subject: "Basic Electrical & Electronics Engg", code: "23AES0201", faculty: "M.L.Dwarakanath", room: "E-205", type: "Lecture" },
                    { id: "7", time: "02:30 - 03:20", subject: "Engineering Physics", code: "23ABS9903", faculty: "K.Kusumalatha", room: "E-205", type: "Lecture" },
                ]
            },
            {
                day: "Wednesday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "Intro to Programming", code: "23AES0501", faculty: "D.Sireesha", room: "E-205", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "CP Lab / EEE Workshop", code: "23AES0502/0202", faculty: "D.Sireesha/M.L.Dwarakanath", room: "Lab/Workshop", type: "Lab" },
                    { id: "3", time: "10:20 - 11:10", subject: "CP Lab / EEE Workshop", code: "23AES0502/0202", faculty: "D.Sireesha/M.L.Dwarakanath", room: "Lab/Workshop", type: "Lab" },
                    { id: "4", time: "11:10 - 12:00", subject: "CP Lab / EEE Workshop", code: "23AES0502/0202", faculty: "D.Sireesha/M.L.Dwarakanath", room: "Lab/Workshop", type: "Lab" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:40", subject: "Intro to Programming", code: "23AES0501", faculty: "D.Sireesha", room: "E-205", type: "Lecture" },
                    { id: "6", time: "01:40 - 02:30", subject: "Engineering Physics (CLC)", code: "23ABS9903", faculty: "K.Kusumalatha", room: "E-205", type: "Lecture" },
                    { id: "7", time: "02:30 - 03:20", subject: "Linear Algebra & Calculus", code: "23ABS9904", faculty: "K.Shanmugam", room: "E-205", type: "Lecture" },
                ]
            },
            {
                day: "Thursday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "Engineering Physics", code: "23ABS9903", faculty: "K.Kusumalatha", room: "E-205", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "Engineering Graphics", code: "23AES0301", faculty: "Dr. K.Kumar/K.Vinay", room: "Drawing Hall", type: "Lab" },
                    { id: "3", time: "10:20 - 11:10", subject: "Engineering Graphics", code: "23AES0301", faculty: "Dr. K.Kumar/K.Vinay", room: "Drawing Hall", type: "Lab" },
                    { id: "4", time: "11:10 - 12:00", subject: "Engineering Graphics", code: "23AES0301", faculty: "Dr. K.Kumar/K.Vinay", room: "Drawing Hall", type: "Lab" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:40", subject: "EP Lab / IT Workshop", code: "23ABS9908/0503", faculty: "K.Kusumalatha/N.Poojitha", room: "Lab/Workshop", type: "Lab" },
                    { id: "6", time: "01:40 - 02:30", subject: "EP Lab / IT Workshop", code: "23ABS9908/0503", faculty: "K.Kusumalatha/N.Poojitha", room: "Lab/Workshop", type: "Lab" },
                    { id: "7", time: "02:30 - 03:20", subject: "EP Lab / IT Workshop", code: "23ABS9908/0503", faculty: "K.Kusumalatha/N.Poojitha", room: "Lab/Workshop", type: "Lab" },
                ]
            },
            {
                day: "Friday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "Linear Algebra & Calculus", code: "23ABS9904", faculty: "K.Shanmugam", room: "E-205", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "EEE Workshop / CP Lab", code: "23AES0202/0502", faculty: "M.L.Dwarakanath/D.Sireesha", room: "Lab/Workshop", type: "Lab" },
                    { id: "3", time: "10:20 - 11:10", subject: "EEE Workshop / CP Lab", code: "23AES0202/0502", faculty: "M.L.Dwarakanath/D.Sireesha", room: "Lab/Workshop", type: "Lab" },
                    { id: "4", time: "11:10 - 12:00", subject: "EEE Workshop / CP Lab", code: "23AES0202/0502", faculty: "M.L.Dwarakanath/D.Sireesha", room: "Lab/Workshop", type: "Lab" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:40", subject: "Intro to Programming", code: "23AES0501", faculty: "D.Sireesha", room: "E-205", type: "Lecture" },
                    { id: "6", time: "01:40 - 02:30", subject: "BEEE-CLC", code: "23AES0201", faculty: "M.L.Dwarakanath", room: "E-205", type: "Lecture" },
                    { id: "7", time: "02:30 - 03:20", subject: "Engineering Physics", code: "23ABS9903", faculty: "K.Kusumalatha", room: "E-205", type: "Lecture" },
                ]
            },
            {
                day: "Saturday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "Linear Algebra & Calculus", code: "23ABS9904", faculty: "K.Shanmugam", room: "E-205", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "Engineering Physics", code: "23ABS9903", faculty: "K.Kusumalatha", room: "E-205", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "Linear Algebra & Calculus (CLC)", code: "23ABS9904", faculty: "K.Shanmugam", room: "E-205", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "NSS/NCC/Scouts", code: "23AHM9904", faculty: "C.Venkataramana", room: "Ground/Hall", type: "Activity" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:40", subject: "IT Workshop / EP Lab", code: "23AES0503/9908", faculty: "N.Poojitha/K.Kusumalatha", room: "Lab/Workshop", type: "Lab" },
                    { id: "6", time: "01:40 - 02:30", subject: "IT Workshop / EP Lab", code: "23AES0503/9908", faculty: "N.Poojitha/K.Kusumalatha", room: "Lab/Workshop", type: "Lab" },
                    { id: "7", time: "02:30 - 03:20", subject: "IT Workshop / EP Lab", code: "23AES0503/9908", faculty: "N.Poojitha/K.Kusumalatha", room: "Lab/Workshop", type: "Lab" },
                ]
            }
        ],
        "Section B": [],
        "Section C": []
    },
    "2nd Year": {
        "Section A": [
            {
                day: "Monday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "SMDS", code: "23ABS9915", faculty: "Mr. P. Venkata Ramana Reddy", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "IDS(CLC)", code: "23APC3201", faculty: "Mrs. R. Rupa Devi", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "SMDS(T)", code: "23ABS9915", faculty: "Mr. P. Venkata Ramana Reddy", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "IDS Lab", code: "23APC0509", faculty: "Mrs. R. Rupa Devi / Ms. Y. Vaishnavi", room: "Lab-3", type: "Lab" },
                    { id: "6", time: "02:40 - 03:30", subject: "IDS Lab", code: "23APC0509", faculty: "Mrs. R. Rupa Devi / Ms. Y. Vaishnavi", room: "Lab-3", type: "Lab" },
                    { id: "7", time: "03:30 - 04:20", subject: "AI Lab", code: "23APC3002", faculty: "Mr. K. Jayachandra / Mr. T. Kataiah", room: "AI Lab", type: "Lab" },
                ]
            },
            {
                day: "Tuesday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "IDS", code: "23APC3201", faculty: "Mrs. R. Rupa Devi", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "MEFA", code: "23AHM001", faculty: "D. S. Padmaja", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "FSD", code: "23ASC0503", faculty: "Ms. D. Sirisha / Mr. Bhanu Prakash", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "AI(CLC)", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "AI(CLC)", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "IDS", code: "23APC3201", faculty: "Mrs. R. Rupa Devi", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "SMDS", code: "23ABS9915", faculty: "Mr. P. Venkata Ramana Reddy", room: "B-408", type: "Lecture" },
                ]
            },
            {
                day: "Wednesday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "MEFA", code: "23AHM001", faculty: "D. S. Padmaja", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "SMDS", code: "23ABS9915", faculty: "Mr. P. Venkata Ramana Reddy", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "FSD", code: "23ASC0503", faculty: "Ms. D. Sirisha", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "IDS(CLC)", code: "23APC3201", faculty: "Mrs. R. Rupa Devi", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "DLCO", code: "23APC0503", faculty: "Mr. B. Sateesh Kumar", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "DLCO", code: "23APC0503", faculty: "Mr. B. Sateesh Kumar", room: "B-408", type: "Lecture" },
                ]
            },
            {
                day: "Thursday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "SMDS", code: "23ABS9915", faculty: "Mr. P. Venkata Ramana Reddy", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "IDS", code: "23APC3201", faculty: "Mrs. R. Rupa Devi", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "DLCO", code: "23APC0503", faculty: "Mr. B. Sateesh Kumar", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "ES", code: "23AMC9901", faculty: "Mr. M. Murali", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "DTI", code: "23AES0304", faculty: "Ms. C. Revathi", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "MEFA(CLC)", code: "23AHM001", faculty: "D. S. Padmaja", room: "B-408", type: "Lecture" },
                ]
            },
            {
                day: "Friday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "MEFA", code: "23AHM001", faculty: "D. S. Padmaja", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "IDS", code: "23APC3201", faculty: "Mrs. R. Rupa Devi", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "AI(CLC)", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "DLCO", code: "23APC0503", faculty: "Mr. B. Sateesh Kumar", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "ES", code: "23AMC9901", faculty: "Mr. M. Murali", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "DTI", code: "23AES0304", faculty: "Ms. C. Revathi", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "SMDS(CLC)", code: "23ABS9915", faculty: "Mr. P. Venkata Ramana Reddy", room: "B-408", type: "Lecture" },
                ]
            },
            {
                day: "Saturday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "DLCO", code: "23APC0503", faculty: "Mr. B. Sateesh Kumar", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "SMDS", code: "23ABS9915", faculty: "Mr. P. Venkata Ramana Reddy", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "IDS", code: "23APC3201", faculty: "Mrs. R. Rupa Devi", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "FSD(CLC)", code: "23ASC0503", faculty: "Ms. D. Sirisha", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "DLCO(CLC)", code: "23APC0503", faculty: "Mr. B. Sateesh Kumar", room: "B-408", type: "Lecture" },
                ]
            }
        ],
        "Section B": [
            {
                day: "Monday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "MEFA", code: "23AHM001", faculty: "Dr. K. Tirumalaiah", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "MEFA(CLC)", code: "23AHM001", faculty: "Dr. K. Tirumalaiah", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "DLCO", code: "23APC0503", faculty: "Mr. E. Satheesh Kumar", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "SMDS", code: "23ABS9915", faculty: "Mr. Y. Mastaniah", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "ES(CLC)", code: "23AMC9901", faculty: "Mr. M. Murali", room: "B-408", type: "Lecture" },
                ]
            },
            {
                day: "Tuesday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "DTI", code: "23AES0304", faculty: "Ms. C. Revathi", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "SMDS", code: "23ABS9915", faculty: "Mr. Y. Mastaniah", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "SMDS(CLC)", code: "23ABS9915", faculty: "Mr. Y. Mastaniah", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "AI(CLC)", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "MEFA", code: "23AHM001", faculty: "Dr. K. Tirumalaiah", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "DLCO(CLC)", code: "23APC0503", faculty: "Mr. E. Satheesh Kumar", room: "B-408", type: "Lecture" },
                ]
            },
            {
                day: "Wednesday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "SMDS", code: "23ABS9915", faculty: "Mr. Y. Mastaniah", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "MEFA", code: "23AHM001", faculty: "Dr. K. Tirumalaiah", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "IDS(CLC)", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "AI Lab", code: "23APC3002", faculty: "Mr. K. Jayachandra / Mr. T. Kataiah", room: "AI Lab", type: "Lab" },
                    { id: "6", time: "02:40 - 03:30", subject: "AI Lab", code: "23APC3002", faculty: "Mr. K. Jayachandra / Mr. T. Kataiah", room: "AI Lab", type: "Lab" },
                    { id: "7", time: "03:30 - 04:20", subject: "AI Lab", code: "23APC3002", faculty: "Mr. K. Jayachandra / Mr. T. Kataiah", room: "AI Lab", type: "Lab" },
                ]
            },
            {
                day: "Thursday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "SMDS", code: "23ABS9915", faculty: "Mr. Y. Mastaniah", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "DLCO", code: "23APC0503", faculty: "Mr. E. Satheesh Kumar", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "AI(CLC)", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "IDS Lab", code: "23APC0509", faculty: "Ms. Y. Vaishnavi / Mrs. R. Rupa Devi", room: "Lab-3", type: "Lab" },
                    { id: "6", time: "02:40 - 03:30", subject: "IDS Lab", code: "23APC0509", faculty: "Ms. Y. Vaishnavi / Mrs. R. Rupa Devi", room: "Lab-3", type: "Lab" },
                    { id: "7", time: "03:30 - 04:20", subject: "IDS Lab", code: "23APC0509", faculty: "Ms. Y. Vaishnavi / Mrs. R. Rupa Devi", room: "Lab-3", type: "Lab" },
                ]
            },
            {
                day: "Friday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "FSD", code: "23ASC0503", faculty: "Ms. D. Sirisha", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "ES", code: "23AMC9901", faculty: "Mr. M. Murali", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "MEFA(CLC)", code: "23AHM001", faculty: "Dr. K. Tirumalaiah", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "DLCO", code: "23APC0503", faculty: "Mr. E. Satheesh Kumar", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "SMDS(CLC)", code: "23ABS9915", faculty: "Mr. Y. Mastaniah", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "IDS(CLC)", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-408", type: "Lecture" },
                ]
            },
            {
                day: "Saturday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-408", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "SMDS", code: "23ABS9915", faculty: "Mr. Y. Mastaniah", room: "B-408", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "FSD", code: "23ASC0503", faculty: "Ms. D. Sirisha", room: "B-408", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "FSD", code: "23ASC0503", faculty: "Ms. D. Sirisha", room: "B-408", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "DTI(CLC)", code: "23AES0304", faculty: "Ms. C. Revathi", room: "B-408", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-408", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "DLCO(CLC)", code: "23APC0503", faculty: "Mr. E. Satheesh Kumar", room: "B-408", type: "Lecture" },
                ]
            }
        ],
        "Section C": [
            {
                day: "Monday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-407", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "DLCO", code: "23APC0503", faculty: "Ms. D. Sirisha", room: "B-407", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "FSD", code: "23ASC0503", faculty: "Mr. M. Bhanu Prakash", room: "B-407", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "FSD", code: "23ASC0503", faculty: "Mr. M. Bhanu Prakash", room: "B-407", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "AI(CLC)", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-407", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "SMDS", code: "23ABS9915", faculty: "Ms. G. Swarnakala", room: "B-407", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "MEFA(CLC)", code: "23AHM001", faculty: "Ms. Teja malathi", room: "B-407", type: "Lecture" },
                ]
            },
            {
                day: "Tuesday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-407", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "MEFA", code: "23AHM001", faculty: "Ms. Teja malathi", room: "B-407", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "DLCO", code: "23APC0503", faculty: "Ms. D. Sirisha", room: "B-407", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "IDS(CLC)", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-407", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "SMDS(CLC)", code: "23ABS9915", faculty: "Ms. G. Swarnakala", room: "B-407", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "ES", code: "23AMC9901", faculty: "Mr. M. Murali", room: "B-407", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "DTI(CLC)", code: "23AES0304", faculty: "Ms. C. Revathi", room: "B-407", type: "Lecture" },
                ]
            },
            {
                day: "Wednesday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-407", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-407", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "ES(CLC)", code: "23AMC9901", faculty: "Mr. M. Murali", room: "B-407", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "SMDS", code: "23ABS9915", faculty: "Ms. G. Swarnakala", room: "B-407", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "DLCO(CLC)", code: "23APC0503", faculty: "Ms. D. Sirisha", room: "B-407", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "MEFA", code: "23AHM001", faculty: "Ms. Teja malathi", room: "B-407", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "SMDS(CLC)", code: "23ABS9915", faculty: "Ms. G. Swarnakala", room: "B-407", type: "Lecture" },
                ]
            },
            {
                day: "Thursday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "SMDS", code: "23ABS9915", faculty: "Ms. G. Swarnakala", room: "B-407", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "MEFA", code: "23AHM001", faculty: "Ms. Teja malathi", room: "B-407", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "MEFA(CLC)", code: "23AHM001", faculty: "Ms. Teja malathi", room: "B-407", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-407", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "DLCO", code: "23APC0503", faculty: "Ms. D. Sirisha", room: "B-407", type: "Lecture" },
                    { id: "6", time: "02:40 - 03:30", subject: "DTI", code: "23AES0304", faculty: "Ms. C. Revathi", room: "B-407", type: "Lecture" },
                    { id: "7", time: "03:30 - 04:20", subject: "AI(CLC)", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-407", type: "Lecture" },
                ]
            },
            {
                day: "Friday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-407", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "IDS(CLC)", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-407", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "DTI", code: "23AES0304", faculty: "Ms. C. Revathi", room: "B-407", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "DLCO", code: "23APC0503", faculty: "Ms. D. Sirisha", room: "B-407", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "AI Lab", code: "23APC3002", faculty: "Mr. K. Jayachandra / Mr. T. Kataiah", room: "AI Lab", type: "Lab" },
                    { id: "6", time: "02:40 - 03:30", subject: "AI Lab", code: "23APC3002", faculty: "Mr. K. Jayachandra / Mr. T. Kataiah", room: "AI Lab", type: "Lab" },
                    { id: "7", time: "03:30 - 04:20", subject: "AI Lab", code: "23APC3002", faculty: "Mr. K. Jayachandra / Mr. T. Kataiah", room: "AI Lab", type: "Lab" },
                ]
            },
            {
                day: "Saturday",
                periods: [
                    { id: "1", time: "09:30 - 10:20", subject: "AI", code: "23APC3001", faculty: "Mr. K. Jayachandra", room: "B-407", type: "Lecture" },
                    { id: "2", time: "10:20 - 11:10", subject: "FSD", code: "23ASC0503", faculty: "Mr. M. Bhanu Prakash", room: "B-407", type: "Lecture" },
                    { id: "3", time: "11:10 - 12:00", subject: "IDS", code: "23APC3201", faculty: "Ms. Y. Vaishnavi", room: "B-407", type: "Lecture" },
                    { id: "4", time: "12:00 - 12:50", subject: "SMDS(CLC)", code: "23ABS9915", faculty: "Ms. G. Swarnakala", room: "B-407", type: "Lecture" },
                    { id: "L", time: "12:50 - 01:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "01:50 - 02:40", subject: "IDS Lab", code: "23APC0509", faculty: "Ms. Y. Vaishnavi / Mrs. R. Rupa Devi", room: "Lab-3", type: "Lab" },
                    { id: "6", time: "02:40 - 03:30", subject: "IDS Lab", code: "23APC0509", faculty: "Ms. Y. Vaishnavi / Mrs. R. Rupa Devi", room: "Lab-3", type: "Lab" },
                    { id: "7", time: "03:30 - 04:20", subject: "IDS Lab", code: "23APC0509", faculty: "Ms. Y. Vaishnavi / Mrs. R. Rupa Devi", room: "Lab-3", type: "Lab" },
                ]
            }
        ]
    },
    "3rd Year": {
        "Section A": [
            {
                day: "Monday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "SNA", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-401", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "BDA LAB", code: "23APC3011", faculty: "Y. Kalaivani/C. Revathi", room: "Cluster Lab", type: "Lab" },
                    { id: "3", time: "10:20 - 11:10", subject: "BDA LAB", code: "23APC3011", faculty: "Y. Kalaivani/C. Revathi", room: "Cluster Lab", type: "Lab" },
                    { id: "4", time: "11:10 - 12:00", subject: "BDA LAB", code: "23APC3011", faculty: "Y. Kalaivani/C. Revathi", room: "Cluster Lab", type: "Lab" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "RL", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-401", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "DL", code: "23APC3010", faculty: "T. Kataiah", room: "B-401", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "BDA(CLC)", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-401", type: "Lecture" },
                ]
            },
            {
                day: "Tuesday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "IFSC", code: "23AOE0401", faculty: "M. Pandimeena", room: "B-401", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "BDA", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-401", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "SNA", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-401", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "NLP", code: "23APC3012", faculty: "Dr. Harish", room: "B-401", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "TPW", code: "23AMC9902", faculty: "Nagaraju", room: "B-401", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "RL(CLC)", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-401", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "DL(CLC)", code: "23APC3010", faculty: "T. Kataiah", room: "B-401", type: "Lecture" },
                ]
            },
            {
                day: "Wednesday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "NLP", code: "23APC3012", faculty: "Dr. Harish", room: "B-401", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "DL LAB", code: "23APC3009", faculty: "T. Kataiah/Dr. S. Jumlesha", room: "AI Lab", type: "Lab" },
                    { id: "3", time: "10:20 - 11:10", subject: "DL LAB", code: "23APC3009", faculty: "T. Kataiah/Dr. S. Jumlesha", room: "AI Lab", type: "Lab" },
                    { id: "4", time: "11:10 - 12:00", subject: "DL LAB", code: "23APC3009", faculty: "T. Kataiah/Dr. S. Jumlesha", room: "AI Lab", type: "Lab" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "SNA(CLC)", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-401", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "RL", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-401", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "IFSC(CLC)", code: "23AOE0401", faculty: "M. Pandimeena", room: "B-401", type: "Lecture" },
                ]
            },
            {
                day: "Thursday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "BDA", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-401", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "RL", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-401", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "DL", code: "23APC3010", faculty: "T. Kataiah", room: "B-401", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "TPW", code: "23AMC9902", faculty: "Nagaraju", room: "B-401", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "IFSC", code: "23AOE0401", faculty: "M. Pandimeena", room: "B-401", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "SNA(CLC)", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-401", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "NLP(CLC)", code: "23APC3012", faculty: "Dr. Harish", room: "B-401", type: "Lecture" },
                ]
            },
            {
                day: "Friday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "DL", code: "23APC3010", faculty: "T. Kataiah", room: "B-401", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "SNA", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-401", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "FSD II", code: "23ASC3001", faculty: "K. Gangothri", room: "B-401", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "FSD II", code: "23ASC3001", faculty: "P. Anusha", room: "B-401", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "BDA(CLC)", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-401", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "IFSC(CLC)", code: "23AOE0401", faculty: "M. Pandimeena", room: "B-401", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "RL(CLC)", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-401", type: "Lecture" },
                ]
            },
            {
                day: "Saturday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "IFSC", code: "23AOE0401", faculty: "M. Pandimeena", room: "B-401", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "BDA", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-401", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "DL(CLC)", code: "23APC3010", faculty: "T. Kataiah", room: "B-401", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "Counseling", code: "N/A", faculty: "Y. Kalaivani", room: "B-401", type: "Activity" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "FSD II(CLC)", code: "23ASC3001", faculty: "K. Gangothri", room: "B-401", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "NLP", code: "23APC3012", faculty: "Dr. Harish", room: "B-401", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "NLP(CLC)", code: "23APC3012", faculty: "Dr. Harish", room: "B-401", type: "Lecture" },
                ]
            }
        ],
        "Section B": [
            {
                day: "Monday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "NLP", code: "23APC3012", faculty: "Dr. Harish", room: "B-402", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "RL", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-402", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "DL", code: "23APC3010", faculty: "T. Kataiah", room: "B-402", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "TPW", code: "23AMC9902", faculty: "Nagaraju", room: "B-402", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "IFSC(CLC)", code: "23AOE0401", faculty: "E. Lokeswari", room: "B-402", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "SNA", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-402", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "Counseling", code: "N/A", faculty: "Mentor", room: "B-402", type: "Activity" },
                ]
            },
            {
                day: "Tuesday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "RL", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-402", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "DL LAB", code: "23APC3009", faculty: "T. Kataiah/Dr. S. Jumlesha", room: "AI Lab", type: "Lab" },
                    { id: "3", time: "10:20 - 11:10", subject: "DL LAB", code: "23APC3009", faculty: "T. Kataiah/Dr. S. Jumlesha", room: "AI Lab", type: "Lab" },
                    { id: "4", time: "11:10 - 12:00", subject: "DL LAB", code: "23APC3009", faculty: "T. Kataiah/Dr. S. Jumlesha", room: "AI Lab", type: "Lab" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "DL(CLC)", code: "23APC3010", faculty: "T. Kataiah", room: "B-402", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "BDA", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-402", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "NLP(CLC)", code: "23APC3012", faculty: "Dr. Harish", room: "B-402", type: "Lecture" },
                ]
            },
            {
                day: "Wednesday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "SNA", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-402", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "IFSC", code: "23AOE0401", faculty: "E. Lokeswari", room: "B-402", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "BDA", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-402", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "NLP(CLC)", code: "23APC3012", faculty: "Dr. Harish", room: "B-402", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "IFSC(CLC)", code: "23AOE0401", faculty: "E. Lokeswari", room: "B-402", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "NLP", code: "23APC3012", faculty: "Dr. Harish", room: "B-402", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "SNA(CLC)", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-402", type: "Lecture" },
                ]
            },
            {
                day: "Thursday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "IFSC", code: "23AOE0401", faculty: "E. Lokeswari", room: "B-402", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "BDA LAB", code: "23APC3011", faculty: "Y. Kalaivani/C. Revathi", room: "Cluster Lab", type: "Lab" },
                    { id: "3", time: "10:20 - 11:10", subject: "BDA LAB", code: "23APC3011", faculty: "Y. Kalaivani/C. Revathi", room: "Cluster Lab", type: "Lab" },
                    { id: "4", time: "11:10 - 12:00", subject: "BDA LAB", code: "23APC3011", faculty: "Y. Kalaivani/C. Revathi", room: "Cluster Lab", type: "Lab" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "DL", code: "23APC3010", faculty: "T. Kataiah", room: "B-402", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "RL(CLC)", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-402", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "BDA(CLC)", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-402", type: "Lecture" },
                ]
            },
            {
                day: "Friday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "BDA", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-402", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "RL(CLC)", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-402", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "TPW", code: "23AMC9902", faculty: "Nagaraju", room: "B-402", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "SNA", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-402", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "NLP", code: "23APC3012", faculty: "Dr. Harish", room: "B-402", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "FSD II(CLC)", code: "23ASC3001", faculty: "K. Gangothri", room: "B-402", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "DL(CLC)", code: "23APC3010", faculty: "T. Kataiah", room: "B-402", type: "Lecture" },
                ]
            },
            {
                day: "Saturday",
                periods: [
                    { id: "1", time: "08:40 - 09:30", subject: "RL", code: "23APE3005", faculty: "Dr. S. Jumlesha", room: "B-402", type: "Lecture" },
                    { id: "2", time: "09:30 - 10:20", subject: "IFSC", code: "23AOE0401", faculty: "E. Lokeswari", room: "B-402", type: "Lecture" },
                    { id: "3", time: "10:20 - 11:10", subject: "FSD II", code: "23ASC3001", faculty: "K. Gangothri", room: "B-402", type: "Lecture" },
                    { id: "4", time: "11:10 - 12:00", subject: "FSD II", code: "23ASC3001", faculty: "P. Anusha", room: "B-402", type: "Lecture" },
                    { id: "L", time: "12:00 - 12:50", subject: "LUNCH BREAK", code: "", faculty: "", room: "", type: "Break" },
                    { id: "5", time: "12:50 - 01:50", subject: "DL", code: "23APC3010", faculty: "T. Kataiah", room: "B-402", type: "Lecture" },
                    { id: "6", time: "01:50 - 02:40", subject: "BDA(CLC)", code: "23APC3008", faculty: "Y. Kalaivani", room: "B-402", type: "Lecture" },
                    { id: "7", time: "02:40 - 03:30", subject: "SNA(CLC)", code: "23APE3012", faculty: "M. Bhanu Prakash", room: "B-402", type: "Lecture" },
                ]
            }
        ],
        "Section C": []
    }
};

export const getClassesForDate = (date: Date, year: string, section: string) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[date.getDay()];

    // Find the schedule for this day
    const daySchedule = TIMETABLE_DATA[year]?.[section]?.find(d => d.day === dayName);

    // Return only valid classes (exclude lunch breaks)
    return daySchedule?.periods.filter(p => p.type !== "Break") || [];
};
