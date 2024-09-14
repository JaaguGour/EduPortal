 import { Container, Row } from "react-bootstrap";
import AdminNavBar from "./navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants";

import Alerts from "../reusable/alerts";
export const StudentsofNineclass = () => {
  const [studentsdata, setstudentsdata] = useState([]);
  //function for get all the students information which is in 6th class.
  const navigate = useNavigate();
   
   const [alertColor, setAlertColor] = useState("");
   const [alertText, setAlertText] = useState("");
   const [showAlert, setShowAlert] = useState(false);
  async function getstudentinfo() {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/student/getclasswisestudents`, {
        params: {
          class: 9,
          teacherid: "Vikram9900",
        },
      });
      console.log(response.data);
      setstudentsdata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //  console.log(studentsdata)

  const admininfo = useSelector((state) => state.AdminInfo.admininfo);
  useEffect(() => {
    getstudentinfo();
  }, [showAlert]);

  // Function to handle button click
  const handleButtonClick = (student) => {
    console.log("Button clicked for:", student);
    // Perform any action you want with the student data
    console.log(student.user_name);
    console.log(student.class);
    
   removeStudent(student);
   setShowAlert(true);
   setAlertColor("success");
   setAlertText("Student Remove Successfully!");
   setTimeout(() => {
     setShowAlert(false);
   }, 3000);



  };

  //request for delete student
  async function removeStudent ( student){
     try{
      const response = await axios.delete(`${BACKEND_BASE_URL}/student/removestudent`,{params: {
       studentinfo : student
      }})
      console.log(response);
     }
     catch(error){
      console.log(error);
         setShowAlert(true);
         setAlertColor("danger");
         setAlertText("Error to Remove Student !");
         setTimeout(() => {
           setShowAlert(false);
         }, 3000);
     }
  }



  const columns = [
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "address1",
      text: "Address",
    },
    {
      dataField: "first_name",
      text: "Name",
    },
    {
      dataField: "password",
      text: "DOB",
    },
    {
      dataField: "phone1",
      text: "Phonenumber",
    },
    {
      dataField: "gender",
      text: "Gender",
    },
    {
      dataField: "user_name",
      text: "User Name",
    },
    {
      dataField: "password",
      text: "Password",
    },
    {
      dataField: "father_name",
      text: "Father Name",
    },
    {
      dataField: "Remove student",
      text: "Remove student",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-primary bg-danger"
            style={{ border: "none" }}
            onClick={() => handleButtonClick(row)}
          >
            Remove
          </button>
        );
      },
    },
  ];

   function clickback() {
     navigate("/admin/viewstudents");
   }
  return (
    <>
      <Row>
        <AdminNavBar />
      </Row>
      {showAlert ? <Alerts color={alertColor} text={alertText} /> : ""}
      <Container className="text-black " fluid>
        <Row className="my-2">
          <h3 className="w-75"> Welcome {admininfo.name}</h3>
          <CloseButton
            style={{ position: "relative", left: "17rem" }}
            onClick={clickback}
          />
        </Row>
        <Row>
          <BootstrapTable
            keyField="aadhar_numbe"
            data={studentsdata}
            columns={columns}
          />
        </Row>
      </Container>
    </>
  );
};
