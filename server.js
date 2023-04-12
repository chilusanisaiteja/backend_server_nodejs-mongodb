const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://chilusanisaitejaiithyderabad07:8555076996@cluster1.a4zizem.mongodb.net/test"
  )
  .then(() => console.log("connection successful..."))
  .catch((err) => console.log(err));

const collegeSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  year_founded: Number,
  city: String,
  state: String,
  country: String,
  no_of_Students: Number,
  courses: Array,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Colleges = new mongoose.model("Colleges", collegeSchema);

const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  year_of_batch: Number,
  college_Id: String,
  skills: Array,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Students = new mongoose.model("Students", studentSchema);

// random value generator

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate an array of random course names

function getRandomCourses() {
  const courses = [
    "Computer Science",
    "Electronics",
    "Information Technology",
    "Mechanical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Biotechnology",
  ];
  const numCourses = getRandomInt(1, courses.length);
  const selectedCourses = new Set();
  while (selectedCourses.size < numCourses) {
    const randomIndex = getRandomInt(0, courses.length - 1);
    selectedCourses.add(courses[randomIndex]);
  }
  return Array.from(selectedCourses);
}

// Helper function to generate an array of random skill names
function getRandomSkills() {
  const skills = [
    "C++",
    "Java",
    "Python",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "Node.js",
    "React",
    "Angular",
    "Vue.js",
    "MongoDB",
    "MySQL",
    "Oracle",
    "Php",
  ];
  const numSkills = getRandomInt(1, skills.length);
  const selectedSkills = new Set();
  while (selectedSkills.size < numSkills) {
    const randomIndex = getRandomInt(0, skills.length - 1);
    selectedSkills.add(skills[randomIndex]);
  }
  return Array.from(selectedSkills);
}

//all states array

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

// Generate 100 colleges

const createDocument = async () => {
  try {
    const colleges = [];
    for (let i = 1; i <= 100; i++) {
      const college = new Colleges({
        id: i,
        name: `College${i}`,
        year_founded: getRandomInt(1800, 2022),
        city: `City${getRandomInt(1, 10)}`,
        state: states[getRandomInt(0, 35)],
        country: "India",
        no_of_students: 100,
        courses: getRandomCourses(),
      });
      colleges.push(college);
    }

    const result = await Colleges.insertMany(colleges);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

// generate allstudents

const createDocument2 = async () => {
  try {
    const students = [];
    let i = 1;
    for (let j = 1; j <= 10000; j++) {
      const student = new Students({
        id: j,
        name: `Student${j}`,
        year_of_batch: getRandomInt(2015, 2023),
        college_Id: i % 100,
        skills: getRandomSkills(),
      });
      i++;
      students.push(student);
    }

    const result = await Students.insertMany(students);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument2();

const PORT = 4000;

app.get("/", async (req, res) => {
  try {
    const allcolleges = await Colleges.find();
    return res.json(allcolleges);
  } catch {
    console.log("error");
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    const allstudents = await Students.find({ college_Id: req.params.id });
    return res.json(allstudents);
  } catch {
    console.log("error");
  }
});

app.get("/college/:name", async (req, res) => {
  try {
    console.log(typeof req.params.name, req.params.name);
    const allcolleges = await Colleges.find({ name: req.params.name });
    console.log(allcolleges);
    return res.json(allcolleges);
  } catch {
    console.log("error");
  }
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log("Server listening on PORT", PORT);
});
